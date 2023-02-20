const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});

app.get('/', (req, res) => {
    res.send('Suuup');
})

// Database Credentials
// codu 
// PaY9e49j5FRP1IKt


const uri = "mongodb+srv://codu:PaY9e49j5FRP1IKt@cluster0.tyocyp7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        // collection lists
        const taskCollection = client.db('TaskBeaters').collection('tasks');

        app.get('/tasks', async(req, res) => {
            const email = req.query.email;
            const query = { email};
            const cursor = taskCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);
        })

        app.get('/tasks/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const task = await taskCollection.findOne(query);
            res.send(task);
        })

        app.post('/tasks', async(req, res) => {
            const newTask = req.body;
            const result = await taskCollection.insertOne(newTask);
            res.send(result);
        })

        app.get('/update/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const task = await taskCollection.findOne(query);
            res.send(task);
        })

        app.put('/tasks/:id', async(req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const task = req.body;
            const option = { upsert: true };
            const updatedDoc = {
                $set: {
                    title: task.title,
                    description: task.description
                }
            }
            const result = await taskCollection.updateOne(filter, updatedDoc, option);
            res.send(result);
        })
      

    }

    finally{

    }
}

run().catch(console.dir);

