(function () {
    'use strict';

    /**
     * @name  config
     * @description config block
     */
    /**
     * @name  HomeCtrl
     * @description Controller
     */
    function HomeCtrl(data, $scope) {
        var home = this;
        home.data = data.data;

        $scope.$emit('Init_header', {
            title: '首页',
            showBack: false
        });
    }

    angular.module('home', [])
        .controller('HomeCtrl', HomeCtrl);
})();
