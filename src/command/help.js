export default async function () {
  return {
    text: '歡迎來到 g0v。 社群是自主參與，成果開放\n私訊 <@g0ver> 使用下列指令，當需要 *技能* 時可以找到沒有人，也可以發現 *適合入的坑* ，或者輸入 `search g0v大使` 這些人都願意推你入坑。',
    attachments: [{
      color: '#000',
      mrkdwn_in: ['text', 'pretext', 'fields'],
      text: [
        '*關鍵字 技能 議題*',
        '`add`, `del`, `whoami`',
        '`add <hashtag>` 新增關鍵字，逗號可以多筆 ( ex. add A, B )',
        '`del <hashtag>` 刪除關鍵字，逗號可以多筆 ( ex. del A, B )',
        '`whoami` 查詢 自己 登錄了哪些關鍵字',
      ].join('\n'),
    }, {
      color: '#000',
      mrkdwn_in: ['text', 'pretext', 'fields'],
      text: [
        '*推坑 找人*',
        '`whois`, `search`',
        '`whois <@username>` 查詢 g0ver 登錄了哪些關鍵字 ( ex. whois @yutin )',
        '`search <hashtag>` *搜尋哪些 g0ver 有此關鍵字*',
      ].join('\n'),
    }, {
      color: '#000',
      mrkdwn_in: ['text', 'pretext', 'fields'],
      text: [
        '*入坑 出坑*',
        '`in`, `all`, `out`',
        '`in <project / task> <hours>` 進入某個坑裡，hours ( 選填 ) 預計幾小時後出坑',
        '`out` 離開某個坑',
        '`all` 顯示 g0ver 正在哪些坑，也許他們需要你的加入',
      ].join('\n'),
    }, {
      color: '#000',
      mrkdwn_in: ['text', 'pretext', 'fields'],
      text: '*揪松 找松*\n To Do',
    }, {
      color: '#000',
      mrkdwn_in: ['text', 'pretext', 'fields'],
      text: [
        '*座右銘*',
        '`slogan`',
        '`slogan <text>` 持續關注的議題、來自哪裡 或 URL 讓大家認識你',
      ].join('\n'),
    }, {
      color: '#000',
      mrkdwn_in: ['text', 'pretext', 'fields'],
      text: '*了解更多*\n <http://g0v.tw/zh-TW/manifesto.html|g0v 宣言> - <https://g0v-jothon.kktix.cc/|g0v 揪松團> - <https://github.com/g0v|g0v Github>',
    }],
  };
}
