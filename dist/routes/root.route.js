"use strict";
// Modify by kueiapp.com
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
console.log('setup root.route...');
var router = express_1.default.Router();
// sub-path /api
router.get('/', function (req, res) {
    res.send('Here is /api');
});
// sub-path /api/sensors
var sensors_route_1 = __importDefault(require("./../routes/sensors.route"));
router.use('/sensors', sensors_route_1.default);
exports.default = router;
//# sourceMappingURL=root.route.js.map