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
            .state('root.analysis', {
                url: '/analysis',
                views: {
                    '@': {
                        templateUrl: 'src/app/analysis/analysis.tpl.html',
                        controller: 'analysisCtrl'
                    }
                }
            });
    }

    /**
     * @description Controller
     */
    function Score($scope, $log, $q, $http, $rootScope, $stateParams, $cookies, PaperPreviewService) {

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
                "mDataProp": "username"
            }, {
                "mDataProp": "studentAnalysis"
            }],
            "oLanguage": {
                "sPaginationType": "full_numbers",
                "sProcessing": "处理中...",
                "sLengthMenu": "显示 _MENU_ 项结果",
                "sZeroRecords": "没有匹配结果",
                "sInfo": "",
                "sInfoEmpty": "共 0 名",
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
            "bInfo": false,
            "bAutoWidth": true,
            "bFilter": false,
            "bScrollInfinite": true,
            "bLengthChange": false,
            "bPaginate": false,
            "bDestroy": true,
            "bProcessing": true,
            "bSort": false

        });



        //获取班级维度
        $scope.goClass = function () {

            var classid = $scope.currentClass;

            $http.get($rootScope.subDomain + $rootScope.InterfacewxRouter + '/Interface0027.ashx').success(function (data) {
                console.log(data);
                $scope.classes = data.msg;
                $scope.currentClass = $scope.classes[0].classId;
            }).success(function (data) {
                $scope.ename = data.msg[0].name;
                $scope.dataa = data.msg[0].id;
                var eid = $scope.tableDatas[0].examID;
                //$scope.datab = data.msg[0].average;
                //console.log($scope.dataa + '----testa');
                //console.log($scope.datab + '----testb');
                location.hash = '#/class-analysis?classid=' + classid;
            });
        };



        $scope.updateTable = function (classId) {
            $http.post($rootScope.subDomain + $rootScope.InterfacewxRouter + '/Interface0018.ashx', {
                "classId": classId
            }).success(function (data) {
                //console.log(data.msg + '---test');
                var tableDatas =  $scope.tableDatas = data.msg;
                $.each(tableDatas, function (index, item) {
                    $scope.tableinfo = item;
                    item.userID = $scope.tableinfo.userID;
                    item.studentAnalysis = '<a class="btn btn-primary" href="#/student-analysis?cid=' + classId + '&uid=' + item.userID + '">查看</a>';
                });

                $scope.table.fnAddData(tableDatas);
                $scope.table.fnAdjustColumnSizing();
                $("#test_processing").css("visibility", "hidden");
                $(".dataTables_empty").css("display", "none");
                

            });
        };

        $scope.$watch('currentClass', function (newValue) {
            if (typeof newValue == 'undefined') return;
            $scope.updateTable(newValue);
            $scope.table.fnClearTable();
            $("#test_processing").css("visibility", "visible");
        });
        
        $scope.$emit('Init_header', {
            title: '学习情况走势',
            showBack: true
        });
    }

    angular.module('analysis', [])
        .config(config)
        .controller('analysisCtrl', Score);
})();