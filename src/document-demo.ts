import { renderCodeBlocks } from "./embed";
import "./style.css";

const update = () => renderCodeBlocks();
await document.fonts.ready;
update();
document.querySelector("#rerender")!.addEventListener("click", update);
document.fonts.addEventListener("loadingdone", (event) => {
  if (event.fontfaces.length) update();
});
