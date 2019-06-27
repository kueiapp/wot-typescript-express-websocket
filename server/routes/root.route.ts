// Modify by kueiapp.com

import express, {Application, Request, Response, NextFunction } from 'express';
import resources from './../model/model'

console.log('setup root.route...')

const router = express.Router();

// sub-path /api
router.get('/', function (req:Request, res:Response) {
  res.send('Here is /api')
});

// sub-path /api/sensors
import sensorRoutes from './../routes/sensors.route'
router.use('/sensors', sensorRoutes);

export default router;
