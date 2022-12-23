radio.onReceivedString(function (receivedString) {
    if (receivedString == "Start") {
        active = 1
    } else if (receivedString == "Stop") {
        active = 0
    } else if (receivedString == "LED1") {
        if (LED1 == 0) {
            LED1 = 1
        } else {
            LED1 = 0
        }
    } else if (receivedString == "LED2") {
        if (LED2 == 0) {
            LED2 = 1
        } else {
            LED2 = 0
        }
    } else if (receivedString == "HUPE") {
        music.playTone(262, music.beat(BeatFraction.Whole))
    } else if (receivedString == "LICHT") {
        if (licht == 0) {
            licht = 1
        } else {
            licht = 0
        }
    } else {
    	
    }
})
radio.onReceivedValue(function (name, value) {
    // Speed = 512 - value
    if (name == "LR") {
        LR = 512 - value
        R = (1 + LR / 1023) * Math.abs(Speed) * active
        L = (1 - LR / 1023) * Math.abs(Speed) * active
    } else if (name == "VR" && value < 450 && Speed > 0) {
        Speed = Speed * -1
    } else if (name == "VR" && value > 550 && Speed < 0) {
        Speed = Speed * -1
    } else {
    	
    }
})
let R = 0
let LR = 0
let LED2 = 0
let LED1 = 0
let licht = 0
let Speed = 0
let L = 0
let active = 0
let LEDs = 0
radio.setGroup(10)
active = 0
L = 0
Speed = 128
licht = 1
let strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
strip.showColor(neopixel.colors(NeoPixelColors.White))
basic.forever(function () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
        active = 0
        maqueen.motorStop(maqueen.Motors.All)
        if (licht == 1) {
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
        } else {
            strip.showColor(neopixel.colors(NeoPixelColors.Black))
        }
        radio.sendString("vib")
    } else {
        if (licht == 1) {
            strip.showColor(neopixel.colors(NeoPixelColors.White))
        } else {
            strip.showColor(neopixel.colors(NeoPixelColors.Black))
        }
    }
    if (Speed > 0) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, L)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, R)
    } else {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, Math.abs(L))
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, Math.abs(R))
    }
    if (LED1 == 0) {
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
    } else {
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
    }
    if (LED2 == 0) {
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
    } else {
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
    }
    basic.pause(100)
})
