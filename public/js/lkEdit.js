// console.log('editor!!!');
const editForm = document.querySelector('.myForm');

editForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.editName.value;
  const email = e.target.editEmail.value;
  const password = e.target.editPassword.value;
  // const img = e.target.editImg.value;
  const bodyObj = {
    name, email, password,
  };
  console.log('editor!!!', e.target.id);

  if (name && email && password) {
    const response = await fetch(`/lkEdit/${e.target.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyObj),
    });

    const info = await response.json();
    console.log(info.ok, 'проверка инфо ок');
    //   // const info = await response.json();
    if (info.ok) {
      return window.location.assign('/auth/signin');
      // console.log('response.status :', response.status);
      // const data = await response.json();
    }
  }
});
