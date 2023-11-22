
export function  sendId() {
    const url = 'http://localhost:3000/devices';
    const alert = "pH superior a 7.5";
    const dec = new Date().toLocaleString();

console.log(JSON.stringify({alert, dec}))
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({alert, dec}),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

export async function getAllDevices() {
    const url = 'http://localhost:3000/devices';

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