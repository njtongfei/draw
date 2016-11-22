/**
 * Created by Hexl on 2015/9/7.
**/
(function() {
	'use strict';

	/**
	 * @name  config
	 * @description config block
	 */
	function config($stateProvider) {
		$stateProvider
			.state('root.sharefriend', {
			    url: '/sharefriend',
				views: {
					'@': {
					    templateUrl: 'src/app/sharefriend/sharefriend.tpl.html',
					    controller: 'sharefriendCtrl'
					}
				}
			});
	}

	/**
	 * @name  sharefriendCtrl
	 * @description Controller
	 */
	function sharefriend($scope, $log, $q, $http, $rootScope) {

	    var initPage = function () {
	        $http({
	            method: 'post',
	            url: $rootScope.baseDomain + $rootScope.InterfaceRouter + '/WXInterface025.ashx'
	        }).then(function (resp) {
	            var inittt = resp.data.msg;
	            var interinfos = $scope.interinfos = inittt[0];
	            console.log(interinfos.subMsg);
	            var subMsgs = _.map($scope.interinfos.subMsg, function (item) {
	                return {
	                    analysis: item.analysis,
	                    classRank: item.classRank,
	                    gradeRank: item.gradeRank,
	                    rankMsg: item.rankMsg,
	                    subName: item.subName
	                }
	            });
	            $scope.subinfos = subMsgs;

	            console.log($scope.subinfos.analysis + "---asd");
	        });

	        //切换账号
	        
	        var analyBox = '';
	        $scope.choseaccount = function () {
	            $http({
	                method: 'post',
	                url: $rootScope.baseDomain + $rootScope.InterfaceRouter + '/WXInterface026.ashx'
	            }).then(function (resp) {
	                var changeuser = $scope.changeuser = resp.data.msg;
	                var changeinfo = _.map(changeuser, function (item) {
	                    return {
	                        userid: item.userid,
	                        username: item.username
	                    }
	                });
	                

	                for (var i = 0; i < changeinfo.length; i++) {
	                    var usernames = '';
	                    usernames += changeinfo[i].username;
	                }
                     
	              
	                analyBox = '';
	                analyBox += '<div class=choseaccount>';
	                analyBox += '<div class="rounds" ng-click="goindex()">' + usernames + '</div>';
	                analyBox += '<div class="rounds backgroundco" ng-click="accountbind()">添加账号</div>';
	                analyBox += '</div>';
	                $rootScope.$broadcast('Get_Message', analyBox, 1);
	                


 	            });
	           
	            $scope.goindex = function () {
	                alert(2);
	            };
	            //var keypointID = data.keypointId;
	            //var userId = angular.fromJson($cookieStore.get('userInfo')).sfid;
	            //var examid = $location.search().examid;

	            //location.hash = '#/detailfast?examid=' + examid + "&keyPointId=" + keypointID + "&userId=" + userId;
	        };

	        //分享账号
	        $scope.shareaccount = function () {
	            alert(1);
	        }


           

	    };

	    initPage();

		$scope.$emit('Init_header', {
			title: '分享好友',
			showBack: true
		});
	}

    angular.module('sharefriend', [])
		.config(config)
		.controller('sharefriendCtrl', sharefriend);
})();