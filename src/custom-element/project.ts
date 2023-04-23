import { COMChain } from "./chain";
import { DragRoot } from "./drag-drop/drag";
import { IndexList } from "./index-list";
import { COMModule } from "./module";

export class COMProject extends DragRoot {
  dragEl: COMModule;
  dragChain: COMChain;
  constructor() {
    super();
  }
}

export class COMChainList extends IndexList {
  constructor() {
    super();
  }
}
