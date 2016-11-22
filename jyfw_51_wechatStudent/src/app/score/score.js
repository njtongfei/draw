﻿/**
 * Created by Hexl on 2015/9/7.
 */
/**
 * Created by Hexl on 2015/9/7.
 */
/**
*idir:
*imod:上升或者下降(0=上升，1=下降，2=不变)
*irank:战胜了多少
*  */
(function() {
	'use strict';

	/**
	 * @name  config
	 * @description config block
	 */
	function config($stateProvider) {
		$stateProvider
			.state('root.score', {
				url: '/score',
				views: {
					'@': {
						templateUrl: 'src/app/score/score.tpl.html',
						controller: 'ScoreCtrl'
					}
				}
			});
	}

	/**
	 * @name  gettingStartedCtrl
	 * @description Controller
	 */
	function Score($scope, $log, $q, $http, $rootScope, PaperPreviewService) {
		var initPage = function() {
			var getSubject = function() {
				return [{
					name: '数学',
					id: '数学'
				}, {
					name: '英语',
					id: '英语'
				}, {
					name: '语文',
					id: '语文'
				}, {
					name: '物理',
					id: '物理'
				}, {
					name: '化学',
					id: '化学'
				}];
			};

			var getScoreList = function(subject) {
				return $http({
					method: 'post',
					url: $rootScope.subDomain + $rootScope.InterfaceRouter + '/WXInterface009.ashx',
					data: {
						subject: subject
					}
				});
			};

			$scope.subjectList = getSubject();
			$scope.currentSubjectIndex = sessionStorage.getItem('currentSubjectIndex') ? parseInt(sessionStorage.getItem('currentSubjectIndex')) : 0;
			$scope.currentSubject = $scope.subjectList[$scope.currentSubjectIndex];
 			$scope.$watch('currentSubject', function(subject) {
				getScoreList(subject.id).then(function(resp) {
					var scores = _.map(resp.data.msg, function(item) {
						//var up_down = 0;
						//if (+item.direction === 0) {
						//	up_down = '-';
						//} else if (+item.direction > 0) {
						//	up_down = '↑';
						//} else {
						//	up_down = '↓';
						//}
					    return {
					        id: item.id,
					        title: item.name,
					        total: item.score,
					        maxscores: item.maxscores,
					        Irank: item.Irank,
					        Idir: item.Idir,
					        average: item.average,
					        ndirection: item.ndirection,
					        no: item.rank,
					        diff: Math.abs(item.direction),
					        accessory: item.accessory,
					        examid: item.examid,
					        exanswerid: item.exanswerid
					       
						}
					});
					$scope.scoreList = scores;
				});
			});

			$scope.selectSubject = function(data, index) {
				$scope.currentSubjectIndex = index;
				$scope.currentSubject = data;
			};

			$scope.showPaper = function(data) {
				//todo binding 51 account with weixin account
			    var examid = data.examid;
			    var exanswerid = data.exanswerid;
			    var subject = $scope.currentSubject;
				//PaperPreviewService.showPaper(paperUrl);
			    sessionStorage.setItem('currentSubjectIndex', $scope.currentSubjectIndex);
			    window.location.href = '#/detailscore?examid=' + examid + "&exanswerid=" + "&subject=" + $scope.currentSubject.name;
			};
		};

		initPage();

		$scope.$emit('Init_header', {
			title: '成绩排名',
			showBack: true
		});
	}

	angular.module('score', [])
		.config(config)
		.controller('ScoreCtrl', Score);
})();