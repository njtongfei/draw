/**
 * Created by Hexl on 2015/9/7.
 */
(function () {
    'use strict';

    /**
     * @name  config
     * @description config block
     */
    function config($stateProvider) {
        $stateProvider
            .state('root.class', {
                url: '/class',
                views: {
                    '@': {
                        templateUrl: 'src/app/class/class.tpl.html',
                        controller: 'classCtrl'
                    }
                }
            });
    }

    /**
     * @description Controller
     */
    function Score($scope, $log, $q, $http, $rootScope, $stateParams, $cookies, PaperPreviewService, $state, $location) {
        $scope.$watch('currentClass', function () {

            if ($scope.currentClass == null) {
                $scope.studentList = [];
                $scope.currentStudent = null;
            } else {
                getStudentList();
            }
        });


        //获取班级
        $http.get($rootScope.subDomain + $rootScope.InterfacewxRouter + '/Interface0027.ashx').success(function (data) {
            //console.log(data);
            $scope.currentClassList = data.msg;
            $scope.currentClass = $scope.currentClassList[0];
            //getStudentList();
        });


        //获取学生list
        function getStudentList() {
            $http.post($rootScope.subDomain + $rootScope.InterfacewxRouter + '/Interface0045.ashx', {
                classId: $scope.currentClass.classId
            }).then(function (resp) {
                $scope.currentStudent = null;
                //console.log($scope.currentStudent.studentServerBuy + "--test");
                $scope.studentList = resp.data.studentList;
                $scope.alcclass = $scope.currentClass;
                $scope.lstclass = $scope.currentClassList;

                _.each($scope.studentList, function (cstudent) {
                    _.each($scope.lstclass, function (cclass) {

                        if (cstudent.studentClassID === cclass.classId) {
                            //cstudent.className = cclass.name;
                            alcclass.classId = cclass.classId;
                            alcclass.name = cclass.name;
                        } else {
                            $scope.alcclass = $scope.currentClass;
                        }

                    });
                });
            });
        }
        //查看PDF
        $scope.goPDF = function (studentId) {
            $http.post($rootScope.subDomain + $rootScope.InterfaceRouter + '/WXInterface017.ashx', {
                stuid: studentId,
                stucid: $scope.currentClass.classId
            }).then(function (resp) {
                var pdflength = resp.data.msg.length-1;
                var pdfaddress = resp.data.msg[pdflength].accessory;
                console.log(pdflength);
                //$location.url("http://www.51jyfw.com/pdf/web/viewer.html?file=" + "http://"+pdfaddress);
                window.location.href = 'http://' + pdfaddress;
            });
            ////PaperPreviewService.showPaper(paperUrl);
            //sessionStorage.setItem('currentSubjectIndex', $scope.currentSubjectIndex);
            
        };
        
        $scope.$emit('Init_header', {
            title: '班  级',
            showBack: true
        });
    }

    angular.module('class', [])
        .config(config)
        .controller('classCtrl', Score);
})();