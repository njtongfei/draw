/**
 * Created by foxbaby213 on 2015/12/7.
 */
(function () {
    'use strict';

    /**
     * @name  config
     * @description config block
     */
    function config($stateProvider) {
        $stateProvider
            .state('root.msgView', {
                url: '/msgView',
                views: {
                    '@': {
                        templateUrl: 'src/app/msgView/msgView.tpl.html',
                        controller: 'msgViewCtrl'
                    }
                }
            });
    }

    /**
     * @name  gettingStartedCtrl
     * @description Controller
     */
    function Score($scope, $log, $q, $location, $cookies, $rootScope, $http) {

        $scope.noSelection = false;
        $scope.serviceContent = {};
        $scope.IsSend = false;
        $scope.msgmodels = [
                { name: '作业消息', mid: '3OmbPZrCKP3KAGb6PU778MM4xGNut2_ni-FrWlt61fs' },
                { name: '个人消息通知', mid: 'SRi_BcERbpYa_DtVfpbkd7xLTe8Sh7f51TNqL0ZJDMk' },
                { name: '考核成绩通知', mid: 'wn8VLGhPNnQJ--hrFOCXazYVA2X1FwN5BSM8mc0PKCU' }
        ];
        $scope.cmsgmodel = $scope.msgmodels[0];

        $http.get($rootScope.subDomain + $rootScope.InterfacewxRouter + '/Interface0027.ashx').success(function (data) {
            $scope.classes = data.msg;
            $scope.currentClass = $scope.classes[0].classId;
        });

        $scope.updateStudent = function (classId) {

            $http.post($rootScope.subDomain + $rootScope.InterfacewxRouter + '/Interface0045.ashx', {
                "classId": classId
            }).success(function (data) {

                $scope.students = _.map(data.studentList, function (student) {

                    //if (student.studentWxBind == "未绑定") {
                    //    $scope.selectbdblack = "";
                    //    $scope.selectbd = "hide";
                    //}



                    var name = student.studentName;
                    if (name.length === 2) {
                        name = name.substring(0, 1) + '&nbsp;&nbsp;' + ' ' + name.substring(1, 2);
                    }
                    return {
                        studentId: student.studentId,
                        studentWxBind: student.studentWxBind,
                        studentName: name
                    }
                });

                var rowLength = 5;

                var rows = Math.floor(($scope.students.length - 1) / rowLength) + 1;

                $scope.trs = _.map(new Array(rows), function () {
                    return _.range(5);
                });
            });
        };

        $scope.$watch('currentClass', function (newValue) {
            if (typeof newValue == 'undefined') return;
            $scope.students = [];
            $scope.updateStudent(newValue);
            //$scope.serviceContent.classId = newValue;
        });

        $scope.$watch('checkAll', function (newValue) {
            if (typeof newValue == 'undefined') return;
            $.each($scope.students, function (index, item) {
                item.checked = newValue;
            });
        });

        $scope.sendMsg = function () {

            $scope.serviceContent.studentId = [];
            $scope.serviceContent.modelMsg = $scope.cmsgmodel.mid;
            $.each($scope.students, function (index, item) {
                if (item.checked)
                    $scope.serviceContent.studentId.push(item.studentId);
            });

            $scope.noSelection = $scope.serviceContent.studentId.length == 0;

            if ($scope.noSelection) return;

            $scope.serviceContent.IsSend = $scope.IsSend ? 1 : 0;

            $http.post($rootScope.subDomain + $rootScope.InterfacewxRouter + '/Interface0046.ashx', $scope.serviceContent).success(function (data) {
                if (data.code == 0) {
                    $scope.sendSuccess = true;
                }
            });

            //$scope.serviceContent.IsSend = false;

        };

        $scope.$emit('Init_header', {
            title: '信息发送',
            showBack: true
        });
    }

    angular.module('msgView', [])
        .config(config)
        .controller('msgViewCtrl', Score);
})();

