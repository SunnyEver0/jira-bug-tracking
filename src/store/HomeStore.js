import { action, observable } from 'mobx';
import { homeService } from '../services';

export class HomeStore {
  /**
   * 用户是否已登录
   */
  @observable
  chartData = {
    bugInfo: {},
    bugMonthList: []
  };

  /*
  *
  * 获取首页数据
  * */
  @action
  initHomeData () {
    return homeService.initHomeData()
      .then(data => {
        if (data) {
          this.chartData = data;
          console.log(this.chartData, '---chartDtae')
        }
      })
      .catch(err => console.log(err));
  }
}
