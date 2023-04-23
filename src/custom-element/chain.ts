import { DragSection } from "./drag-drop/drag";
import { IndexList } from "./index-list";

export class COMChain extends DragSection {
  index: number;
  constructor() {
    super("chain");
    this.index = 0;
  }

  render() {}
}

export class COMModuleList extends IndexList {
  constructor() {
    super();
  }
}
