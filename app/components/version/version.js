'use strict';

angular.module('cribsApp.version', [
  'cribsApp.version.interpolate-filter',
  'cribsApp.version.version-directive'
])

.value('version', '0.1');
