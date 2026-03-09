  
const model = require("../models/customer.model");
const db = require("../config/db");


// CREATE CUSTOMER


// exports.create = async (req,res)=>{

// try{

// const data = req.body;

// if(req.file){
// data.profile_picture = `/uploads/${req.file.filename}`;
// }

// const result = await model.create(data);

// res.json({
// success:true,
// data:result
// });

// }catch(err){

// res.status(500).json({
// success:false,
// message:err.message
// });

// }

// };

//create CUstomer Updated code
exports.create = async (req, res) => {
  try {

    const data = req.body;

    // DEBUG
    console.log("FILES:", req.files);

    // profile picture
    if (req.files && req.files.profile_picture && req.files.profile_picture.length > 0) {
      data.profile_picture = "/uploads/" + req.files.profile_picture[0].filename;
    }

    // CREATE CUSTOMER
    const result = await model.create(data);

    // INSERT DOCUMENTS
    if (req.files && req.files.document) {

      const descriptions = req.body.description || [];

      for (let i = 0; i < req.files.document.length; i++) {

        await db.query(
          `INSERT INTO documents
          (customer_id, description, document_url, created_by)
          VALUES ($1,$2,$3,$4)`,
          [
            result.customer_id,
            descriptions[i] || null,
            "/uploads/" + req.files.document[i].filename,
            data.created_by
          ]
        );

      }

    }

    res.json({
      success: true,
      data: result
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};



// GET ALL CUSTOMERS
exports.getAll = async (req,res)=>{

  try{
  
  const { search } = req.query;
  
  const customers = await model.getAll({ search });
  
  res.json({
  success:true,
  data:customers
  });
  
  }catch(err){
  
  res.status(500).json({
  success:false,
  message:err.message
  });
  
  }
  
  };


// GET CUSTOMER BY ID
exports.getById = async (req,res)=>{

try{

const data = await model.getById(req.params.id);

res.json({
success:true,
data
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

};


// UPDATE CUSTOMER
exports.update = async (req,res)=>{

try{

const data = req.body;

if(req.file){
data.profile_picture = `/uploads/${req.file.filename}`;
}

const result = await model.update(req.params.id,data);

res.json({
success:true,
data:result
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

};


// DELETE CUSTOMER
exports.delete = async (req,res)=>{

try{

const result = await model.delete(
req.params.id,
req.body.updated_by
);

res.json(result);

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

};