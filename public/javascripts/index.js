async function openProductDetails(e) {
  const response = await fetch(`/products/${e.id}`);
  const data = await response.json();
  console.log(data);
}
