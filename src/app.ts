import { COMChain, COMModuleList } from "./custom-element/chain";
import { COMModule } from "./custom-element/module";
import { COMParameter, COMParameterList } from "./custom-element/parameter";
import { COMChainList, COMProject } from "./custom-element/project";

customElements.define("com-project", COMProject);
customElements.define("com-chain-list", COMChainList);
customElements.define("com-chain", COMChain);
customElements.define("com-module-list", COMModuleList);
customElements.define("com-module", COMModule);
customElements.define("com-parameter-list", COMParameterList);
customElements.define("com-parameter", COMParameter);

const project = document.createElement("com-project");
const chainList = document.createElement("com-chain-list");

document.getElementById("app").appendChild(project);
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

// chainList.append(
//   ...init_arr.map((chain) => {
//     const chainEl = document.createElement("com-chain");
//     const moduleList = document.createElement("com-module-list");
//     chainEl.appendChild(moduleList);
//
//     moduleList.append(
//       ...chain.modules.map((module, i) => {
//         const moduleEl = document.createElement("com-module");
//
//         moduleEl.index = i;
//         moduleEl.type = module.type;
//
//         return moduleEl;
//       })
//     );
//
//     return chainEl;
//   })
// );
init_arr.forEach((chain) => {
  const chainEl = chainList.addChain();
  const moduleList = chainEl.appendChild(
    document.createElement("com-module-list")
  );

  chain.modules.forEach((module) => {
    moduleList.appendModule({ type: module.type });
  });
});
