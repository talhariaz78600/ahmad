const express=require('express');
const connectToMongo=require('./db');
const bodyParser = require('body-parser');
const cors=require('cors')
const app = express()
const port =process.env.port|| 4000;
app.use(express.json())
app.use(bodyParser.json({ limit: '100mb' }));
// app.use(express.json({ limit: '100mb' }));
// app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());
connectToMongo();
///avilable routes////////
app.get('/',(req,res)=>{
  res.send("<h1>working fine</h1>")

})
app.use('/api/admin',require('./routes/admin'));
app.use('/api/project',require('./routes/projects'));
const server=app.listen(port, () => {
    console.log(`app listening on port ${port}`)
    
  })
  server.timeout = 60000;