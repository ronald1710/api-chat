const { Router } = require("express");
const {
  conversationInPairs, conversationInGroup, userInConversations, conversationsIncludeUsersAndMessages, deleteConversation,
} = require("../controllers/conversations.controllers");
const {
  conversationsInPairsValidator, conversationsInGroupValidator,
} = require("../validators/conversation.validators");
const authenticate = require("../middlewares/auth.middleware")

const router = Router();

router.post("/conversations/pair", authenticate, conversationsInPairsValidator, conversationInPairs);
router.post("/conversations/group", authenticate, conversationsInGroupValidator, conversationInGroup);
router.get("/conversations/user/:id", userInConversations)
router.get("/info/conversations/:id", conversationsIncludeUsersAndMessages)
router.delete("/delete/conversation/:id", deleteConversation)


module.exports = router;
