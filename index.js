const express = require('express');
const AWS = require('aws-sdk');
const { Client } = require('pg');

const app = express();

app.get('/describe', (req, res) => {
  describe()
  res.send('describe');
});

app.get('/query', async (req, res) => {
  await query()
  res.send('query');
});

app.listen(1337, () => {
  console.log('Server is running on port 1337');
});


AWS.config.update({
  region: 'ap-northeast-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const describe = () => {
  const rds = new AWS.RDS({ apiVersion: '2014-10-31' });

  const params = {};

  rds.describeDBInstances(params, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.DBInstances);
    }
  });
}

const query = async () => {
  try {
    const client = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'expo',
      port: 5432,
    })
    client.connect()
    console.log(222)

    const result = await client.query('SELECT * FROM cards')
    console.log(111)
    console.log(result)

    client.end()
  } catch (e) {
    console.error(e)
  }
}
