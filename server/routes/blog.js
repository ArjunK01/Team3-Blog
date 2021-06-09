var express = require("express");
var router = express.Router();
const db = require("../firebase");
var admin = require('firebase-admin');

router.get("/", (req, res) => {
  res.send("test");
});

/**
 * Retrieve all blogs from collection
 * Sends as an array
 */
router.get("/get", (req, res) => {
  const blogRef = db.collection("blogs");
  let temp = [];
  blogRef
    .get()
    .then((resp) => {
      resp.forEach((doc) => {
        temp.push(doc.data());
      });
    })
    .then(() => {
      res.send(temp);
    });
});

/**
 * Create a new blog post
 * Request body includes all blog information
 */
router.post("/create", async(req, res) => {
  await db.collection("blogs").doc(req.body.id).set(req.body);

  res.sendStatus(200);
});

/**
 * Adds a like to the blog post
 * Increments the likes field, and updates the blog post
 * Sends status 200 if successful, 404 otherwise
 */
router.put("/like", (req, res) => {
  const { blog_id, user_id } = req.body;
  db.collection("blogs").doc(blog_id).get()
  .then((doc) => {
    if (doc.exists) {
      curr_likes = doc.data().likes;
    }
    else {
      res.sendStatus(404);
    }
    curr_likes = curr_likes+1;

    db.collection("blogs").doc(blog_id)
    .update({
      likes: curr_likes,
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.sendStatus(404);
    });

    var user_data = db.collection("user").doc(user_id);
    var arrUnion = user_data.update({
      likedBlogPosts: admin.firestore.FieldValue.arrayUnion(blog_id)
    });
  });
});
/**
 * Deletes the blog with id given in body
 * returns 200 if done successfully
 */
router.delete("/delete", async(req, res) => {
  const { id } = req.body;

  await db.collection("blogs").doc(id).delete();

  res.sendStatus(200);
});
/**
 * Edits the blog
 * All new blog info in body
 * Sends 200 when successful
 */
router.put("/edit", async(req, res) => {
  await db.collection("blogs").doc(req.body.id).update(req.body);

  res.sendStatus(200);
});
/**
 * Retrieve all comments from the blog post
 * @param id - the ID of the blog post whose comments you're retrieving
 * Sends an array of comments
 */
router.get("/comments/get/:id", (req, res) => {
  const commentRef = db.collection("blogs").doc(req.params.id).collection("comments");
  let temp = [];
  commentRef
    .get()
    .then((resp) => {
      resp.forEach((doc) => {
        temp.push(doc.data());
      });
    })
    .then(() => {
      res.send(temp);
    });
});
/**
 * Posts new comment the blog post
 * Body is all the information for the new comment
 * @param id - the ID of the blog post being commented on
 * Sends 200 if comment made succesffully
 */
router.post("/comments/create/:id", async(req, res) => {
  db.collection("blogs").doc(req.params.id).collection("comments").add(req.body)
  .then(docRef => {
    console.log(docRef.id);
    var user_data = db.collection("user").doc(req.body.user_id);
    var arrUnion = user_data.update({
      blogComments: admin.firestore.FieldValue.arrayUnion({"blog_id": req.params.id, "comment_id": docRef.id})
    });
  });
  res.sendStatus(200);
});
/**
 * Likes comment
 * Body is the comment id
 * @param id - the ID of the blog post being commented on
 * Sends 200 if like made succesffully
 */
router.put("/comments/like/:id", (req, res) => {
  const { comment_id } = req.body;
  db.collection("blogs").doc(req.params.id).collection("comments").doc(comment_id).get()
  .then((doc) => {
    if (doc.exists) {
      curr_likes = doc.data().likes;
    }
    else {
      res.sendStatus(404);
    }
    curr_likes = curr_likes+1;

    db.collection("blogs").doc(req.params.id).collection("comments").doc(comment_id)
    .update({
      likes: curr_likes,
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.sendStatus(404);
    });
  });
  res.sendStatus(200);
});
/**
 * Deletes a comment
 * ID of the comment and user in body and
 * @param id - blog post whose comment is being deleted
 */
router.delete("/comments/delete/:id", async(req, res) => {
  const { id, user_id } = req.body;

  await db.collection("blogs").doc(req.params.id).collection("comments").doc(id).delete();

  /*var user_data = db.collection("user").doc(user_id);
  var arrUnion = user_data.update({
    blogComments: admin.firestore.FieldValue.arrayRemove({"blog_id": req.params.id, "comment_id": id})
  });*/

  res.sendStatus(200);
});
/**
 * Edits a comment
 * All new comment information in body
 * @param id - the blog post whose comment is being edited
 */
router.put("/comments/edit/:id", async(req, res) => {
  await db.collection("blogs").doc(req.params.id).collection("comments").doc(req.body.id).update(req.body);

  res.sendStatus(200);
});

module.exports = router;
