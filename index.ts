import "reflect-metadata";
import { connectToDB, dbusers, dbfiles } from './data/connect';
import Koa from 'koa';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';


import { config } from './data/config';
import ApiRouter from './routers/api/index';
import LoginService from './routers/login/login';
import GraphQlRouter from './routers/graphql/index';

const init = async () => {
    //console.log(config);
    await connectToDB(config.database);

    const app = new Koa();

    app.use(bodyParser());
    app.use(serve('./assets'));
    app.use(cors());

    app
        .use(LoginService.routes())
        .use(LoginService.allowedMethods())
        .use(ApiRouter.routes())
        .use(ApiRouter.allowedMethods())
        .use(GraphQlRouter.routes())
        .use(GraphQlRouter.allowedMethods());

    
    

    

    app.listen(3000);

};


init();