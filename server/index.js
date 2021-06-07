const express = require("express");
const cors = require("cors");
const axios = require("axios");

const db = require("./firebase");
var admin = require("firebase-admin");

const PORT = 8000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("HELLO");
});

//get all merch
app.get("/merch/getall", (req, res) => {
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

//get merch by merch id
app.get("/merch/get", (req, res) => {
  var merch_id = req.query.merch_id;
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
app.put("/student/directory/edit", async (req, res) => {
  const {
    merch_id,
    title,
    images,
    description,
    price,
    stock,
  } = req.body;

  const resp = await db.collection("merch").doc(merch_id).update({
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
app.put("/merch/purchase", (req, res) => {
  const { merch_id } = req.body;
  let curr_stock = 0;
  db.collection("merch").doc(merch_id).get()
  .then((doc) => {
    if (doc.exists) {
      curr_stock = doc.data().stock;
    }
    else {
      res.sendStatus(404);
    }
    curr_stock = curr_stock-1;

    db.collection("merch").doc(merch_id)
    .update({
      stock: curr_stock,
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.sendStatus(404);
    });

  })
  .catch((error) => {
    res.sendStatus(404);
  });
});


app.listen(PORT, () => {
  console.log("Listening");
});
