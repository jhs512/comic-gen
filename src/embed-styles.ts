/* Kept with the SDK so embedded cards work without the playground stylesheet. */
export const embedStyles = `
.comic-figure { margin: 20px 0; }
.comic-figure [role="alert"] { color: #b53b45; white-space: pre-wrap; }
.comic-card { box-sizing: border-box; display: flex; align-items: center; gap: 18px; width: 100%; max-width: 540px; padding: 16px; border: 1px solid #dbe3ee; border-radius: 16px; background: white; color: #233044; text-align: left; font: 14px/1.6 system-ui, sans-serif; cursor: pointer; }
.comic-card:hover { background: #f8faff; border-color: #4c64e8; }
.comic-card:focus-visible, .comic-viewer button:focus-visible, .comic-viewer select:focus-visible, .comic-viewer input:focus-visible { outline: 3px solid #8096ff; outline-offset: 3px; }
.comic-card-thumbnail { display: block; flex: 0 0 112px; width: 112px; height: 96px; overflow: hidden; border-radius: 10px; background: #f5f7fb; }
.comic-card-thumbnail svg { display: block; width: 100%; height: auto; }
.comic-card-copy { display: grid; gap: 6px; min-width: 0; overflow-wrap: anywhere; }
.comic-card-copy strong { font-size: 17px; }
.comic-card-copy span { color: #526fea; font-size: 13px; }
.comic-viewer { box-sizing: border-box; width: calc(100vw - 48px); max-width: 1800px; height: calc(100dvh - 48px); max-height: none; padding: 0; border: 1px solid #dbe3ee; border-radius: 16px; background: #f5f7fb; color: #233044; font: 14px/1.6 system-ui, sans-serif; overflow: hidden; }
.comic-viewer[open] { display: flex; flex-direction: column; }
.comic-viewer::backdrop { background: #162339b3; }
.comic-viewer-toolbar { flex: none; display: flex; align-items: center; flex-wrap: wrap; gap: 12px; padding: 16px 20px; background: white; border-bottom: 1px solid #dbe3ee; }
.comic-viewer-title { margin: 0 auto 0 0; min-width: 0; font-size: 18px; color: inherit; letter-spacing: 0; overflow-wrap: anywhere; }
.comic-viewer-toolbar label { display: flex; align-items: center; gap: 8px; margin: 0; color: inherit; font-size: 13px; }
.comic-viewer-controls { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; max-width: 100%; }
.comic-viewer-checkbox input { flex: none; width: 16px; height: 16px; margin: 0; padding: 0; accent-color: #526fea; }
.comic-viewer button, .comic-viewer select { border: 1px solid #dbe3ee; border-radius: 8px; background: white; color: #344055; padding: 8px 12px; font: inherit; cursor: pointer; }
.comic-viewer-help { flex: none; margin: 0; padding: 8px 20px; font-size: 12px; color: #69778b; }
.comic-viewer-viewport { box-sizing: border-box; flex: 1; min-width: 0; min-height: 0; overflow: auto; overscroll-behavior: contain; padding: 16px; }
.comic-viewer-viewport[data-prevent-overflow="true"] { overflow: hidden; }
.comic-viewer-artwork { margin: 0 auto; }
.comic-viewer-artwork svg { display: block; width: 100%; max-width: none; height: auto; }
@media (max-width: 600px) {
  .comic-viewer { width: 100vw; max-width: none; height: 100dvh; margin: 0; border: 0; border-radius: 0; }
  .comic-viewer-toolbar { padding: 12px; gap: 10px; }
  .comic-viewer-title { flex-basis: calc(100% - 80px); font-size: 16px; }
  .comic-viewer-help { padding: 8px 12px; }
  .comic-viewer-viewport { padding: 8px; }
  .comic-card { gap: 12px; padding: 12px; }
  .comic-card-thumbnail { flex-basis: 88px; width: 88px; height: 80px; }
}
`;
