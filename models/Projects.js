const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
    itemname: {
        type: String,
        require:true
    },
    itemdescription: {
        type: String,
    },
    itemphoto: {
        type: String,
    },
    itemUrl: {
        type: String,
    }
});

const projectSchema = new Schema({
    projectname: {
        type: String,
        required: true,
        unique: true
    },
    projectImage: {
        type: String,
        required: true,
        unique: true
    },
    projectItems: [itemSchema] ,
    projectdescription:{
        type: String,
        required: true,
    }
});
projectSchema.index({ name: 1 }, { maxTimeMS: 20000 });

module.exports = mongoose.model('projects', projectSchema);

