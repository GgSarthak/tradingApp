const postgre = require("../database");
const bookController = {
  getAll: async (req, res) => {
    try {
      const { rows } = await postgre.query("select * from employees");
      console.log("Rows", rows);
      res.json({ msg: "OK", data: rows });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },
  loginByEmailPassword: async (req, res) => {
    try {
      const { rows } = await postgre.query(
        "select first_name,last_name,user_id,email  from employees where email = $1 and password = $2 ",
        [req.params.email, req.params.password]
      );
      if (rows[0]) {
        return res.json({ msg: "OK", login: true, data: rows[0] });
      } else {
        return res.json({ msg: "LOGIN FAILED", login: false });
      }
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },
  buyCreateTable: async (req, res) => {
    const { user, currentPrice, status, buyPrice, quantity, bankname } =
      req.body;

    const sql = `INSERT INTO buyTable (user_id, status, bankname, buy_prise, current_prise, quantity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * `;

    try {
      const { rows } = await postgre.query(sql, [
        user,
        status,
        bankname,
        buyPrice,
        currentPrice,
        quantity,
      ]);
      return res.json({ msg: "Insertion successful" });
    } catch (err) {
      // Handle errors here
      console.error("Error inserting data:", err);
      // You might want to send an error response to the client
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getBuyRecordsById: async (req, res) => {
    try {
      const { rows } = await postgre.query(
        "select * from buyTable where user_id = $1",
        [req.params.userId]
      );
      res.json({ msg: "OK", data: rows });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },
  // updateById: async(req, res) => {
  //     try {
  //         const { name, price } = req.body

  //         const sql = 'UPDATE books set name = $1, price = $2 where book_id = $3 RETURNING *'

  //         const { rows } = await postgre.query(sql, [name, price, req.params.id])

  //         res.json({msg: "OK", data: rows[0]})

  //     } catch (error) {
  //         res.json({msg: error.msg})
  //     }
  // },
  // deleteById: async(req, res) => {
  //     try {
  //         const sql = 'DELETE FROM books where book_id = $1 RETURNING *'

  //         const { rows } = await postgre.query(sql, [req.params.id])

  //         if (rows[0]) {
  //             return res.json({msg: "OK", data: rows[0]})
  //         }

  //         return res.status(404).json({msg: "not found"})

  //     } catch (error) {
  //         res.json({msg: error.msg})
  //     }
  // }
};

module.exports = bookController;
