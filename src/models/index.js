import {decode, encode} from 'base-64';
import {addRxPlugin, createRxDatabase} from 'rxdb';
import SQLite from 'react-native-sqlite-2';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';
import userSchema from './userSchema';
import friendSchema from './friendSchema';
import roomSchema from './roomSchema';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

// Avoid using node dependent modules
process.browser = true;

const SQLiteAdapter = SQLiteAdapterFactory(SQLite);

addRxPlugin(SQLiteAdapter);
addRxPlugin(require('pouchdb-adapter-http'));

export const initSQL = async () => {
  console.log(11);
  const database = await createRxDatabase({
    name: 'foodmate',
    adapter: 'react-native-sqlite', // the name of your adapter
    multiInstance: false,
    ignoreDuplicate: true,
  });
  console.log(22);
  await database.collection({
    name: 'users',
    schema: userSchema,
  });
  console.log(44);
  await database.collection({
    name: 'friends',
    schema: friendSchema,
  });
  console.log(55);
  await database.collection({
    name: 'rooms',
    schema: roomSchema,
  });
  console.log(66);
  return database;
};
