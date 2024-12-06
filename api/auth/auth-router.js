const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "Secret";
const db = require('../../data/dbConfig.js');

router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
    if (!username || !password) {
      next({status: 422, message: "username and password required"});
    } else {
      const match = await db('users').where('username', username);
      if (match.length) {
        next({status: 422, message: "username taken"});
      } else {
        const hash = bcrypt.hashSync(password, 8)
        const newUserId = await db('users').insert({username: username, password: hash})
        const newUser = await db('users').select('id', 'username', 'password').where('id', newUserId[0])
        res.status(201).json(newUser[0])
      }
    }
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
    if (!username || !password) {
      next({status: 422, message: "username and password required"});
    } else {
      const match = await db('users').where('username', username);
      if (!match.length || !bcrypt.compareSync(password, match[0].password)) {
        next({status: 401, message: "invalid credentials"});
      } else {
        const token = jwt.sign({subject: match[0].id, username: match[0].username}, JWT_SECRET, {expiresIn: '2h'});
        res.status(200).json({message: `welcome, ${match[0].username}`, token})
      }
    }

  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
