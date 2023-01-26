import connect from '../routes/pool.js'

/**
 * Obtiene a todos los trabajos ofrecidos de la base
 * @param {*} res 
 */
export const getAllJobs = (res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching worker from pool', err);
    }

    //use the client for executing the query
    client.query('SELECT * FROM job_offered;', (err, result) => {
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
 * Obtiene a todos los trabajos ofrecidos de la base de acuerdo con el work id
 * @param {*} req
 * @param {*} res
 */
export const getJobsByWorkId = (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching job_offered from pool on job by id', err);
    }
    const sql = `SELECT * FROM work WHERE work_id='${req.params.work_id}';`;
    //use the client for executing the query
    client.query(sql, (err, result) => {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if (err) {
        return console.error('error running SELECT BY ID query in job_offered', err);
      }
      // Usuario encontrado
      res.send(JSON.stringify(result.rows));
    });
  });
}

/**
 * Añade a un trabajo ofrecido por un trabajador a la base de datos
 * @param {*} req 
 * @param {*} res 
 */
export const addJobOffered = (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching job_offered from pool', err);
    }
    console.log(`WORKID ${req.body.work_id}`);

    const sql = `INSERT INTO job_offered(job_offered_id, worker_email, worker_phone_number, 
      work_id, is_active ) VALUES ('${req.body.job_offered_id}', '${req.body.worker_email}',
      '${req.body.worker_phone_number}', '${req.body.work_id}', 'true');`;

    //use the client for executing the query
    client.query(sql, (err, result) => {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if (err) {
        return console.error('error running INSERT query in job_offered', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}
/**
 * Actualiza el registro de un trabajo ofrecido en la base
 * @param {*} req 
 * @param {*} res 
 */
export const updateJobOffered = (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching job_offered from pool', err);
    }

    const sql = `UPDATE worker set job_offered_id='${req.body.job_offered_id}', worker_email='${req.body.worker_email}', 
      worker_phone_number='${req.body.worker_phone_number}', work_id='${req.body.work_id}', is_active='${req.body.is_active}'`;

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
 * Elimina a un trabajo ofrecido de la base, cambiando su is_active a false
 * @param {*} res 
 */
export const deleteJobOffered = (req, res) =>{
  connect(function (err, client, done) {
    if (err) {
      return console.error('error deleting job offered from pool', err);
    }

    const sql = `UPDATE job_offered SET is_active='${req.body.is_active}' 
      WHERE job_offered_id='${req.body.job_offered_id}';` 

    //use the client for executing the query
    client.query(sql, (err, result) => {
      done(err);
      if (err) {
        return console.error('error running DELETE query in job offered', err);
      }
      res.send(JSON.stringify(result));
    });
  });
}