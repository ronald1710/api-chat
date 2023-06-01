const { Router } = require("express");
const { addNewMessageInConversation } = require("../controllers/messages.controllers");


const router = Router();

 router.post("/new/message", addNewMessageInConversation);



module.exports = router;
