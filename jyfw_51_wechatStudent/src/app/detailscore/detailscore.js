﻿/**
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
			.state('root.detailscore', {
				url: '/detailscore',
				views: {
					'@': {
						templateUrl: 'src/app/detailscore/detailscore.tpl.html',
						controller: 'detailscoreView'
					}
				}
			});
	}

	/**
	 * @name  detailscoreView
	 * @description Controller
	 */
	function detailscoreView($scope, $log, $q, $location, $http, $rootScope, $cookieStore) {
		var initPage = function() {
			var getdetailscore = function() {
				return $http({
					method: 'post',
					url: $rootScope.subDomain + $rootScope.InterfaceRouter + '/WXInterface009.ashx',
					data: {
						examid: examid, //试卷Id
						subject: subject // 试卷类型名称
					}
				});
			};
			var examid = $location.search().examid,
				exanswerid = $location.search().exanswerid,
				subject = $location.search().subject;


			var titles;
			getdetailscore().then(function(resp) {
				var getdetailscore = resp.data.msg;
				// 遍历 
				getdetailscore.forEach(function(data, index) {
					if (data.examid == examid) {
						$scope.Gmaxscores = data.Gmaxscores,
							$scope.Gaverage = data.Gaverage,
							$scope.Irank = data.Irank,
							$scope.maxscores = data.maxscores,
							$scope.score = data.score,
							$scope.average = data.average,
							$scope.Idir = data.Idir,
							$scope.IGrank = data.IGrank,
							$scope.name = data.name,
							$scope.direction = data.direction,
							$scope.Irank = data.Irank,
							$scope.accessory = data.accessory
					}

				});

				var tit = $scope.name;
				$scope.$emit('Init_header', {
					title: tit,
					showBack: false
				});
				sessionStorage.setItem('tit', tit);
			});


		};
		var uName = angular.fromJson($cookieStore.get('userInfo'));
		$scope.usename = uName.username;
		// 题目难度
		var levelallview = function() {
				var examid = $location.search().examid;
				$http({
					method: 'post',
					url: $rootScope.subDomain + $rootScope.Interface + '/Interface0146.ashx',
					data: {
						examid: examid
					}
				}).then(function(resp) {
					var levels = _.map(resp.data.msg, function(item) {
						return {
							level: item.level,
							errorScores: item.errorScores,
							errorCount: item.errorCount
						};

					});
					$scope.levellist = levels;
				});
			}
			//知识点
		var knowledge = function() {
			var examid = $location.search().examid;
			$http({
				method: 'POST',
				url: $rootScope.subDomain + $rootScope.Interface + '/Interface0144.ashx',
				data: {
					examid: examid
				}
			}).success(function(data) {
				$scope.knows = data.msg
			})
		}
		$scope.selectHandler = function (data, title) {
			var keyPointId = data;
			var userId = angular.fromJson($cookieStore.get('userInfo')).sfid;
			var examid = $location.search().examid;
			var title = title;

			location.hash = '#/pageInfo?examid=' + examid + "&keyPointId=" + keyPointId + "&userId=" + userId + "&title=" + title;
		};
		$scope.showPaper = function(data) {
			//todo binding 51 account with weixin account
            alert(data)
			var paperUrl = data;
			window.location.href = 'http://' + paperUrl;
			//console.log('http://' + paperUrl)
		};
		$scope.showPageInfo = function(data) {

			var examid = $location.search().examid;
			location.hash = '#/knowledge?examid=' + examid;
		};
		// 图表代码
		var highcharts = function() {
			var subject = $location.search().subject;
			var score = [];
			var averagescore = [];
			var datetimes = [];
			var examname = [];
			//请求数据
			$http({
				method: 'POST',
				url: $rootScope.subDomain + $rootScope.Interface + '/Interface0147.ashx',
				data: {
					SubName: subject
				}
			}).success(function(data) {

				for (var i = 0; i < data.msg.length; i++) {
					//build
					var r = data.msg[i];
					score.push(Number(r.score));
					averagescore.push(Number(r.averagescore));
					datetimes.push([r.datetime]);
					examname.push([r.examname])
				}
				$('#container').highcharts({
					chart: {
						zoomType: 'xy'

					},
					title: {
						text: '我的成长曲线',
						align: 'left',
						style: {
							color: '#627887'
						}

					},
					scrollbar: {
						enabled: true
					},
					xAxis: [{
						categories: datetimes

					}],
					yAxis: [{ // Primary yAxis
						labels: {
							format: '{value}分',
							style: {
								color: '#89A54E'
							}
						},
						title: {
							text: '成绩',
							style: {
								color: '#89A54E'
							}
						}
					}, { // Secondary yAxis
						title: {
							text: '平均分',
							style: {
								color: '#4572A7'
							}
						},
						labels: {
							format: '{value} 分',
							style: {
								color: '#4572A7'
							}
						},
						opposite: true
					}],
					tooltip: {
						shared: true
 						 
					},
					credits: {
						enabled: false
					},
					legend: {
						enabled: false
					},
					series: [{
						name: '成绩',
						color: '#4572A7',
						type: 'spline',
						yAxis: 1,
						data: averagescore,
						tooltip: {
							valueSuffix: '分'
						}

					}, {
						name: '平均分',
						color: '#66ccff',
						type: 'spline',
						data: score,
						tooltip: {
							valueSuffix: '分'
						}
					}]

				})
			})


		}
		initPage();
		highcharts();
		levelallview();
		knowledge();
	}



	angular.module('detailscore', ['ngCookies'])
		.config(config)
		.controller('detailscoreView', detailscoreView)
})();