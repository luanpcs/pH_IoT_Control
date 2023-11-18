import RPi.GPIO as gpio
import time

gpio.setwarnings(False)
gpio.setmode(gpio.BOARD)
gpio.setup(32, gpio.OUT)
gpio.setup(33, gpio.OUT)

p = gpio.PWM(32,100)
d = gpio.PWM(33,100)
p.start(0)
d.start(0)

while True:
    
    #p.ChangeDutyCycle(0)
    #d.ChangeDutyCycle(100)
    print("0")

    time.sleep(1)
    #p.ChangeDutyCycle(100)
    #d.ChangeDutyCycle(0)
    print("100")
    time.sleep(1)
    