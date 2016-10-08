import fs from 'fs';
import path from 'path';
import { graphql } from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';
import schema from '../src/Schema';

(async () => {
  const result = await (graphql(schema, introspectionQuery));
  if (result.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, '../../mobile/schema.json'),
      JSON.stringify(result, null, 2)
    );

    process.exit();
  }
})();

fs.writeFileSync(
  path.join(__dirname, '../schema.graphql'),
  printSchema(schema)
);
