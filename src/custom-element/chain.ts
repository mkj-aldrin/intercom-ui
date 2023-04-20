import { IndexList } from "./index-list";

export class COMChain extends HTMLElement {
  index: number;
  constructor() {
    super();
    this.index = 0;

    this.addEventListener("drag:down", (e) => {
      e.detail.chain = this;
    });
    this.addEventListener("drag:up", (e) => {
      e.detail.chain = this;
    });
    this.addEventListener("drag:enter", (e) => {
      e.detail.chain = this;
    });
  }

  render() {}
}

export class COMModuleList extends IndexList {
  constructor() {
    super();
  }
}
