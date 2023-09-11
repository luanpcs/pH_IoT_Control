import paho.mqtt.client as mqtt
import threading
import time

from MQTT_Module import mqtt_loop, MQTT_Pub
from pHMeassureModule import readSensorData

def main():
    mqtt_thread = threading.Thread(target=mqtt_loop)
    mqtt_thread.start()
    time.sleep(2)
    while 1:
        print(readSensorData())
        time.sleep(3)

if __name__ == "__main__":
    main()