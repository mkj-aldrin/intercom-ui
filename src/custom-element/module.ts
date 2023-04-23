import { Draggable } from "./drag-drop/drag";

export class COMModule extends Draggable {
  type: string;
  index: number;
  constructor() {
    super();
    this.index = 0;
    this.type = "";
  }

  render() {
    this.innerHTML = `
    <span>${this.type}</span>
    `;
  }
}
