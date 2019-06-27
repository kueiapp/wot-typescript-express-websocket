"use strict";
// modified by kueiapp.com
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// global event
var emitter_1 = __importDefault(require("../utils/emitter"));
var model_1 = __importDefault(require("../model/model"));
var interval, sensor;
var model = model_1.default.pi.sensors;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function simulate() {
    console.log('start WoT sensors simulate interval');
    setInterval(function () {
        model.temperature.value = getRandomInt(20, 40);
        model.humidity.value = getRandomInt(20, 100);
        showValue();
    }, 5000);
}
;
function showValue() {
    // notify emitter event
    console.log("sensor value " + model.temperature.value + ", " + model.humidity.value);
    emitter_1.default.emit('WebSocket', model.temperature.value, model.humidity.value);
}
;
function getValue() {
    return {
        "temp": model_1.default.pi.sensors.temperature.value,
        "humid": model_1.default.pi.sensors.humidity.value
    };
}
;
exports.default = {
    simulate: simulate,
    showValue: showValue,
    getValue: getValue
};
//# sourceMappingURL=DHT22Sensor.js.map