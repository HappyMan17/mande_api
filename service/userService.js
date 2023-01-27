import connect from '../routes/pool.js';

/**
 * Query para obtener todos los usuarios de la base
 * @param {*} res 
 */
export const getAllUsers = (res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on user', err);
    }

    client.query('SELECT * FROM user_table;', (err, result) => {

      done(err);

      if (err) {
        return console.error('error running SELECT query on user', err);
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

      client.query(sql, (err, result) => {

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
 * @param {*} req 
 * @param {*} res 
 */
export const addUser = (req,res) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching from pool on user', err);
    }

    const sql = `INSERT INTO user_table(email, phone_number, user_name, user_last_name, 
      address, public_services, payment_method, is_active) VALUES ('${req.body.email}', 
      '${req.body.phone_number}', '${req.body.user_name}', '${req.body.user_last_name}', 
      '${req.body.address}', '${req.body.public_services}', '${req.body.payment_method}', 
      '${req.body.is_active}');`;
    
    client.query(sql, (err, result) => {
      done(err);
      if (err) {
        return console.error('error running INSERT query on user', err);
      }
      res.send(JSON.stringify(result));
    });
  });
}


/**
 * actualiza a un usuario en la base de datos
 * @param {*} req 
 * @param {*} res 
 */
export const updateUser = (req, res) =>{
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching from pool on user', err);
    }

    const sql = `UPDATE user_table SET user_name='${req.body.user_name}', 
      user_last_name='${req.body.user_last_name}', address='${req.body.address}', 
      public_services='${req.body.public_services}', payment_method='${req.body.payment_method}', 
      is_active='${req.body.is_active}' WHERE email ='${req.body.email}' AND 
      phone_number='${req.body.phone_number}';` 

    client.query(sql, (err, result) => {
      done(err);
      if (err) {
        return console.error('error running UPDATE query on user', err);
      }
      res.send(JSON.stringify(result));
    });
  });
}

/**
 * Elimina a un usuario de la base, cambiando su is_active a false
 * @param {*} req 
 * @param {*} res 
 */
export const deleteUser = (req, res) =>{
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching from pool on user', err);
    }

    const sql = `UPDATE user_table SET is_active='false' 
      WHERE email='${req.body.email}' AND phone_number='${req.body.phone_number}';` 

    client.query(sql, (err, result) => {
      done(err);
      if (err) {
        return console.error('error running DELETE query on user', err);
      }
      res.send(JSON.stringify(result));
    });
  });
}

/**
 * Permite guardar archivos en el back
 * @param {*} req 
 * @param {*} res 
 */
export const uploadFile = (req, res) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error connecting to the pool on upload', err);
    }

    const file = req.file;
    if(!file) {
      res.status(400).send("something went wrong!")
    }
    console.log('llegamos ', req.file);
    res.send(req.file);
  })
}