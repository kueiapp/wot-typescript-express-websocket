"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modify by kueiapp.com
// from Building the Web of Things by Guinard, Vlad Trifa
var express_1 = __importDefault(require("express"));
var http = __importStar(require("http"));
var WebSocket = __importStar(require("ws"));
var body_parser_1 = __importDefault(require("body-parser"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
// add middleware 
app.use(body_parser_1.default.json());
app.use(express_1.default.static(__dirname + '/../public'));
var server = http.createServer(app);
var wss = new WebSocket.Server({ server: server });
// sub-path /ws
app.get('/ws', function (req, res) {
    res.header("Content-Type", "text/html; charset=utf-8");
    res.sendFile(path_1.default.join(__dirname + '/public/wsClient.html'));
});
var emitter_1 = __importDefault(require("./utils/emitter"));
// add listener
var g_temp, g_humid;
// build a connection
function setupWebsocketServer() {
    wss.on('connection', function (ws) {
        //send immediatly a feedback to the incoming connection    
        ws.send('WebSocket server is on..');
        // register event      
        emitter_1.default.on('WebSocket', function (temp, humid) {
            g_temp = temp;
            g_humid = humid;
            console.log("listener got " + temp + ", " + humid);
            ws.send(JSON.stringify({ "temperature": g_temp, "humidity": g_humid }), function () {
                console.log('ws message sent');
            });
        });
        // got a message from client
        ws.on('message', function (message) {
            ws.send("Hello, " + message);
        });
    });
}
// sub-path
var root_route_1 = __importDefault(require("./routes/root.route"));
app.use('/api', root_route_1.default);
//start our server
var port = 8080;
server.listen(process.env.PORT || port, function () {
    console.log("Server started on port " + port + " ^_^");
    setupWebsocketServer();
});
// start sensors
/*** it's essentail to start sensors seperately
* or it'll block thread when triggering on URL access
*/
var DHT22Sensor_1 = __importDefault(require("./controller/DHT22Sensor"));
DHT22Sensor_1.default.simulate();
//# sourceMappingURL=index.js.map