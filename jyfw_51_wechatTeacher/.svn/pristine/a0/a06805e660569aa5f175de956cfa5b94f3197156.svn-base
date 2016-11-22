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
            .state('root.class-analysis', {
                url: '/class-analysis',
                views: {
                    '@': {
                        templateUrl: 'src/app/class-analysis/class-analysis.tpl.html',
                        controller: 'classAnalysisCtrl'
                    }
                }
            });
    }



    /**
     * @description Controller
     */
    function Score($scope, $log, $q, $http, $rootScope, $stateParams, $cookies, $location, PaperPreviewService) {
        $scope.goBack = function () {
            window.history.go(-1);
        };

        var params = $location.search();
        var classid = params.classid;
        $http.post($rootScope.subDomain + $rootScope.InterfacewxRouter + '/Interface0011.ashx', {
            "classId": classid
        }).success(function (data) {
            //var average = $location.search().average;
            var chartData = data.msg;
            //console.log(chartData);

            Morris.Line({
                element: 'klg-chart',
                data: chartData,
                xkey: ['name'],
                ykeys: ['average'],
                labels: ['平均分'],
                xLabelAngle: 80,
                parseTime: false,
                smooth: false
            });

            $('#klg-chart svg').height(550);
        });

        $scope.$emit('Init_header', {
            title: '班级学习情况分析',
            showBack: false
        });
    }

    angular.module('class-analysis', [])
        .config(config)
        .controller('classAnalysisCtrl', Score);
})();