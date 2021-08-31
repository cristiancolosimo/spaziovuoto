import Router from 'koa-router';
import graphqlHTTP from 'koa-graphql';
import { Field, ObjectType,Resolver ,Arg , Query, Mutation , Authorized, Args , Ctx, buildSchema, UseMiddleware, MiddlewareInterface, NextFn, ResolverData} from 'type-graphql';
import { ObjectId } from 'mongodb';
import { dbfiles } from '../../data/connect';
import jwt from 'koa-jwt';
import { config } from '../../data/config';



@ObjectType()
class File{

    

    @Field(type => String)
    _id: ObjectId | undefined;

    @Field(type => String)
    owner: ObjectId | undefined;

    @Field(type => String)
    location: string | undefined;
    
    @Field(type => String)
    filename: string | undefined;;
    
    @Field(type => String)
    type: string | undefined;;
    
    @Field(type => Date)
    uploadDate: Date | undefined;;
    
    @Field(type => Date)
    dateLastEdit: Date| undefined;;
    
    @Field(type => [String])
    shared: Array<string> | undefined;; //id users 
    
    @Field(type => String)
    description: string | undefined;;
    
    @Field(type => [String])
    tags: Array<string> | undefined;

}



@Resolver(File)
class FileResolver{

    
    constructor() {}


    @Query(returns => File )
    async file(@Arg("id") id: string,@Ctx() ctx:any) {
      console.log()
      const recipe = await dbfiles.findOne({_id:new ObjectId(id),owner:ctx.state.user.id});
      if (recipe === undefined) {
         throw new Error("EE");
         
        
      }
      return recipe;
    }
    
    @Query(returns => [File])
    async files(@Ctx() ctx:any) {
      const userID = ctx.state.user.id || "test"; //|| "test"
      
      //console.log(ctx.state);
      return await dbfiles.find({owner:userID}).toArray();
    }
    
    @Query(returns => [File])
    async filessharedwithme(@Ctx() ctx:any) {
      const userID = ctx.state.user.id || "test"; //|| "test"
      
      //console.log(ctx.state);
      return await dbfiles.find({shared:userID}).toArray();
    }
  
   
}

const GraphQlRouter = new Router();

if(config.protection)
GraphQlRouter.use(jwt({ secret: config.jwtkey , algorithms:["HS256"]}));

buildSchema({
    resolvers: [FileResolver],
  }).then((schema)=>GraphQlRouter.all(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true,
      
    }),
  ));

export default GraphQlRouter;