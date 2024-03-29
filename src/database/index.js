/* eslint-disable no-console */
const { Client } = require('pg');
const { getSchemaSQL } = require('./getSchemaSQL');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
});

client.connect()
  .then(async () => {
    const schema = await getSchemaSQL();
    await client.query(schema);
    console.log('🚀 Connected to database');
  })
  .catch((err) => console.log('💀 Error connecting to database', err));

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
