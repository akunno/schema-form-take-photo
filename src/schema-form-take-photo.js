angular.module('schemaForm-take-photo', ['schemaForm']).config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
  function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider, $scope) {

    var take_photo = function(name, schema, options) {
      if (schema.type === 'object' && schema.format == 'take_photo') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key  = options.path;
        f.type = 'take_photo';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.object.unshift(take_photo);

    //Add to the bootstrap directive
    schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'take_photo',
    'directives/decorators/bootstrap/upload/take_photo.html');
    schemaFormDecoratorsProvider.createDirective('take_photo',
    'directives/decorators/bootstrap/upload/take_photo.html');
  }
]);

var takePhotoControllerFunction = function($scope) {
  $scope.buttonClick = function (data) {
    $scope.form.takePhotoFunction().then(function(data){
      $scope.ngModel.$setViewValue({ file: data });
    });
  };
};

angular.module('schemaForm').directive('schemaFormTakePhotoDirective', ['$filter', function($filter) {
  return {
    require: ['ngModel'],
    restrict: 'A',
    scope: false,
    controller : ['$scope', takePhotoControllerFunction],
    link: function(scope, iElement, iAttrs, ngModelCtrl) {
        scope.ngModel = ngModelCtrl;
        scope.filter = $filter
    }
  };
}]);
