import connect from '../routes/pool.js'

export const getAllWorks = (res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching works from pool', err);
    }

    //use the client for executing the query
    client.query('SELECT * FROM work;', (err, result) => {
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
 * Añade a un usuario a la base
 * @param {*} res 
 */
export const addWork = (req, res) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error ADDING work from pool', err);
    }

    const sql = `INSERT INTO work(work_id, work_name, description, worker_amount) VALUES 
      ('${req.body.work_id}', '${req.body.work_name}', '${req.body.description}', 
      '${req.body.worker_amount}');`;
    
    //use the client for executing the query
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
 * actualiza a un usuario en la base de datos
 * @param {*} res 
 */
export const updateWork = (req, res) =>{
  connect(function (err, client, done) {
    if (err) {
      return console.error('error UPDATING work from pool', err);
    }

    const sql = `UPDATE work SET work_name='${req.body.work_name}', 
      description='${req.body.description}', worker_amount='${req.body.worker_amount}' 
      WHERE work_id = '${req.body.work_id};` 

    //use the client for executing the query
    client.query(sql, (err, result) => {
      done(err);
      if (err) {
        return console.error('error running UPDATE query in work', err);
      }
      res.send(JSON.stringify(result));
    });
  });
}

/**
 * Elimina a un usuario de la base, cambiando su is_active a false
 * @param {*} res 
 */
export const deleteWork = (req, res) =>{
  connect(function (err, client, done) {
    if (err) {
      return console.error('error deleting work from pool', err);
    }

    const sql = `UPDATE work SET is_active='${req.body.is_active}' 
      WHERE work_id='${req.body.work_id}';`

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