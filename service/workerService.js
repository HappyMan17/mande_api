import connect from '../routes/pool.js'

export const getAllWorkers = (res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching employees from pool', err);
    }

    //use the client for executing the query
    client.query('SELECT * FROM employee;', (err, result) => {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if (err) {
        return console.error('error running SELECT query', err);
      }
      res.send(JSON.stringify(result.rows));
    });
  });
}

export const addWorker = (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching employee from pool', err);
    }

    const sql = `INSERT INTO employee(email, phone_number, employee_name, profile_picture, identification, 
      address, public_service, stars, available ) VALUES ('${req.body.email}', 
      '${req.body.phone_number}', '${req.body.worker_name}', '${req.body.profile_picture}','${req.body.identification}',
      '${req.body.address}','${req.body.public_service}','${req.body.stars}','${req.body.available}');`;

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

export const updateWorker = (req, res) => {
  connect((err, client, done) => {
    if (err) {
      return console.error('error fetching employee from pool', err);
    }

    const sql = `UPDATE worker set worker_name='${req.body.worker_name}', profile_picture='${req.body.profile_picture}', 
      identification='${req.body.identification}', address='${req.body.address}', public_service='${req.body.public_service}', 
      stars='${req.body.stars}', available='${req.body.available}' WHERE email='${req.body.email}' AND 
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