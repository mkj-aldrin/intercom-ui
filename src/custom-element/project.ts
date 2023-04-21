import { ani, easingMap } from "../animations/flip";
import { COMChain } from "./chain";
import { IndexList } from "./index-list";
import { COMModule } from "./module";

function move([clientX, clientY], module, reset = false) {
  const opt: KeyframeAnimationOptions = {
    easing: "ease",
    duration: 500,
    fill: "both",
  };

  const v = {
    x: Math.max(Math.min((clientX - module.startX) * 0.0625, 5), -5),
    y: Math.max(Math.min((clientY - module.startY) * 0.0625, 5), -5),
  };

  module.animate(
    [
      {
        transform: reset
          ? "translate(0px,0px)"
          : `translate(${v.x}px,${v.y}px)`,
      },
    ],
    opt
  );
}

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

      const { clientX, clientY } = e.detail;
      const box = module.getBoundingClientRect();
      module.startX = box.left + box.width / 2;
      module.startY = box.top + box.height / 2;
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

      const { clientX: startX, clientY: startY } = e.detail;
      const box = enterEl.getBoundingClientRect();
      this.dragEl.startX = box.left + box.width / 2;
      this.dragEl.startY = box.top + box.height / 2;
      // this.dragEl.startX = startX;
      // this.dragEl.startY = startY;

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
