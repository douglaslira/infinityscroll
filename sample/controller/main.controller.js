(function(){

    'use strict';

    angular.module('App').controller('Main', Main);

    Main.$inject = ['$scope', 'Paginate'];

    function Main($scope, Paginate){
        $scope.list = {};
        $scope.loaditem = 0;
        $scope.loadData = function(){
            $scope.loaditem += 1;
            Paginate.fetch("sample/data/data_0"+ $scope.loaditem +".json").then(function(response){
                $scope.list = response;
            });
        }
    }

})();