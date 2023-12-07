class Menu {
  container;

  constructor(container) {
    this.container = container;
    this.render();
  }

  /**
   * Create an item component and append it as a child to the container
   */
  #renderItem(container, item) {
    // TODO: Render the item name, description, price, and add to cart button
  }

  /**
   * Create a category component and append it as a child to the container
   */
  #renderCategory(container, category) {
    // TODO: Render the category name
  }

  render() {
    this.container.innerHTML = `<div>!! --Menu Component-- !!</div>`;

    // TODO: Render each category
      // TODO: Render each item in the category
  }
}