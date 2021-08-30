import Router from "@koa/router";
import {dbusers} from '../../data/connect'
import {calcTokenIdMail} from '../../utils/calcjwt';
const loginRouter = new Router();
 
loginRouter.prefix("/login");

loginRouter.get("/",async (ctx,next)=>{
    //TO DO
    //reply paginahtml for the login form
});

loginRouter.post("/",async (ctx,next)=>{
    //console.log(ctx);
    console.log("post on login")    
    //console.log(ctx.request.body) //json request
    if(typeof ctx.request.body.mail !== "string" ||  typeof ctx.request.body.password !== "string"){
        //set code error 400
        //invalid request
        ctx.status = 400;
        return;
    }

    const finduser = await dbusers.findOne({mail: ctx.request.body.mail.toLowerCase(),password: ctx.request.body.password});
    if(finduser){
        let id = finduser._id.toString();
        // = true;
        console.log(ctx.request.body.keeplogin == "true")
        
        ctx.body = calcTokenIdMail(id,ctx.request.body.keeplogin == "true",finduser.permissions);
        

        //return jwt token
        //if keeplogin == true , expiration time token = 2 week
        //else expiration time = 1 day
        
        ctx.status = 202;
        //return code 202
    }else{
        //user not found in the db
        ctx.body = "unatorized";
        ctx.status = 203;
    }
    
});

export default loginRouter;