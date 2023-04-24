// import { COMChain, COMModuleList } from "./custom-element/chain";
// import { COMModule } from "./custom-element/module";
// import { COMParameter, COMParameterList } from "./custom-element/parameter";
// import { COMChainList, COMProject } from "./custom-element/project";
//
// customElements.define("com-project", COMProject);
// customElements.define("com-chain-list", COMChainList);
// customElements.define("com-chain", COMChain);
// customElements.define("com-module-list", COMModuleList);
// customElements.define("com-module", COMModule);
// customElements.define("com-parameter-list", COMParameterList);
// customElements.define("com-parameter", COMParameter);
//
// const project = document.createElement("com-project");
// const chainList = document.createElement("com-chain-list");
//
// document.getElementById("app").appendChild(project);
// project.appendChild(chainList);
//
// const init_arr = [
//   {
//     modules: [
//       {
//         type: "PTH",
//       },
//       {
//         type: "BCH",
//       },
//       {
//         type: "PRO",
//       },
//       {
//         type: "LFO",
//       },
//     ],
//   },
//   {
//     modules: [
//       {
//         type: "LFO",
//       },
//       {
//         type: "PTH",
//       },
//     ],
//   },
// ];
//
// // chainList.append(
// //   ...init_arr.map((chain) => {
// //     const chainEl = document.createElement("com-chain");
// //     const moduleList = document.createElement("com-module-list");
// //     chainEl.appendChild(moduleList);
// //
// //     moduleList.append(
// //       ...chain.modules.map((module, i) => {
// //         const moduleEl = document.createElement("com-module");
// //
// //         moduleEl.index = i;
// //         moduleEl.type = module.type;
// //
// //         return moduleEl;
// //       })
// //     );
// //
// //     return chainEl;
// //   })
// // );
// init_arr.forEach((chain) => {
//   const chainEl = chainList.addChain();
//   const moduleList = chainEl.appendChild(
//     document.createElement("com-module-list")
//   );
//
//   chain.modules.forEach((module) => {
//     moduleList.appendModule({ type: module.type });
//   });
// });

document.addEventListener("x-drag:down", (e) => {
  console.log(e);
});

function attach_drag_emitter<T extends HTMLElement>(target: T) {
  target.addEventListener("pointerdown", (e) => {
    target.dispatchEvent(
      new CustomEvent("x-drag:down", {
        bubbles: true,
        detail: {},
      })
    );
  });
  target.addEventListener("pointerup", (e) => {
    target.dispatchEvent(
      new CustomEvent("x-drag:up", {
        bubbles: true,
        detail: {},
      })
    );
  });
  target.addEventListener("pointerenter", (e) => {
    target.dispatchEvent(
      new CustomEvent("x-drag:enter", {
        bubbles: true,
        detail: {},
      })
    );
  });
}

const ModuleTypeMap = {
  PTH: {
    signature: {
      parameters: [],
    },
  },
  LFO: {
    signature: {
      parameters: [
        { name: "amp", value: 0.5 },
        { name: "rate", value: 0.1 },
      ],
    },
  },
};

type ModuleTypes = keyof typeof ModuleTypeMap;

interface ModuleProps {
  type: ModuleTypes;
}

interface ModuleElement extends HTMLElement, ModuleProps {}

function build_parameter({ name, value }: { name: string; value: number }) {
  return `
  <span>${name}</span>
  <input type="text" value="${value}" />
  `;
}

function build_m({ type }: ModuleProps): ModuleElement {
  const el = document.createElement("x-m") as ModuleElement;
  el.type = type;

  el.innerHTML = `
  <span>${type}</span>
  ${
    type != "PTH"
      ? ModuleTypeMap[type].signature.parameters.map(build_parameter).join("")
      : ""
  }
  `;

  attach_drag_emitter(el);

  return el;
}

const m0 = build_m({ type: "PTH" });
const m1 = build_m({ type: "LFO" });
document.getElementById("app").appendChild(m0);
document.getElementById("app").appendChild(m1);

type ArrayElementType<T> = T extends (infer E)[] ? E : T;
