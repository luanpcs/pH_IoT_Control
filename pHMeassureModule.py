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
    return sensorData

