// const mongoose = require('mongoose');

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://hodabaa37:ahmedhat22@cluster0.ouz4gqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// // Check database connected or not
// // connect.then(() => {
// //     console.log("Database Connected Successfully");
// // })
// // .catch(() => {
// //     console.log("Database cannot be Connected");
// // })

// // Create Schema
// const connectSchema = new mongoose.Schema({
//     name: {
//         type:String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// });

// // collection part
// const collection = new mongoose.model("accounts", connectSchema);

require('dotenv').config();
const mongoose = require('mongoose');

// Use environment variable for the connection string
const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('MongoDB URI is not defined in environment variables');
    process.exit(1);
}

// Rest of your code remains the same...

// Connect using mongoose
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Database Connected Successfully");
})
.catch((err) => {
    console.log("Database Connection Error:", err);
});

// Create Schema
const connectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// collection part
const collection = mongoose.model("accounts", connectSchema);

module.exports = collection;