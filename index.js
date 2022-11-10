const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const foodCollection = client.db('FoodHunter').collection('FoodLists');
        const reviewCollection = client.db('FoodHunter').collection('FoodReviews');

        app.get('/foods', async(req, res)=>{
            const query = {};
            const cursor = foodCollection.find(query);
            const foods = await cursor.toArray();
            res.send(foods);
        })
        app.get('/allreview', async(req, res)=>{
            const query = {};
            console.log(query);
            const cursor = reviewCollection.find(query);
            const allreview = await cursor.toArray();
            res.send(allreview);
        })

        app.get('/foods/:id', async(req, res)=>{
            const id = req.params.id;
            const query = { _id : ObjectId(id)};
            const food = await foodCollection.findOne(query);
            res.send(food);
        })

        app.get('/reviewsbyid', async(req, res)=>{
            const serviceId = req.query.serviceId;
            const query = { serviceId:serviceId};
            const reviews = await reviewCollection.find(query).toArray();
            res.send(reviews);
        })

        app.post('/reviews', async(req, res)=>{
            const reviewDetails = req.body;
            const result = await reviewCollection.insertOne(reviewDetails);
            res.send(result);
        })
        
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