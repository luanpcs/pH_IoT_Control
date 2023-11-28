import RPi.GPIO as gpio
import time
from MQTT_Module import MQTT_Pub
import json

from globalVars import globalVars

pumpUpPin = 32
pumpDownPin = 33
pumpPWMFreq = 100
OFF = 0
ON = 100

gpio.setwarnings(False)
gpio.setmode(gpio.BOARD)

gVars = globalVars()

global pumpUp
global pumpDown

def pumpsInit():
    global pumpUp
    global pumpDown

    gpio.setup(pumpUpPin, gpio.OUT)
    gpio.setup(pumpDownPin, gpio.OUT)

    pumpUp = gpio.PWM(pumpUpPin, pumpPWMFreq)
    pumpDown = gpio.PWM(pumpDownPin, pumpPWMFreq)

    pumpUp.start(OFF)
    pumpDown.start(OFF)
    
    pumpsIdle()
    

    
def updatePump(pump, newState):
    pump.ChangeDutyCycle(newState)

def pumpsIdle():
    updatePump(pumpUp, OFF)
    updatePump(pumpDown, OFF)
    time.sleep(gVars.getValorPumpsIntervalTrigger())
    
def pumpUpON():
    updatePump(pumpUp, ON)
    
def pumpUpOFF():
    updatePump(pumpUp, OFF)
    
def pumpDownON():
    updatePump(pumpDown, ON)
    
def pumpDownOFF():
    updatePump(pumpDown, OFF)

def pumpUpTrigger():
    payload = {"msgType": "reg", "value": "Alcalinizante adicionado"}
    MQTT_Pub(json.dumps(payload))
    pumpUpON()
    time.sleep(gVars.getValorPumpsIntervalTrigger())
    pumpUpOFF()
    
def pumpDownTrigger():
    payload = {"msgType": "reg", "value": "Acidulante adicionado"}
    MQTT_Pub(json.dumps(payload))
    pumpDownON()
    time.sleep(gVars.getValorPumpsIntervalTrigger())
    pumpDownOFF()