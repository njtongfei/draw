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
            .state('root.operationcompe', {
                url: '/operationcompe',
                views: {
                    '@': {
                        templateUrl: 'src/app/operationcompe/operationcompe.tpl.html',
                        controller: 'operationcompeCtrl'
                    }
                }
            });
    }

    /**
     * @name  gettingStartedCtrl
     * @description Controller
     */
    function Score($scope, $log, $q, $location, $cookies, $rootScope, $http) {

        var userinfo = $scope.userinfo = JSON.parse($cookies.userInfo);
        console.log(userinfo.sfid + "-----tett");
        $http.post($rootScope.subDomain + $rootScope.InterfaceRouter + '/WXInterface016.ashx', {
            "id": userinfo.sfid
        }).then(function (resp) {
            var knowList = $scope.knowList = resp.data.msg;
        });

        $scope.$emit('Init_header', {
            title: '作业补偿',
            showBack: true
        });
    }

    angular.module('operationcompe', [])
        .config(config)
        .controller('operationcompeCtrl', Score);
})();

