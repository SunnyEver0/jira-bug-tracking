import { AnalysisStore } from './AnalysisStore';
import { AppListStore } from './AppListStore';
import { AppStore } from './AppStore';
import { TeamStore } from "./TeamStore";

const appStore = new AppStore();
const analysisStore = new AnalysisStore();
const appListStore = new AppListStore();
const teamStore = new TeamStore();

export {
  appStore,
  analysisStore,
  appListStore,
  teamStore
}
