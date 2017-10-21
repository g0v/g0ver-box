import knex from 'jest-mock-knex';

export { client } from 'jest-mock-knex';

export default knex;

process.setMaxListeners(0);
