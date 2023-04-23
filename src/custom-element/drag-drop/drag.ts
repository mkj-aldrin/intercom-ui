import { ani, move } from "../../animations/flip";
import { COM } from "../../types/g";
import { COMChain } from "../chain";
import { COMModule } from "../module";

export class Draggable extends HTMLElement {
  dragPossition: { x: number; y: number };
  constructor() {
    super();

    this.dragPossition = { x: 0, y: 0 };

    this.onpointerdown = (e) => {
      this.dispatchEvent(
        new CustomEvent("drag:down", {
          bubbles: true,
          detail: {
            clientX: e.clientX,
            clientY: e.clientY,
          },
        }) as COM.DragEvent
      );
    };

    this.onpointerup = (e) => {
      this.dispatchEvent(
        new CustomEvent("drag:up", {
          bubbles: true,
          detail: {
            clientX: e.clientX,
            clientY: e.clientY,
          },
        }) as COM.DragEvent
      );
    };

    this.onpointerenter = (e) => {
      this.dispatchEvent(
        new CustomEvent("drag:enter", {
          bubbles: true,
          detail: {
            clientX: e.clientX,
            clientY: e.clientY,
          },
        }) as COM.DragEvent
      );
    };
  }
}

export class DragSection extends HTMLElement {
  constructor(propName: string) {
    super();

    this.addEventListener("drag:down", (e) => {
      e.detail[propName] = this;
    });
    this.addEventListener("drag:up", (e) => {
      e.detail[propName] = this;
    });
    this.addEventListener("drag:enter", (e) => {
      e.detail[propName] = this;
    });
  }
}

export class DragRoot extends HTMLElement {
  dragEl: COMModule;
  dragChain: COMChain;
  constructor() {
    super();

    this.addEventListener("drag:down", (e) => {
      const {
        target: module,
        detail: { chain },
      } = e;

      this.dragEl = module;
      this.dragChain = chain;

      this.classList.add("grabbing");
      this.dragEl.classList.add("grabbed");
      const box = module.getBoundingClientRect();
      module.dragPossition = {
        x: box.left + box.width / 2,
        y: box.top + box.height / 2,
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
      if (this.dragEl == e.target) return;

      const {
        target: enterEl,
        detail: { chain },
      } = e;
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
      this.dragEl.dragPossition = {
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
}
