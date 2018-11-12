import { action, observable } from 'mobx';
import { teamService } from '../services';

export class TeamStore {

  @observable
  mockData = [];

  @observable
  teamListData = [];
  /**
   * projectList Data
   */
  @observable
  projectListData = [];

  @observable
  teamBugInfo = [];
  /**
   * 获取所有团队信息
   */
  @action
  setTeamList() {
    return teamService.getTeamSubjectData()
      .then(data => {
        if (data) {
          this.teamListData = data;
        }
      })
      .catch(err => console.log(err));
  }

  /**
   * 获取Team下所有Project
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

  /**
   * 获取Team下所有bug信息
   */
  @action
  setTeamBugInfo() {
    return teamService.getTeamBugInfo()
      .then(data => {
        if (data) {
          this.teamBugInfo = data;
        }
      })
      .catch(err => console.log(err));
  }
  @action
  initMockData() {
    return teamService.initMockData()
      .then(data => {
        if (data) {
          this.mockData = data;
        }
      })
      .catch(err => console.log(err));
  }

}
