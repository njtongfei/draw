(function() {
    'use strict';

    /**
     * @name  config
     * @description config block
     */
    function config($stateProvider) {
        $stateProvider
            .state('root.detailfast', {
                url: '/detailfast',
                views: {
                    '@': {
                        templateUrl: 'src/app/detailfast/detailfastView.tpl.html',
                        controller: 'detailFastCtrl'
                    }
                }
            });
    }

    
    /**
     * @name  detailFastCtrl
     * @description Controller
     */
    // $scope, $log, $q, $location, $http, $rootScope
    var currentListIndex = 0; // 一次获取25条题目，每次展示5条，点击提升难度，展示下面五条 
    function detailFastCtrl($scope, $rootScope, $http, $location,$q , $log , $interval , $compile) {
    	 
        $scope.$emit('Init_header', {
            title: '知识点补偿练习',
            showBack: true,
            fromHash: '/testIndex?id=' + $location.search().id
        });
  
        // 知识点ID
        $http({
            method: 'post',
            url: $rootScope.baseDomain + $rootScope.InterfaceRouter + '/WXInterface018.ashx',
            data: {
                'keyPointId': $location.search().keyPointId
                //keyPointId=d015aae0-6fae-411e-bdc3-229215c399bb
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
            $scope.leave = $scope.paperList[0];
        });
        // 定时器
        var time = 0
	 		    var timer = $interval(function(){
			    	time++;
			    	$scope.ti = time;
 			    },1000) 
 	
        $scope.preIndex = 0;
        $scope.currentIndex = 0;
        //$scope.paperList = getPaper();
        $scope.preOptionIndex = 0;
        $scope.itemCanSelected = false;
        $scope.optionCanSelected = true;
        var times_arr = []; // 做题时间
        var msgbox = [];
        var scores_arr = [] ; // 做题分数
        var isSend = false;
        $scope.selectItem = function(tag, autoSelect) {
        	 
        	
            
                
            if (autoSelect) {

                $scope.preIndex = $scope.currentIndex;
                $('.fastTest .numbers .number' + $scope.preIndex).addClass('desc');
                $scope.currentIndex = parseInt(tag);
                 
             
            
               
              

            
   
                
                if ($scope.currentIndex > $scope.paperList.length - 1) {
                    $scope.currentIndex = $scope.paperList.length - 1;
                }

                if ($scope.optionCanSelected) {
             
                    $scope.preOptionIndex = $scope.currentItem.userSelected;
                   
                }

                $scope.currentItem = $scope.paperList[$scope.currentIndex];
                $scope.leave = $scope.paperList[$scope.currentIndex];
               

            } else if ($scope.itemCanSelected) {
                
                $scope.currentIndex = parseInt(tag);
                $scope.currentItem = $scope.paperList[$scope.currentIndex];
                $scope.leave = $scope.paperList[$scope.currentIndex];
                
                 
                $('.fastTest .numbers .number' + $scope.currentIndex).addClass('desc');
             
                setTimeout(function() {                    
                        $('.fastTest .selections .option' + getNumber($scope.currentItem.answer)).addClass('rightOption');
                        $('.fastTest .selections .rightOption').find('dt').addClass('correct')
                        $('.fastTest .selections .rightOption').find('dd').addClass('correct')
                        $('.fastTest .selections .rightOption').find('dd').append('<span class="fa fa-check fa-2x"></span>')
                    if (!$scope.currentItem.result) {
                        $('.fastTest .selections .option' + $scope.currentItem.userSelected).addClass('optionButtonFocus');
                        $('.fastTest .selections .optionButtonFocus').find('dt').addClass('wrong');
                        $('.fastTest .selections .optionButtonFocus').find('dd').addClass('wrong');
                        $('.fastTest .selections .optionButtonFocus').find('dd').append('<span class="fa fa-close fa-2x"></span>')
                       
                    }
                    
                }, 0)
                
                
 
               
                // clear time 定时器
                $interval.cancel(timer);
                // send msg
                var qid = $location.search().keyPointId;
                var score = score;
                var str = '';

            
                for (var i = 0; i < times_arr.length; i++) {
                      msgbox.push({
                       	qid : $scope.paperList[i].questionId,
                       	time : times_arr[i],
                       	score : scores_arr[i]
                       })
              
                }
        
                if(isSend==false){
                	$http({
			            method: 'POST',
			            url: $rootScope.baseDomain + $rootScope.InterfaceRouter + '/WXInterface020.ashx',
			            data: {
			                 msg: msgbox
			            }
		            }).success(function(){
		            	isSend = true;
		            })
                }
                	
              
                

            } else {
                //$scope.currentIndex = parseInt(tag);
                //$scope.currentItem = $scope.paperList[$scope.currentIndex];
               
                $scope.preIndex = $scope.currentIndex;
                //$('.fastTest .numbers .number' + $scope.preIndex).removeClass('numberFocus');
                //$scope.currentIndex = parseInt(tag);
                if ($scope.preIndex == parseInt(tag)-1) {

                    // $rootScope.$broadcast('Get_Message', '你必须做完全部练习才能查看题目');
              

                } else {

                    $rootScope.$broadcast('Get_Message', '你必须做完全部练习才能查看题目');

                }
            }
        };

        $scope.selectOption = function(tag) {
 
            
            if ($scope.optionCanSelected) {

                $scope.currentItem.userSelected = parseInt(tag);
                $scope.preOptionIndex = tag;
           
               // $('.fastTest .selections .option' + $scope.currentItem.userSelected).addClass('optionButtonFocus');
            
                var index = $scope.currentIndex;
                    // 点击记录做每道题的时间
		        	if($scope.currentIndex==0){
		        		times_arr.push($scope.ti);  

	        	}else{
		        		times_arr.push($scope.ti - times_arr[$scope.currentIndex-1])
		        	}
		        
                
                
                
                
                
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
        $scope.Viewanalysis = function(){ // 查看解析
        	var keypointIds = '';
            var questionIds = '';

            for (var i = 0; i < $scope.paperList.length; i++) {
                if ($scope.paperList[i].result == false) {
                    keypointIds += $scope.paperList[i].keypointId;
                    questionIds += $scope.paperList[i].questionId;
                }
            }
            if(questionIds=='' || keypointIds=='' ){
            	$rootScope.$broadcast('Get_Message', '请先做完所有题目,才能查看试题解析');
            	return false;
            }
        	var titles = $location.search().titles;
        	var analyBox ='';
             	analyBox += '<div class=scrolldiv>';
            	analyBox +='<div class=kd><span ng-click="get()" id="aa">考点</span></div>';
                analyBox += '<div class=conbox>'+titles+'</div>';
            	analyBox +='<div class=kd><span>分析</span></div>';
                analyBox += '<div  class=conbox>'+$scope.paperList[$scope.currentIndex].analysis+'</div>';
                analyBox +='<div class=kd><span>解答</span></div>';
                analyBox += '<div  class=conbox>'+$scope.paperList[$scope.currentIndex].answer+'</div>';
                analyBox += '</div>';
                
          
            	$rootScope.$broadcast('Get_Message', analyBox , 1);
        
            
        }
        
        $scope.errorFollow = function() { //  错题追击

            var keypointIds = '';
            var questionIds = '';

            for (var i = 0; i < $scope.paperList.length; i++) {
                if ($scope.paperList[i].result == false) {
                    keypointIds += $scope.paperList[i].keypointId;
                    questionIds += $scope.paperList[i].questionId;
                }
            }
            if(questionIds=='' || keypointIds=='' ){
            	$rootScope.$broadcast('Get_Message', '请先做完所有题目');
            	return false;
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

        function showResult() {  // 判断答案是否正确
            for (var i = 0; i < $scope.paperList.length; i++) {
                if ($scope.paperList[i].userSelected === getNumber($scope.paperList[i].answer)) {
                    $scope.paperList[i].result = true;
                    scores_arr.push(parseInt($scope.paperList[i].scores))
              
                } else {
                    $scope.paperList[i].result = false;
                    scores_arr.push(0)
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
   
    angular.module('detailfast', [])
        .config(config)
        .controller('detailFastCtrl', detailFastCtrl)
})();