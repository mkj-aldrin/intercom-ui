import { COM } from "../types/g";
import { COMBase } from "./base";

export class COMModule extends COMBase {
  type: string;
  index: number;
  constructor() {
    super();
    this.index = 0;
    this.type = "";

    new CustomEvent("");

    this.onpointerdown = (e) => {
      this.dispatchEvent(
        new CustomEvent("drag:down", {
          bubbles: true,
          detail: {
            module: this,
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
            module: this,
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
            module: this,
            clientX: e.clientX,
            clientY: e.clientY,
          },
        }) as COM.DragEvent
      );
    };
  }

  render() {
    this.innerHTML = `
    <span>${this.type}</span>
    `;
  }
}
