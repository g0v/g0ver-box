/* eslint no-param-reassign: 0 */
import _ from 'lodash';
import synonyms from './natural.synonyms';

const splitRegex = /([a-zA-Z]+|[\u4e00-\u9fff])/gi;

const wordTree = _.reduce(synonyms, (structure, value, word) => {
  _.each(value, (synonym) => {
    const node = _.reduce(synonym.match(splitRegex), (obj, key) => {
      if (_.isUndefined(obj[key])) obj[key] = {};
      return obj[key];
    }, structure);
    node[''] = word;
  });
  return structure;
}, {});

export default function (sentence) {
  const report = [];
  const structured = (sentence || '').toLowerCase().match(splitRegex);

  let mindmap = {};
  let index = 0;
  while (structured.length) {
    const word = structured.shift();

    if (!mindmap[word]) {
      if (report[index]) index += 1;
      mindmap = wordTree[word] || {};
    } else mindmap = mindmap[word];

    if (mindmap['']) report[index] = mindmap[''];
  }

  return report;
}
