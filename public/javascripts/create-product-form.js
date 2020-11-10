let createProductForm = document.getElementById('createProductForm');

createProductForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  let formData = new FormData(createProductForm);

  await fetch('/products', {
    method: 'POST',
    body: formData,
  });
});
