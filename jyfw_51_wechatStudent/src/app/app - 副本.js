(function () {
    'use strict';

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });

    function config($stateProvider, $urlRouterProvider, $logProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/');
        $logProvider.debugEnabled(true);
        $httpProvider.interceptors.push('httpInterceptor');
        $stateProvider
            .state('root', {
                views: {
                    'header': {
                        templateUrl: 'src/common/header.tpl.html',
                        controller: 'HeaderCtrl'
                    },
                    'footer': {
                        templateUrl: 'src/common/footer.tpl.html',
                        controller: 'FooterCtrl'
                    }
                }
            })
            .state('root.home', {
                url: '/',
                views: {
                    '@': {
                        templateUrl: 'src/app/templet/home.html',
                        controller: 'HomeCtrl',
                        resolve: {
                            data: function (DataService) {
                                return DataService.get();
                            }
                        }
                    }
                }
            }).state('root.improveIndex', {
                url: '/improveIndex',
                views: {
                    '@': {
                        templateUrl: 'src/app/templet/improveIndex.html',
                        controller: 'ImproveIndexCtrl',
                        resolve: {
                            data: function (DataService) {
                                return DataService.get();
                            }
                        }
                    }
                }
            }).state('root.errorIndex', {
                url: '/errorIndex',
                views: {
                    '@': {
                        templateUrl: 'src/app/templet/errorIndex.html',
                        controller: 'ErrorIndexCtrl',
                        resolve: {
                            data: function (DataService) {
                                return DataService.get();
                            }
                        }
                    }
                }
            }).state('root.errorPage', {
                url: '/errorPage',
                views: {
                    '@': {
                        templateUrl: 'src/app/templet/errorPage.html',
                        controller: 'ErrorPageCtrl',
                        resolve: {
                            data: function (DataService) {
                                return DataService.get();
                            }
                        }
                    }
                }
            }).state('root.fastTest', {
                url: '/fastTest',
                views: {
                    '@': {
                        templateUrl: 'src/app/templet/fastTest.html',
                        controller: 'FastTestCtrl',
                        resolve: {
                            data: function (DataService) {
                                return DataService.get();
                            }
                        }
                    }
                }
            });
    }

    function MainCtrl($log) {
        $log.debug('MainCtrl laoded!');
    }

    function run($rootScope, $log) {
        $log.debug('App is running!');
        /**
         * when open a new hash, send a message to init header.message will be like this:
         * title: string  title to show on the header
         * showBack: boolean  if show back key
         */
        $rootScope.$on('Init_header', function (e, data) {
            $log.debug('get Init_header message: data = ');
            $log.debug(data);
            $rootScope.$broadcast('Init_header_data', data);
        })
    }

    angular.module('app', [
        'ui.router',
        'home',
        'getting-started',
        'common.header',
        'common.footer',
        'common.services.data',
        'common.directives.version',
        'common.filters.uppercase',
        'common.filters.trustHtml',
        'common.interceptors.http',
        'templates',
        'account-binding',
        'buy-service',
        'improveIndex',
        'errorIndex',
        'errorPage',
        'fastTest',
        'score',
        'browse-condition',
        'browse-question'
    ])
        .config(config)
        .run(run)
        .controller('MainCtrl', MainCtrl)
        .value('version', '1.1.0');
})();
