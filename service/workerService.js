import connect from '../routes/pool.js'

/**
 * Obtiene a todos los trabajadores de la base
 * @param {*} res 
 */
export const getAllWorkers = (res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching worker from pool', err);
    }

    //use the client for executing the query
    client.query('SELECT * FROM worker;', (err, result) => {
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
 * Añade a un usuario a la base de datos
 * @param {*} req 
 * @param {*} res 
 */
export const addWorker = (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching worker from pool', err);
    }

    const sql = `INSERT INTO worker(email, phone_number, worker_name, worker_last_name, profile_image, 
      identification_image, address, stars, available, is_active ) VALUES ('${req.body.email}', 
      '${req.body.phone_number}', '${req.body.worker_name}', '${req.body.worker_last_name}', '${req.body.profile_image}',
      '${req.body.identification_image}', '${req.body.address}', '${req.body.stars}','${req.body.available}', '${req.body.is_active}');`;

    //use the client for executing the query
    client.query(sql, (err, result) => {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if (err) {
        return console.error('error running INSERT query', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

/**
 * Actualiza el registro de un usuario en la base
 * @param {*} req 
 * @param {*} res 
 */
export const updateWorker = (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching employee from pool', err);
    }

    const sql = `UPDATE worker set worker_name='${req.body.worker_name}', worker_last_name='${req.body.worker_last_name}', 
      profile_image='${req.body.profile_image}', identification_image='${req.body.identification_image}', address='${req.body.address}', 
      stars='${req.body.stars}', available='${req.body.available}', is_active='${req.body.is_active}' WHERE email='${req.body.email}' AND 
      phone_number='${req.body.phone_number}'`;

    //use the client for executing the query
    client.query(sql, (err, result) => {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if (err) {
        return console.error('error running INSERT query', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

/**
 * Elimina a un trabajador de la base, cambiando su is_active a false
 * @param {*} res 
 */
export const deleteWorker = (res) =>{
  connect(function (err, client, done) {
    if (err) {
      return console.error('error deleting worker from pool', err);
    }

    const sql = `UPDATE worker SET is_active='${req.body.is_active}' 
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