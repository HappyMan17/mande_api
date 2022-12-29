import express from 'express';
import connect from './pool';

const router = express.Router();

/**
 * Listar todos los usuarios
 */
router.get('/mande/user/all', (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching users from pool', err);
    }

    //use the client for executing the query
    client.query('SELECT * FROM user;', (err, result) => {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if (err) {
        return console.error('error running query', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
})

/**
 * Añade un nuevo usuario
 */

router.post('/mande/user/add', (req, res, next) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching user from pool', err);
    }

    const sql = 
      `INSERT INTO user(
        email, phone, profile_picture, identification, address, public_services, payment_method
      ) VALUES (
        '${req.body.email}', '${req.body.phone}', '${req.body.profile_picture}', 
        '${req.body.identification}', '${req.body.address}', '${req.body.public_services}', 
        '${req.body.paymenth_method}'
      );`;

    //use the client for executing the query
    client.query(sql, (err, result) => {
      done(err);
      if (err) {
        return console.error('error running query', err);
      }
      res.send(JSON.stringify(result));
    });
  });

})

/**
 * Obtiene el usuario por id
 */
/*
router.get('/mande/user/:id', (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching users from pool', err);
    }

    //use the client for executing the query
    client.query(`SELECT id FROM user where id = ${req.param.id};`, (err, result) => {

      done(err);

      if (err) {
        return console.error('error running query', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
})
*/