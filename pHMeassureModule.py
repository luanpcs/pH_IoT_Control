import RPi.GPIO as GPIO
import serial

PinEnableSensor = 12

GPIO.setmode(GPIO.BOARD)    
GPIO.setup(EnableSensor_PIN, GPIO.OUT)

def readSensorData():
    SerialHandle = serial.Serial('/dev/ttyS0', baudrate=9600, timeout=1)
    GPIO.output(PinEnableSensor, GPIO.HIGH)
    sensorData = SerialHandle.read(10)
    GPIO.output(PinEnableSensor, GPIO.LOW)
    SerialHandle.close()    
    if sensorData:
        return sensorData

