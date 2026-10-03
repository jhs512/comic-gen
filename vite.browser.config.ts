import { defineConfig } from "vite";
import { resolve } from "node:path";
export default defineConfig({build:{target:"es2022",outDir:"cdn",emptyOutDir:false,lib:{entry:resolve("src/browser.ts"),name:"ComicGen",formats:["iife"],fileName:()=>"comic-gen.auto.js"}}});
