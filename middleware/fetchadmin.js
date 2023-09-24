var jwt = require('jsonwebtoken');
const JWT_SECRET='Talhaisintelligent';
const fetchadmin=(req,res,next)=>{
const token=req.header('auth-token');
if(!token){
    res.status(401).send({error:"Please authentication using a valid token"})
}
try {
    
    const data=jwt.verify(token,JWT_SECRET);
    req.admin=data.admin;
        next();
} catch (error) {
    res.status(401).send({error:"Please authentication using a valid token"})
}
}
module.exports=fetchadmin;