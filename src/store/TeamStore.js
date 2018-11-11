import { action, observable } from 'mobx';
import { teamService } from '../services';

export class TeamStore {
  /**
   * 用户是否已登录
   */
  @observable
  projectListData = [];
  /**
   * 从后端取分析数据
   */
  @action
  setTeamProjectData() {
    return teamService.getTeamSubjectData()
      .then(data => {
        if (data) {
          this.projectListData = data;
        }
      })
      .catch(err => console.log(err));
  }

}
