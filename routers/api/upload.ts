import Router from "@koa/router";
import bodyParser from 'koa-body';
import { db, dbfiles } from "../../data/connect";

const uploadRouter = new Router();

uploadRouter.prefix("/upload");

uploadRouter.use(bodyParser({
    formidable:{uploadDir: './assets/upload',keepExtensions: true},    //This is where the files would come
    multipart: true,
    urlencoded: true}
));

uploadRouter.get("/",async (ctx,next)=>{
    ctx.body = `<html>

    <head>
        <title>File uploads</title>
    </head>
    
    <body>
        <form action="/api/upload" method="POST" enctype="multipart/form-data">
            
            <div><input type="file" name="data" multiple/></div>
            <div><input type="submit" /></div>
        </form>
    </body>
    
    </html>`;
})
uploadRouter.post("/", async  (ctx,next)=>{
    console.log("Files: ", ctx.request.files);
    
    ctx.body = "Received your data!"; //This is where the parsed request is stored
    
    let data:any = ctx.request.files;
    let insertObjs = data.data.map((file:any)=>{

        return {owner: "test",//ctx.state.user.id ||
            location:file.path.replace("assets/upload/",""), 
            filename:file.name,
            type:file.type,
            uploadDate: new Date(), 
            dateLastEdit:new Date(),
            shared:[], 
            description:"",
            tags:[],

        };
    });

    await dbfiles.insertMany(insertObjs);
    ctx.status = 200;
    /**
     * il file nel filesystem sarà formato da userid/data_ora_minuto_secondo_hash_almomento del upload.file, 
file db si salverà il nome originario del file, 
il percorso relativo dove è salvato, estensione del file , 
descrizione = "", 
proprietario del file = ctx.state.user.id, 
data di upload (ottenuta dal server)
data ultima modifica(uguale alla data di upload)

     */
    //const userID = ctx.state.user.id || "";

});

uploadRouter.get("/files", async (ctx) => {
    const searchFile = await dbfiles.find({owner:"test"}).toArray();

    let imgs = searchFile.map((file:any) =>`<img src="/upload/${file.location}" alt="${file.filename}" style="width:400px;float:left"/> `);

    ctx.body =  `<head>
    <title>File uploads</title>
</head>

<body>
    ${imgs}
</body>

</html>`
})
export default uploadRouter;