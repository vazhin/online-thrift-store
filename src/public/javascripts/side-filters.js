const conditionForm = document.getElementById('conditionForm');

conditionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  const searchParams = new URLSearchParams(location.search);
  searchParams.delete('condition');
  searchParams.delete('page');

  for (let pair of formData.entries()) {
    searchParams.append(pair[0], pair[1]);
  }
  location.replace(`/?${searchParams.toString()}`);
});

conditionForm.addEventListener('reset', () => {
  location.href = '/';
});

function filterByCategory(value) {
  value = value.split('-').join(' '); // because I need "mobile-device" to be "mobile device". I'm passing the value as an (id).
  const searchParams = new URLSearchParams(location.search);
  searchParams.delete('page');
  searchParams.set('category', value);
  location.replace(`/?${searchParams.toString()}`);
}

const appliedFiltersContainer = document.getElementById(
  'applied-filters-container'
);
const searchParams = new URLSearchParams(location.search);

for (let pair of searchParams.entries()) {
  if (!['q', 'location', 'page'].includes(pair[0])) {
    appliedFiltersContainer.insertAdjacentHTML(
      'beforeend',
      `<span class="badge badge-secondary m-1">${pair[1]}</span>`
    );
  }
  if (pair[0] === 'q') {
    document.getElementById('searchInput').value = pair[1];
  }
}
