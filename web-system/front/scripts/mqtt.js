const pubTopic = 'TCC_IoTpHControl/webPub';
const subTopic = 'TCC_IoTpHControl/raspPub';
const client = mqtt.connect('mqtt://broker.emqx.io:8083/mqtt');
client.subscribe(subTopic);

export function mqttInit() {
    mqttSetCallBacks()
    mqttScreenScan()
}

function mqttScreenScan() {
    document.getElementById('mqttBtn-Man').addEventListener('click', function () {
        const payload = {msgType: 'modo', modo: "m", value: 0};
        mqttSend(JSON.stringify(payload))
    });
}

export function mqttSend(messageToSend) {
    console.log(`<- ${messageToSend}`);
    client.publish(pubTopic, messageToSend)
}

function mqttRec(payload) {
    console.log(`-> ${payload}`);

    const payloadJSON = JSON.parse(payload);

    switch (payloadJSON.msgType) {
        case 'phValue':
            {
                const valor = payloadJSON.value.toString()
                document.getElementById('mqttData').textContent = parseFloat(valor).toFixed(1);
            }
            break;

        default:
            {
                console.log("Invalid message type")
            }
            break;
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
