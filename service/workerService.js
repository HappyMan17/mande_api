import connect from '../routes/pool.js'

/**
 * Obtiene a todos los trabajadores de la base
 * @param {*} res 
 */
export const getAllWorkers = (res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on worker', err);
    }

    client.query('SELECT * FROM worker;', (err, result) => {

      done(err);

      if (err) {
        return console.error('error running SELECT query on worker', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

export const getWorkerKey = (req, res) => {
    connect((err, client, done) => {
      if (err) {
        return reject(err);
      }
      const sql = `SELECT * FROM worker WHERE email='${req.params.email}' AND phone_number='${req.params.phone_number}';`;

      //use the client for executing the query
      client.query(sql, (err, result) => {
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done(err);

        if (err) {
          return console.error('error running SELECT query on worker', err);
        }

        // Usuario encontrado
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
export const getWorkerByEmailAndPhoneNumber = (req, res) => {
  return new Promise((resolve, reject) => {
    connect((err, client, done) => {
      if (err) {
        return reject(err);
      }
      const sql = `SELECT * FROM worker WHERE email='${req.body.email}' AND phone_number='${req.body.phone_number}';`;

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
 * Añade un trabajador a la base de datos
 * @param {*} req 
 * @param {*} res 
 */
export const addWorker = (req, res) => {
  connect((err, client, done) => {
    const file = req.files;
    if (err) {
      return console.error('error fetching from pool on worker', err);
    }
    if (!file) {
      return console.error('error no se encontró el archivo', err);
    }
    const profileImage = file['profile_image'];
    const identification = file['identification_image'];
    const body = req.body;

    const sql = `INSERT INTO worker(email, phone_number, worker_name, worker_last_name, profile_image, 
      identification_image, worker_address, stars, available, is_active ) VALUES ('${req.body.email}', 
      '${req.body.phone_number}', '${req.body.worker_name}', '${req.body.worker_last_name}', 
      'worker/${profileImage[0].fieldname}_${body.email}_${body.phone_number}.jpg',
      'worker/${identification[0].fieldname}_${body.email}_${body.phone_number}.jpg', '${req.body.worker_address}', 
      '0','true', 'true');`;
    client.query(sql, (err, result) => {
      done(err);
      if (err) {
        return console.error('error running INSERT query on worker', err);
      }
      //res.send(JSON.stringify(result.rows));
    });
  });
}

/**
 * Actualiza el registro de un trabajador en la base
 * @param {*} req 
 * @param {*} res 
 */
export const updateWorker = (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on worker', err);
    }

    const sql = `UPDATE worker set worker_name='${req.body.worker_name}', worker_last_name='${req.body.worker_last_name}', 
      profile_image='${req.body.profile_image}', identification_image='${req.body.identification_image}', address='${req.body.address}', 
      stars='${req.body.stars}', available='${req.body.available}', is_active='${req.body.is_active}' WHERE email='${req.body.email}' AND 
      phone_number='${req.body.phone_number}'`;

    client.query(sql, (err, result) => {

      done(err);

      if (err) {
        return console.error('error running INSERT query on worker', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

/**
 * Actualiza el is_active de un trabajador.
 * @param {*} res 
 */
export const updateWorkerIsActive = (req, res) =>{
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching from pool on worker', err);
    }

    const sql = `UPDATE worker SET is_active='${req.params.is_active}' WHERE email='${req.params.email}' AND phone_number='${req.params.phone_number}';` 

    client.query(sql, (err, result) => {
      done(err);
      if (err) {
        return console.error('error running Update is_active query', err);
      }
      res.send(JSON.stringify(result));
    });
  });
}

/**
 * Elimina a un trabajador de la base, cambiando su is_active
 * @param {*} res 
 */
export const deleteWorker = (req, res) =>{
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching from pool on worker', err);
    }

    const sql = `UPDATE worker SET is_active='false' WHERE email='${req.body.email}' AND phone_number='${req.body.phone_number}';` 

    client.query(sql, (err, result) => {
      done(err);
      if (err) {
        return console.error('error running DELETE query', err);
      }
      res.send(JSON.stringify(result));
    });
  });
}