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
            .state('root.teach', {
                url: '/teach',
                views: {
                    '@': {
                        templateUrl: 'src/app/teach/teach.tpl.html',
                        controller: 'teachCtrl'
                    }
                }
            });
    }

    /**
     * @description Controller
     */
    function Score($scope, $log, $q, $http, $rootScope, $stateParams, $cookies, PaperPreviewService) {


        $http.get($rootScope.subDomain + $rootScope.InterfacewxRouter + '/Interface0027.ashx').success(function (data) {
            console.log(data);
            $scope.classes = data.msg;
            $scope.currentClass = $scope.classes[0].classId;
        });

        $scope.$watch('currentClass', function (newValue) {
            if (typeof newValue == 'undefined') return;
            $scope.updateTable(newValue);
            $scope.table.fnClearTable();
            $("#test_processing").css("visibility", "visible");
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
                "sPaginationType": "full_numbers",
                "sProcessing": "处理中...",
                "sLengthMenu": "显示 _MENU_ 项结果",
                "sZeroRecords": "没有匹配结果",
                "sInfo": "",
                "sInfoEmpty": "共 0 项",
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

        $scope.updateTable = function (classId) {
            $http.post($rootScope.subDomain + $rootScope.InterfaceRouter + '/WXInterface014.ashx', {
                "classId": classId
            }).success(function (data) {
                //console.log(data.msg + '---test');
                var tableDatas = data.msg;
                $.each(tableDatas, function (index, item) {
                    $scope.tableinfo = item;
                    var wrongbfbto = 100 - $scope.tableinfo.accuracy;
                    item.wrongbfb = wrongbfbto.toFixed(2) + '%';
                    item.keyid = $scope.tableinfo.keyid;
                    item.id = $scope.tableinfo.examid;
                    item.klg = '<a class="btn btn-primary" href="#/klginfo?keyid=' + item.keyid + '&cid=' + classId + '&eid=' + item.id + '">查看</a>';
                });

                $scope.table.fnAddData(tableDatas);
                $scope.table.fnAdjustColumnSizing();
                $("#test_processing").css("visibility", "hidden");
                $(".dataTables_empty").css("display", "none");
            });
        };



        $scope.$emit('Init_header', {
            title: '教  学',
            showBack: true
        });

        $scope.goBack = function () {
            window.history.go(-1);
        };

    }

    angular.module('teach', [])
        .config(config)
        .controller('teachCtrl', Score);
})();