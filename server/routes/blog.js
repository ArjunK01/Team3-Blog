var express = require("express");
var router = express.Router();
const db = require("../firebase");
const admin = require("firebase-admin");


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
        temp.push({
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          image: doc.data().image,
          likes: doc.data().likes,
          city: doc.data().city,
          isFeatured: doc.data().isFeatured,
          createdDate: doc.data().createdDate.toDate()
        });
      });
    })
    .then(() => {
      res.send(temp);
    });
});
/**
 * Retrieve featured blogs from collection
 * Sends as an array
 */
 router.get("/getfeatured", (req, res) => {
  const blogRef = db.collection("blogs");
  let temp = [];
  blogRef
    .get()
    .then((resp) => {
      resp.forEach((doc) => {
        if (doc.isFeatured) {
          temp.push({
            id: doc.id,
            title: doc.data().title,
            content: doc.data().content,
            image: doc.data().image,
            likes: doc.data().likes,
            city: doc.data().city,
            isFeatured: doc.data().isFeatured,
            createdDate: doc.data().createdDate.toDate()
          });
        }
      });
    })
    .then(() => {
      res.send(temp);
    });
});
/**
 * Retrieve blog by id from collection
 */
router.get("/get/:id", (req, res) => {
  db.collection("blogs").doc(req.params.id).get()
    .then((doc) => {
      if (doc.exists) {
        res.send({
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          image: doc.data().image,
          likes: doc.data().likes,
          city: doc.data().city,
          isFeatured: doc.data().isFeatured,
          createdDate: doc.data().createdDate.toDate()
        });
      }
      else {
        res.sendStatus(404);
      }
    })
    .catch((error) => {
      res.sendStatus(404);
    })
});
/**
 * Create a new blog post
 * Request body includes all blog information
 */
router.post("/create", async(req, res) => {
  const{
    blog_id,
    title,
    content,
    image,
    likes,
    city,
    isFeatured
  } = req.body;
  const createdDate = admin.firestore.Timestamp.now()
  await db.collection("blogs").doc(blog_id).set({
    title,
    content,
    image,
    likes,
    city,
    isFeatured,
    createdDate
  });

  res.sendStatus(200);
});

/**
 * Adds a like to the blog post
 * If user has already liked, takes away their like
 * Sends status 200 if successful, 404 otherwise
 */
router.put("/like", (req, res) => {
  const { blog_id, user_id } = req.body;
  let curr_likes = [];
  db.collection("blogs").doc(blog_id).get()
  .then((doc) => {
    if (doc.exists) {
      curr_likes = doc.data().likes;
    }
    else {
      res.sendStatus(404);
    }
    let init_length = curr_likes.length;
    curr_likes.forEach((like, index, object) => {
      if (like === user_id) {
        object.splice(index, 1);
      }
    });
    if (curr_likes.length === init_length) {
      curr_likes.push(user_id)
    }
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
        temp.push({id: doc.id, ...doc.data()});
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
  await db.collection("blogs").doc(req.params.id).collection("comments").push(req.body);

  res.sendStatus(200);
});
/**
 * Likes comment
 * Body is the comment id
 * @param id - the ID of the blog post being commented on
 * Sends 200 if like made succesffully
 */
router.put("/comments/like/:id", (req, res) => {  
  const { comment_id, user_id } = req.body;
  let curr_likes = [];
  db.collection("blogs").doc(req.params.id).collection("comments").doc(comment_id).get()
  .then((doc) => {
    if (doc.exists) {
      curr_likes = doc.data().likes;
    }
    else {
      res.sendStatus(404);
    }
    let init_length = curr_likes.length;
    curr_likes.forEach((like, index, object) => {
      if (like === user_id) {
        object.splice(index, 1);
      }
    });
    if (curr_likes.length === init_length) {
      curr_likes.push(user_id)
    }
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
});
/**
 * Deletes a comment
 * ID of the comment in body
 * @param id - blog post whose comment is being deleted
 */
router.delete("/comments/delete/id:", async(req, res) => {
  const { id } = req.body;

  await db.collection("blogs").doc(req.params.id).collection("comments").doc(id).delete();

  res.sendStatus(200);
});
/**
 * Edits a comment
 * All new comment information in body
 * @param id - the blog post whose comment is being edited
 */
router.put("/comments/edit/id:", async(req, res) => {
  await db.collection("blogs").doc(req.params.id).collection("comments").doc(req.body.id).update(req.body);

  res.sendStatus(200);
});

module.exports = router;
