import { ModuleTypes } from "./chain";
import { Draggable } from "./drag-drop/drag";

export class COMModule extends Draggable {
  index: number;
  type: ModuleTypes;
  constructor() {
    super();
    this.index = 0;
    this.type = "PTH";
  }
}
