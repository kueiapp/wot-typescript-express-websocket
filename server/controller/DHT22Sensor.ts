// modified by kueiapp.com

// global event
import emitter from "../utils/emitter"
import resources from '../model/model';

var interval, sensor;
var model = resources.pi.sensors;

function getRandomInt(min:number, max:number):number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function simulate() 
{
  console.log('start WoT sensors simulate interval')
  setInterval(function () 
  {
    model.temperature.value = getRandomInt(20, 40);
    model.humidity.value = getRandomInt(20, 100);
    showValue() 
  }, 
  5000);
};

function showValue() 
{
  // notify emitter event
  console.log(`sensor value ${model.temperature.value}, ${model.humidity.value}`)
  emitter.emit('WebSocket', model.temperature.value, model.humidity.value);
};

function getValue() 
{
  return {
    "temp": resources.pi.sensors.temperature.value,
    "humid": resources.pi.sensors.humidity.value
  }
};

export default {
  simulate, 
  showValue, 
  getValue
}