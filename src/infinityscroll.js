(function(){

    'use strict';

    angular.module('nyx.components', []);
    angular.module('nyx.components').factory('Paginate', Paginate);
    angular.module('nyx.components').directive("nyxScroll", nyxScroll);

    nyxScroll.$inject = ['$window'];

    function nyxScroll($window){

        var directive = {
            restrict: "AE",
            scope: {
                load: '&'
            },
            link: link
        };

        return directive;

        function link(scope, attr, element){

            angular.element($window).bind("scroll", function() {
                var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
                var body = document.body, html = document.documentElement;
                var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
                var windowBottom = windowHeight + window.pageYOffset;
                if (windowBottom >= docHeight) {
                    scope.load();
                }
            });

        }

    }

    Paginate.$inject = ['$q', '$http'];

    function Paginate($q, $http){

        var data = {
            count: 0,
            items: []
        };

        return {
            fetch: function(url, params){
                var deferred = $q.defer();
                $http.get(url + (params ? params : '')).then(function(response){
                    data.count += response.data.count;
                    data.items = data.items.concat(response.data.items);
                    deferred.resolve(data);
                }).catch(function(reason){
                    deferred.reject(reason);
                });
                return deferred.promise;
            }
        }

    }

})();