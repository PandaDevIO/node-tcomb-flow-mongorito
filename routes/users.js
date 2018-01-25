require('babel-polyfill');

import { _User } from '../models/User';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  _User.getUsers().then(users => {
    res.json({
      users
    })
  })
});

export default router;
