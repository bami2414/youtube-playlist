(function() {
    var dialogController = angular.module("myApp").controller("dialogController",function($scope,$rootScope,$mdDialog) {
        $scope.videoDetail = {
            title : "TITLE",
            id : "ID",
            start : 0,
            end : 0
        };
        $scope.addVideo = function() {
            if($scope.videoDetail.title.length > 0 && $scope.videoDetail.id.length > 0) {
                $rootScope.$broadcast('videoAdded',$scope.videoDetail);
                $mdDialog.hide();   
            }
        }
    })
})();