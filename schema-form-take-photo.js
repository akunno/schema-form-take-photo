angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/upload/take_photo.html","<div class=\"form-group\" ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\">\n  <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n  <div class=\"form-group\">\n    <div class=\"gallery-box\">\n      <div class=\"img-thumbnail\">\n        <img width=\"200\" ng-src=\"{{ $$value$$.file ? $$value$$.file : \'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAMAAAC3Ycb+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFM0MyNDU2NTM5RDMxMUU0ODk1MEQ4NDhGOUM5NzRGMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFM0MyNDU2NjM5RDMxMUU0ODk1MEQ4NDhGOUM5NzRGMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUzQzI0NTYzMzlEMzExRTQ4OTUwRDg0OEY5Qzk3NEYzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUzQzI0NTY0MzlEMzExRTQ4OTUwRDg0OEY5Qzk3NEYzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+1RqnIwAAAAZQTFRFzMzMAAAA0zMzZAAAALVJREFUeNrswQENAAAAwqD3T20ON6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHg0AQYAcq4AAUbpjk4AAAAASUVORK5CYII=\' }}\" />\n      </div>\n      <!-- Assumes cordova present of course...-->\n      <button class=\"{{form.uploadOptions.cssClass || \'btn btn-sm btn-flat btn-success\'}}\" type=\"button\" ng-model=\"$$value$$\" schema-form-take-photo-directive ng-click=\"buttonClick($event,form)\">Take Photo</button>\n      <input type=\"hidden\" sf-changed=\"form\" ng-model=\"$$value$$\" schema-validate=\"form\" />\n      <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n    </div>\n    <div class=\"clearfix\"></div>\n  </div>\n</div>\n");}]);
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
