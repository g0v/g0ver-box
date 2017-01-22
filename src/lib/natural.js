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
  _.reduce((sentence || '').toLowerCase().match(splitRegex), (wordObj, key) => {
    const word = report.pop() || '';
    if (!wordObj[key]) {
      if (!_.isUndefined(wordObj[''])) {
        if (wordObj['']) report.push(wordObj['']);
        report.push(key);
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
