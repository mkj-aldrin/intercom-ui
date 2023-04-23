import { DragSection } from "./drag-drop/drag";
import { IndexList } from "./index-list";
import { COMModule } from "./module";

const ModuleTemplateMap = {
  PTH: {
    signature: {
      parameters: [],
    },
  },
  LFO: {
    signature: {
      parameters: [
        { name: "rate", value: 0.10 },
        { name: "amp", value: 0.5 },
      ],
    },
  },
  BCH: {
    signature: {
      parameters: [],
    },
  },
  PRO: {
    signature: {
      parameters: [],
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

    ModuleTemplateMap[type].signature.parameters.forEach((parameter) => {
      parameterList.appendParameter(parameter);
    });
    if (referenceModule) {
      return referenceModule.insertAdjacentElement("beforebegin", newModule);
    }
    return this.appendChild(newModule);
  }
}
