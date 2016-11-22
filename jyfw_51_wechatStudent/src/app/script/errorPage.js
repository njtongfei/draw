(function() {
    'use strict';

    /**
     * @name  config
     * @description config block
     */
    /**
     * @name  HomeCtrl
     * @description Controller
     */
    function ErrorPageCtrl(data, $scope, $http, $rootScope, $location) {

        $scope.$emit('Init_header', {
            title: '错题查看',
            showBack: true,
            fromHash: '/errorIndex?id=' + $location.search().id
        });

        $scope.showAnswerTag = false;
        $scope.showAnalysis = false;

        $http({
            method: 'post',
            url: $rootScope.baseDomain + $rootScope.InterfaceRouter + '/WXInterface002.ashx',
            data: {
                'contentId': $location.search().contentId
            }
        }).then(function(resp) {
            $scope.paperList = resp.data.msg;
            var tmpList = [{
                'key': 'A',
                'value': 'optionA'
            }, {
                'key': 'B',
                'value': 'optionB'
            }, {
                'key': 'C',
                'value': 'optionC'
            }, {
                'key': 'D',
                'value': 'optionD'
            }, {
                'key': 'E',
                'value': 'optionE'
            }, {
                'key': 'F',
                'value': 'optionF'
            }];

            _.each($scope.paperList, function(item, index) {
                item.selections = [];
                for (var i = 0; i < tmpList.length; i++) {
                    if (item[tmpList[i].value]) {
                        item.selections.push({
                            'select': tmpList[i].key,
                            'answer': item[tmpList[i].value]
                        });
                    }
                }
                item.index = index + 1;
                return item;
            });
            console.error($scope.paperList);
            $scope.currentPaper = $scope.paperList[0];
            $scope.totleNumber = $scope.paperList.length;
            $scope.leave = $scope.paperList[0];
        });

        //查看解析
        $scope.Viewanalysis = function () {
            var keypointIds = '';
            var questionIds = '';

            for (var i = 0; i < $scope.paperList.length; i++) {
                if ($scope.paperList[i].result == false) {
                    keypointIds += $scope.paperList[i].keypointId;
                    questionIds += $scope.paperList[i].questionId;
                }
            }
            //if (questionIds == '' || keypointIds == '') {
            //    $rootScope.$broadcast('Get_Message', '请先做完所有题目,才能查看试题解析');
            //    return false;
            //}
            var analyBox = '';
            analyBox += '<div class=scrolldiv>';
            analyBox += '<div class=kd><span>考点</span></div>';
            analyBox += '<div class=conbox>' + $scope.paperList[$scope.currentIndex].keyName + '</div>';
            analyBox += '<div class=kd><span>分析</span></div>';
            analyBox += '<div  class=conbox>' + $scope.paperList[$scope.currentIndex].analysis + '</div>';
            analyBox += '<div class=kd><span>解答</span></div>';
            analyBox += '<div  class=conbox>' + $scope.paperList[$scope.currentIndex].answer + '</div>';
            analyBox += '</div>';
            $rootScope.$broadcast('Get_Message', analyBox, 1);

        }


        $scope.currentIndex = sessionStorage.getItem('errorIndex') ? parseInt(sessionStorage.getItem('errorIndex')) : 1;
        $scope.showAnalysis = false;
        $scope.selectItem = function(tag) {

            console.log(tag);
            if (tag === 1) {
                if ($scope.currentIndex === $scope.paperList.length) {
                    return;
                }

                $scope.currentIndex++;
                $scope.currentPaper = $scope.paperList[$scope.currentIndex - 1];
            } else {
                if ($scope.currentIndex === 1) {
                    return;
                }
                $scope.currentIndex--;
                $scope.currentPaper = $scope.paperList[$scope.currentIndex - 1];
            }
        };

    }

    angular.module('errorPage', [])
        .controller('ErrorPageCtrl', ErrorPageCtrl);
})();