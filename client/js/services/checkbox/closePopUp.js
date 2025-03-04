var closePopUp = async (id) =>
  document
    .getElementById('close-dialog')
    .addEventListener('click', async (e) => {
      e.preventDefault();
      document.getElementById('fieldset-' + id).remove();

      var btn = document.getElementById('button-' + id);
      btn.disabled = false;
      window.dialog.close();
    });

export default closePopUp;
