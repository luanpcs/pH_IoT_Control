import RPi.GPIO as GPIO
import serial
import time

from globalVars import globalVars

gVars = globalVars()

GPIO.setwarnings(False)
PinEnableSensor = 3

GPIO.setmode(GPIO.BOARD)    
GPIO.setup(PinEnableSensor, GPIO.OUT)
SerialHandle = serial.Serial('/dev/ttyUSB0', baudrate=9600, timeout=1) #ttyAMA0 ttyACM0
def readSensorData():
    GPIO.output(PinEnableSensor, GPIO.HIGH)
    sensorData = SerialHandle.readline().decode('utf8').strip()
    GPIO.output(PinEnableSensor, GPIO.LOW)
    # SerialHandle.close()
    if sensorData != '':
        currrentPH = float(sensorData)
        if(0.0 >= currrentPH or currrentPH >= 14.0):
            print("pH invalido")
            return gVars.getLastpH()
        else:
            gVars.setLastpH(currrentPH)
            return gVars.getLastpH()
    else:
        print("pH invalido")
        return gVars.getLastpH()

