function onPasswordChange() {
    var inputOldPassword = document.getElementById('oldPassword');
    var inputPassword = document.getElementById('password');
    var inputConfirmPassword = document.getElementById('confirmPassword');

    if (!inputPassword.value) {
        toastr.warning('Password cannot be empty', 'Warning');
    }
    else if (inputPassword.value != inputConfirmPassword.value) {
        toastr.warning('Passwords are not equal', 'Warning');
    }
    else {
        fetch('/api/User/password-update', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserId: getUserid(),
                OldPassword: inputOldPassword.value,
                NewPassword: inputPassword.value,
                isAdmin: isAdmin()
            })
        })
            .then((response) => {
                if (response.status < 500) {
                    return response.json();
                }
            })
            .then((data) => {
                if (data == 'success') {
                    toastr.success(
                        'Password changed',
                        'Success',
                        {
                            timeOut: 2000,
                            fadeOut: 1000,
                            onHidden: function () {
                                window.location.href = "index.html";
                            }
                        }
                    )
                }
                else {
                    toastr.warning(data, 'Warnung');
                }
            })
            .catch((error) => {
                toastr.error('Unauthorized or not found', 'Error');
            });
    }
}

function createChangePasswordForm() {
    /* Title. */
    var mainTitle = document.createElement('h1');
    mainTitle.innerText = 'Change password';

    var main = document.getElementById('main');
    main.innerHTML = '';
    main.appendChild(mainTitle);

    /* Old Password. */
    var labelOldPassword = document.createElement('label');
    labelOldPassword.innerText = 'Old password';

    var inputOldPassword = document.createElement('input');
    inputOldPassword.id = 'oldPassword';
    inputOldPassword.type = 'password';

    var divOldPassword = document.createElement('div');
    divOldPassword.appendChild(labelOldPassword);
    divOldPassword.innerHTML += '<br>';
    divOldPassword.appendChild(inputOldPassword);

    /* Password. */
    var labelPassword = document.createElement('label');
    labelPassword.innerText = 'New password';

    var inputPassword = document.createElement('input');
    inputPassword.id = 'password';
    inputPassword.type = 'password';

    var divPassword = document.createElement('div');
    divPassword.innerHTML += '<br>';
    divPassword.appendChild(labelPassword);
    divPassword.innerHTML += '<br>';
    divPassword.appendChild(inputPassword);

    /* Help */
    var helpElement = document.createElement('span');
    var helpIcon = document.createElement('i');
    var helpText = document.createElement('span');

    helpElement.className = 'tooltip';
    helpIcon.className = 'fas fa-question-circle';
    helpText.className = 'tooltiptext';
    helpText.innerText = 'Mindestens einen Klein- und einen Grossbuchstaben sowie eine Zahl';

    helpElement.appendChild(helpIcon);
    helpElement.appendChild(helpText);

    /* Confirm Password. */
    var labelConfirmPassword = document.createElement('label');
    labelConfirmPassword.innerText = 'Confirm password';

    var inputConfirmPassword = document.createElement('input');
    inputConfirmPassword.id = 'confirmPassword';
    inputConfirmPassword.type = 'password';

    var divConfirmPassword = document.createElement('div');
    divConfirmPassword.innerHTML += '<br>';
    divConfirmPassword.appendChild(labelConfirmPassword);
    divConfirmPassword.innerHTML += '<br>';
    divConfirmPassword.appendChild(inputConfirmPassword);

    /* Change button. */
    var submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Change';

    var divButton = document.createElement('div');
    divButton.innerHTML += '<br>';
    divButton.appendChild(submitButton);

    /* Login form. */
    var loginForm = document.createElement('form');
    loginForm.action = 'javascript:onPasswordChange()';
    loginForm.appendChild(divOldPassword);
    loginForm.appendChild(divPassword);
    loginForm.appendChild(helpElement);
    loginForm.appendChild(divConfirmPassword);
    loginForm.appendChild(divButton);

    main.appendChild(loginForm);
}

