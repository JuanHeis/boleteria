class MapLocation extends HTMLElement {

    constructor() {
        super();
        console.log("MapLocation constructor");
        // Add event emitters here
        this.addEventListener("click", this.handleClick);
        this.addEventListener("keydown", this.handleKeyDown);
    }

    handleClick(event) {
        // Emit click event here
        this.dispatchEvent(
            new CustomEvent("mapLocationClick", { detail: event })
        );
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
    }

    connectedCallback() {

        // fetch(this.getAttribute("template"))
        fetch("assets/cine_victoria/platea.html")
            .then(response => response.text())
            .then(html => {
                // Write the contents to the element
                const template = document.createElement("template");
                template.innerHTML = `<script>var no_login = ${this.getAttribute("no_login")};</script>`
                template.innerHTML += html;
                const shadowRoot = this.attachShadow({ mode: "open" });
                shadowRoot.appendChild(template.content.cloneNode(true));
            });

    }

}

window.customElements.define("map-location", MapLocation);