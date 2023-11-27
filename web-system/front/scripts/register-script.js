import { registerUser } from './requests.js';


document.getElementById('button-login-criar').addEventListener('click', async function () {
    var user = document.getElementById('criar-user').value;
    var senha = document.getElementById('criar-senha').value;

    try {
        const response = await registerUser(user, senha);
        console.log('Registration successful:', response);

        if (response.message === '1') alert("Usuário já registrado")
        else if (response.message === '2') window.location.href = 'index.html';
        else alert("Erro de acesso ao banco");

    } catch (error) {
        alert("Erro de acesso ao banco");
        console.error('Registration failed:', error);
    }
});