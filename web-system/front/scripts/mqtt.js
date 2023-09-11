export function mqttInit() {
    const client = mqtt.connect('mqtt://broker.emqx.io:8083/mqtt');

    client.on('connect', () => {
        console.log('Conectado ao servidor MQTT');

        // Publica uma mensagem em um tópico
        const topic = 'TCC_IoTpHControl/webPub';
        const message = 'Hello';
        client.publish(topic, message);
        console.log(`<- ${message.toString()}`);

    });

    client.on('message', (topic, message) => {
        console.log(`-> ${message.toString()}`);
    });

    client.subscribe('TCC_IoTpHControl/raspPub');

    client.on('error', (error) => {
        console.error('Erro MQTT:', error);
    });
}



