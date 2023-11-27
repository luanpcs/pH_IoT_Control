import { login } from './requests.js';


document.getElementById('button-login').addEventListener('click', async function () {
    var user = document.getElementById('login-user').value;
    var password = document.getElementById('login-senha').value;

    try {
        const response = await login(user, password);

        console.log('Registration successful:', response);

        if (response != undefined) {

            if (response.message === '1') alert("Usuário não encontrado.")
            else if (response.message === '2') alert("Senha incorreta.")
            else if (response.message === '3') window.location.href = 'app.html';
            else alert("Erro de acesso ao banco");
        }


    } catch (error) {
        alert("Erro de acesso ao banco");
        console.error('Registration failed:', error);
    }
});