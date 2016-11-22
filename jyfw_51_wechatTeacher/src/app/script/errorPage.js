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
        });

        // var getPaper = function() {
        //     return [{
        //         index: '1',
        //         description: '考题测试考题测试考题测试考题测试考题测试考题测试考题测试考题测试考题测试',
        //         pictureUrl: '',
        //         selections: [{
        //             'select': 'A',
        //             'answer': 'AAAAA'
        //         }, {
        //             'select': 'B',
        //             'answer': 'BBBB'
        //         }, {
        //             'select': 'C',
        //             'answer': 'CCCC'
        //         }, {
        //             'select': 'D',
        //             'answer': 'DDDDD'
        //         }],
        //         answer: 'A',
        //         analysis: '考题测试考题测试考题测试考题测试考题测试考题测试考题测试考题测试考题测试',
        //     }, {
        //         index: '2',
        //         description: '还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试',
        //         pictureUrl: '',
        //         selections: [{
        //             'select': 'A',
        //             'answer': 'AAAAA'
        //         }, {
        //             'select': 'B',
        //             'answer': 'BBBB'
        //         }, {
        //             'select': 'C',
        //             'answer': 'CCCC'
        //         }, {
        //             'select': 'D',
        //             'answer': 'DDDDD'
        //         }],
        //         answer: 'B',
        //         analysis: '还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试'
        //     }];
        // };
        // $scope.paperList = getPaper();
        // $scope.currentPaper = $scope.paperList[0];
        // $scope.totleNumber = $scope.paperList.length;

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

        $scope.showAnswer = function() {

            if (!$scope.showAnswerTag) {
                $('.errorPage .showPage .content').hide();
                $('.errorPage .showPage .showAnalysis').show();
                $('.errorPage .showPage .analysis').hide();
                $('.errorPage .showPage .answer').show();
                $('.errorPage .buttons .buttonAnswer').text('返回');
                $scope.showAnswerTag = true;

                $('.errorPage .buttons .buttonAnalysis').text('解析');
                $scope.showAnalysis = false;
            } else {
                $('.errorPage .showPage .content').show();
                $('.errorPage .showPage .showAnalysis').hide();
                $('.errorPage .buttons .buttonAnswer').text('答案');
                $scope.showAnswerTag = false;
            }
        };

        $scope.buttonAnalysisClick = function() {

            if (!$scope.showAnalysis) {
                $('.errorPage .showPage .content').hide();
                $('.errorPage .showPage .showAnalysis').show();
                $('.errorPage .showPage .analysis').show();
                $('.errorPage .showPage .answer').hide();
                $('.errorPage .buttons .buttonAnalysis').text('返回');

                $('.errorPage .buttons .buttonAnswer').text('答案');
                $scope.showAnswerTag = false;

                $scope.showAnalysis = true;
            } else {
                $('.errorPage .showPage .content').show();
                $('.errorPage .showPage .showAnalysis').hide();
                $('.errorPage .buttons .buttonAnalysis').text('解析');
                $scope.showAnalysis = false;
            }
        };

        $scope.showPaper = function() {
            sessionStorage.setItem('errorIndex', $scope.currentIndex);
            //window.location.href = 'http://jlzx.51jyfw.com/theme/第1章 全等三角形!初二8/第1章 全等三角形!初二80004.pdf';
            window.location.href = 'http://' + $scope.currentPaper.accessory;

            //$('body').append('<div id="pdfView" style="position:absolute;left:0px;top:0px;width:100%;height:100%;z-index:999"><iframe name="myiframe" width="100%" height="100%" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" src="http://jlzx.51jyfw.com/theme/第1章 全等三角形!初二8/第1章 全等三角形!初二80004.pdf"></iframe></div>');
        };
    }

    angular.module('errorPage', [])
        .controller('ErrorPageCtrl', ErrorPageCtrl);
})();