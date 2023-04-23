import { IndexList } from "./index-list";
function clamp(x: number, min = 0, max = 1) {
  return Math.min(Math.max(x, min), max);
}
export class COMParameter extends HTMLElement {
  name: string;
  value: number;
  type: "float" | "int" | "none"
  constructor() {
    super();

    this.onpointerup = (e) => {
      this.querySelector("input").select();
    };

    this.oninput = (e) => {
      // let value = 0
      // switch (this.type) {
      //   case 'float':
      //     value = clamp(+e.target.value).toFixed(2)
      //     break
      //   case 'int':
      //     value = parseInt(e.target.value)
      //     break
      // }
      // e.target.value = value

    };
    this.onchange = (e) => {
      let value = 0
      switch (this.type) {
        case 'float':
          value = clamp(+e.target.value).toFixed(2);
          break
        case 'int':
          value = parseInt(e.target.value)
          break
      }
      e.target.value = value
    };

    this.onkeydown = (e) => {
      let value = +e.target?.value;
      const meta = e.metaKey;
      const step = this.type == 'int' ? meta ? 10 : 1 : meta ? 0.1 : 0.01;
      if (e.key == "ArrowUp") {
        const a = this.type == 'int' ? value + step : clamp(value + step)
        value = a
      }
      if (e.key == "ArrowDown") {
        const a = this.type == 'int' ? value - step : clamp(value - step)
        value = a
      }
      e.target.value = value
    };
  }
}

export class COMParameterList extends IndexList {
  constructor() {
    super();
  }

  appendParameter(
    { name, value }: { name: string; value: number },
    type: "float" | "int" | "none"
  ) {
    const newParameter = document.createElement("com-parameter");
    newParameter.name = name;

    const _value = type == 'float' value.toFixed(2) : value
    newParameter.type = type

    newParameter.innerHTML = `
    <!-- <label> -->
      <span>${name}</span>=
      <input type="text" value=${value} max="1" />
    <!-- </label> -->
    `;

    this.appendChild(newParameter);
  }
}
