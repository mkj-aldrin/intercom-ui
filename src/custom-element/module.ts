export class COMModule extends HTMLElement {
  type: string;
  index: number;
  constructor() {
    super();
    this.index = 0;
    this.type = "";

    this.onpointerdown = (e) => {
      this.dispatchEvent(
        new CustomEvent("drag:down", {
          bubbles: true,
          detail: { module: this },
        })
      );
    };

    this.onpointerup = (e) => {
      this.dispatchEvent(
        new CustomEvent("drag:up", {
          bubbles: true,
          detail: { module: this },
        })
      );
    };

    this.onpointerenter = (e) => {
      this.dispatchEvent(
        new CustomEvent("drag:enter", {
          bubbles: true,
          detail: { module: this },
        })
      );
    };
  }

  render() {
    this.innerHTML = `
    <span>${this.type}</span>
    `;
  }
}
