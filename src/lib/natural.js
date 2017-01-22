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
  structured.push('');

  _.reduce(structured, (wordObj, key) => {
    const word = report.pop() || '';
    if (!wordObj[key] || key === '') {
      if (!_.isUndefined(wordObj[''])) {
        if (wordObj['']) report.push(wordObj['']);
        if (key) report.push(key);
      } else if (!wordTree[key]) {
        report.push(word + key);
      } else {
        report.push(word);
        report.push(key);
      }

      return wordTree[key] || {};
    }

    report.push(word + key);
    return wordObj[key];
  }, wordTree);

  return report;
}
