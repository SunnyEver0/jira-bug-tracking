import * as pages from './pages';

export const routes = [
  { path: '/login', exact: true, component: pages.LoginPage },
  {
    path: '/',
    component: pages.MainLayout,
    routes: [
      { path: '/', exact: true, component: pages.HomePage },
      { path: '/team', component: pages.TeamPage },
      { path: '/team/teamInfo', component: pages.TeamInfoPage },
      { path: '/key', component: pages.KeyListPage },
      { path: '', component: pages.NotFoundPage }
    ]
  }
];
