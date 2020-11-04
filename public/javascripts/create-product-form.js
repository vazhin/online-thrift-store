let createProductForm = document.getElementById('createProductForm');

createProductForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const todayDate = new Date().toJSON().slice(0, 10);

  let formData = new FormData(createProductForm);
  formData.append('date_added', todayDate);
  formData.append('user_id', 1); // TODO: fix this.

  const response = await fetch('/products', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  console.log(data);
});
