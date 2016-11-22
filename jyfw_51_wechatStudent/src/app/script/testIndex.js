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

    function TestIndexCtrl(data, $scope, $http, $rootScope, $state, $location) {
        $scope.$emit('Init_header', {
            title: '极速测试',
            showBack: true
        });

        initPage();

        function whatthis() {
            $http({
                method: 'post',
                url: $rootScope.baseDomain + $rootScope.InterfaceRouter + '/WXInterface022.ashx',
                data: {
                    courseId: $scope.currentSubject.courseId
                }
            }).then(function (resp) {
                console.log($scope.currentSubject.courseId + "----adn");
                var time = $scope.time = resp.data.time;
                var uprank = $scope.uprank = resp.data.uprank;
                var upscores = $scope.upscores = resp.data.upscores;
            });
        }

        function initPage() {
            $http({
                method: 'post',
                url: $rootScope.baseDomain + $rootScope.InterfaceRouter + '/WXInterface003.ashx'
            }).then(function(resp) {
                $scope.subjectList = resp.data.course;
                //var getdata = _.map(resp.data.msg, function (item) {
                //    return {
                //        courseName: item.courseName
                //    };
                //})
                //$scope.getdatas = getdata;
                var subjectname = $scope.subjectname = resp.data.courseName;
                $scope.currentSubject = $scope.subjectList[0];
                initSection();
            });
        };

        function initSection() {
            $http({
                method: 'post',
                url: $rootScope.baseDomain + $rootScope.InterfaceRouter + '/WXInterface006.ashx',
                data: {
                    courseId: $scope.currentSubject.courseId
                }
            }).then(function(resp) {
                var tmpSectionList = [];
                for (var i = 0; i < resp.data.msg.length; i++) {
                    tmpSectionList = tmpSectionList.concat(resp.data.msg[i].section);
                }

                $scope.sectionList = tmpSectionList;
                $scope.currentSection = $scope.sectionList[0];
                whatthis();
            });
        };


        $scope.selectSubject = function(data) {
            $scope.currentSubject = data;
            initSection();
        };

        $scope.selectSection = function(data) {
            $scope.currentSection = data;
        };

        $scope.initTestPage = function() {
            location.hash = '/fastTest?testSectionId=' + $scope.currentSection.sectionId + '&id=' + $location.search().id;
        };

        $scope.initbuchangPage = function () {
            location.hash = '/operationcompe';
        };
    }

    angular.module('testIndex', [])
        .controller('TestIndexCtrl', TestIndexCtrl);
})();