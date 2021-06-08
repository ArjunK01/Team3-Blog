var express = require("express");
var router = express.Router();
const db = require("../firebase");

//get user by id
router.get("/get/:id", async (req, res) => {
  var user_id = req.params.id;
  db.collection("user").doc(user_id).get()
  .then((doc) => {
    if (doc.exists) {
      res.send({ id: doc.id, ...doc.data()});
    }
    else {
      res.sendStatus(404);
    }
  })
  .catch((error) => {
    res.sendStatus(404);
  });
})

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

  res.sendStatus(200);
});

//edit user by id
router.put("/edit", async (req, res) => {
  const {
    user_id,
    name,
    handle,
    email,
    birthday,
  } = req.body;

  await db.collection("user").doc(user_id).update({
    name,
    handle,
    email,
    birthday,
  });

  db.collection("user").doc(user_id).get()
  .then((doc) => {
    if (doc.exists) {
      res.send({ id: doc.id, ...doc.data()});
    }
    else {
      res.sendStatus(404);
    }
  })
  .catch((error) => {
    res.sendStatus(404);
  });

})

module.exports = router;
