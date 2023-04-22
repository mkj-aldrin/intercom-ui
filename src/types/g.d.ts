import { COMChain, COMModuleList } from "../custom-element/chain";
import { COMModule } from "../custom-element/module";
import { COMChainList, COMProject } from "../custom-element/project";

export declare namespace COM {
  type DragEvent = CustomEvent<{
    chain?: COMChain;
    module: COMModule;
    clientX: number;
    clientY: number;
  }> & {
    type: "drag:down" | "drag:up" | "drag:enter";
  };
}

declare global {
  interface HTMLElementEventMap {
    "drag:down": COM.DragEvent;
    "drag:up": COM.DragEvent;
    "drag:enter": COM.DragEvent;
  }
  interface HTMLElementTagNameMap {
    "com-project": COMProject;
    "com-chain-list": COMChainList;
    "com-chain": COMChain;
    "com-module-list": COMModuleList;
    "com-module": COMModule;
  }
}
export {};
