// modified by kueiapp.com
// === /api/sensors/
import express, {Application, Request, Response, NextFunction } from 'express';
import resources from './../model/model'
import dht22 from '../controller/DHT22Sensor';

const router = express.Router()

// URL path: /api/sensors/dht
router.route('/dht').get(function (req:Request, res:Response) {
  res.send( dht22.getValue() );
});

export default router;
