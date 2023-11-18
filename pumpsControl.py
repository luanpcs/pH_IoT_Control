import RPi.GPIO as gpio
import time

pumpUpPin = 32
pumpDownPin = 33
pumpPWMFreq = 100

gpio.setwarnings(False)
gpio.setmode(gpio.BOARD)

global pumpUp
global pumpDown

def pumpsInit():
    gpio.setup(pumpUpPin, gpio.OUT)
    gpio.setup(pumpDownPin, gpio.OUT)

    pumpUp = gpio.PWM(pumpUpPin, pumpPWMFreq)
    pumpDown = gpio.PWM(pumpDownPin, pumpPWMFreq)

    pumpUp.start(0)
    pumpDown.start(0)

if __name__ == "__main__":

    pumpsInit()

    while True:
        pumpUp.ChangeDutyCycle(0)
        pumpDown.ChangeDutyCycle(100)
        print("0")

        time.sleep(1)
        pumpUp.ChangeDutyCycle(100)
        pumpDown.ChangeDutyCycle(0)
        print("100")
        time.sleep(1)
    