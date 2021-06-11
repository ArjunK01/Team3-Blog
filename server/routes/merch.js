var express = require("express");
var router = express.Router();
const db = require("../firebase");
var admin = require("firebase-admin");

//get all merch
router.get("/getall", (req, res) => {
  let merchList = [];
  db.collection("merch").get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      if(doc.data().isVisible == true){
        merchList.push({
          id: doc.id,
          title: doc.data().title,
          price: doc.data().price,
          description: doc.data().description,
          images: doc.data().images,
          stock: doc.data().stock,
        });
      }
    });
    res.send(merchList)
  })
  .catch((error) => {
    res.sendStatus(404);
  });
});

//get merch by merch id
router.get("/get/:id", (req, res) => {
  var merch_id = req.params.id;
  db.collection("merch").doc(merch_id).get()
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

});

//update merch item
//returns updated info for that specific item
router.put("/edit", async (req, res) => {
  const {
    merch_id,
    title,
    images,
    description,
    price,
    stock,
  } = req.body;


  await db.collection("merch").doc(merch_id).update({
    title,
    images,
    description,
    price,
    stock,
  });

  db.collection("merch").doc(merch_id).get()
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

});

//decrease stock by 1 based off item purchased
//return status (no info about merch items)
router.put("/purchase", async (req, res) => {
  const { user_id, merch } = req.body;
  for(let i = 0; i < merch.length; i++){
    let curr_stock = 0;
    let merch_id = merch[i].merch_id;
    let quant = merch[i].quantity;
    var doc = await db.collection("merch").doc(merch_id).get()
    if (doc.exists) {
      curr_stock = doc.data().stock;
    }
    else {
      res.sendStatus(404);
    }
    curr_stock = curr_stock-quant;

    db.collection("merch").doc(merch_id)
    .update({
      stock: curr_stock,
    })
  }
  var user_data = db.collection("user").doc(user_id);
  user_data.get()
  .then((doc) => {
    var arrUnion = user_data.update({
      purchasedMerch: admin.firestore.FieldValue.arrayUnion({
        "time": admin.firestore.Timestamp.now(),
        "purchase": merch,
      })
    });
  })
  .then(() => {
    res.sendStatus(200);
  });
});

//delete merch from the collection by id
//returns all remaining merch
router.delete("/delete", async (req, res) => {
  const { merch_id } = req.body;
  db.collection("merch").doc(merch_id).update({"isVisible": false});

  let merchList = [];
  db.collection("merch").get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      merchList.push({
        id: doc.id,
        title: doc.data().title,
        price: doc.data().price,
        description: doc.data().description,
        images: doc.data().images,
        stock: doc.data().stock
      });
    });
    res.send(merchList)
  })
  .catch((error) => {
    res.sendStatus(404);
  });
});

//create merch
//returns all merch items
router.post("/create", async (req, res) => {
  const {
    title,
    images,
    description,
    price,
    stock,
  } = req.body;

  var isVisible = true;

  await db.collection("merch").add({
    title,
    images,
    description,
    price,
    stock,
    isVisible
  });

  let merchList = [];
  db.collection("merch").get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      merchList.push({
        id: doc.id,
        title: doc.data().title,
        price: doc.data().price,
        description: doc.data().description,
        images: doc.data().images,
        stock: doc.data().stock
      });
    });
    res.send(merchList)
  })
  .catch((error) => {
    res.sendStatus(404);
  });
});

module.exports = router;
