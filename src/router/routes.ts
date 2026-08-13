export const routes = [
  {
    path: '/',
    name: 'home',
    component: 'home-page',
    action: async () => {
      await import('../pages/home/home-page.js');
    },
  },
  {
    path: '/lesson/:lessonId',
    name: 'lesson',
    component: 'lesson-page',
    action: async () => {
      await import('../pages/lesson/lesson-page.js');
    },
  },
  {
    path: '/demo/:demoName',
    name: 'demo',
    component: 'demo-page',
    action: async () => {
      await import('../pages/demo/demo-page.js');
    },
  },
  {
    path: '/*',
    name: 'not-found',
    component: 'not-found-page',
    notFound: true,
    action: async () => {
      await import('../pages/not-found/not-found-page.js');
    },
  },
];
