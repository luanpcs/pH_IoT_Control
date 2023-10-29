
export function sendId() {
    const url = 'http://localhost:3000/devices';
    const id = "OLIVIA";
    const id2 = new Date();

console.log(JSON.stringify({id2, id}))
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

export function getAllDevices() {
    const url = 'http://localhost:3000/devices';

    fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

 export function registerUser(user, password) {
    const url = 'http://localhost:3000/register';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user, password}),
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
        body: JSON.stringify({user, password}),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

export function savePH() {
    const url = 'http://localhost:3000/savePH';

    const temp =1
    const randomPH = 1;
    const json = JSON.stringify({temp})
    console.log(json)
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({temp}),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

export default function saveConfigurations(hora, data, local) {
    const url = 'http://localhost:3000/configuracoes';

    console.log('saveConfigurations');
    console.log('Hora:', hora);
    console.log('Data:', data);
    console.log('Local:', local);

    if (!data || !hora || !local)
    {
        console.log("Todos os campos devem ser preenchidos.");
        return;
    }

    if( data == undefined || hora == undefined || local == undefined)
    {
        console.log("Todos os campos devem ser preenchidos.");
        return;
    }

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hora, data, local }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data;
    })
    .catch(error => {
        console.error(error);
        throw error;
    });
}

export function getConfigurations() {
    const url = 'http://localhost:3000/configuracoes';

    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error(error));
}