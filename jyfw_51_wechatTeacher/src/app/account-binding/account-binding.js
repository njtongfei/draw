/**
 * Created by Hexl on 2015/9/4.
 */
(function() {
    'use strict';

    /**
     * @name  config
     * @description config block
     */
    function config($stateProvider) {
        $stateProvider
            .state('root.account-binding', {
                url: '/account-binding?id&from',
                views: {
                    '@': {
                        templateUrl: 'src/app/account-binding/account-binding.tpl.html',
                        controller: 'AccountBindingCtrl'
                    }
                }
            });
    }

    /**
     * @name  AccountBindingCtrl
     * @description Controller
     */
    function AccountBindingCtrl($rootScope, $scope, $log, $q, $location, $http, $cookies) {
        var getSchool = function() {
            return $http({
                method: 'post',
                url: $rootScope.baseDomain + $rootScope.InterfaceRouter + '/WXInterface012.ashx',
                data: {}
            });
        };

        var getRelation = function() {
            return [{
                name: '选择关系',
                id: '-1'
            }, {
                name: '父亲',
                id: '父亲'
            }, {
                name: '母亲',
                id: '母亲'
            }];
        };

        var id = $location.search().id;

        getSchool().then(function(resp) {
            $scope.schoolList = resp.data.msg;
            $scope.schoolList.unshift({
                id: '-1',
                name: '选择学校',
                http: ''
            });
            $scope.currentSchool = $scope.schoolList[0];
        });

        $scope.relationList = getRelation();
        $scope.currentRelation = $scope.relationList[0];

        $scope.selectSchool = function(data) {
            $scope.currentSchool = data;
        };
        $scope.selectRelation = function(data) {
            $scope.currentRelation = data;
        };

        $scope.submitBinding = function() {
            //todo binding 51 account with weixin account
            if ($scope.currentSchool.id === '-1') {
                $rootScope.$broadcast('Get_Message', '请选择学校');
                return;
            }
            //if ($scope.currentRelation.id === '-1') {
            //    $rootScope.$broadcast('Get_Message', '请选择关系');
            //    return;
            //}
            if (!$scope.accountName) {
                $rootScope.$broadcast('Get_Message', '请填写用户名');
                return;
            }
            if (!$scope.password) {
                $rootScope.$broadcast('Get_Message', '请填写密码');
                return;
            }
            var param = {
                SchoolName: $scope.currentSchool.name,
                Relation: '老师',
                WXID: id,
                UserName: $scope.accountName,
                Password: $scope.password
            };
            $http({
                method: 'post',
                url: $rootScope.baseDomain + $rootScope.InterfaceRouter + '/WX_bind.ashx',
                data: param
            }).then(function(resp) {
                if (+resp.data.code === 0) {
                    $rootScope.userId = resp.data.msg;
                    $rootScope.subDomain = 'http://' + $scope.currentSchool.http;
                    $http({
                        method: 'post',
                        url: $rootScope.subDomain + $rootScope.InterfaceRouter + '/WXInterface011.ashx',
                        data: {
                            userid: $rootScope.userId
                        }
                    }).then(function(resp) {
                        $cookies.userInfo = angular.toJson(resp.data);
                        if ($location.search().from) {
                            location.hash = decodeURIComponent($location.search().from);
                        } else {
                            WeixinJSBridge.invoke('closeWindow', {}, function(res) {});
                        }
                    });
                } else {
                    $rootScope.$broadcast('Get_Message', '绑定失败！');
                }
            });
        };

        $scope.$emit('Init_header', {
            title: '51教育服务',
            showBack: false
        });

    }

    angular.module('account-binding', [])
        .config(config)
        .controller('AccountBindingCtrl', AccountBindingCtrl);
})();