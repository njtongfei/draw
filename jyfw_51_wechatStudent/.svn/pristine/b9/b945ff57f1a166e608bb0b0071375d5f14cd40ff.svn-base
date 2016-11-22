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
            .state('root.pageInfo', {
                url: '/pageInfo',
                views: {
                    '@': {
                        templateUrl: 'src/app/pageInfo/pageInfo.tpl.html',
                        controller: 'pageInfoView'
                    }
                }
            });
    }

    /**
     * @name  pageInfoView
     * @description Controller
     */
    function pageInfoView($scope, $log, $q, $location, $http, $rootScope) {
        var initPage = function () {
            var keyPointId = $location.search().keyPointId;
            var examid = $location.search().examid;
            var titles = $location.search().title;
            $scope.title = titles;
            var getQuestions = function() {
                return $http({
                    method: 'post',
                    url: $rootScope.subDomain + $rootScope.Interface + '/Interface0145.ashx',
                    data: {
                        examId: examid,
                        knowledgeId: keyPointId
                    }
                });
            };

            getQuestions().then(function(resp) {
                var questions = _.map(resp.data.msg, function(item) {
                    return {
                        analysis: item.analysis,
                        classNum: item.classNum,
                        diffnum: item.diffnum,
                        question:item.question,
                        answer: item.answer,
                        examname: item.examname,
                        examtime: item.examtime,
                        getscore: item.getscore,
                        knowledge: item.knowledge,
                        errorNum: item.errorNum,
                        errorScores: item.errorScores,
                        upRank: item.upRank,
                        option: item.option,
                        totalscore: item.totalscore
                    };
                });

                var option = _.map(resp.data.msg, function (item) {

                });

                $scope.showdetaillist = function () {
                    location.hash = '/detailnewlist?keyPointId=' + keyPointId;
                    //console.log(keyPointId + "-----------ada");
                };
                $scope.selectHandler = function(data) {
 
					var keyPointId = $location.search().keyPointId;
		
					location.hash = '#/detailfast?&keyPointId=' + keyPointId +'&titles='+$scope.title ;
				};
                var questionList = $scope.questionList = questions;
                //$scope.currentIndex = 0;
                $scope.currentQuestion = $scope.questionList[0];
                
                var totalNumber = $scope.totalNumber = $scope.questionList.length;
                console.log(totalNumber + "---ad");


                //console.log(questionList[0].errorNum + "---e2131");
                //console.log(questionList[1].errorNum + "---e2132");
                //console.log(questionList[2].errorNum + "---e2133");
                //console.log(questionList[3].errorNum + "---e2134");
                //console.log(questionList[4].errorNum + "---e2135");
                //console.log("--------------------------++");
                //console.log(questionList[0].errorScores + "---e2131");
                //console.log(questionList[1].errorScores + "---e2132");
                //console.log(questionList[2].errorScores + "---e2133");
                //console.log(questionList[3].errorScores + "---e2134");
                //console.log(questionList[4].errorScores + "---e2135");
                //console.log("--------------------------++");
                //console.log(questionList[0].upRank + "---e2131");
                //console.log(questionList[1].upRank + "---e2132");
                //console.log(questionList[2].upRank + "---e2133");
                //console.log(questionList[3].upRank + "---e2134");
                //console.log(questionList[4].upRank + "---e2135");

            });
        };
        
        initPage();
        $scope.$emit('Init_header', {
            title: '错误知识点查看',
            showBack: true
        });

    }
   

    angular.module('pageInfo', [])
        .config(config)
        .controller('pageInfoView', pageInfoView)
        
})();