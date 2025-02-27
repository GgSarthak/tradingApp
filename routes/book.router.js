const express = require("express")
const router = express.Router()

const bookController = require('../controllers/book.controller')

router.get("/", bookController.getAll)
router.get("/login/:email/:password", bookController.loginByEmailPassword)
router.post("/buyOptions", bookController.buyCreateTable)
router.get("/buyOptions/:userId", bookController.getBuyRecordsById)
router.get("/getBalance/:userId", bookController.getBalanceById)
// router.put("/:id", bookController.updateById)
// router.delete("/:id", bookController.deleteById)

module.exports = router