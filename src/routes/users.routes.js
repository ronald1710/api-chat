const { Router } = require("express");
const {
  createUser,
  login,
  getAllUsers,
  addUserInConversationGroup,
  deletUserInConversationGroup,
} = require("../controllers/users.controlles");
const {
  createUserValidator,
  loginUserValidator,
} = require("../validators/user.validators");
const authenticate = require("../middlewares/auth.middleware")

const router = Router();

router.post("/user", createUserValidator, createUser);
router.post("/user/login", loginUserValidator, login);
router.get("/users", getAllUsers);
router.post("/adduser", authenticate, addUserInConversationGroup )
router.delete("/deleteuser", authenticate, deletUserInConversationGroup)

module.exports = router;