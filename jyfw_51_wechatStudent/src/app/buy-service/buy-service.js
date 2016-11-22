/**
 * Created by Hexl on 2015/9/7.
 */
(function() {
    'use strict';

    /**
     * @name  config
     * @description config block
     */
    function config($stateProvider) {
        $stateProvider
            .state('root.buy-service', {
                url: '/buy-service',
                views: {
                    '@': {
                        templateUrl: 'src/app/buy-service/buy-service.tpl.html',
                        controller: 'BuyServiceCtrl'
                    }
                }
            });
    }

    /**
     * @name  gettingStartedCtrl
     * @description Controller
     */
    function BuyServiceCtrl($scope, $log, $q, $location, $cookies, $rootScope, $http) {
        $log.debug('buy-service page init...');
        $log.debug(new Date().getTime());

        var initPage = function() {
            var getService = function() {
                return [{
                    name: '所有服务',
                    id: '3'
                }, {
                    name: '打印服务',
                    id: '2'
                }];
            };

            var getClass = function() {
                return [{
                    name: '一年级上'
                }, {
                    name: '一年级下'
                }, {
                    name: '二年级上'
                }, {
                    name: '二年级下'
                }, {
                    name: '三年级上'
                }, {
                    name: '三年级下'
                }];
            };

            var id = $location.search().id;
            var PRICE_SINGLE = 500;

            $scope.serviceList = getService();
            $scope.currentService = $scope.serviceList[0];

            $scope.classList = getClass();
            //$scope.currentClassList = [$scope.classList[0]];

            $scope.zhekou = 0;
            $scope.total = 0;

            $scope.selectService = function(data) {
                $scope.currentService = data;
            };
            $scope.selectClass = function(data) {
                $scope.currentClassList = $scope.currentClassList || [];
                var index = $scope.currentClassList.indexOf(data);
                if (index >= 0) {
                    $scope.currentClassList.splice(index, 1);
                } else {
                    $http({
                        method: 'post',
                        url: $rootScope.subDomain + $rootScope.InterfaceRouter + '/WXInterface001A.ashx',
                        data: {
                            SName: data.name
                        }
                    }).then(function(resp) {
                        if (+resp.data.code === 2) {
                            $scope.currentClassList.push(data);
                        } else if (+resp.data.code === 0) {
                            $rootScope.$broadcast('Get_Message', data.name + '已购买！');
                        }
                    });
                }
            };

            $scope.buy = function() {
                //todo buy service

                if (_.isEmpty($scope.currentClassList)) {
                    $rootScope.$broadcast('Get_Message', '请选择一个年级。');
                    return;
                }
                //var param = {
                //    Uid: $rootScope.userId,
                //    Money: $scope.total,
                //    SName: _.map($scope.currentClassList, function(item) {
                //        return item.name;
                //    }).join(',')
                //};

                /*
                购买服务
                */
                var openId = $location.search().id
                var money = $scope.total;
                var uid = $rootScope.userId;
                var sname =  _.map($scope.currentClassList, function(item) {
                    return item.name;
                 }).join(',')
                //如果还需要其他参数 可以加到url的后边
                window.location.href = "src/app/buy-service/PayPage.aspx?openid=" + openId + "&total_fee=" + money + "&showwxpaytitle=1&uid=" + uid + "&sname=" + sname;

                
                
                //$http({
                //    method: 'post',
                //    url: $rootScope.subDomain + $rootScope.InterfaceRouter + '/WXInterface001.ashx',
                //    data: param
                //}).then(function (resp) {
                //    if (+resp.data.code === 0) {
                        
                //    } else {
                //        $rootScope.$broadcast('Get_Message', '购买失败');
                //    }
                //});
            };

            $scope.$watch('currentClassList', function(list) {
                if (list) {
                    if (list.length === 6) {
                        $scope.zhekou = 8.5;
                        $scope.total = Math.floor(list.length * PRICE_SINGLE * $scope.zhekou * 0.1 / 100) * 100;
                    } else if (list.length >= 4) {
                        $scope.zhekou = 9;
                        $scope.total = Math.floor(list.length * PRICE_SINGLE * $scope.zhekou * 0.1 / 100) * 100;
                    } else {
                        $scope.zhekou = 0;
                        $scope.total = Math.floor(list.length * PRICE_SINGLE);
                    }
                }
            }, true);
        };

        initPage();

        $scope.$emit('Init_header', {
            title: '购买服务',
            showBack: true
        });

    }

    angular.module('buy-service', [])
        .config(config)
        .controller('BuyServiceCtrl', BuyServiceCtrl);
})();

