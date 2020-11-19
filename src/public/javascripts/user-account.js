async function changeImage(e) {
  const userId = e.id;
  const formData = new FormData();
  formData.append('image', e.files[0]);

  try {
    const response = await fetch(`/users/${userId}/image`, {
      method: 'PUT',
      body: formData,
    });
    window.location.assign(`/users/${userId}`);
  } catch (err) {
    console.log(err);
  }
}
