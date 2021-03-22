const express = require("express");
const next = require("next");
const db = require('../config/keys').mongoURI;
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const bodyParser = require('body-parser');
const passport = require('passport');

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(bodyParser.json())

    require('./models/User')
    require('./models/Subscription')
    require('../config/passport')

    server.use(passport.initialize());
    require('../config/passport')(passport);

    const subRoutes = require("./routes/subscription.js");
    const authRoutes = require("./routes/user.js");

    server.use("/express_api", subRoutes(server));
    server.use("/express_api", authRoutes(server));

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.post('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });