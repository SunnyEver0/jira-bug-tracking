import { ajax } from '../utils/';

export const teamService = {

  getTeamSubjectData() {
    return ajax.get('api/appList');
  }

};
