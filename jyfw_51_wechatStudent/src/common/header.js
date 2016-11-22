(function () {
    'use strict';

    function headerCtrl($log, $scope) {
        $log.debug('Header loaded');
        $scope.title = '51教育服务';
        $scope.showBack = false;

        var onBridgeReady = function(){
            $scope.goBack = function () {
                if($scope.fromHash){
                    location.hash = $scope.fromHash;
                }else {
                    WeixinJSBridge.invoke('closeWindow',{},function(res){});
                }
            };
            WeixinJSBridge.call('hideOptionMenu');
            WeixinJSBridge.call('showToolbar');
        };

        if(typeof WeixinJSBridge === 'undefined'){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        }else {
            onBridgeReady();
        }

        $scope.$on('Init_header_data', function (e, data) {
            $log.debug('get Init_header_data message: data = ');
            $log.debug(data);
            /**
             * title: string  title to show on the header
             * showBack: boolean  if show back key
             */
            $scope.title = data.title || $scope.title;
            $scope.showBack = !!data.showBack;
            $scope.fromHash = data.fromHash;
        });
    }

    angular.module('common.header', [])
        .controller('HeaderCtrl', headerCtrl);
})();
