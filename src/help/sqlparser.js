import _ from 'lodash';

export default function sqlparser(...args) {
  let omit = args[2] || ['created_at', 'updated_at'];
  let number = null;
  if (_.isInteger(args[1])) {
    number = args[1];
  } else if (_.isArray(args[1])) {
    omit = args[1];
  }

  let req = args[0];
  if (jest && jest.isMockFunction(args[0])) {
    const calls = _.get(args[0], 'mock.calls', []);
    req = _.get(calls, `[${_.isNil(number) ? calls.length - 1 : number}][1]`, {});
  }

  const regex = /^insert /i.test(req.sql) ? /"[\w_-]+"[,)]/gi : /"?([\w_]+)"?[ =]+\?/gi;
  const keys = _.map(req.sql.match(regex), key => /([\w_]+)/gi.exec(key)[1]);
  const param = _.mapValues(
    _.invert(keys),
    (index, key) => (_.includes(omit, key) ? !!req.bindings[index] : req.bindings[index]),
  );

  const table = /(insert into|update|from) "([^"]+)"/i.exec(req.sql);

  return {
    ...param,
    table: table && table[2],
    method: req.method,
  };
}
