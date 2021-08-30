import Router from "@koa/router";
import jwt from 'koa-jwt';
import {config} from '../../data/config';

import UploadRouter from './upload';


const apiRouter = new Router();

apiRouter.prefix("/api");


if(config.protection)
apiRouter.use(jwt({ secret: config.jwtkey , algorithms:["HS256"]}));
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjNjMDcxODkzNDQzMWJhNzk1YzE2MSIsImlhdCI6MTYzMDAwMjU3MiwiZXhwIjoxNjMxMjEyMTcyfQ.17ogqn3LFsY-Btf7lB7aPxNDg8ltdswcrLndkurh-JE
// Protected middleware
apiRouter.use(UploadRouter.routes())
         .use(UploadRouter.allowedMethods())

export default apiRouter;

