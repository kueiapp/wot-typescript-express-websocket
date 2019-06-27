// Modify by kueiapp.com
// from Building the Web of Things by Guinard, Vlad Trifa
import express,{Application,Response,Request} from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as resources from './model/model';
import bodyParser from 'body-parser'
import path from 'path'

const app = express();
// add middleware 
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// sub-path /ws
app.get('/ws', function(req:Request, res:Response) {
  res.header("Content-Type", "text/html; charset=utf-8");
  res.sendFile(path.join(__dirname + '/public/wsClient.html'));
});

import emitter from "./utils/emitter"
// add listener
var g_temp, g_humid;
// build a connection
function setupWebsocketServer():void {
  wss.on('connection', (ws: WebSocket):void => {
    //send immediatly a feedback to the incoming connection    
    ws.send('WebSocket server is on..');
    // register event      
    emitter.on('WebSocket', (temp:number, humid:number):void => {
      g_temp = temp;
      g_humid = humid;
      console.log(`listener got ${temp}, ${humid}`)
      ws.send(
        JSON.stringify({"temperature": g_temp, "humidity": g_humid}), 
        ():void => {
          console.log('ws message sent')
        });
    });
    // got a message from client
    ws.on('message', (message: string):void => {
        ws.send(`Hello, ${message}`);
    });
  });
}
// sub-path
import rootRoute from './routes/root.route';
app.use('/api', rootRoute);

//start our server
var port  = 8080;
server.listen( process.env.PORT || port, () => {
    console.log(`Server started on port ${port} ^_^`);
    setupWebsocketServer()
});

// start sensors
/*** it's essentail to start sensors seperately 
* or it'll block thread when triggering on URL access 
*/
import dht22 from './controller/DHT22Sensor';
dht22.simulate();