import _ from 'lodash';
import Project from '../model/Project';
import Interaction from '../model/Interaction';

async function saveProject(user, inputs) {
  const project = new Project({ ...inputs, user });

  try {
    await project.save();
    return `Done, create ${inputs.title}`;
  } catch (e) {
    return `Failed, ${e.message}`;
  }
}

function inputThumb(user, inputs) {
  Interaction.set(user, async ({ text }) => {
    let thumb = _.trim(text);

    if (thumb === 'skip') thumb = null;

    return saveProject(user, { ...inputs, thumb });
  });

  return '請輸入專案的縮圖網址？支援 GIF, JPEG, PNG 格式的 75px X 75px\n`（輸入 skip 可跳過）`';
}

function inputTags(user, inputs) {
  Interaction.set(user, async ({ text }) => {
    let tags = _.trim(text);

    if (tags === 'skip') tags = null;

    return inputThumb(user, { ...inputs, tags });
  });

  return '請輸入專案的 關鍵字 ，多個關鍵字請用空白分隔 ？\n`（輸入 skip 可跳過）`';
}

function inputURL(user, inputs) {
  Interaction.set(user, ({ text }) => {
    let url = _.trim(text);

    if (url === 'skip') url = null;

    return inputTags(user, { ...inputs, url });
  });

  return '請輸入 共筆 / 討論 / 專業 連結？\n`（輸入 skip 可跳過）`';
}

export default async function ({ title }, { user }) {
  const project = new Project({ title });

  if (await project.fetch()) return 'Sorry! 發現相同的專案名稱';

  const inputs = { title };
  return inputURL(user, inputs);
}
