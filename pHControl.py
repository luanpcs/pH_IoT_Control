import paho.mqtt.client as mqtt
import threading
import time

from MQTT_Module import mqtt_loop, MQTT_Pub

def main():
    mqtt_thread = threading.Thread(target=mqtt_loop)
    mqtt_thread.start()
    time.sleep(2)
    a = 0
    while 1:
        if a != 20:
            MQTT_Pub(a)
            a = a + 1

if __name__ == "__main__":
    main()