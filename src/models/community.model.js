const db = require("../config/db");

// create community
exports.create = async (data) => {
  const result = await db.query(
    "SELECT public.fn_insert_communities($1) AS result",
    [data]
  );
  return result.rows[0].result; 
};

exports.update = async (id, data) => {
  const result = await db.query(
    "SELECT public.fn_update_community($1,$2) AS result",
    [id, data]
  );
  return result.rows[0].result;
};



// exports.delete = async (id) => {
//   const result = await db.query(
//     "SELECT public.fn_delete_communities($1) AS result",
//     [id]
//   );
//   return result.rows[0].result;
// };

exports.delete = async (id, updated_by) => {
  const result = await db.query(
    "SELECT public.fn_delete_communities($1,$2) AS result",
    [id, updated_by]
  );
  return result.rows[0].result;
};

// exports.getById = async (id) => {
//   const result = await db.query(
//     "SELECT * FROM communities WHERE community_id = $1",
//     [id]
//   );
//   return result.rows[0];
// };
exports.getById = async (id) => {

const result = await db.query(
`SELECT * FROM public.fn_get_community_by_id($1)`,
[id]
);

return result.rows[0];

};

// exports.getAll = async (search = "") => {
//   const result = await db.query(
//     `SELECT * FROM communities
//      WHERE is_active = true
//      AND community_name ILIKE $1
//      ORDER BY community_id DESC`,
//     [`%${search}%`]
//   );
//   return result.rows;
// };

exports.getAll = async (search = "") => {

const result = await db.query(
`SELECT * FROM public.fn_get_communities($1)`,
[search]
);

return result.rows;

};