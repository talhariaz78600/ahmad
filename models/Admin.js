const mongoose=require('mongoose');
const {Schema}=mongoose;
const AdminSchema= new Schema({
    adminname:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        unique:true
    }
})
AdminSchema.index({ name: 1 }, { maxTimeMS: 20000 });

module.exports = mongoose.model('admin', AdminSchema);