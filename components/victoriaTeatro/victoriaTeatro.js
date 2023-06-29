import { victoriaTeatroTemplate } from "./victoriaTeatro.template.js";

const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="./components/victoriaTeatro/css/main.css">
${victoriaTeatroTemplate()}`;

class MapaTemplate extends HTMLElement {
  constructor() {
    super();
    console.log("victoriaTeatro constructor");
    // Add event emitters here
    this.addEventListener("click", this.handleClick);
    this.addEventListener("keydown", this.handleKeyDown);
  }
  handleClick(event) {
    // Emit click event here
    this.dispatchEvent(
      new CustomEvent("victoriaTeatroClick", { detail: event })
    );
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
  }
  connectedCallback() {
    // Attach the template to the shadow DOM
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("victoria-teatro", MapaTemplate);
