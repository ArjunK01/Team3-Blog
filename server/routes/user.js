var express = require("express");
var router = express.Router();
const db = require("../firebase");

//get user by id
router.get("/get/:id", async (req, res) => {
  var user_id = req.params.id;
  var doc = await db.collection("user").doc(user_id).get();
  //get all data about that user
  if (doc.exists) {
    var user_data = { id: doc.id, ...doc.data()};
  }
  else{
    res.sendStatus(404);
  }

  //get merch data
  for(let i = 0; i < user_data.purchasedMerch.length; i++){
    let merch_data = await db.collection("merch").doc(user_data.purchasedMerch[i]).get()
    user_data.purchasedMerch[i] = { id: merch_data.id, ...merch_data.data()};
  }

  //get liked blog posts
  for(let i = 0; i < user_data.likedBlogPosts.length; i++){
    let bloglike_data = await db.collection("blogs").doc(user_data.likedBlogPosts[i]).get()
    user_data.likedBlogPosts[i] = { id: bloglike_data.id, ...bloglike_data.data()};
  }
  //get blog post comments
  for(let i = 0; i < user_data.blogComments.length; i++){
    let blog_id = user_data.blogComments[i].blog_id;
    let comment_id = user_data.blogComments[i].comment_id;
    let blogcomment_data = await db.collection("blogs").doc(blog_id).collection("comments").doc(comment_id).get();
    user_data.blogComments[i] = { id: blogcomment_data.id, ...blogcomment_data.data()};
  }

  //get forum posts
  for(let i = 0; i < user_data.forumPosts.length; i++){
    let forumpost_data = await db.collection("forums").doc(user_data.forumPosts[i]).get()
    user_data.forumPosts[i] = { id: forumpost_data.id, ...forumpost_data.data()};
  }
  //get liked forum posts
  for(let i = 0; i < user_data.forumLikes.length; i++){
    let forumlike_data = await db.collection("forums").doc(user_data.forumLikes[i]).get()
    user_data.forumLikes[i] = { id: forumlike_data.id, ...forumlike_data.data()};
  }
  //get forum post comments
  for(let i = 0; i < user_data.forumComments.length; i++){
    let forum_id = user_data.forumComments[i].forum_id;
    let comment_id = user_data.forumComments[i].comment_id;
    let forumcomment_data = await db.collection("forums").doc(forum_id).collection("comments").doc(comment_id).get();
    user_data.forumComments[i] = { id: forumcomment_data.id, ...forumcomment_data.data()};
  }

  res.send(user_data);
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
    id,
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

  let test = await db.collection('user').doc(id).set({
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
