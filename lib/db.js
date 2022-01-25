// import {MongoClient} from 'mongodb' // дописали флаг -r dotenv/config   в файл  package.json в скрипте "start:dev"  и "start" 

import pkg from 'mongoose'
const { connect, connection } = pkg;

const uri = process.env.URI_DB

// ////////////
// if (process.env.NODE_ENV === 'test') {
//     uri = process.env.URI_DB_TEST
// }else{
//     uri = process.env.URI_DB
// }
//////////


const db = connect (uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

connection.on ('connected', ()=>{
    console.log ('Database connection successful.');
})

connection.on ('err', ()=>{
    console.log (`Mongoose connection error: ${err.message}`);
})

connection.on ('disconnected', ()=>{
    console.log ('Mongoose disconnected from DB.');
})

//Этот код срабатывает для отключения от базы данных, когда нижимаем Ctrl+C
process.on('SIGINT', async () => {
    connection.close();
    console.log ('Connection DB closed');
    process.exit(1)
})

export default db;