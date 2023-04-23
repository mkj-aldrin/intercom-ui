import { DragSection } from "./drag-drop/drag";
import { IndexList } from "./index-list";
import { COMModule } from "./module";

const ModuleTemplateMap = {
  PTH: {
    signature: {
      type: "none",
      parameters: [],
    },
  },
  LFO: {
    signature: {
      type: "float",
      parameters: [
        { name: "rate", value: 0.1 },
        { name: "amp", value: 0.5 },
      ],
    },
  },
  BCH: {
    signature: {
      type: "int",
      parameters: [
        { name: "chain", value: 0 },
        { name: "module", value: 0 },
      ],
    },
  },
  PRO: {
    signature: {
      type: "float",
      parameters: [{ name: "chance", value: 0.5 }],
    },
  },
};

export type ModuleTypes = keyof typeof ModuleTemplateMap;

export class COMChain extends DragSection {
  index: number;
  constructor() {
    super("chain");
    this.index = 0;
  }
}

export class COMModuleList extends IndexList {
  constructor() {
    super();
  }

  appendModule({ type }: { type: ModuleTypes }, referenceModule?: COMModule) {
    const newModule = document.createElement("com-module");
    newModule.type = type;
    newModule.innerHTML = `<span>${type}</span>`;

    const parameterList = newModule.appendChild(
      document.createElement("com-parameter-list")
    );

    const signature = ModuleTemplateMap[type].signature;

    signature.parameters.forEach((parameter) => {
      parameterList.appendParameter(parameter, signature.type);
    });
    if (referenceModule) {
      return referenceModule.insertAdjacentElement("beforebegin", newModule);
    }
    return this.appendChild(newModule);
  }
}
