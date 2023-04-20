import { COMChain } from "../custom-element/chain";
import { IndexList } from "../custom-element/index-list";
import { COMModule } from "../custom-element/module";
import { COMProject } from "../custom-element/project";

declare global {
  interface HTMLElementEventMap {
    "drag:down": CustomEvent<{}>;
    "drag:up": CustomEvent<{}>;
    "drag:enter": CustomEvent<{}>;
  }
  interface HTMLElementTagNameMap {
    "com-project": COMProject;
    "com-chain": COMChain;
    "com-module": COMModule;
    "index-list": IndexList;
  }
}
export {};
