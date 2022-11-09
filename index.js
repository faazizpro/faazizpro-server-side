const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


// Middle Wares
app.use(cors());
app.use(express.json());

// MongoDB Operations:

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kay6ipu.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);   

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        
    }
    finally{

    }
}
run().catch(err => console.log(err));




app.get('/', (req, res)=>{
    res.send('FoodHunter Server is Running')
});

app.listen(port, ()=>{
    console.log(`FoodHunter Server is Running on port ${port}`);
})