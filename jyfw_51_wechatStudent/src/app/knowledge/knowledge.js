/**
 * Created by Hexl on 2015/9/8.
 */
(function () {
    'use strict';

    /**
     * @name  config
     * @description config block
     */
    function config($stateProvider) {
        $stateProvider
            .state('root.knowledge', {
                url: '/knowledge',
                views: {
                    '@': {
                        templateUrl: 'src/app/knowledge/knowledge.tpl.html',
                        controller: 'knowledgeView'
                    }
                }
            });
    }

    /**
     * @name  knowledgeView
     * @description Controller
     */
    function knowledgeView($scope, $log, $q, $location, $http, $rootScope, $cookieStore) {
        var initPage = function () {
            var examid = $location.search().examid;
            var getQuestions = function (data) {
                return $http({
                    method: 'post',
                    url: $rootScope.subDomain + $rootScope.Interface + '/Interface0144.ashx',
                    data: {
                        examid: examid
                    }
                });
            };

            getQuestions(examid).then(function (resp) {
                var knows = _.map(resp.data.msg, function (item) {
                    return {
                        errorScores: item.errorScores,
                        title: item.title,
                        keypointID: item.keypointID
                    };

                });
                $scope.knowslist = knows;
            });
            
        };
        initPage();
        $scope.$emit('Init_header', {
            title: sessionStorage.getItem('tit'),
            showBack: false,
            fromHash: '/browse-condition?id=' + $location.search().id

        });
        $scope.selectHandler = function (data, title) {
            var keypointID = data;
            var userId = angular.fromJson($cookieStore.get('userInfo')).sfid;
            var examid = $location.search().examid;
            location.hash = '#/pageInfo?examid=' + examid + "&keyPointId=" + keypointID + "&userId=" + userId + "&title=" + title;
        };

    }


    angular.module('knowledge', ['ngCookies'])
        .config(config)
        .controller('knowledgeView', knowledgeView)

})();