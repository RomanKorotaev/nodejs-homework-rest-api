import {MongoClient} from 'mongodb' // дописали флаг -r dotenv/config   в файл  package.json в скрипте "start:dev"  и "start" 

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://Roman:<password>@cluster0.kiz7z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const uri = process.env.URI_DB

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db= client.connect();

//Этот код срабатывает для отключения от базы данных, когда нижимаем Ctrl+C
process.on('SIGINT', async () => {
    const client = await db
    client.close()
    console.log ('Connection DB closed')
})

export default db;