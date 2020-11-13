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
