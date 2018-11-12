import { ajax } from '../utils/';

export const teamService = {

  getTeamSubjectData() {
    return ajax.get('api/projectInfo');
  },

  getTeamBugInfo() {
    return ajax.get('api/teamBugInfo');
  }

};
