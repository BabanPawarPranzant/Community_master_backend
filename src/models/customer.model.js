const db = require("../config/db");

// // CREATE CUSTOMER
// exports.create = async (data) => {

// const result = await db.query(
// `INSERT INTO customers
// (full_name, gender, email, contact_number, country, city,
// address_line1, address_line2, profile_picture,
// community_id, property_id, unit_id, joining_date, created_by)
// VALUES
// ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
// RETURNING *`,
// [
// data.full_name,
// data.gender,
// data.email,
// data.contact_number,
// data.country,
// data.city,
// data.address_line1,
// data.address_line2,
// data.profile_picture,
// data.community_id,
// data.property_id,
// data.unit_id,
// data.joining_date,
// data.created_by
// ]
// );

// return result.rows[0];

// };


//UPDATED
exports.create = async (data) => {

const result = await db.query(
`INSERT INTO customers
(full_name, gender, email, contact_number, country, city,
address_line1, address_line2, profile_picture,
community_id, property_id, unit_id, joining_date, created_by)
VALUES
($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
RETURNING *`,
[
data.full_name,
data.gender,
data.email,
data.contact_number,
data.country,
data.city,
data.address_line1,
data.address_line2,
data.profile_picture,
data.community_id,
data.property_id,
data.unit_id,
data.joining_date,
data.created_by
]
);

return result.rows[0];

};

// GET ALL CUSTOMERS
// exports.getAll = async ({ community_id = null } = {}) => {
//     let query = `
//       SELECT 
//         property_id, 
//         property_name, 
//         community_id,
//         ... other fields you need
//       FROM properties
//       WHERE is_active = true
//     `;
//     const params = [];
  
//     if (community_id) {
//       query += ` AND community_id = $${params.length + 1}`;
//       params.push(community_id);
//     }
  
//     query += ` ORDER BY property_name ASC`;
  
//     const result = await db.query(query, params);
//     return result.rows;
//   };    

// GET ALL CUSTOMERS ....
exports.getAll = async ({ search = "" } = {}) => {

  let query = `
  SELECT 
  c.customer_id,
  c.full_name,
  c.gender,
  c.email,
  c.contact_number,
  c.country,
  c.city,
  c.address_line1,
  c.address_line2,
  c.profile_picture,
  c.joining_date,
  c.is_active,
  
  com.community_name,
  p.property_name,
  u.unit_number
  
  FROM customers c
  
  LEFT JOIN communities com
  ON com.community_id = c.community_id
  
  LEFT JOIN properties p
  ON p.property_id = c.property_id
  
  LEFT JOIN units u
  ON u.unit_id = c.unit_id
  
  WHERE c.is_active = true
  `;
  
  const params = [];
  
  if (search) {
  query += ` AND (
  c.full_name ILIKE $1
  OR c.email ILIKE $1
  OR c.contact_number ILIKE $1
  )`;
  params.push(`%${search}%`);
  }
  
  query += ` ORDER BY c.customer_id DESC`;
  
  const result = await db.query(query, params);
  
  return result.rows;
  };

// GET CUSTOMER BY ID
exports.getById = async (id) => {

const result = await db.query(
`SELECT 
c.*,
com.community_name,
p.property_name,
u.unit_number

FROM customers c

LEFT JOIN communities com
ON com.community_id = c.community_id

LEFT JOIN properties p
ON p.property_id = c.property_id

LEFT JOIN units u
ON u.unit_id = c.unit_id

WHERE c.customer_id = $1`,
[id]
);

return result.rows[0];

};


// UPDATE CUSTOMER
exports.update = async (id,data)=>{

const result = await db.query(
`UPDATE customers SET
full_name=$1,
gender=$2,
email=$3,
contact_number=$4,
country=$5,
city=$6,
address_line1=$7,
address_line2=$8,
profile_picture=$9,
community_id=$10,
property_id=$11,
unit_id=$12,
joining_date=$13,
updated_by=$14,
updated_at=CURRENT_TIMESTAMP
WHERE customer_id=$15
RETURNING *`,
[
data.full_name,
data.gender,
data.email,
data.contact_number,
data.country,
data.city,
data.address_line1,
data.address_line2,
data.profile_picture,
data.community_id,
data.property_id,
data.unit_id,
data.joining_date,
data.updated_by,
id
]
);

return result.rows[0];

};


// SOFT DELETE CUSTOMER
exports.delete = async (id,updated_by)=>{

await db.query(
`UPDATE customers
SET is_active=false,
updated_by=$1,
updated_at=CURRENT_TIMESTAMP
WHERE customer_id=$2`,
[updated_by,id]
);

return {success:true};

};