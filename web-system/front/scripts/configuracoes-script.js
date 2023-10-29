import saveConfigurations from './requests.js';
import getConfigurations from './requests.js';

function showConfiguracoesPopup() {
    const popup = document.getElementById("configuracoes-popup");
    popup.style.display = "block";
    setTimeout(() => {
        popup.style.opacity = 1;
    }, 10);

    document.body.style.overflow = "hidden";
}

export function hideConfiguracoesPopup() {
    const popup = document.getElementById("configuracoes-popup");
    popup.style.opacity = 0;
    setTimeout(() => {
        popup.style.display = "none";
    }, 300);

    document.body.style.overflow = "auto";
}

export function saveNewConfigurations(event)
{
    event.preventDefault();

    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const local = document.getElementById("local").value;

    console.log('Dados recebidos na SaveNewConfigurations', data, ', ', hora, ' e ', local);

    if (!data || !hora || !local)
    {
        console.error("Todos os campos devem ser preenchidos.");
        return;
    }

    saveConfigurations(hora, data, local)
    .then(response => {
        console.log("Configurações salvas com sucesso!", response);
        hideConfiguracoesPopup();
        
        getConfigurations()
            .then(configurations => {
                updateConfigInfos(configurations);
            })
            .catch(error => console.error("Erro ao obter configurações:", error));
    })
    .catch(error => console.error("Erro ao salvar configurações:", error));
}

export function updateConfigInfos(configurations) {
    // Atualize os elementos na interface com os dados das configurações
    const horaElement = document.getElementById("hora");
    const dataElement = document.getElementById("data");
    const localElement = document.getElementById("local");

    // Supondo que as propriedades em configurations correspondem aos IDs dos elementos na interface
    horaElement.textContent = `Hora: ${configurations.hora}`;
    dataElement.textContent = `Data: ${configurations.data}`;
    localElement.textContent = `Local: ${configurations.local}`;
}

document.getElementById("configs-button").addEventListener("click", showConfiguracoesPopup);
document.getElementById("configuracoes-popup-close").addEventListener("click", hideConfiguracoesPopup);