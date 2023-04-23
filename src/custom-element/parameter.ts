import { IndexList } from "./index-list";
function clamp(x: number, min = 0, max = 1) {
  return Math.min(Math.max(x, min), max);
}
export class COMParameter extends HTMLElement {
  name: string;
  value: number;
  constructor() {
    super();

    this.onpointerup = (e) => {
      this.querySelector("input").select();
    };

    this.oninput = (e) => {
      const value = +e.target.value;
      const max = +e.target.max;
      if (value > max) {
        e.target.value = max.toFixed(2);
      }
    };
    this.onchange = (e) => {
      const value = +e.target.value;
      e.target.value = value.toFixed(2);
    };

    this.onkeydown = (e) => {
      const value = +e.target?.value;
      const meta = e.metaKey;
      const step = meta ? 0.1 : 0.01;
      if (e.key == "ArrowUp") {
        const v = clamp(value + step);
        e.target.value = v.toFixed(2);
      }
      if (e.key == "ArrowDown") {
        const v = clamp(value - step);
        e.target.value = v.toFixed(2);
      }
    };
  }
}

export class COMParameterList extends IndexList {
  constructor() {
    super();
  }

  appendParameter({ name, value }: { name: string; value: number }) {
    const newParameter = document.createElement("com-parameter");
    newParameter.name = name;
    newParameter.value = value;

    newParameter.innerHTML = `
    <!-- <label> -->
      <span>${name}</span>
      <input type="text" value=${value.toFixed(2)} max="1" />
    <!-- </label> -->
    `;

    this.appendChild(newParameter);
  }
}
