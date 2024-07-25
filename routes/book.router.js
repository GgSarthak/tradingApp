const express = require("express")
const router = express.Router()

const bookController = require('../controllers/book.controller')

router.get("/", bookController.getAll)
router.get("/:email/:password", bookController.loginByEmailPassword)
// router.post("/", bookController.create)
// router.put("/:id", bookController.updateById)
// router.delete("/:id", bookController.deleteById)

module.exports = router