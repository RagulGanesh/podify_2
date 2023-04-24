const mongoose = require('mongoose');

const { Schema } = mongoose;

const MediaSchema = new Schema({
    name:{
        type: String,
        required : true,
    },
    description:{
        type: String,
        required : true,
    },
    category:{
        type: String,
        required : true,
    },
    speaker:{
        type: String,
        required : true,
    },
    thumbnail:{
        type: String,
        // required: true,
    },
    videos:{
        type: String,
    }
    
});

const Media=mongoose.model('media',MediaSchema);
module.exports = Media;