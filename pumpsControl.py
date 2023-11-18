import RPi.GPIO as gpio
import time

pumpUpPin = 32
pumpDownPin = 33
pumpPWMFreq = 100
OFF = 0
ON = 100

gpio.setwarnings(False)
gpio.setmode(gpio.BOARD)

global pumpUp
global pumpDown

def pumpsInit():
    global pumpUp
    global pumpDown

    gpio.setup(pumpUpPin, gpio.OUT)
    gpio.setup(pumpDownPin, gpio.OUT)

    pumpUp = gpio.PWM(pumpUpPin, pumpPWMFreq)
    pumpDown = gpio.PWM(pumpDownPin, pumpPWMFreq)

    pumpsIdle()
    
def updatePump(pump, newState):
    pump.ChangeDutyCycle(newState)

def pumpsIdle():
    updatePump(pumpUp, OFF)
    updatePump(pumpDown, OFF)


if __name__ == "__main__":
    pumpsInit()

    while True:
        print("0")
        updatePump(pumpUp, OFF)
        updatePump(pumpDown, ON)
        time.sleep(1)

        print("100")
        updatePump(pumpUp, ON)
        updatePump(pumpDown, OFF)
        time.sleep(1)
    