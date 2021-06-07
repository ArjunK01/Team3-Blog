var express = require("express");
var router = express.Router();
const db = require("../firebase");

//get user by id


//delete user
//sends status 200
router.delete("/delete", async (req, res) => {
  const { user_id } = req.body;
  db.collection("user").doc(user_id).delete();
  res.sendStatus(200);
});

//create user
//sends status 200
router.post("/create", async (req, res) => {
  const {
    name,
    handle,
    email,
    birthday,
  } = req.body;

  const [
    isAdmin,
    likedBlogPosts,
    blogComments,
    forumPosts,
    forumLikes,
    forumComments,
    purchasedMerch,
  ] = [false, [], [], [], [], [], []]

  await db.collection("user").add({
    name,
    handle,
    email,
    birthday,
    isAdmin,
    likedBlogPosts,
    blogComments,
    forumPosts,
    forumLikes,
    forumComments,
    purchasedMerch,
  });

  sendStatus(200);
});

module.exports = router;
