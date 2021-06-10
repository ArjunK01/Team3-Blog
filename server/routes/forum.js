var express = require("express");
var router = express.Router();
const db = require("../firebase");

router.get("/", (req, res) => {
  res.send("test");
});
/**
 * Retrieve all forums from collection
 * Sends as an array
 */
 router.get("/get", (req, res) => {
  const forumRef = db.collection("forum");
  let temp = [];
  forumRef
    .get()
    .then((resp) => {
      resp.forEach((doc) => {
        temp.push({
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          likes: doc.data().likes,
          isFeatured: doc.data().isFeatured,
          topic: doc.data().topic,
          createdDate: doc.data().createdDate.toDate()
        });
      });
    })
    .then(() => {
      res.send(temp);
    });
});
/**
 * Retrieve forum post by id from collection
 */
 router.get("/get/:id", (req, res) => {
  db.collection("forum").doc(req.params.id).get()
    .then((doc) => {
      if (doc.exists) {
        res.send({
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          likes: doc.data().likes,
          isFeatured: doc.data().isFeatured,
          topic: doc.data().topic,
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
 * Retrieve featured forums from collection
 * Sends as an array
 */
 router.get("/getfeatured", (req, res) => {
  const forumRef = db.collection("forum");
  let temp = [];
  forumRef
    .get()
    .then((resp) => {
      resp.forEach((doc) => {
        if (doc.isFeatured) {
          temp.push({
            id: doc.id,
            title: doc.data().title,
            content: doc.data().content,
            likes: doc.data().likes,
            isFeatured: doc.data().isFeatured,
            topic: doc.data().topic,
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
 * Retrieve all forums in a topic
 * @param topic - the topic of forum
 * Sends as an array
 */
 router.get("/get/:topic", (req, res) => {
  const forumRef = db.collection("forum");
  let temp = [];
  forumRef
    .get()
    .then((resp) => {
      resp.forEach((doc) => {
        if (doc.data().topic === req.params.topic) {
          temp.push({
            id: doc.id,
            title: doc.data().title,
            content: doc.data().content,
            likes: doc.data().likes,
            isFeatured: doc.data().isFeatured,
            topic: doc.data().topic,
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
 * Create a new forum post
 * Request body includes all forum information
 */
router.post("/create", async(req, res) => {
  const{
    forum_id,
    title,
    content,
    likes,
    isFeatured,
    topic
  } = req.body;
  const createdDate = admin.firestore.Timestamp.now()
  await db.collection("forum").doc(forum_id).set({
    title,
    content,
    likes,
    isFeatured,
    topic,
    createdDate
  });

  res.sendStatus(200);
});

/**
 * Adds a like to the forum post
 * Forum id in the body
 * Increments the likes field, and updates the forum post
 * Sends status 200 if successful, 404 otherwise
 */
router.put("/like", (req, res) => {
  const { forum_id } = req.body;
  db.collection("forum").doc(forum_id).get()
  .then((doc) => {
    if (doc.exists) {
      curr_likes = doc.data().likes;
    }
    else {
      res.sendStatus(404);
    }
    curr_likes = curr_likes + 1;

    db.collection("forum").doc(forum_id)
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
 * Takes a like from the forum post
 * Forum id in the body
 * Decrements the likes field, and updates the forum post
 * Sends status 200 if successful, 404 otherwise
 */
router.put("/unlike", (req, res) => {
  const { forum_id } = req.body;
  db.collection("forum").doc(forum_id).get()
  .then((doc) => {
    if (doc.exists) {
      curr_likes = doc.data().likes;
    }
    else {
      res.sendStatus(404);
    }
    curr_likes = curr_likes - 1;

    db.collection("forum").doc(forum_id)
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
 * Deletes the forum post with id given in body
 * returns 200 if done successfully
 */
router.delete("/delete", async(req, res) => {
  const { id } = req.body;

  await db.collection("forum").doc(id).delete();

  res.sendStatus(200);
});
/**
 * Edits the forum post
 * All new forum info in body
 * Sends 200 when successful
 */
router.put("/edit", async(req, res) => {
  await db.collection("forum").doc(req.body.id).set(req.body);

  res.sendStatus(200);
});
/**
 * Retrieve all comments from the forum post
 * @param id - the ID of the forum post whose comments you're retrieving
 * Sends an array of comments
 */
router.get("/comments/get/:id", (req, res) => {
  const commentRef = db.collection("forum").doc(req.params.id).collection("comments");
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
 * Posts new comment the forum post
 * Body is all the information for the new comment
 * @param id - the ID of the forum post being commented on
 * Sends 200 if comment made succesffully
 */
router.post("/comments/create/:id", async(req, res) => {
  await db.collection("forum").doc(req.params.id).collection("comments").push(req.body);

  res.sendStatus(200);
});
/**
 * Likes comment
 * Body is the comment id
 * @param id - the ID of the forum post being commented on
 * Sends 200 if like made succesffully
 */
router.put("/comments/like/:id", (req, res) => {  
  const { comment_id } = req.body;
  db.collection("forum").doc(req.params.id).collection("comments").doc(comment_id).get()
  .then((doc) => {
    if (doc.exists) {
      curr_likes = doc.data().likes;
    }
    else {
      res.sendStatus(404);
    }
    curr_likes = curr_likes + 1;

    db.collection("forum").doc(req.params.id).collection("comments").doc(comment_id)
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
 * Unlikes comment
 * Body is the comment id
 * @param id - the ID of the forum post being commented on
 * Sends 200 if unlike made succesffully
 */
 router.put("/comments/unlike/:id", (req, res) => {  
  const { comment_id } = req.body;
  db.collection("forum").doc(req.params.id).collection("comments").doc(comment_id).get()
  .then((doc) => {
    if (doc.exists) {
      curr_likes = doc.data().likes;
    }
    else {
      res.sendStatus(404);
    }
    curr_likes = curr_likes - 1;

    db.collection("forum").doc(req.params.id).collection("comments").doc(comment_id)
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
 * ID of the comment in body
 * @param id - forum post whose comment is being deleted
 */
router.delete("/comments/delete/id:", async(req, res) => {
  const { id } = req.body;

  await db.collection("forum").doc(req.params.id).collection("comments").doc(id).delete();

  res.sendStatus(200);
});
/**
 * Edits a comment
 * All new comment information in body
 * @param id - the forum post whose comment is being edited
 */
router.put("/comments/edit/id:", async(req, res) => {
  await db.collection("forum").doc(req.params.id).collection("comments").doc(req.body.id).set(req.body);

  res.sendStatus(200);
});
module.exports = router;
