/** Scoped UI styles are installed only when a card or viewer is used. */
export const viewerStyles = `
.comic-card[data-comic-gen-card] { box-sizing:border-box; display:flex; align-items:center; gap:18px; width:100%; max-width:540px; padding:16px; border:1px solid #dbe3ee; border-radius:16px; background:white; color:#233044; text-align:left; font:14px/1.6 system-ui,sans-serif; cursor:pointer; }
.comic-card[data-comic-gen-card]:hover { background:#f8faff; border-color:#4c64e8; }
.comic-card[data-comic-gen-card]:focus-visible, .comic-viewer[data-comic-gen-viewer] :is(button,input,select,.comic-viewer-viewport):focus-visible { outline:3px solid #8096ff; outline-offset:3px; }
[data-comic-gen-card] .comic-card-thumbnail { display:block; flex:0 0 112px; width:112px; height:96px; overflow:hidden; border-radius:10px; background:#f5f7fb; }
[data-comic-gen-card] .comic-card-thumbnail img { display:block; width:100%; max-width:none; height:auto; margin:0; }
[data-comic-gen-card] .comic-card-copy { display:grid; gap:6px; min-width:0; overflow-wrap:anywhere; }
[data-comic-gen-card] .comic-card-copy strong { font-size:17px; }
[data-comic-gen-card] .comic-card-copy span { color:#526fea; font-size:13px; }
.comic-viewer[data-comic-gen-viewer] { box-sizing:border-box; margin:auto; width:calc(100vw - 48px); max-width:1800px; height:calc(100dvh - 48px); max-height:none; padding:0; border:1px solid #dbe3ee; border-radius:16px; background:#f5f7fb; color:#233044; font:14px/1.6 system-ui,sans-serif; overflow:hidden; }
.comic-viewer[data-comic-gen-viewer][open] { display:flex; flex-direction:column; }
.comic-viewer[data-comic-gen-viewer]::backdrop { background:#162339b3; }
[data-comic-gen-viewer] .comic-viewer-toolbar { flex:none; display:flex; align-items:center; flex-wrap:wrap; gap:12px; padding:16px 20px; background:white; border-bottom:1px solid #dbe3ee; }
[data-comic-gen-viewer] .comic-viewer-title { margin:0 auto 0 0; min-width:0; font-size:18px; color:inherit; letter-spacing:0; overflow-wrap:anywhere; }
[data-comic-gen-viewer] .comic-viewer-controls { display:flex; align-items:center; flex-wrap:wrap; gap:12px; max-width:100%; }
[data-comic-gen-viewer] .comic-viewer-navigation { display:flex; align-items:center; gap:12px; }
[data-comic-gen-viewer] .comic-viewer-controls label { display:flex; align-items:center; gap:8px; margin:0; color:inherit; font-size:13px; white-space:nowrap; }
[data-comic-gen-viewer] .comic-viewer-checkbox input { flex:none; width:16px; height:16px; margin:0; padding:0; accent-color:#526fea; cursor:pointer; }
[data-comic-gen-viewer] :is(button,select) { border:1px solid #dbe3ee; border-radius:8px; background:white; color:#344055; padding:8px 12px; font:inherit; cursor:pointer; }
[data-comic-gen-viewer] button:disabled { opacity:.4; cursor:default; }
[data-comic-gen-viewer] .comic-position { min-width:5rem; text-align:center; font-variant-numeric:tabular-nums; }
[data-comic-gen-viewer] .comic-viewer-help { flex:none; margin:0; padding:8px 20px; font-size:12px; color:#69778b; }
[data-comic-gen-viewer] .comic-viewer-viewport { box-sizing:border-box; flex:1; min-width:0; min-height:0; overflow:auto; overscroll-behavior:contain; padding:16px; }
[data-comic-gen-viewer] .comic-viewer-viewport[data-prevent-overflow="true"] { overflow-x:hidden; overflow-y:auto; }
[data-comic-gen-viewer] .comic-viewer-artwork { margin:0 auto; }
[data-comic-gen-viewer] .comic-viewer-artwork img { display:block; width:100%; max-width:none; height:auto; margin:0; user-select:none; }
@media (max-width:600px) {
  .comic-viewer[data-comic-gen-viewer] { width:100vw; max-width:none; height:100dvh; margin:0; border:0; border-radius:0; }
  [data-comic-gen-viewer] .comic-viewer-toolbar { padding:12px; gap:10px; }
  [data-comic-gen-viewer] .comic-viewer-title { flex-basis:calc(100% - 80px); font-size:16px; }
  [data-comic-gen-viewer] .comic-viewer-controls { width:100%; }
  [data-comic-gen-viewer] .comic-viewer-navigation { flex-basis:100%; justify-content:center; }
  [data-comic-gen-viewer] .comic-viewer-help { padding:8px 12px; }
  [data-comic-gen-viewer] .comic-viewer-viewport { padding:8px; }
  .comic-card[data-comic-gen-card] { gap:12px; padding:12px; }
  [data-comic-gen-card] .comic-card-thumbnail { flex-basis:88px; width:88px; height:80px; }
}
`;
