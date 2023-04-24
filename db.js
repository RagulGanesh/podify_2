const mongoose=require('mongoose');

const mongoURI="mongodb+srv://ragulpretish:4P3qO7LWxB6cdICI@cluster0.k1fke3g.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo=()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("Connected Successfully");
    })
}


module.exports = connectToMongo