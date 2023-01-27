import connect from '../routes/pool.js'

/**
 * Obtiene a todos los servicios de la base
 * @param {*} res 
 */
export const getAllServices = (res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on service', err);
    }

    client.query('SELECT * FROM service;', (err, result) => {
      
      done(err);

      if (err) {
        return console.error('error running SELECT query on service', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

/**
 * Obtiene a todos los servicios por job offered id
 * @param {*} req 
 * @param {*} res 
 */
export const getAllServicesByJobOfferedId = (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on service', err);
    }

    const sql = `SELECT * FROM service WHERE job_offered_id='${req.params.job_offered_id}';`
    
    client.query(sql, (err, result) => {
      
      done(err);

      if (err) {
        return console.error('error running SELECT WHERE query on service', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

/**
 * Añade un servicio a la base
 * @param {*} req 
 * @param {*} res 
 */
export const addService = (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on service', err);
    }

    const sql = `INSERT INTO service(service_id, job_offered_id, user_email, user_phone, cost, 
      service_stars, date_begin, date_end, paid, status) VALUES ('${req.body.service_id}',
      '${req.body.job_offered_id}', '${req.body.user_email}', '${req.body.user_phone}', '${req.body.cost}', 
      '${req.body.service_stars}', '${req.body.date_begin}','${req.body.date_end}','${req.body.paid}',
      '${req.body.status}');`
    
    client.query(sql, (err, result) => {
      
      done(err);

      if (err) {
        return console.error('error running SELECT WHERE query on service', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

/**
 * Actualiza la información de un servicio
 * @param {*} req 
 * @param {*} res 
 */
export const updateService = (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on service', err);
    }

    const sql = `UPDATE service SET (job_offered_id, user_email, user_phone, cost, 
      service_stars, date_begin, date_end, paid, units, status) = ('${req.body.job_offered_id}', 
      '${req.body.user_email}', '${req.body.user_phone}', '${req.body.cost}', 
      '${req.body.service_stars}', '${req.body.date_begin}','${req.body.date_end}','${req.body.paid}',
      '${req.body.units}','${req.body.status}') WHERE service_id='${req.body.service_id}';`

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
 * Actualiza el estado de un servicio
 * @param {*} req 
 * @param {*} res 
 */
export const updateServiceState = (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on service', err);
    }

    const sql = `UPDATE service set status='${req.params.status}' WHERE service_id='${req.params.service_id}';`;

    client.query(sql, (err, result) => {

      done(err);

      if (err) {
        return console.error('error running UPDATE status query', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

/**
 * Asigna las estrellas al servicio
 * @param {*} req 
 * @param {*} res 
 */
export const updateServiceStars = (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on service', err);
    }

    const sql = `UPDATE service set status='${req.params.service_stars}' WHERE service_id='${req.params.service_id}';`;

    client.query(sql, (err, result) => {

      done(err);

      if (err) {
        return console.error('error running UPDATE stars query', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}