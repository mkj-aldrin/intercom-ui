export class IndexList extends HTMLElement {
  constructor() {
    super();

    new MutationObserver((mutations) => {
      const children = this.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        child.index = i;
        // child.render()
      }
    }).observe(this, {
      childList: true,
    });
  }
}
