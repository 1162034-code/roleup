function formAgree() {
	const agree = document.getElementById('agree');
	if (agree) {
		const formToConfirmBtn = document.getElementById('form-to-confirm-btn');
		const formToConfirmBtnParent = formToConfirmBtn.parentElement.closest('.p-form__btn');
		if (!agree.checked) {
			formToConfirmBtn.disabled = true;
			formToConfirmBtnParent.classList.add('is-disabled');
		}

		agree.addEventListener('change', function () {
			if (agree.checked) {
				formToConfirmBtn.disabled = false;
				formToConfirmBtnParent.classList.remove('is-disabled');
			} else {
				formToConfirmBtn.disabled = true;
				formToConfirmBtnParent.classList.add('is-disabled');
			}
		});
	}
}

formAgree();
