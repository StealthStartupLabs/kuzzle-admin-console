const MODULE_NAME = 'kuzzle.role';

export default angular.module(MODULE_NAME, ['kuzzle.roleApi'])
  .config(function ($stateProvider) {
    'ngInject';
    $stateProvider
      .state('role', {
        parent: 'logged',
        url: '/role',
        views: {
          'bodyView': { template: require('../../templates/role/index.template.html') }
        }
      })
      .state('role.browse', {
        url: '/browse',
        views: {
          'mainView': {
            templateProvider: ($q) => {
              return $q((resolve) => {
                require.ensure([], () => resolve(require('../../templates/role/browse.template.html')));
              });
            }
          }
        },
        resolve: {
          loadDeps:['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
            return $q((resolve) => {
              require.ensure([], function (require) {
                let ctrlDeps = require('./browse.ctrl');
                ctrlDeps.default.forEach((dep) => {
                  $ocLazyLoad.load({name: dep});
                });
                resolve(angular.module(MODULE_NAME));
              });
            });
          }]
        }
      })
      .state('role.create', {
        url: '/add?content',
        views: {
          'mainView': {
            templateProvider: ($q) => {
              return $q((resolve) => {
                require.ensure([], () => resolve(require('../../templates/role/full.template.html')));
              });
            }
          }
        },
        resolve: {
          loadDeps: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
            return $q((resolve) => {
              require.ensure([], function (require) {
                let ctrlDeps = require('./full.ctrl');
                ctrlDeps.default.forEach((dep) => {
                  $ocLazyLoad.load({name: dep});
                });
                resolve(angular.module(MODULE_NAME));
              });
            });
          }]
        }
      })
      .state('role.full', {
        url: '/:role',
        views: {
          'mainView': {
            templateProvider: ($q) => {
              return $q((resolve) => {
                require.ensure([], () => resolve(require('../../templates/role/full.template.html')));
              });
            }
          }
        },
        controller: 'RoleFullCtrl',
        resolve: {
          loadDeps: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
            return $q((resolve) => {
              require.ensure([], function (require) {
                let ctrlDeps = require('./full.ctrl');
                ctrlDeps.default.forEach((dep) => {
                  $ocLazyLoad.load({name: dep});
                });
                resolve(angular.module(MODULE_NAME));
              });
            });
          }]
        }
      });
  })
  .name;
