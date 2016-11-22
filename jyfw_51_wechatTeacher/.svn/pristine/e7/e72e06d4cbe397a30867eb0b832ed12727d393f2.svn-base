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
    var currentListIndex = 0; // 一次获取25条题目，每次展示5条，点击提升难度，展示下面五条 
    function FastTestCtrl(data, $scope, $rootScope, $http, $location) {
        $scope.$emit('Init_header', {
            title: '极速测试',
            showBack: true,
            fromHash: '/testIndex?id=' + $location.search().id
        });

        // var getPaper= function(){
        //     return [{
        //         index :'1',
        //         description:'考题测试考题测试考题测试考题测试考题测试考题测试考题测试考题测试考题测试',
        //         pictureUrl: '',
        //         selections:[{'select':'A','answer':'AAAAA'},{'select':'B','answer':'BBBB'},{'select':'C','answer':'CCCC'},{'select':'D','answer':'DDDDD'}],
        //         answer:'A'
        //     },{
        //         index :'2',
        //         description:'还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试还是测试',
        //         pictureUrl: '',
        //         selections:[{'select':'A','answer':'AAAAA'},{'select':'B','answer':'BBBB'},{'select':'C','answer':'CCCC'},{'select':'D','answer':'DDDDD'}],
        //         answer:'B'
        //     },{
        //         index :'3',
        //         description:'3333333333333333333333333333333333333333333333333333333333333',
        //         pictureUrl: '',
        //         selections:[{'select':'A','answer':'AAAAA'},{'select':'B','answer':'BBBB'},{'select':'C','answer':'CCCC'},{'select':'D','answer':'DDDDD'}],
        //         answer:'B'
        //     },{
        //         index :'4',
        //         description:'444444444444444444444444444444',
        //         pictureUrl: '',
        //         selections:[{'select':'A','answer':'AAAAA'},{'select':'B','answer':'BBBB'},{'select':'C','answer':'CCCC'},{'select':'D','answer':'DDDDD'}],
        //         answer:'B'
        //     },{
        //         index :'5',
        //         description:'555555555555555555555555555',
        //         pictureUrl: '',
        //         selections:[{'select':'A','answer':'AAAAA'},{'select':'B','answer':'BBBB'},{'select':'C','answer':'CCCC'},{'select':'D','answer':'DDDDD'}],
        //         answer:'B'
        //     }];
        // };


        $http({
            method: 'post',
            url: $rootScope.baseDomain + $rootScope.InterfaceRouter + '/WXInterface005.ashx',
            data: {
                'sectionId': $location.search().testSectionId
            }
        }).then(function(resp) {
            $scope.totalPaperList = resp.data.msg;
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

            _.each($scope.totalPaperList, function(item, index) {
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

            $scope.paperList = $scope.totalPaperList.slice(currentListIndex * 5, currentListIndex * 5 + 5);
            $scope.currentItem = $scope.paperList[0];
            $scope.totleNumber = $scope.paperList.length;

            console.error($scope.paperList);
        });

        $scope.preIndex = 0;
        $scope.currentIndex = 0;
        //$scope.paperList = getPaper();
        $scope.preOptionIndex = 0;
        $scope.itemCanSelected = false;
        $scope.optionCanSelected = true;
        $scope.selectItem = function(tag, autoSelect) {
            if (autoSelect) {

                $scope.preIndex = $scope.currentIndex;
                $('.fastTest .numbers .number' + $scope.preIndex).removeClass('numberFocus');
                $scope.currentIndex = parseInt(tag);

                if ($scope.currentIndex > $scope.paperList.length - 1) {
                    $scope.currentIndex = $scope.paperList.length - 1;
                }

                if ($scope.optionCanSelected) {
                    $('.fastTest .optionButtons .option' + $scope.currentItem.preOptionIndex).removeClass('optionButtonFocus');
                    $('.fastTest .optionButtons .option' + $scope.currentItem.userSelected).addClass('optionButtonFocus');
                    $scope.preOptionIndex = $scope.currentItem.userSelected;
                }

                $scope.currentItem = $scope.paperList[$scope.currentIndex];
                $('.fastTest .numbers .number' + $scope.currentIndex).addClass('numberFocus');
                $('.fastTest .optionButtons .option' + $scope.preOptionIndex).removeClass('optionButtonFocus');

            } else if ($scope.itemCanSelected) {
                $scope.currentIndex = parseInt(tag);
                $scope.currentItem = $scope.paperList[$scope.currentIndex];

                for (var i = 0; i < 4; i++) {
                    $('.fastTest .optionButtons .option' + i).removeClass('optionButtonFocus');
                    $('.fastTest .optionButtons .option' + i).removeClass('rightOption');
                }
                setTimeout(function() {
                    $('.fastTest .optionButtons .option' + $scope.currentItem.userSelected).addClass('optionButtonFocus');
                    if (!$scope.currentItem.result) {
                        $('.fastTest .optionButtons .option' + getNumber($scope.currentItem.answer)).addClass('rightOption');
                    }
                }, 0)


            } else {
                $rootScope.$broadcast('Get_Message', '你必须做完全部练习才能查看题目');
            }
        };

        $scope.selectOption = function(tag) {

            if ($scope.optionCanSelected) {

                $scope.currentItem.userSelected = parseInt(tag);
                $scope.preOptionIndex = tag;
                $('.fastTest .optionButtons .option' + $scope.currentItem.userSelected).addClass('optionButtonFocus');

                var index = $scope.currentIndex;


                if ($scope.currentIndex === $scope.paperList.length - 1) {
                    $scope.optionCanSelected = false;
                    $scope.itemCanSelected = true;
                    showResult();

                    $scope.selectItem($scope.currentIndex)
                } else {
                    $scope.selectItem(index + 1, true);
                }
            }
        };

        $scope.errorFollow = function() {

            var keypointIds = '';
            var questionIds = '';

            for (var i = 0; i < $scope.paperList.length; i++) {
                if ($scope.paperList[i].result == false) {
                    keypointIds += $scope.paperList[i].keypointId;
                    questionIds += $scope.paperList[i].questionId;
                }
            }
            $http({
                method: 'post',
                url: $rootScope.baseDomain + $rootScope.InterfaceRouter + '/WXInterface004.ashx',
                data: {
                    'keypointId': keypointIds,
                    'questionId': questionIds
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

                $scope.currentItem = $scope.paperList[0];
                $scope.preIndex = 0;
                $scope.currentIndex = 0;
                $scope.preOptionIndex = 0;
                $scope.itemCanSelected = false;
                $scope.optionCanSelected = true;
            });
        };

        $scope.promote = function(tag) {
            if ((currentListIndex + 1) * 5 > $scope.totalPaperList.length) {
                $rootScope.$broadcast('Get_Message', '没有题目了');
                return;
            }
            currentListIndex++;
            $scope.paperList = $scope.totalPaperList.slice(currentListIndex * 5, currentListIndex * 5 + 5);
            $scope.currentItem = $scope.paperList[0];


            $scope.preIndex = 0;
            $scope.currentIndex = 0;
            $scope.preOptionIndex = 0;
            $scope.itemCanSelected = false;
            $scope.optionCanSelected = true;
        };

        function showResult() {
            for (var i = 0; i < $scope.paperList.length; i++) {
                if ($scope.paperList[i].userSelected === getNumber($scope.paperList[i].answer)) {
                    $scope.paperList[i].result = true;
                    $('.fastTest .numbers .number' + i).addClass('rightNumber');
                } else {
                    $scope.paperList[i].result = false;
                    $('.fastTest .numbers .number' + i).addClass('wrongNumber');
                }
            }
        };

        function getNumber(select) {
            switch (select) {
                case 'A':
                    return 0;
                case 'B':
                    return 1;
                case 'C':
                    return 2;
                case 'D':
                    return 3;
                default:
                    return 0
            }
        };
    }

    angular.module('fastTest', [])
        .controller('FastTestCtrl', FastTestCtrl);
})();