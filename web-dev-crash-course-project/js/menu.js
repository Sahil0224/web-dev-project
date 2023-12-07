class Menu {
  container;

  constructor(container) {
    this.container = container;
    this.renderMenu();
    this.render();
  }

  async renderMenu() {
    const data = await fetch('https://dev1.dev.clover.com/oloservice/v1/merchants/R9AHC6Q4K7PX1/menu', {
      method: 'GET',
      mode: 'cors',
    }).then((res) => res.json());

    this.displayMenuItemsByCategory(data);
  }

  displayMenuItemsByCategory(menu) {
    const menuContent = document.getElementById('menu-content');

    menuContent.innerHTML = '';

    for (const categoryId in menu.categories) {
      const category = menu.categories[categoryId];

      const categoryContainer = document.createElement('div');
      categoryContainer.classList.add('category-container');

      const categoryHeader = document.createElement('h2');
      categoryHeader.textContent = category.name;
      categoryContainer.appendChild(categoryHeader);

      const itemsContainer = document.createElement('div');
      itemsContainer.classList.add('items-container');

      let itemsInRow = 0; 
      category.items.forEach((itemId) => {
        const item = menu.items.find((item) => item.id === itemId);
        if (item) {
          const itemDetails = document.createElement('div');
          itemDetails.classList.add('item-details');

          const itemName = document.createElement('p');
          itemName.textContent = item.name;

          const itemPrice = document.createElement('p');
          itemPrice.textContent = `$${(item.price / 100).toFixed(2)}`;

          const itemImage = document.createElement('img');
          itemImage.alt = item.name;
          itemImage.src = item.images[0]?.source;

          itemDetails.appendChild(itemName);
          itemDetails.appendChild(itemPrice);
          itemDetails.appendChild(itemImage);

          itemsContainer.appendChild(itemDetails);

          itemsInRow++;
          if (itemsInRow >= 2) {
            itemsInRow = 0;
          }
        }
      });

      categoryContainer.appendChild(itemsContainer);

      menuContent.appendChild(categoryContainer);
    }
  }

  render() {
    this.container.innerHTML = `
      <main>
        <h1>Menu</h1>
        <section id="menu-content"></section>
      </main>
    `;
  }
}

const menu = new Menu(document.body);
