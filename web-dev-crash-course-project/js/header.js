class AppHeader {
  container;

  constructor(container) {
    this.container = container;
    this.render();
  }

  render() {
    this.container.innerHTML = `
    <div class="header">
        <div class="clover-logo"> 
          <img alt="clover" src="img\\clover-logo.svg" />
        </div>
        <div class="cart-logo">
          <img alt="cart" src="img\\cart-icon.svg" />
        </div>
    </div>
      `;
  }
}
