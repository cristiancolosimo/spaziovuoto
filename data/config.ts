import * as fs from 'fs';

let config = JSON.parse(fs.readFileSync("./config.json").toString());

export {config};