/**
 * Created by Hexl on 2015/9/7.
 */
(function () {
    'use strict';

    /**
     * @name  config
     * @description config block
     */
    function config($stateProvider) {
        $stateProvider
            .state('root.teachscore', {
                url: '/teachscore',
                views: {
                    '@': {
                        templateUrl: 'src/app/teachscore/teachscore.tpl.html',
                        controller: 'teachscoreCtrl'
                    }
                }
            });
    }

    /**
     * @name  gettingStartedCtrl
     * @description Controller
     */
    function Score($scope, $log, $q, $http, $rootScope, $cookies, PaperPreviewService) {
        $http.get($rootScope.subDomain + $rootScope.InterfaceRouter + '/WXInterface013.ashx').success(function (data) {
            $scope.teacherList = data.msg;
            //console.log($scope.teacherList);
            var userinfo = $scope.userinfo = JSON.parse($cookies.userInfo);
            //console.log(userinfo.username);
        });

        $scope.$emit('Init_header', {
            title: '积  分',
            showBack: true
        });
    }

    angular.module('teachscore', [])
        .config(config)
        .controller('teachscoreCtrl', Score);
})();