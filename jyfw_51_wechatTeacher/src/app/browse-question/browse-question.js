/**
 * Created by Hexl on 2015/9/8.
 */
(function() {
    'use strict';

    /**
     * @name  config
     * @description config block
     */
    function config($stateProvider) {
        $stateProvider
            .state('root.browse-question', {
                url: '/browse-question',
                views: {
                    '@': {
                        templateUrl: 'src/app/browse-question/browse-question.tpl.html',
                        controller: 'BrowseQuestionCtrl'
                    }
                }
            });
    }

    /**
     * @name  AccountBindingCtrl
     * @description Controller
     */
    function BrowseQuestionCtrl($scope, $log, $q, $location, $http, $rootScope) {
        var initPage = function() {
            var getQuestions = function(chapter, qType, handler) {
                return $http({
                    method: 'post',
                    url: $rootScope.subDomain + $rootScope.InterfaceRouter + '/WXInterface007.ashx',
                    data: {
                        sectionId: chapter,
                        Qtypeid: qType,
                        mark: handler
                    }
                });
            };
            var chapterId = $location.search().chapter,
                qType = $location.search().qType,
                mark = $location.search().handler;

            getQuestions(chapterId, qType, mark).then(function(resp) {
                var questions = _.map(resp.data.msg, function(item) {
                    return {
                        questionId: item.questionId,
                        question: item.question,
                        answer: item.answer,
                        analysis: item.analysis,
                        optionA: item.optionA,
                        optionB: item.optionB,
                        optionC: item.optionC,
                        optionD: item.optionD,
                        optionE: item.optionE,
                        optionF: item.optionF,
                    };
                });
                $scope.questionList = questions;
                $scope.currentIndex = 0;
                $scope.currentQuestion = $scope.questionList[0];
                $scope.totalNumber = $scope.questionList.length;
            });

            $scope.currentShow = 'QUESTION';

            $scope.handlerList = [{
                name: '掌握',
                id: '1'
            }, {
                name: '欠缺',
                id: '2'
            }, {
                name: '不懂',
                id: '3'
            }];

            $scope.currentHandler = _.find($scope.handlerList, function(item) {
                return item.id === mark;
            });

            $scope.selectHandler = function(data) {
                if ($scope.currentHandler === data) {
                    $scope.currentHandler = undefined;
                    //todo remove mark
                    $http({
                        method: 'post',
                        url: $rootScope.subDomain + $rootScope.InterfaceRouter + '/WXInterface008A.ashx',
                        data: {
                            fPFLnkID: $scope.currentQuestion.questionId,
                            type: data.id
                        }
                    }).then(function() {
                        $rootScope.$broadcast('Get_Message', '取消标记成功！');
                    });
                } else {
                    $scope.currentHandler = data;
                    //todo add mark
                    $http({
                        method: 'post',
                        url: $rootScope.subDomain + $rootScope.InterfaceRouter + '/WXInterface008.ashx',
                        data: {
                            stType: '试题',
                            fPFLnkID: $scope.currentQuestion.questionId,
                            type: $scope.currentHandler.id,
                            memo: ''
                        }
                    }).then(function() {
                        $rootScope.$broadcast('Get_Message', '标记成功！');
                    });
                }
            };

            $scope.showAnswer = function() {
                $scope.currentShow = 'ANSWER';
            };

            $scope.showAnalysis = function() {
                $scope.currentShow = 'ANALYSIS';
            };

            $scope.showQuestion = function() {
                $scope.currentShow = 'QUESTION';
            };

            $scope.pre = function() {
                if ($scope.currentIndex > 0) {
                    $scope.currentShow = 'QUESTION';
                    $scope.currentIndex--;
                    $scope.currentQuestion = $scope.questionList[$scope.currentIndex];
                    $scope.currentHandler = undefined;
                }
            };

            $scope.next = function() {
                $scope.currentShow = 'QUESTION';
                if ($scope.currentIndex < $scope.questionList.length - 1) {
                    $scope.currentIndex++;
                    $scope.currentQuestion = $scope.questionList[$scope.currentIndex];
                    $scope.currentHandler = undefined;
                }
            };

            $scope.selectQType = function(data) {
                $scope.currentQType = data;
            };
        };
        initPage();

        $scope.$emit('Init_header', {
            title: '浏览题库',
            showBack: true,
            fromHash: '/browse-condition?id=' + $location.search().id
        });

    }

    angular.module('browse-question', [])
        .config(config)
        .controller('BrowseQuestionCtrl', BrowseQuestionCtrl);
})();