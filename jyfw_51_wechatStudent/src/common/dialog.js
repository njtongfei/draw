(function() {
    'use strict';

    function dialogCtrl($log, $scope) {

        $scope.confirmFunction = function() {
            $('.dialogView').hide();
        }

        $scope.$on('Get_Message', function(e, data , ishtml) {
            $('.dialogView').show();
            if(ishtml == 1){
            	$('.dialogView .dialog .alertArea .msg').html(data);
            }else{
            	$('.dialogView .dialog .alertArea .msg').text(data);
            }
            
        });
    }

    angular.module('common.dialog', [])
        .controller('DialogCtrl', dialogCtrl);
})();