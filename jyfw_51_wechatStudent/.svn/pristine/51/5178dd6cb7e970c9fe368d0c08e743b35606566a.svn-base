(function() {
    'use strict';

    function dialogCtrl($log, $scope) {

        $scope.confirmFunction = function() {
            $('.dialogView').hide();
        }

        $scope.$on('Get_Message', function(e, data) {
            $('.dialogView').show();
            $('.dialogView .dialog .alertArea .msg').text(data);
        });
    }

    angular.module('common.dialog', [])
        .controller('DialogCtrl', dialogCtrl);
})();