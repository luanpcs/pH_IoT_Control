import paho.mqtt.client as mqtt

from pHControl import onMessage

MQTT_Client = mqtt.Client()
MQTT_Broker = "broker.emqx.io"
MQTT_Port = 1883
MQTT_KeepAlive = 60
MQTT_MessageEncode = 'utf-8'

MQTT_SubTopic = "TCC_IoTpHControl/webPub"
MQTT_PubTopic = "TCC_IoTpHControl/raspPub"

def MQTT_Connect():
    print("MQTT connecting...")
    MQTT_Client.connect(MQTT_Broker, MQTT_Port, MQTT_KeepAlive)
    print("MQTT connected!")

def MQTT_Pub(msg):
    print("<-", msg)
    MQTT_Client.publish(MQTT_PubTopic, payload=msg)

def MQTT_OnConnect(client, userdata, flags, rc):
    MQTT_Client.subscribe(MQTT_SubTopic)
    MQTT_Pub("Raspberry is connected")

def MQTT_OnMessage(client, userdata, msg):
    receivedMessage = msg.payload.decode(MQTT_MessageEncode)
    print("->", receivedMessage)
    onMessage(receivedMessage)

def MQTT_Init():
    MQTT_Client.on_connect = MQTT_OnConnect
    MQTT_Client.on_message = MQTT_OnMessage
    MQTT_Client.connect(MQTT_Broker, MQTT_Port, MQTT_KeepAlive)
    MQTT_Connect()
    MQTT_Client.loop_forever()

def mqtt_loop():
    MQTT_Init()
    MQTT_Client.loop_forever()