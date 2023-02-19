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

        app.get('/patients/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const patient = await patientCollection.findOne(query);
            res.send(patient);
        })

        app.post('/tasks', async(req, res) => {
            const newTask = req.body;
            const result = await taskCollection.insertOne(newTask);
            res.send(result);
        })

        app.delete('/patients/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await patientCollection.deleteOne(query);
            res.send(result);
        })

        app.put('/patients/:id', async(req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const patient = req.body;
            const option = { upsert: true };
            const updatedDoc = {
                $set: {
                    firstName: patient.firstName,
                    lastName: patient.lastName,
                    phone: patient.phone,
                    email: patient.email
                }
            }
            const result = await patientCollection.updateOne(filter, updatedDoc, option);
            res.send(result);
        })
      

    }

    finally{

    }
}

run().catch(console.dir);

