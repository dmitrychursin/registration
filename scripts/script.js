$(document).ready(function () {

    //input id
    const fullName = $('#full-name');
    const userName = $('#username');
    const email = $('#email');
    const password = $('#password');
    const repeatPassword = $('#repeat-password');
    const checked = $('#checked');

    //input class
    const orderInput = $('.order-input');

    //btn id
    const btn = $('#btn');

    //label id
    const labelFullName = $('#label-full-name');
    const labelUsername = $('#label-username');
    const labelEmail = $('#label-email');
    const labelPassword = $('#label-password');
    const labelRepeatPassword = $('#label-repeat-password');
    const labelChecked = $('#label-checked');

    //div id
    const account = $('#account');
    const orderTitle = $('#order-title');

    //Popup
    const popup = $('#popup');
    const popupBtn = $('.popup-btn');

    // div class
    const errorInput = $('.error-input');
    const errorInput2 = $('.error-input-2');


    checked.click(() => {
        if ($(checked).is(':checked')) {
            console.log("Согласен с условиями предоставления услуг");
        } else {
            console.log("Не согласен с условиями предоставления услуг");
        }
    });

    btn.on('click', createNewUser);
    account.on('click', toSignIn);


    function createNewUser(e) {
        e.preventDefault();
        orderInput.css('border-bottom', '1px solid #c6c6c4');
        errorInput.hide();
        let hasError = false;

        if (!fullName.val().match(/^[А-ЯA-Z][a-zа-я]+\s*$/)) {
            fullName.css('border-bottom', '1px solid red');
            fullName.next().show();
            hasError = true;
            return;
        }

        if (!userName.val().match(/^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*$/)) {
            userName.css('border-bottom', '1px solid red',);
            userName.next().show();
            hasError = true;
            return;
        }

        if (!email.val().match(/^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i)) {
            email.css('border-bottom', '1px solid red');
            email.next().show();
            hasError = true;
            return;
        }

        if (!password.val().match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
            password.css('border-bottom', '1px solid red');
            password.next().show();
            hasError = true;
            return;
        }

        if (password.val() !== repeatPassword.val()) {
            password.css('border-bottom', '1px solid red');
            repeatPassword.css('border-bottom', '1px solid red');
            repeatPassword.next().show();
            hasError = true;
            return;
        }

        if (!repeatPassword.val()) {
            repeatPassword.css('border-bottom', '1px solid red');
            repeatPassword.next().show();
            hasError = true;
            return;
        }

        if (password.val().length <= 7) {
            password.next().show();
            hasError = true;
            return;
        }

        if (!checked.is(':checked')) {
            alert("Согласитесь с условиями предоставления услуг");
            hasError = true;
            return;
        }
        if (checked.is(':checked')) {
        }
        const newUser = {
            lastName: fullName.val(),
            fullName: userName.val(),
            password: password.val(),
            email: email.val()
        }

        if (!userName || !fullName || !email || !password) {
            return;
        }

        let userDataStr = JSON.stringify(newUser)

        let clientsArr = JSON.parse(localStorage.getItem('clients')) || [];
        const userExists = clientsArr.find(client => JSON.stringify(client) === userDataStr);

        if (userExists) {
            userName.css('border-bottom', '1px solid red',);
            userName.next().show();
            errorInput.html('Такой "Your username" уже существует');
            hasError = true;
            return;
        }
        if (!userExists) {
            clientsArr.push(newUser);
            localStorage.setItem('clients', JSON.stringify(clientsArr));
            popup.css('display', 'block');
            popupBtn.click(function () {
                popup.css('display', 'none');
            });
        }
        toSignIn();
    }


    function toSignIn() {
        btn.html('Sign In');
        account.html('Registration');
        orderTitle.html('Log in to the system ?');

        btn.off('click', createNewUser);
        btn.on('click', signIn);

        userName.val("");
        password.val("");

        account.off('click', toSignIn);
        account.on('click', () => window.location.reload());

        labelFullName.css('display', 'none');
        labelEmail.css('display', 'none');
        labelRepeatPassword.css('display', 'none');
        labelChecked.css('display', 'none');
    }

    function toRegistration() {
        btn.val('Sign Up');
        account.html('Get your free account');
        orderTitle.html('Get your free account');

        btn.off("click", signIn);
        btn.on("click", createNewUser);

        userName.val("");
        password.val("");

        account.off("click", toRegistration);
        account.on("click", toSignIn);

        labelFullName.css('display', 'block');
        labelEmail.css('display', 'block');
        labelRepeatPassword.css('display', 'block');
        orderTitle.css('display', 'flex');
    }

    function toAccount(user) {
        orderTitle.html(`Welcome, ${user.lastName}`);

        btn.off("click", signIn);
        btn.on("click", () => window.location.reload());

        account.off("click", toRegistration);

        btn.html('Exit');
        labelUsername.css('display', 'none');
        labelPassword.css('display', 'none');
        account.css('display', 'none');
    }

    function signIn(e) {
        e.preventDefault();
        orderInput.css('border-bottom', '1px solid #c6c6c4');
        errorInput.hide();
        let hasError = false;
        // if (!userName.val() && !password.val()) {
        //     alert('Поля не заполнены');
        //     return;
        // }

        const clientsJSON = localStorage.getItem('clients');

        const clients = JSON.parse(clientsJSON);
        const userExists = clients.find((client) => client.fullName === userName.val());

        if (!userExists) {
            userName.css('border-bottom', '1px solid red',);
            userName.next().show();
            errorInput.html('Пользователь не найден');
            hasError = true;
            return;
        }

        if (userExists.password !== password.val()) {
            password.css('border-bottom', '1px solid red',);
            password.next().show();
            errorInput.html('Неправельный пароль');
            hasError = true;
            return;
        }

        toAccount(userExists);
    }


// Показывать пароль
    const passwordInput = $('.password-input');

    $('body').on('click', '.password-control', function () {
        if (passwordInput.attr('type') === 'password') {
            $(this).addClass('view');
            passwordInput.attr('type', 'text');
        } else {
            $(this).removeClass('view');
            passwordInput.attr('type', 'password');
        }
        return false;
    });


})
;


