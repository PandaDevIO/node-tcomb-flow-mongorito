require('babel-polyfill');

import { IUser, _User } from '../models/User';

import express from 'express';

const router = express.Router();

router.post('/login', validateRequest.bind(this, {content: 'body', struct: IUser}), async (req, res) => {
  const {token, user} = await _User.attemptLogin(req.body);
  
  const response = token
    ? { token, user }
    : { error: 'No user matched your credentials.' };

  res.json(response);
});

router.post('/signup', validateRequest.bind(this, {content: 'body', struct: IUser}), async(req, res) => {
  const response = await _User.signup(req.body);

  res.json(response);
});

export default router;
