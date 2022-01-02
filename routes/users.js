const router = require("express").Router({ mergeParams: true });

const { protect, authorizeRole, authorizeName } = require("../middleware/auth");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.use(protect);
router.use(authorizeRole("admin"));
router.use(authorizeName("admin"));

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
