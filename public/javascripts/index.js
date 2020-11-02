const cards = document.querySelectorAll('.product-card');
cards.forEach((card) => card.addEventListener('click', openProductDetails));

async function openProductDetails(e) {
  const response = await fetch(`/products/${this.id}`);
  const data = await response.json();
  console.log(data);
}
