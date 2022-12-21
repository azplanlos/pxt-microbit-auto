radio.onReceivedString(function (receivedString) {
    if (receivedString == "Start") {
        active = 1
    }
    if (receivedString == "Stop") {
        active = 0
    }
})
radio.onReceivedValue(function (name, value) {
    // Speed = 512 - value
    if (name == "LR") {
        LR = 512 - value
        R = (1 + LR / 1023) * Math.abs(Speed) * active
        L = (1 - LR / 1023) * Math.abs(Speed) * active
    } else if (name == "VR") {
    	
    } else {
    	
    }
})
let R = 0
let LR = 0
let Speed = 0
let L = 0
let active = 0
radio.setGroup(10)
active = 0
L = 0
Speed = 50
basic.forever(function () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) == 10) {
        active = 0
        maqueen.motorStop(maqueen.Motors.All)
        radio.sendString("vib")
    } else {
        if (Speed > 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, L)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, R)
        } else {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, Math.abs(L))
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, Math.abs(R))
        }
        basic.pause(100)
    }
})
