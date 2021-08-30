import {
    MongoClient
} from 'mongodb'

// Connection URL

let db: any = null;
let dbusers: any = null;
let dbfiles: any = null;
// Database Name

async function connectToDB({
    url,
    dbname
}: {
    url: string,
    dbname: string
}) {
    const client = new MongoClient(url)
    // Use connect method to connect to the server
    await client.connect()
    console.log('Connected successfully to server')
    db = client.db(dbname);
    dbusers = db.collection('users');
    dbfiles = db.collection('files');


    // the following code examples can be pasted here...

    return 'done.'
}

export {
    connectToDB,
    db,
    dbusers,
    dbfiles
};

