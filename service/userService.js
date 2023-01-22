import connect from '../routes/pool.js';

/**
 * Query para obtener todos los usuarios de la base
 * @param {*} res 
 */
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

/**
 * Promesa que se utiliza para la autenticación
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getUserByEmailAndPhoneNumber = (req, res) => {
  return new Promise((resolve, reject) => {
    connect((err, client, done) => {
      if (err) {
        return reject(err);
      }
      const sql = `SELECT * FROM user_table WHERE email='${req.body.email}' AND phone_number='${req.body.phone_number}';`;
      //use the client for executing the query
      client.query(sql, (err, result) => {
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done(err);

        if (err) {
          return reject(err);
        }

        if (result.rows.length === 0) {
          // No se encontró el usuario
          return reject(new Error("Usuario no encontrado"));
        }

        // Usuario encontrado
        resolve(result.rows[0]);
      });
    });
  });
}

/**
 * Añade a un usuario a la base
 * @param {*} res 
 */
export const addUser = (req,res) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error ADDING user from pool', err);
    }

    const sql = `INSERT INTO user_table(email, phone_number, user_name, user_last_name, 
      address, public_services, payment_method, is_active) VALUES ('${req.body.user.email}', 
      '${req.body.user.phone_number}', '${req.body.user.user_name}', '${req.body.user.user_last_name}', 
      '${req.body.user.address}', '${req.body.user.public_services}', '${req.body.user.payment_method}', 
      'true');`;
    
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


/**
 * actualiza a un usuario en la base de datos
 * @param {*} res 
 */
export const updateUser = (req, res) =>{
  connect(function (err, client, done) {
    if (err) {
      return console.error('error UPDATING user from pool', err);
    }

    const sql = `UPDATE user_table SET user_name='${req.body.user_name}', 
      user_last_name='${req.body.user_last_name}', address='${req.body.address}', 
      public_services='${req.body.public_services}', payment_method='${req.body.payment_method}', 
      is_active='${req.body.is_active}' WHERE email = '${req.body.email}' AND 
      phone_number='${req.body.phone_number}';` 

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

/**
 * Elimina a un usuario de la base, cambiando su is_active a false
 * @param {*} res 
 */
export const deleteUser = (req, res) =>{
  connect(function (err, client, done) {
    if (err) {
      return console.error('error deleting user from pool', err);
    }

    const sql = `UPDATE user_table SET is_active='${req.body.is_active}' 
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
