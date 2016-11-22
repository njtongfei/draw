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
    function ErrorIndexCtrl(data, $scope, $http, $rootScope, $state, $location) {
        $scope.$emit('Init_header', {
            title: '错题查看',
            showBack: false
        });

        initPage();

        function initPage() {

            $http({
                method: 'post',
                url: $rootScope.baseDomain + $rootScope.InterfaceRouter + '/WXInterface003.ashx'
            }).then(function (resp) {
                var subjectList = $scope.subjectList = resp.data.course;
                $scope.currentSubject = $scope.subjectList[0];
                initSection();
                sessionStorage.removeItem('errorIndex');
            }).then(function (resp) {
                $http({
                    method: 'post',
                    url: $rootScope.baseDomain + $rootScope.InterfaceRouter + '/WXInterface022.ashx',
                    data: {
                        courseId: $scope.currentSubject.courseId
                    }
                }).success(function (data) {
                    var topinfos = $scope.topinfos = data;
                    console.log(data.uprank + "---adas");
                });
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
                var tmpSectionList = [{
                    sectionId: "",
                    sectionName: "请选择"
                }];
                for (var i = 0; i < resp.data.msg.length; i++) {
                    tmpSectionList = tmpSectionList.concat(resp.data.msg[i].section);
                }

                $scope.sectionList = tmpSectionList; //resp.data.msg;
                $scope.currentSection = $scope.sectionList[0];
            });
        };


        $scope.selectSubject = function(data) {
            $scope.currentSubject = data;
            initSection();
            initPage();
        };

        $scope.selectSection = function(data) {
            $scope.currentSection = data;

        };

        $scope.initErrorPage = function() {
            var id = '';
            if ($scope.currentSection.sectionId) {
                id = $scope.currentSection.sectionId;
            } else {
                id = $scope.currentSubject.courseId;
            }
            location.hash = '/errorPage?contentId=' + id + '&id=' + $location.search().id;
        };
    }

    angular.module('errorIndex', [])
        .controller('ErrorIndexCtrl', ErrorIndexCtrl);
})();