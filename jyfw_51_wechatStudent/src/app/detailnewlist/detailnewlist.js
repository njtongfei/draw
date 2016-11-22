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
            .state('root.detailnewlist', {
                url: '/detailnewlist',
                views: {
                    '@': {
                        templateUrl: 'src/app/detailnewlist/detailnewlist.tpl.html',
                        controller: 'newlistView'
                    }
                }
            });
    }

    /**
     * @name  newlistView
     * @description Controller
     */
    function newlistView($scope, $log, $q, $location, $http, $rootScope ,$cookieStore) {
        var initPage = function() {
            var getnewlist = function(examid) {
                return $http({
                    method: 'post',
                    url: $rootScope.subDomain + $rootScope.InterfaceRouter + '/WXInterface019.ashx',
                    data: {
                        keyPointId: examid 
                    }
                });
            };
            var keyPointId = $location.search().keyPointId
           
            getnewlist(keyPointId).then(function(resp) {
               var  newlist = _.map(resp.data.msg, function(item) {
                    return {
                        keyContent: item.keyContent,
                        keyMovie: item.keyMovie,
                        keyName: item.keyName,
                        keypointId: item.keypointId,
                     };
                });
                $scope.newlists = newlist;
             
                 
            });
           
            
        };
        initPage();
         
        $scope.$emit('Init_header', {
            title: '等腰三角形知识点讲解',
            showBack: true
             
        });
        $scope.selectHandler = function(data) {
			var keypointID = data.keypointId;
			var userId = angular.fromJson($cookieStore.get('userInfo')).sfid;
			var examid = $location.search().examid;

			location.hash = '#/detailfast?examid=' + examid + "&keyPointId=" + keypointID + "&userId=" + userId;
		};
		 

    }
   

    angular.module('detailnewlist', ['ngCookies'])
        .config(config)
        .controller('newlistView', newlistView)
        
})();