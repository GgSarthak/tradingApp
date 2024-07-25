const { Pool } = require('pg')
 
const pool = new Pool({
  connectionString: "postgres://default:DUnbA7WBu0qS@ep-little-feather-a40tzdyj-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
})

pool.connect((err) => {
    if (err) throw err
    console.log("Connect to PostgreSQL successfully!")
})

module.exports = pool