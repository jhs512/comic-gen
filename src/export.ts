import type { RenderResult } from "./comic";

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function exportPng(
  result: RenderResult,
  scale = 1,
): Promise<Blob> {
  if (!result.svg || !Number.isFinite(scale) || scale < 0.5 || scale > 4)
    throw new Error("올바른 만화와 0.5~4 배율이 필요합니다.");
  const width = Math.round(result.width * scale),
    height = Math.round(result.height * scale);
  if (width > 16384 || height > 16384 || width * height > 32000000)
    throw new Error("PNG 크기가 너무 큽니다. 배율이나 컷 수를 줄이세요.");
  await document.fonts.ready;
  const url = URL.createObjectURL(
    new Blob([result.svg], { type: "image/svg+xml;charset=utf-8" }),
  );
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("이 브라우저에서는 PNG를 만들 수 없습니다.");
    context.drawImage(image, 0, 0, width, height);
    return await new Promise((resolve, reject) =>
      canvas.toBlob(
        (blob) =>
          blob ? resolve(blob) : reject(new Error("PNG 생성에 실패했습니다.")),
        "image/png",
      ),
    );
  } finally {
    URL.revokeObjectURL(url);
  }
}
