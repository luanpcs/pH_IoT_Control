import RPi.GPIO as GPIO
import serial
import time

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
            return 0.0
        else:
            return float(sensorData)
    else:
        return 0.0

