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
            .state('root.student-analysis', {
                url: '/student-analysis',
                views: {
                    '@': {
                        templateUrl: 'src/app/student-analysis/student-analysis.tpl.html',
                        controller: 'studentAnalysisCtrl'
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

        var reqData = {
            "userId": params.uid
        };

        $http.post($rootScope.baseDomain + $rootScope.InterfacewxRouter + '/Interface0019.ashx', reqData).success(function (data) {
            console.log(data);

            var chartData = data.msg;
            Morris.Line({
                element: 'exam-chart',
                data: chartData,
                xkey: ['examname'],
                ykeys: ['score'],
                labels: ['趋势'],
                xLabelAngle: 80,
                parseTime: false,
                smooth: false
            });

            $('#exam-chart svg').height(550);
        });

        $scope.$emit('Init_header', {
            title: '学生分析',
            showBack: false
        });
    }

    angular.module('student-analysis', [])
        .config(config)
        .controller('studentAnalysisCtrl', Score);
})();