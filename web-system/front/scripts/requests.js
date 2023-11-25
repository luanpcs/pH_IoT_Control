export function novoAlerta(alerta) {
    const url = 'http://localhost:3000/alertas';
    const alert = alerta;
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const timestamp = `${(now.getDate() < 10 ? '0' : '') + now.getDate()}/${(now.getMonth() < 9 ? '0' : '') + (now.getMonth() + 1)}/${year} ${(now.getHours() < 10 ? '0' : '') + " - " + now.getHours()}:${(now.getMinutes() < 10 ? '0' : '') + now.getMinutes()}:${(now.getSeconds() < 10 ? '0' : '') + now.getSeconds()}`;

    console.log(JSON.stringify({ alert, timestamp }))
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ alert, timestamp }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

export async function getAlertas() {
    const url = 'http://localhost:3000/alertas';

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error; // Rejeita a Promise com o erro
    }
}

export function novoRegistro(registro) {
    const url = 'http://localhost:3000/registros';
    const log = registro;
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const timestamp = `${(now.getDate() < 10 ? '0' : '') + now.getDate()}/${(now.getMonth() < 9 ? '0' : '') + (now.getMonth() + 1)}/${year} ${(now.getHours() < 10 ? '0' : '') + " - " + now.getHours()}:${(now.getMinutes() < 10 ? '0' : '') + now.getMinutes()}:${(now.getSeconds() < 10 ? '0' : '') + now.getSeconds()}`;

    console.log(JSON.stringify({ log, timestamp }))
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ log, timestamp }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

export async function getRegistros() {
    const url = 'http://localhost:3000/registros';

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function registerUser(user, password) {
    const url = 'http://localhost:3000/register';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, password }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

}

export function login(user, password) {
    const url = 'http://localhost:3000/login';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, password }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

export function salvarpH(ph) {
    const url = 'http://localhost:3000/savePH';
    const value = ph;
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const timestamp = `${(now.getDate() < 10 ? '0' : '') + now.getDate()}/${(now.getMonth() < 9 ? '0' : '') + (now.getMonth() + 1)}/${year} ${(now.getHours() < 10 ? '0' : '') + " - " + now.getHours()}:${(now.getMinutes() < 10 ? '0' : '') + now.getMinutes()}:${(now.getSeconds() < 10 ? '0' : '') + now.getSeconds()}`;

    console.log(JSON.stringify({ value, timestamp }))
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value, timestamp }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

export async function getPH() {
    const url = 'http://localhost:3000/savePH';

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}