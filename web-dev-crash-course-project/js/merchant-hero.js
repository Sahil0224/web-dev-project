class MerchantHero {
  container;
 
  constructor(container) {
      this.container = container;
      this.render();
      this.populateMerchantData();
  }
 
  async populateMerchantData() {
      try {
          this.container.innerHTML += '<div>Loading Merchant Data...</div>';
 
          const data = await fetch('https://dev1.dev.clover.com/oloservice/v1/merchants/R9AHC6Q4K7PX1', {
              method: 'GET',
              mode: 'cors'
          }).then(res => res.json());
 
          const merchantImage = data.logo;
          const merchantName = data.name;
 
          const address1 = data.address.address1;
          const address2 = data.address.address2;
          const city = data.address.city;
          const state = data.address.state;
 
          const merchantNumber = data.phone;
          const operatingHours = this.getDineInHours(data);
          const fullAddress = `${address1} ${address2}, ${city}, ${state}`;
 
          this.container.innerHTML = `
              <div class="merchant-wrapper">
                  <div class="merchant-info">
                      <div class="merchant-image">
                          <img src="${merchantImage}" alt="${merchantName} Image">
                      </div>
                      <div class="merchant-details">
                          <div class="merchant-name">${merchantName}</div>
                          <div class="merchant-address">${fullAddress}</div>
                          <div class="merchant-phone">${merchantNumber}</div>
                      </div>
                      <div class="operating-hours"><strong> Open</strong> ${operatingHours}</div>
                  </div>
              </div>
          `;
      } catch (e) {
          console.log('Something went wrong :(', e);
      }
  }
 
  render() {
      this.container.innerHTML = `<div class="merchant-info">!! --Merchant Hero Component-- !!</div>`;
  }
 
  getCurrentDay() {
      const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const currentDate = new Date();
      const currentDayIndex = currentDate.getDay(); 
      return days[currentDayIndex];
  }
  
  convertToRegularTime(militaryTime) {
    if (militaryTime.length === 3) {
      militaryTime = '0' + militaryTime;
  }
 
  const hours = parseInt(militaryTime.substring(0, 2));
  const minutes = parseInt(militaryTime.substring(2));
 
  let period = 'AM';
  let regularHours = hours;
 
  if (hours >= 12) {
      period = 'PM';
      regularHours = (hours === 12) ? 12 : hours - 12;
  }
 
  if (regularHours === 0) {
      regularHours = 12;
  }
 
  const regularMinutes = (minutes < 10) ? `0${minutes}` : minutes;
 
  return `${regularHours}:${regularMinutes} ${period}`;
}
 
  getDineInHours(data) {
      const currentDay = this.getCurrentDay().toLowerCase();
      const dineInService = data.services.find(service => service.type === "DINE_IN");
 
      if (dineInService && dineInService.hours && dineInService.hours[currentDay]) {
          const dineInHours = dineInService.hours[currentDay];
          return dineInHours.map(slot => `${this.convertToRegularTime(slot.start)} - ${this.convertToRegularTime(slot.end)}`);
      } else {
          return ['Closed'];
      }
  }
}