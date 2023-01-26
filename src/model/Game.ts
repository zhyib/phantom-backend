export default class Game {
  [props: string]: unknown;

  /**
   * 游戏id
   */
  gameId = '';

  /**
   * 中文标题
   */
  titleCn = '';

  /**
   * 英文标题
   */
  titleEn = '';

  /**
   * 平台
   */
  platform = '';

  /**
   * 评分
   */
  rate = 0;

  /**
   * 开发商
   */
  developer = '';

  /**
   * 发行商
   */
  publisher = '';

  /**
   * 短评
   */
  commentLine = '';

  /**
   * 长评
   */
  commentText = '';

  /**
   * 游玩时间
   */
  playedTime = 0;

  /**
   * 游玩日期
   */
  playDate = new Date();

  /**
   * 发行日期
   */
  publishDate = new Date();

  /**
   * 是否删除
   */
  isDeleted = false;

  constructor(param?: Game) {
    if (param) {
      Object.keys(param).forEach((key) => {
        if (param[key]) {
          this[key] = param[key];
        }
      });
    }
  }
}
