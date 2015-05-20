(function(window,undefined){

angular.module('ng-terminal-example', ['vtortola.ng-terminal', 'ng-terminal-example.command.tools', 'ng-terminal-bosh.command'])
.controller('console',['$scope','commandBroker','$rootScope', function ($scope, commandBroker, $rootScope) {

    $rootScope.theme = 'vintage';

    setTimeout(function () {
        $scope.$broadcast('terminal-output', {
            output: true,
            text: ['Double Click to start using BigObject Shell'
                   ],
            breakLine: true
        });
        $scope.$apply();
    }, 100);


    $scope.session = {
        commands: [],
        output: [],
        tmp:{'qq':"gg",'count':1},
        $scope:$scope
   };

    $scope.$watchCollection(function () { return $scope.session.commands; }, function (n) {
        for (var i = 0; i < n.length; i++) {
            $scope.$broadcast('terminal-command', n[i]);
        }
        $scope.session.commands.splice(0, $scope.session.commands.length);
        $scope.$$phase || $scope.$apply();
    });

    $scope.$watchCollection(function () { return $scope.session.output; }, function (n) {
        for (var i = 0; i < n.length; i++) {
            $scope.$broadcast('terminal-output', n[i]);
        }
        $scope.session.output.splice(0, $scope.session.output.length);
        $scope.$$phase || $scope.$apply();
    });


    $scope.$on('terminal-input', function (e, consoleInput) {
        var cmd = consoleInput[0];
        try {
            commandBroker.execute($scope.session, cmd.command);
        } catch (err) {
            $scope.session.output.push({ output: true, breakLine: true, text: [err.message] });
        }
    });
}]);



})(window);
