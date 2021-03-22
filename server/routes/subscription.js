const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const Subscription = require('../models/Subscription');
const validateSubscriptionInput = require('../validation/subscription');

function routes(app) {
  router.get("/sub", (req, res) => {
    res.end("this is the sub route");
  });

  router.post('/subscription',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { isValid, errors } = validateSubscriptionInput(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }

      const newSubscription = new Subscription({
        option: req.body.option,
        active: req.body.active,
        user: req.user.id
      });

      newSubscription.save().then(subscription => res.json(subscription));
    }
  );
  return router;
};

module.exports = routes;