import { novoAlerta, novoRegistro } from './requests.js';
const pubTopic = 'TCC_IoTpHControl/webPub';
const subTopic = 'TCC_IoTpHControl/raspPub';
const client = mqtt.connect('mqtt://broker.emqx.io:8083/mqtt');
client.subscribe(subTopic);

export function mqttInit() {
    mqttSetCallBacks()
}

export function mqttSend(messageToSend) {
    console.log(`<- ${messageToSend}`);
    client.publish(pubTopic, messageToSend)
}

function mqttRec(payload) {
    console.log(`-> ${payload}`);

    try {
        const payloadJSON = JSON.parse(payload);

        switch (payloadJSON.msgType) {
            case 'phValue':
                {
                    const valor = payloadJSON.value.toString()
                    document.getElementById('mqttData').textContent = parseFloat(valor).toFixed(1);
                }
                break;

            case 'alert':
                {
                    const descricao = payloadJSON.value.toString()
                    novoAlerta(descricao)
                }
                break;

            case 'reg':
                {
                    const descricao = payloadJSON.value.toString()
                    novoRegistro(descricao)

                    if (descricao == "Modo automático ativado") {
                        const btnAut = document.getElementById('Btn-Aut')
                        const btnMan = document.getElementById('Btn-Man')

                        btnAut.classList.add('modo-ativado')
                        btnMan.classList.remove('modo-ativado')
                    }
                    else if (descricao == "Modo manual ativado") {
                        const btnAut = document.getElementById('Btn-Aut')
                        const btnMan = document.getElementById('Btn-Man')

                        btnAut.classList.remove('modo-ativado')
                        btnMan.classList.add('modo-ativado')
                    }
                }
                break;

            default:
                {
                    console.log("Invalid message type")
                }
                break;
        }

    } catch (error) {
        console.log("Rasp msg")
    }
}

function mqttSetCallBacks() {
    client.on('connect', () => {
        mqttSend('Web system connected')
    });

    client.on('error', (error) => {
        console.error('MQTT error:', error);
    });

    client.on('message', (topic, message) => {
        mqttRec(message);
    });
}
