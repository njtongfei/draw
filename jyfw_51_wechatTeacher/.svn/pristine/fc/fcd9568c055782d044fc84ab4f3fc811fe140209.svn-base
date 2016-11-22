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
            .state('root.klginfo', {
                url: '/klginfo',
                views: {
                    '@': {
                        templateUrl: 'src/app/klginfo/klginfo.tpl.html',
                        controller: 'klginfoCtrl'
                    }
                }
            });
    }

    /**
     * @name  gettingStartedCtrl
     * @description Controller
     */
    function Score($scope, $log, $q, $location, $cookies, $rootScope, $http) {

        $scope.goBack = function () {
            window.history.go(-1);
        };
        $http.get($rootScope.subDomain + $rootScope.InterfacewxRouter + '/Interface0027.ashx').success(function (data) {
            console.log(data);
            $scope.classes = data.msg;
            $scope.currentClass = $scope.classes[0].classId;
        });

        $scope.table = $('#test').dataTable({
            "aoColumns": [{
                "mDataProp": "title"
            }, {
                "mDataProp": "wrongbfb"
            }, {
                "mDataProp": "klg"
            }],
            "oLanguage": {
                "sProcessing": "处理中...",
                "sLengthMenu": "显示 _MENU_ 项结果",
                "sZeroRecords": "没有匹配结果",
                "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                "sInfoPostFix": "",
                "sSearch": "搜索:",
                "sUrl": "",
                "sEmptyTable": "表中数据为空",
                "sLoadingRecords": "载入中...",
                "sInfoThousands": ",",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上页",
                    "sNext": "下页",
                    "sLast": "末页"
                }
            },
            "bDestroy": true,
            "bProcessing": true

        });

        var params = $location.search();

        $http.post($rootScope.subDomain + $rootScope.InterfaceRouter + '/WXInterface015.ashx', {
            "id": $location.search().eid,
            "classId": $location.search().cid,
            "keyId": $location.search().keyid
        }).success(function (data) {
            console.log(data);
            $('#qst').html(data.question);
            for (var i = 0; i < data.option.length; i++) {
                var letter = String.fromCharCode('A'.charCodeAt(0) + i);
                $('#qst').append('<label>选项' + letter + '：</label>');
                $('#qst').append(data.option[i]);
            };

            $('#ans').html(data.answer);
            $('#ana').html(data.analysis);

            $scope.falseNum = data.namelist.length;

            $scope.falseStudents = data.namelist;

            $('#tuijian').html(data.question);
            var rowLength = 5;

            var rows = Math.floor(($scope.falseStudents.length - 1) / rowLength) + 1;

            for (var i = $scope.falseStudents.length; i < rowLength * rows; i++)
                $scope.falseStudents[i] = "";

            $scope.trs = new Array(rows);
            $scope.tds = new Array(rowLength);
        });


        //$scope.$watch('currentClass', function (newValue) {
        //    if (typeof newValue == 'undefined') return;
        //    $scope.updateTable(newValue);
        //    $scope.table.fnClearTable();
        //    $("#test_processing").css("visibility", "visible");
        //});

        //------------------

        $scope.$emit('Init_header', {
            title: '知识点分析',
            showBack: true
        });
    }

    angular.module('klginfo', [])
        .config(config)
        .controller('klginfoCtrl', Score);
})();

