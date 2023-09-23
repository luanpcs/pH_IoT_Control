import paho.mqtt.c,lient as mqtt
import threading
import time

from MQTT_Module import mqtt_loop, MQTT_Pub
from pHMeassureModule import readSensorData

def main():
    mqtt_thread = threading.Thread(target=mqtt_loop)
    mqtt_thread.start()
    time.sleep(2)
    MQTT_Pub("Raspberry listening...")
    while 1:
        time.sleep(1)
        a = readSensorData()
        MQTT_Pub(a)

if __name__ == "__main__":
    main()