import { ani, move } from "../animations/flip";
import { COMChain } from "./chain";
import { IndexList } from "./index-list";
import { COMModule } from "./module";

export class COMProject extends HTMLElement {
  dragEl: COMModule;
  dragChain: COMChain;
  constructor() {
    super();

    this.addEventListener("drag:down", (e) => {
      const module = e.detail.module;
      this.dragEl = module;
      this.dragChain = e.detail.chain;

      this.classList.add("grabbing");
      this.dragEl.classList.add("grabbed");

      const box = module.getBoundingClientRect();
      module.data.animation = {
        boxCenter: {
          x: box.left + box.width / 2,
          y: box.top + box.height / 2,
        },
      };

      const { clientX, clientY } = e.detail;
      move([clientX, clientY], module);

      this.onpointermove = (e) => {
        const { clientX, clientY } = e;
        move([clientX, clientY], module);
      };
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

      const box = enterEl.getBoundingClientRect();
      this.dragEl.data.animation.boxCenter = {
        x: box.left + box.width / 2,
        y: box.top + box.height / 2,
      };

      this.dragChain = chain;
    });

    this.onpointerup = (e) => {
      if (!this.dragEl) return;
      move([0, 0], this.dragEl, true);
      this.classList.remove("grabbing");
      this.dragEl?.classList.remove("grabbed");

      this.dragEl = null;
      this.onpointermove = null;
    };
  }

  connectedCallback() {}
}

export class COMChainList extends IndexList {
  constructor() {
    super();
  }
}
