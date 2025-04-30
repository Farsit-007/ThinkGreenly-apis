/* eslint-disable @typescript-eslint/no-unused-vars */
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
// import router from '../src/app/routes';
import os from 'os';
import handleErrors from './utils/handleErrors';
// import sendResponse from './utilities/sendResponse';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  const currentDateTime = new Date().toISOString();
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const serverHostname = os.hostname();
  const serverPlatform = os.platform();
  const serverUptime = os.uptime();
  res.send({
    success: true,
    message: 'Welcome to ThinkGreenly Server',
    version: '1.0.0',
    clientDetails: {
      ipAddress: clientIp,
      accessedAt: currentDateTime,
    },
    serverDetails: {
      hostname: serverHostname,
      platform: serverPlatform,
      uptime: `${Math.floor(serverUptime / 60 / 60)} hours ${Math.floor(
        (serverUptime / 60) % 60
      )} minutes`,
    },
    developerContact: {
      email: [
        'rajib5570@gmail.com',
        'rkrakibhasan680@gmail.com',
        'khaledssbd@gmail.com',
        'nadimulrahib38@gmail.com',
        'robayatfarsit@gmail.com',
        'rbiswas01999@gmail.com',
        'hasanbappi@gmail.com',
      ],
    },
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  //   sendResponse(res, false, 'API not found');
  res.status(404).send({ message: 'API not found' });
});

// app.use('/api/v1', router);

app.use(handleErrors);

export default app;
