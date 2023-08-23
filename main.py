list2: List[number] = []
warningLevel = 0
maxLevel = 0
minLevel = 0
failLevel = 0
distance = 0

def on_full_power_every():
    global list2, warningLevel, maxLevel, minLevel, failLevel, distance
    led.set_brightness(30)
    list2 = [0, 10, 40, 50]
    warningLevel = 5
    maxLevel = 10
    minLevel = 40
    failLevel = 45
    distance = sonar.ping(DigitalPin.P0, DigitalPin.P1, PingUnit.CENTIMETERS)
    basic.pause(1000)
    basic.show_number(distance)
    basic.clear_screen()
    if distance == list2[0]:
        basic.show_icon(IconNames.SURPRISED)
        basic.pause(1000)
        control.reset()
    elif distance > list2[0] and distance <= list2[1]:
        basic.show_icon(IconNames.ASLEEP)
    elif distance > list2[1] and distance <= list2[2]:
        basic.show_icon(IconNames.HAPPY)
    else:
        basic.show_icon(IconNames.SAD)
    power.low_power_request()
power.full_power_every(10000, on_full_power_every)
