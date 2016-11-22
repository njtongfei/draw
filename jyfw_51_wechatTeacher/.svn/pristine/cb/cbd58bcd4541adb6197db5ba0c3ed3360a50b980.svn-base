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

    function ImproveIndexCtrl(data, $scope, $state, $location) {
        var id = $location.search().id || '1234566';

        $scope.$emit('Init_header', {
            title: '51教育服务',
            showBack: false
        });

        $scope.goTestIndex = function() {
            $state.go('root.testIndex', {
                id: id
            });
        }

        $scope.goErrorIndex = function() {
            $state.go('root.errorIndex', {
                id: id
            });
        }
    }

    angular.module('improveIndex', [])
        .controller('ImproveIndexCtrl', ImproveIndexCtrl);
})();