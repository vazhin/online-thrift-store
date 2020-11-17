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

async function changeImage(e) {
  const productId = e.id;
  const formData = new FormData();
  formData.append('image', e.files[0]);

  try {
    const response = await fetch(`/products/${productId}/image`, {
      method: 'PUT',
      body: formData,
    });
    window.location.assign(`/products/${productId}`);
  } catch (err) {
    console.log(err);
  }
}
