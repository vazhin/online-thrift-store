let createProductForm = document.getElementById('createProductForm');

createProductForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  let formData = new FormData(createProductForm);

  const response = await fetch('/products', {
    method: 'POST',
    body: formData,
  });

  window.location.assign('/');
});
