async function deleteProduct(productId) {
  try {
    await fetch(`/products/${productId}`, {
      method: 'DELETE',
    });
    location.href = '/';
  } catch (err) {
    console.log(err);
  }
}

async function editProduct(productId) {
  const form = document.getElementById('editProductForm');
  let formData = new FormData(form);
  try {
    const response = await fetch(`/products/${productId}`, {
      method: 'PUT',
      body: formData,
    });
    window.location.assign(`/products/${productId}`);
  } catch (err) {
    console.log(err);
  }
}
