import connect from '../routes/pool.js';

export const getAllUsers = (res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching users from pool', err);
    }

    //use the client for executing the query
    client.query('SELECT * FROM user_table;', (err, result) => {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if (err) {
        return console.error('error running SELECT query', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

export const getUserByEmailAndPhoneNumber = (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching users from pool', err);
    }
    const sql = `SELECT * FROM user_table WHERE email='${req.body.email}' AND phone_number='${req.body.phone_number}';`
    //use the client for executing the query
    client.query(sql, (err, result) => {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if (err) {
        return console.error('error running SELECT query', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

export const addUser = (res) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error ADDING user from pool', err);
    }

    const sql = 
      `INSERT INTO user_table(
        email, phone_number, profile_picture, identification, address, public_services, payment_method,
        is_active) VALUES (
        '${req.body.email}', '${req.body.phone_number}', '${req.body.profile_picture}', 
        '${req.body.identification}', '${req.body.address}', '${req.body.public_services}', 
        '${req.body.payment_method}', '${req.body.is_active}'
      );`;
    
    //use the client for executing the query
    client.query(sql, (err, result) => {
      done(err);
      if (err) {
        return console.error('error running INSERT query', err);
      }
      res.send(JSON.stringify(result));
    });
  });
}

export const updateUser = (res) =>{
  connect(function (err, client, done) {
    if (err) {
      return console.error('error UPDATING user from pool', err);
    }

    const sql = 
      `UPDATE user_table SET 
        profile_picture = '${req.body.profile_picture}', identification = '${req.body.identification}', 
        address = '${req.body.address}', public_services = '${req.body.public_services}', 
        payment_method = '${req.body.payment_method}', is_active = '${req.body.is_active}' 
      WHERE email = '${req.body.email}' AND phone_number = '${req.body.phone_number}';` 

    console.log(sql);
    //use the client for executing the query
    client.query(sql, (err, result) => {
      done(err);
      if (err) {
        return console.error('error running UPDATE query', err);
      }
      res.send(JSON.stringify(result));
    });
  });
}

export const deleteUser = (res) =>{
  connect(function (err, client, done) {
    if (err) {
      return console.error('error deleting user from pool', err);
    }

    const sql = 
      `UPDATE user_table SET is_active='${req.body.is_active}'
      WHERE email='${req.body.email}' AND phone_number='${req.body.phone_number}';` 

    //use the client for executing the query
    client.query(sql, (err, result) => {
      done(err);
      if (err) {
        return console.error('error running DELETE query', err);
      }
      res.send(JSON.stringify(result));
    });
  });
}
