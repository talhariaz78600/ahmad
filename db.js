const mongoose = require('mongoose');
const mongooseURI='mongodb+srv://talhariaz:talhariaz@cluster0.k2itfyk.mongodb.net/ahmadportfolio?retryWrites=true&w=majority'
const connectToMongo=()=>{
  mongoose.connect(mongooseURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error', err));
}
mongoose.set('strictQuery', false);
module.exports= connectToMongo;