class MerchantHero {
  container;

  constructor(container) {
    this.container = container;
    this.render();
    this.populateMerchantHero();
  }

  async populateMerchantHero() {
     const data = await fetch('https://dev1.dev.clover.com/oloservice/v1/merchants/R9AHC6Q4K7PX1', {
      method: 'GET',
      mode: 'cors'
     }).then(res => res.json());

     const merchantLogo = data.logo;
     const merchantName = data.name;
     const merchantAddress = data.address.address1;
     const merchantAddress2 = data.address.address2;
     const merchantCity = data.address.city;
     const merchantState = data.address.state;
     const merchantPhone = data.phone;
     const address = `${merchantAddress}, ${merchantAddress2}, ${merchantCity} ${merchantState}`
     this.container.innerHTML = `
    <div class="merchant-wrapper">
        <div class="merchant-info">
            <div class="merchant-image">
                <img src="${merchantLogo}" alt="${merchantName} Image">
            </div>
            <div class="merchant-details">
                <div class="merchant-name">${merchantName}</div>
                <div class="merchant-address">${address}</div>
                <div class="merchant-phone">${merchantPhone}</div>
            </div>
        </div>
    </div>`;
  }

  render() {
    this.container.innerHTML = `<div>!! --Merchant Hero Component-- !!</div>`;
  }
}