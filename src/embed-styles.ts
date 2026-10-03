/* Legacy document cards remain self-contained; viewer styling lives in its module. */
export const embedStyles = `
.comic-figure { margin:20px 0; }
.comic-figure [role="alert"] { color:#b53b45; white-space:pre-wrap; }
.comic-card { box-sizing:border-box; display:flex; align-items:center; gap:18px; width:100%; max-width:540px; padding:16px; border:1px solid #dbe3ee; border-radius:16px; background:white; color:#233044; text-align:left; font:14px/1.6 system-ui,sans-serif; cursor:pointer; }
.comic-card:hover { background:#f8faff; border-color:#4c64e8; }
.comic-card:focus-visible { outline:3px solid #8096ff; outline-offset:3px; }
.comic-card-thumbnail { display:block; flex:0 0 112px; width:112px; height:96px; overflow:hidden; border-radius:10px; background:#f5f7fb; }
.comic-card-thumbnail svg { display:block; width:100%; height:auto; }
.comic-card-copy { display:grid; gap:6px; min-width:0; overflow-wrap:anywhere; }
.comic-card-copy strong { font-size:17px; }
.comic-card-copy span { color:#526fea; font-size:13px; }
@media(max-width:600px) {
  .comic-card { gap:12px; padding:12px; }
  .comic-card-thumbnail { flex-basis:88px; width:88px; height:80px; }
}
`;
