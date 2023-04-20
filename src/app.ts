import { COMChain } from "./custom-element/chain";
import { IndexList } from "./custom-element/index-list";
import { COMModule } from "./custom-element/module";
import { COMProject } from "./custom-element/project";

customElements.define("com-project", COMProject);
customElements.define("com-chain", COMChain);
customElements.define("com-module", COMModule);
customElements.define("index-list", IndexList);

const project = document.createElement("com-project");
