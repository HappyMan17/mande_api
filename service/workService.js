import connect from '../routes/pool.js'

/**
 * Lista todos los trabajos
 * @param {*} res 
 */
export const getAllWorks = (res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on work', err);
    }

    client.query('SELECT * FROM work;', (err, result) => {

      done(err);

      if (err) {
        return console.error('error running SELECT query on work', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

export const getWorkNameById = (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching from pool on work', err);
    }

    client.query(`SELECT * FROM work WHERE work_id='${req.params.work_id}';`, (err, result) => {

      done(err);

      if (err) {
        return console.error('error running SELECT query on work', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

/**
 * Añade a un trabajo a la base
 * @param {*} req
 * @param {*} res
 */
export const addWork = (req, res) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching from pool on work', err);
    }

    const sql = `INSERT INTO work(work_id, work_name, description, worker_amount) VALUES 
      ('${req.body.work_id}', '${req.body.work_name}', '${req.body.description}', 
      '${req.body.worker_amount}');`;
    
    client.query(sql, (err, result) => {
      
      done(err);
      
      if (err) {
        return console.error('error running INSERT query in work', err);
      }
      res.send(JSON.stringify(result));
    });
  });
}

/**
 * Actualiza un trabajo
 * @param {*} req 
 * @param {*} res 
 */
export const updateWork = (req, res) =>{
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching from pool on work update', err);
    }

    const sql = `UPDATE work SET work_name='${req.body.work_name}', 
      description='${req.body.description}', worker_amount='${req.body.worker_amount}' 
      WHERE work_id='${req.body.work_id};` 

    client.query(sql, (err, result) => {
      
      done(err);
      
      if (err) {
        return console.error('error running UPDATE query on work', err);
      }
      res.send(JSON.stringify(result));
    });
  });
}

/**
 * Elimina un trabajo de la base, cambiando su is_active a false
 * @param {*} req 
 * @param {*} res 
 */
export const deleteWork = (req, res) =>{
  connect(function (err, client, done) {
    if (err) {
      return console.error('error deleting work from pool', err);
    }

    const sql = `UPDATE work SET is_active='false' 
      WHERE work_id='${req.params.work_id}';`

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