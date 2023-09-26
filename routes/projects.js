const express=require('express');
const router=express.Router();
const {body,validationResult}=require('express-validator')
const Projects=require('../models/Projects');

router.post('/createproject',[
    body('projectname', 'please enter the project name').isLength({ min: 4 }), async (req, res) => {
        const errors = validationResult(req);
        let success=false;
        if (!errors.isEmpty()) {
          return res.status(400).json({ success,errors: errors.array() });
        }
        try {
            const project= await Projects.create({
              projectname:req.body.projectname,
              projectImage:req.body.projectImage,
              projectItems: req.body.projectItems ,
              projectdescription:req.body.projectdescription
            })
            success=true;
            res.json({project,success})
            
        } catch (error) {
            res.json({error});
        }
    }
      
])
router.put('/createitem/:id',async(req,res)=>{
  const id=req.params.id;
  const itemobject={
    itemname:req.body.itemname,
    itemdescription:req.body.itemdescription,
    itemphoto:req.body.itemphoto,
    itemUrl:req.body.itemUrl,
  }
 await Projects.findOneAndUpdate(
    { _id: id },
    { $push: { projectItems: itemobject } },
    { new: true })
    .then(updatedDoc => {
      res.json({success:"item has been successfully added"})
    })
    .catch(err => {
      console.error(err);
    });
})
router.get('/getprojects', async(req,res)=>{
 try {
 const data=await Projects.find({})
  .select('projectname projectImage projectdescription')
  res.json(data)
 } catch (error) {
  res.json({error});
 }
})
router.get('/getprojectsname', async(req,res)=>{
  try {
  const data=await Projects.find({})
   .select('projectname')
   res.json(data)
  } catch (error) {
   res.json({error});
  }
 })
router.delete('/deleteproject/:id', async (req, res) => {
  try {
    const documentId = req.params.id;

    // Use findOneAndDelete to find and delete the document by its ID
    const deletedDocument = await Projects.findOneAndDelete({ _id: documentId })

    if (!deletedDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({ message: 'Document deleted successfully', deletedDocument });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.put('/deleteitem', async(req,res)=>{
  const projectname = req.body.projectname; // Replace with the actual main document ID
const subdocumentIdToDelete = req.body.id; // Replace with the actual subdocument ID you want to delete
try {
  
const data=  await Projects.findOneAndUpdate(
  { projectname: projectname},
    {
      $pull: { projectItems: { _id: subdocumentIdToDelete } }
    },
    { new: true })
    res.json({sucess:"item delete has been successfull",data})
} catch (error) {
  res.status(500).json({error})
}
  

})
router.get('/getsingleitem', async(req,res)=>{
  const projectname = 'python 4'; // Replace with the actual main document ID
const subdocumentIdToFetch = '650f252ae25e6456017b7f87'; // Replace with the actual subdocument ID
try {
  const data= await Projects.findOne(
   { projectname: projectname, 'projectItems._id': subdocumentIdToFetch },
   { 'projectItems.$': 1 },
   
 );
  res.json(data);
} catch (error) {
  res.status(500).json({error});
}
})
router.get('/getsingleproject', async(req,res)=>{
  const id=req.header('id')
 try {
 const data=await Projects.findById({_id:id})
  .select('projectItems')
  res.json(data.projectItems)
 } catch (error) {
  res.json({error});
 }
})
module.exports=router;