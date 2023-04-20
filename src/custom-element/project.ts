import { ani } from "../animations/flip";
import { COMChain } from "./chain";
import { IndexList } from "./index-list";
import { COMModule } from "./module";

export class COMProject extends HTMLElement {
  dragEl: COMModule;
  dragChain: COMChain;
  constructor() {
    super();

    this.addEventListener("drag:down", (e) => {
      this.dragEl = e.detail.module;
      this.dragChain = e.detail.chain;

      this.classList.add("grabbing");
      this.dragEl.classList.add("grabbed");
    });

    this.addEventListener("drag:up", (e) => {});

    this.addEventListener("drag:enter", (e) => {
      if (!this.dragEl) return;
      if (this.dragEl == e.detail.module) return;

      const { chain, module: enterEl } = e.detail;
      const sameChain = chain == this.dragChain;

      const inserPossition: InsertPosition =
        enterEl.index < this.dragEl.index || !sameChain
          ? "beforebegin"
          : "afterend";

      const dragBoxElements: { el: COMModule; box: DOMRect }[] = [];
      this.querySelectorAll("com-module").forEach((m) => {
        const box = m.getBoundingClientRect();
        dragBoxElements.push({ el: m, box });
      });

      const enterBoxElements: { el: COMModule; box: DOMRect }[] = [];
      if (!sameChain) {
        chain.querySelectorAll("com-module").forEach((m) => {
          const box = m.getBoundingClientRect();
          enterBoxElements.push({ el: m, box });
        });
      }

      enterEl.insertAdjacentElement(inserPossition, this.dragEl);

      dragBoxElements.forEach(ani);
      enterBoxElements.forEach(ani);

      this.dragChain = chain;
    });

    this.onpointerup = (e) => {
      this.classList.remove("grabbing");
      this.dragEl?.classList.remove("grabbed");

      this.dragEl = null;
    };
  }

  connectedCallback() {}
}

export class COMChainList extends IndexList {
  constructor() {
    super();
  }
}
