import { COMChain, COMModuleList } from "./custom-element/chain";
import { COMModule } from "./custom-element/module";
import { COMChainList, COMProject } from "./custom-element/project";

customElements.define("com-project", COMProject);
customElements.define("com-chain-list", COMChainList);
customElements.define("com-chain", COMChain);
customElements.define("com-module-list", COMModuleList);
customElements.define("com-module", COMModule);

const project = document.createElement("com-project");
const chainList = document.createElement("com-chain-list");

document.body.appendChild(project);
project.appendChild(chainList);

const init_arr = [
  {
    modules: [
      {
        type: "PTH",
      },
      {
        type: "BCH",
      },
      {
        type: "PRO",
      },
      {
        type: "LFO",
      },
    ],
  },
  {
    modules: [
      {
        type: "LFO",
      },
      {
        type: "PTH",
      },
    ],
  },
];

chainList.append(
  ...init_arr.map((chain) => {
    const chainEl = document.createElement("com-chain");
    const moduleList = document.createElement("com-module-list");
    chainEl.appendChild(moduleList);

    moduleList.append(
      ...chain.modules.map((module, i) => {
        const moduleEl = document.createElement("com-module");

        moduleEl.index = i;
        moduleEl.type = module.type;
        moduleEl.render();

        return moduleEl;
      })
    );

    return chainEl;
  })
);
