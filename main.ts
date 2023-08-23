let waterTime = 0
let distVal: number[] = []
let distance = 0
function activatePump () {
    basic.clearScreen()
    basic.pause(500)
    basic.showIcon(IconNames.SmallDiamond)
    basic.pause(500)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.pause(waterTime)
    basic.clearScreen()
}
function addWater () {
    radio.sendString("Add Water")
}
function callAlarm () {
    radio.sendString("WaterPump Blocked")
}
power.fullPowerEvery(5000, function () {
    led.setBrightness(30)
    waterTime = 5000
    distVal = [10, 40, 50]
    distance = sonar.ping(
    DigitalPin.P0,
    DigitalPin.P1,
    PingUnit.Centimeters
    )
    basic.pause(1000)
    basic.showNumber(distance)
    basic.clearScreen()
    if (distance < distVal[0]) {
        basic.showIcon(IconNames.Asleep)
        activatePump()
    } else if (distance > distVal[0] && distance <= distVal[1]) {
        basic.showIcon(IconNames.Happy)
        activatePump()
    } else if (distance > distVal[2]) {
        basic.showIcon(IconNames.Skull)
    } else {
        basic.showIcon(IconNames.Ghost)
    }
    power.lowPowerRequest()
})
