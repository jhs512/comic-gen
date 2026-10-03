import { navigation } from "./navigation";
import { findExample } from "./examples";
import "./style.css";
document.querySelector("#navigation")!.innerHTML = navigation;
const input = document.querySelector<HTMLTextAreaElement>("#viewer-source")!;
input.value = findExample("prop-receive").source;
const host = document.querySelector("#live-viewer")!;
const apply = () => {
  host.querySelector(".comic-figure")?.remove();
  const pre = document.createElement("pre"); pre.setAttribute("language","comic-gen");pre.setAttribute("viewer","");pre.textContent = input.value;host.replaceChildren(pre);
};
apply();
document.querySelector("#apply-viewer")!.addEventListener("click", apply);
const script = document.createElement("script");
// Dev and production both load the same distributable classic script.
script.src = import.meta.env.DEV ? "./cdn/comic-gen.auto.js" : "./sdk/comic-gen.auto.js";
document.head.append(script);
