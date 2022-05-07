import { Low, JSONFile } from 'lowdb';


const adapter = new JSONFile('db.json')
const db = new Low(adapter)

await db.read();

db.data = db.data || {};
db.data.messages = db.data.messages || [];

console.log('db.data :>> ', db.data);

export default db