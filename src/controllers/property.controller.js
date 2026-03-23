// const model = require("../models/property.model");

// exports.getAll = async (req, res) => {
//   try {
//     const data = await model.getAll(req.query.search || "");
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// exports.create = async (req, res) => {
//   try {

//     const data = req.body;

//     if (req.file) {
//       data.profile_picture = `/uploads/${req.file.filename}`;
//     }

//     console.log("DATA:", data);

//     const result = await model.create(data);

//     res.json({
//       success: true,
//       message: "Property created successfully",
//       data: result
//     });

//   } catch (err) {

//     console.error(err);

//     res.status(500).json({
//       success: false,
//       message: err.message
//     });

//   }
// };

// exports.update = async (req, res) => {
//   try {
//     let data = req.body;
    
//     // Parse data if it's sent as a JSON string (for FormData)
//     if (data.data) {
//       data = JSON.parse(data.data);
//     }
    
//     // Handle file upload if present
//     if (req.file) {
//       data.property_image = `/uploads/${req.file.filename}`;
//     }
    
//     console.log("=== UPDATE DEBUG ===");
//     console.log("Property ID:", req.params.id);
//     console.log("Received data:", JSON.stringify(data, null, 2));
    
//     const result = await model.update(req.params.id, data);
    
//     console.log("Database result:", result);
//     console.log("=== END DEBUG ===");
    
//     if (result.success === false) {
//       return res.status(400).json(result);
//     }
    
//     return res.status(200).json({
//       success: true,
//       message: "Property updated successfully",
//       data: result
//     });
    
//   } catch (err) {
//     console.error("Update error:", err);
//     return res.status(500).json({ 
//       success: false, 
//       message: err.message 
//     });
//   }
// };
// exports.delete = async (req, res) => {
//   try {
//     const result = await model.delete(req.params.id);

//     if (!result.success) {
//       return res.status(404).json({
//         success: false,
//         message: "Property not found"
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Property deleted permanently"
//     });

//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: err.message
//     });
//   }
// };


// // In your property.controller.js - getById
// exports.getById = async (req, res) => {
//   try {
//     const data = await model.getById(req.params.id);

//     if (!data) {
//       return res.status(404).json({
//         success: false,
//         message: "Property not found"
//       });
//     }

//     console.log("getById returning:", data); // Debug log

//     return res.json({
//       success: true,
//       data
//     });

//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: err.message
//     });
//   }
// };

// exports.getByCommunity = async (req, res) => {
//   try {
//     const communityId = req.params.community_id;

//     const data = await model.getByCommunity(communityId);

//     return res.json({
//       success: true,
//       data
//     });

//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: err.message
//     });
//   }
// };



//updated code

const model = require("../models/property.model");


// GET ALL
exports.getAll = async (req,res)=>{

try{

const data = await model.getAll();

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


// CREATE
exports.create = async (req,res)=>{

try{

const data=req.body;

if(req.file){
data.profile_picture="/uploads/"+req.file.filename;
}

const result=await model.create(data);

res.json({
success:true,
message:"Building created successfully",
data:result
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

};


// GET BY ID
exports.getById = async (req,res)=>{

try{

const data=await model.getById(req.params.id);

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


// GET BY COMMUNITY
exports.getByCommunity = async (req,res)=>{

try{

const data=await model.getByCommunity(req.params.community_id);

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


// UPDATE
// exports.update = async (req,res)=>{

// try{

// const data=req.body;

// if(req.file){
// data.profile_picture="/uploads/"+req.file.filename;
// }

// const result=await model.update(req.params.id,data);

// res.json(result);

// }catch(err){

// res.status(500).json({
// success:false,
// message:err.message
// });

// }

// };

exports.update = async (req, res) => {

  try {

    // create new object from body
    let data = { ...req.body };

    // attach file if uploaded
    if (req.file) {
      data.profile_picture = "/uploads/" + req.file.filename;
    }

    const result = await model.update(req.params.id, data);

    return res.json(result);

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message
    });

  }

};


// DELETE
exports.delete = async (req,res)=>{

try{

const result=await model.delete(req.params.id,req.body.updated_by);

res.json(result);

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

};