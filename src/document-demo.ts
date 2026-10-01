import { renderCodeBlocksAsync } from "./embed";
import "./style.css";
import { navigation } from "./navigation";
document.querySelector("header")!.outerHTML = navigation;

const update = () => renderCodeBlocksAsync();
await document.fonts.ready;
await update();
document.querySelector("#rerender")!.addEventListener("click", update);
document.fonts.addEventListener("loadingdone", async (event) => {
  if (event.fontfaces.length) await update();
});
