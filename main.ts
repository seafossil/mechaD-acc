function 正転 () {
    pins.analogWritePin(AnalogPin.P12, モータ指令電圧)
    pins.analogWritePin(AnalogPin.P13, 0)
}
function 逆転 () {
    pins.analogWritePin(AnalogPin.P12, 0)
    pins.analogWritePin(AnalogPin.P13, モータ指令電圧)
}
let モータ速度指令 = 0
let モータ指令電圧 = 0
input.setAccelerometerRange(AcceleratorRange.OneG)
let 回転方向 = 0
モータ指令電圧 = 0
basic.forever(function () {
    モータ速度指令 = input.acceleration(Dimension.X)
    if (モータ速度指令 < 0) {
        回転方向 = 1
    } else {
        回転方向 = 0
    }
    モータ指令電圧 = Math.abs(モータ速度指令)
    if (回転方向 >= 1) {
        正転()
    } else {
        逆転()
    }
    led.plotBarGraph(
    モータ指令電圧,
    1023,
    false
    )
    basic.pause(1000)
})
