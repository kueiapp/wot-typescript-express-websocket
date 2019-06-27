"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// modified by kueiapp.com
// === /api/sensors/
var express_1 = __importDefault(require("express"));
var DHT22Sensor_1 = __importDefault(require("../controller/DHT22Sensor"));
var router = express_1.default.Router();
// URL path: /api/sensors/dht
router.route('/dht').get(function (req, res) {
    res.send(DHT22Sensor_1.default.getValue());
});
exports.default = router;
//# sourceMappingURL=sensors.route.js.map