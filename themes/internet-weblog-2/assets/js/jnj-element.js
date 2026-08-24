// Generated from internet-weblog-2 1.0.0-beta.1 — do not edit here.



export class JnjElement extends HTMLElement {
  connectedCallback() {
    
    if (this._initialized) return;
    this._initialized = true;
    this.render();
  }

  
  render() {}

  
  get root() {
    return this.shadowRoot || this;
  }
}
