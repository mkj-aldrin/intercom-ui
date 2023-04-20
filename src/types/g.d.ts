import { COMChain, COMModuleList } from "../custom-element/chain";
import { COMModule } from "../custom-element/module";
import { COMChainList, COMProject } from "../custom-element/project";

declare global {
  interface HTMLElementEventMap {
    "drag:down": CustomEvent<{
      chain: COMChain;
      module: COMModule;
    }>;
    "drag:up": CustomEvent<{
      chain: COMChain;
      module: COMModule;
    }>;
    "drag:enter": CustomEvent<{
      chain: COMChain;
      module: COMModule;
    }>;
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
