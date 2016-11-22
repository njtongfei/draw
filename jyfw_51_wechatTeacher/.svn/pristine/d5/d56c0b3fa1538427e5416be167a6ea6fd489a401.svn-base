/**
 * Created by foxbaby213 on 2015/12/7.
 */
(function () {
    'use strict';

    /**
     * @name  config
     * @description config block
     */
    function config($stateProvider) {
        $stateProvider
            .state('root.errorfix', {
                url: '/errorfix',
                views: {
                    '@': {
                        templateUrl: 'src/app/errorfix/errorfix.tpl.html',
                        controller: 'errorfixCtrl'
                    }
                }
            });
    }
        $(".choseone").click(function () {
            $(".oneshow").toggle();
        });
    /**
     * @name  gettingStartedCtrl
     * @description Controller
     */
    function errorfixCtrl($scope, $log, $q, $location, $cookies, $rootScope, $http) {
        $log.debug('msgview page init...');
        $log.debug(new Date().getTime());



        initPage();

        $scope.$emit('Init_header', {
            title: '51教育服务-考试错误分析',
            showBack: true
        });
    }

    angular.module('errorfix', [])
        .config(config)
        .controller('errorfixCtrl', errorfixCtrl);
})();

