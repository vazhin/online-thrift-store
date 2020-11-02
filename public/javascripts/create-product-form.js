let createProductForm = document.getElementById('createProductForm');

createProductForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const todayDate = new Date().toJSON().slice(0, 10);

  const response = await fetch('/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: e.target.elements.name.value,
      price: e.target.elements.price.value,
      owner_phoneNumber: e.target.elements.phonenumber.value,
      description: e.target.elements.description.value,
      condition: e.target.elements.condition.value,
      date_added: todayDate,
      category: e.target.elements.category.value,
      city: e.target.elements.city.value,
      user_id: 1, // TODO: fix this.
    }),
  });

  const data = await response.json();

  console.log(data);
});
