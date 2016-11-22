﻿(function() {
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
            showBack: false
        });

        initPage();


        function initPage() {
            $http({
                method: 'post',
                url: $rootScope.baseDomain + $rootScope.InterfaceRouter + '/WXInterface003.ashx'
            }).then(function(resp) {
                $scope.subjectList = resp.data.course;
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
    }

    angular.module('testIndex', [])
        .controller('TestIndexCtrl', TestIndexCtrl);
})();