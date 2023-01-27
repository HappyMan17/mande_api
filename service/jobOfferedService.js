import connect from '../routes/pool.js'

/**
 * Obtiene a todos los trabajos ofrecidos de la base
 * @param {*} res 
 */
export const getAllJobs = (res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on job_offered', err);
    }

    client.query('SELECT * FROM job_offered;', (err, result) => {

      done(err);

      if (err) {
        return console.error('error running SELECT query on job_offered', err);
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
      return console.error('error fetching from pool on job_offered', err);
    }
    const sql = `SELECT * FROM job_offered WHERE work_id='${req.params.work_id}' AND is_active='true';`;

    client.query(sql, (err, result) => {

      done(err);

      if (err) {
        return console.error('error running SELECT BY ID query in job_offered', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

/**
 * Lista los trabajos ofrecidos por un trabajador
 * @param {*} req
 * @param {*} res
 */
export const getJobOfferedByWorker = (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool job offered', err);
    }
    const sql = `SELECT * FROM job_offered WHERE worker_email='${req.body.worker_email}' 
      AND worker_phone_number='${req.body.worker_phone_number}' AND is_active='true';`;

    client.query(sql, (err, result) => {

      done(err);

      if (err) {
        return console.error('error running SELECT BY ID query in job_offered', err);
      }
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
      return console.error('error fetching from pool on job_offered', err);
    }

    const sql = `INSERT INTO job_offered(job_offered_id, worker_email, worker_phone_number, 
      work_id, is_active, cost_per_service) VALUES ('${req.body.job_offered_id}', '${req.body.worker_email}',
      '${req.body.worker_phone_number}', '${req.body.work_id}', 'true', '${req.body.cost_per_service}');`;

    client.query(sql, (err, result) => {

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
      return console.error('error fetching from pool on job_offered', err);
    }

    const sql = `UPDATE job_offered set worker_email='${req.body.worker_email}', worker_phone_number='${req.body.worker_phone_number}', 
    work_id='${req.body.work_id}', is_active='${req.body.is_active}', cost_per_service='${req.body.cost_per_service} 
    WHERE job_offered_id='${req.body.job_offered_id}'`;

    client.query(sql, (err, result) => {

      done(err);

      if (err) {
        return console.error('error running UPDATE query', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

/**
 * Elimina un trabajo ofrecido de la base, cambiando su is_active a false
 * @param {*} req 
 * @param {*} res 
 */
export const deleteJobOffered = (req, res) =>{
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on job_offered', err);
    }

    const sql = `UPDATE job_offered SET is_active='false' 
      WHERE job_offered_id='${req.params.job_offered_id}';` 

    client.query(sql, (err, result) => {
      
      done(err);
      
      if (err) {
        return console.error('error running DELETE query in job offered', err);
      }
      res.send(JSON.stringify(result));
    });
  });
}