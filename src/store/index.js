import { HomeStore } from './HomeStore';
import { AppListStore } from './AppListStore';
import { AppStore } from './AppStore';
import { TeamStore } from "./TeamStore";

const appStore = new AppStore();
const homeStore = new HomeStore();
const appListStore = new AppListStore();
const teamStore = new TeamStore();

export {
  appStore,
  homeStore,
  appListStore,
  teamStore
}
