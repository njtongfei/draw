/**
 * Created by Hexl on 2015/9/8.
 */
(function() {
    'use strict';

    function trustHtml($sce) {
        return function (input) {
            return $sce.trustAsHtml(input);
        };
    }

    angular.module('common.filters.trustHtml', [])
        .filter('trustHtml', trustHtml);
})();