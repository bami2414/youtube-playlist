(function() {
    var contentController = angular.module("myApp").controller("contentController",function($scope,$mdDialog) {
        $scope.youtubeDetails = [
            {
                title:"first video",
                id:"kw4tT7SCmaY",
                start:100,
                end:null
            },
            {
                title:"second video",
                id:"8367ETnagHo",
                start:20,
                end:23
            },
            {
                title:"third video",
                id:"Uks8psEpmB4",
                start:100,
                end:130
            },
            {
                title:"fourth video",
                id:"7z1rf2kzEkc",
                start:100,
                end:130
            },
            {
                title:"fifth video",
                id:"EZVPRe5jRs4",
                start:100,
                end:130
            },
            {
                title:"sixth video",
                id:"xhgt47nvZUQ",
                start:100,
                end:101
            }
        ];
        $scope.started = false;
        $scope.showFrame = true;
        $scope.startPlaylist = function() {
            $scope.started = true;
            $scope.showFrame = true;
            $scope.selectedId = $scope.youtubeDetails[0];
            $scope.playerVars.start = $scope.selectedId.start;
            $scope.playerVars.end = $scope.selectedId.end;
            $scope.mainPlayer.playVideo();
        }
        $scope.selectedId = $scope.youtubeDetails[0];
        $scope.selectId = function(index) {
            $scope.selectedId = $scope.youtubeDetails[index];
            $scope.playerVars.start = $scope.selectedId.start;
            $scope.playerVars.end = $scope.selectedId.end;
            $scope.showFrame = true;
        };
        $scope.playerVars = {
            start: $scope.selectedId.start,
            end: $scope.selectedId.end
        };
        $scope.$on('youtube.player.ended', function ($event, player) {
            var index = $scope.youtubeDetails.indexOf($scope.selectedId);
            if(index+1 < $scope.youtubeDetails.length) {
                $scope.selectedId = $scope.youtubeDetails[index+1];
                $scope.playerVars.start = $scope.selectedId.start;
                $scope.playerVars.end = $scope.selectedId.end;
                $scope.started = true;
            } else {
                $scope.showFrame = false;
            }
        });
        $scope.$on('youtube.player.ready', function($event,player) {
            if($scope.started) {
                player.playVideo();   
            }
        })
        $scope.$on('videoAdded',function(event,videoDetail) {
            if(videoDetail.end == 0) {
                videoDetail.end = null;
            }
            $scope.youtubeDetails.push(videoDetail);
        })
        $scope.showForm = function(ev) {
            $mdDialog.show({
                controller: 'dialogController',
                templateUrl: 'template/formDialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            });
        };
    })
})();