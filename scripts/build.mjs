import { build } from "vite";
import { mkdir, copyFile, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import ts from "typescript";

const { version } = JSON.parse(await readFile("package.json", "utf8"));
const license = await readFile("node_modules/yaml/LICENSE", "utf8");
const entries = [
  ["src/index.ts", "comic-gen.js", true],
  ["src/renderer.ts", "comic-gen.render.js", true],
  ["src/viewer-entry.ts", "comic-gen.viewer.js", false],
  ["src/mermaid-runtime.ts", "comic-gen.mermaid.js", false],
];
for (const [entry, filename, includesYaml] of entries) {
  await build({
    configFile: "vite.sdk.config.ts",
    build: {
      emptyOutDir: entry === "src/index.ts",
      lib: { entry: resolve(entry), fileName: () => filename },
    },
  });
  const sdk = await readFile(`cdn/${filename}`, "utf8");
  // Preserve native CDN imports when consumers bundle the SDK with Webpack.
  const browserSdk = sdk
    .replace(/\bimport\(/g, "import(/* webpackIgnore: true */ ")
    .replace(/[ \t]+$/gm, "");
  await writeFile(
    `cdn/${filename}`,
    `/*! Comic Gen browser SDK v${version}${includesYaml ? `\nBundled yaml license:\n${license}` : ""}\n*/\n${browserSdk}`,
  );
}
// Emit declarations from the same source as the JavaScript, then flatten the
// small public surfaces so vendored consumers need only the matching .d.ts.
const config = ts.readConfigFile("tsconfig.json", ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, ".");
const declarations = new Map();
const program = ts.createProgram(parsed.fileNames, {
  ...parsed.options,
  noEmit: false,
  declaration: true,
  emitDeclarationOnly: true,
  newLine: ts.NewLineKind.LineFeed,
  outDir: resolve("cdn/types"),
});
const emitted = program.emit(undefined, (path, source) => {
  declarations.set(path.replace(/\\/g, "/").split("/").at(-1), source);
});
if (emitted.emitSkipped)
  throw new Error("SDK type declarations could not be generated.");
const declaration = (filename, predicate = () => true) => {
  const source = declarations.get(filename);
  if (!source) throw new Error(`Missing generated declaration ${filename}`);
  const document = ts.createSourceFile(
    filename,
    source,
    ts.ScriptTarget.Latest,
    true,
  );
  return document.statements
    .filter(
      (statement) => !ts.isImportDeclaration(statement) && predicate(statement),
    )
    .map((statement) => statement.getFullText(document))
    .join("");
};
const namedVariable = (names) => (statement) =>
  ts.isVariableStatement(statement) &&
  statement.declarationList.declarations.some((item) =>
    names.includes(item.name.getText()),
  );
const rendererTypes = [
  declaration("comic.d.ts"),
  declaration("export.d.ts"),
  declaration("assets.d.ts", namedVariable(["assetVersion"])),
  declaration(
    "syntax.d.ts",
    namedVariable(["syntaxFields", "syntaxValues"]),
  ).replace(/export declare/g, "declare"),
  "\nexport { renderComic as 만화그리기, renderPanels as 컷그리기, createRenderer as 렌더러만들기, renderComicAsync as 만화그리기비동기, renderPanelsAsync as 컷그리기비동기, syntaxFields as 문법항목, syntaxValues as 문법값 };\n",
].join("\n");
const viewerTypes =
  declaration("viewer.d.ts") +
  "\nexport { createComicViewer as 만화뷰어만들기, mountComicCard as 만화카드붙이기 };\n";
const typeFiles = [
  ["comic-gen.render.d.ts", rendererTypes],
  ["comic-gen.viewer.d.ts", viewerTypes],
  [
    "comic-gen.d.ts",
    rendererTypes +
      "\n" +
      declaration("embed.d.ts") +
      "\n" +
      viewerTypes +
      "\nexport { renderCodeBlocks as 코드블록그리기, renderCodeBlocksAsync as 코드블록그리기비동기 };\n",
  ],
];
for (const [filename, content] of typeFiles)
  await writeFile(`cdn/${filename}`, content);
const typeCheck = ts.createProgram(
  typeFiles.map(([filename]) => resolve("cdn", filename)),
  {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    strict: true,
    noEmit: true,
    types: [],
    lib: ["lib.es2022.d.ts", "lib.dom.d.ts", "lib.dom.iterable.d.ts"],
  },
);
const typeErrors = ts.getPreEmitDiagnostics(typeCheck);
if (typeErrors.length)
  throw new Error(
    ts.formatDiagnosticsWithColorAndContext(typeErrors, {
      getCanonicalFileName: (filename) => filename,
      getCurrentDirectory: ts.sys.getCurrentDirectory,
      getNewLine: () => "\n",
    }),
  );
await build({ configFile: "vite.config.ts" });
await mkdir("dist/sdk", { recursive: true });
for (const [, filename] of entries)
  await copyFile(`cdn/${filename}`, `dist/sdk/${filename}`);
for (const [filename] of typeFiles)
  await copyFile(`cdn/${filename}`, `dist/sdk/${filename}`);
await copyFile("llm-guide.md", "dist/llm-guide.md");
