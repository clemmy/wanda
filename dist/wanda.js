(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("wanda", [], factory);
	else if(typeof exports === 'object')
		exports["wanda"] = factory();
	else
		root["wanda"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _point = __webpack_require__(1);

	var _point2 = _interopRequireDefault(_point);

	var _cloud = __webpack_require__(2);

	var _cloud2 = _interopRequireDefault(_cloud);

	var _constants = __webpack_require__(4);

	var _constants2 = _interopRequireDefault(_constants);

	var _utils = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Wanda = function () {
	  function Wanda() {
	    _classCallCheck(this, Wanda);

	    this.templates = [];
	  }

	  /* where data is an array of strokes
	   * [ [{x,y}, {x,y}], [{x,y}] ]
	  */


	  _createClass(Wanda, [{
	    key: 'train',
	    value: function train(id, data) {
	      var points = (0, _utils.transformData)(data);

	      this.templates.push(new _cloud2.default(id, points));
	    }
	  }, {
	    key: 'recognize',
	    value: function recognize(data) {
	      var points = (0, _utils.transformData)(data);
	      points = (0, _utils.resample)(points, _constants2.default.NUM_POINTS);
	      points = (0, _utils.scale)(points);
	      points = (0, _utils.translateTo)(points, _constants2.default.ORIGIN);

	      var b = +Infinity;
	      var u = -1;

	      for (var i = 0; i < this.templates.length; ++i) {
	        var d = (0, _utils.greedyCloudMatch)(points, this.templates[i]);

	        if (d < b) {
	          b = d; // least distance
	          u = i; // cloud index
	        }
	      }

	      if (u === -1) {
	        return null;
	      } else {
	        return {
	          id: this.templates[u].id,
	          score: Math.max((b - 2.0) / -2.0, 0.0)
	        };
	      }
	    }
	  }]);

	  return Wanda;
	}();

	exports.default = Wanda;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Point = function Point(x, y, strokeId) {
	  _classCallCheck(this, Point);

	  this.x = x;
	  this.y = y;
	  this.strokeId = strokeId;
	};

	exports.default = Point;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _point = __webpack_require__(1);

	var _point2 = _interopRequireDefault(_point);

	var _utils = __webpack_require__(3);

	var _constants = __webpack_require__(4);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Cloud = function Cloud(id, points) {
	  _classCallCheck(this, Cloud);

	  this.id = id;
	  this.points = (0, _utils.resample)(points, _constants2.default.NUM_POINTS);
	  this.points = (0, _utils.scale)(this.points);
	  this.points = (0, _utils.translateTo)(this.points, _constants2.default.ORIGIN);
	};

	exports.default = Cloud;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.greedyCloudMatch = greedyCloudMatch;
	exports.cloudDistance = cloudDistance;
	exports.resample = resample;
	exports.scale = scale;
	exports.translateTo = translateTo;
	exports.centroid = centroid;
	exports.pathDistance = pathDistance;
	exports.pathLength = pathLength;
	exports.distance = distance;
	exports.transformData = transformData;

	var _point = __webpack_require__(1);

	var _point2 = _interopRequireDefault(_point);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// return minimum cost for specific template
	function greedyCloudMatch(points, cloud) {
	  var e = 0.50;
	  var step = Math.floor(Math.pow(points.length, 1 - e));
	  var min = +Infinity;

	  for (var i = 0; i < points.length; i += step) {
	    var d1 = cloudDistance(points, cloud.points, i);
	    var d2 = cloudDistance(cloud.points, points, i);
	    // min = Math.min(min, Math.min(d1, d2))
	    min = Math.min(min, d1, d2);
	  }

	  return min;
	}

	// returns distance between two clouds
	function cloudDistance(points1, points2, start) {
	  var matched = new Array(points1.length).fill(false); // points1.length === points2.length
	  var sum = 0;
	  var i = start;

	  do {
	    var index = -1;
	    var min = +Infinity;

	    for (var j = 0; j < matched.length; ++j) {
	      if (!matched[j]) {
	        var d = distance(points1[i], points2[j]);

	        if (d < min) {
	          min = d;
	          index = j;
	        }
	      }
	    }

	    matched[index] = true;
	    var weight = 1 - (i - start + points1.length) % points1.length / points1.length;
	    sum += weight * min;
	    i = (i + 1) % points1.length;
	  } while (i != start);

	  return sum;
	}

	function resample(points, n) {
	  var I = pathLength(points) / (n - 1); // interval length
	  var D = 0.0;
	  var newPoints = new Array(points[0]);

	  for (var i = 1; i < points.length; ++i) {
	    if (points[i].strokeId === points[i - 1].strokeId) {
	      var d = distance(points[i - 1], points[i]);

	      if (D + d >= I) {
	        var qx = points[i - 1].x + (I - D) / d * (points[i].x - points[i - 1].x);
	        var qy = points[i - 1].y + (I - D) / d * (points[i].y - points[i - 1].y);
	        var q = new _point2.default(qx, qy, points[i].strokeId);

	        newPoints.push(q);
	        points.splice(i, 0, q);
	        D = 0.0;
	      } else {
	        D += d;
	      }
	    }
	  }

	  if (newPoints.length === n - 1) newPoints.push(new _point2.default(points[points.length - 1].x, points[points.length - 1].y, points[points.length - 1].strokeId));
	  return newPoints;
	}

	function scale(points) {
	  var minX = +Infinity;
	  var maxX = -Infinity;
	  var minY = +Infinity;
	  var maxY = -Infinity;

	  for (var i = 0; i < points.length; ++i) {
	    minX = Math.min(minX, points[i].x);
	    minY = Math.min(minY, points[i].y);
	    maxX = Math.max(maxX, points[i].x);
	    maxY = Math.max(maxY, points[i].y);
	  }

	  var size = Math.max(maxX - minX, maxY - minY);
	  var newPoints = [];

	  for (var _i = 0; _i < points.length; ++_i) {
	    var qx = (points[_i].x - minX) / size;
	    var qy = (points[_i].y - minY) / size;

	    newPoints.push(new _point2.default(qx, qy, points[_i].strokeId));
	  }

	  return newPoints;
	}

	function translateTo(points, destination) {
	  var c = centroid(points);
	  var newPoints = [];

	  for (var i = 0; i < points.length; ++i) {
	    var qx = points[i].x + destination.x - c.x;
	    var qy = points[i].y + destination.y - c.y;

	    newPoints.push(new _point2.default(qx, qy, points[i].strokeId));
	  }

	  return newPoints;
	}

	function centroid(points) {
	  var x = 0.0;
	  var y = 0.0;

	  for (var i = 0; i < points.length; ++i) {
	    x += points[i].x;
	    y += points[i].y;
	  }

	  x /= points.length;
	  y /= points.length;

	  return new _point2.default(x, y, 0);
	}

	// path1 and path2 are array of points in two paths
	// returns average distance between corresponding points in two paths
	function pathDistance(path1, path2) {
	  var length = path1.length; // assume equal length paths
	  var d = 0.0;

	  for (var i = 0; i < length; ++i) {
	    d += distance(path1[i], path2[i]);
	  }

	  return d / length;
	}

	// returns length traversed by a path
	function pathLength(points) {
	  var d = 0.0;

	  for (var i = 1; i < points.length; ++i) {
	    if (points[i].strokeId === points[i - 1].strokeId) {
	      d += distance(points[i - 1], points[i]);
	    }
	  }

	  return d;
	}

	// returns Euclidean distance between two points
	function distance(p1, p2) {
	  var dx = p2.x - p1.x;
	  var dy = p2.y - p1.y;

	  return Math.sqrt(dx * dx + dy * dy);
	}

	function transformData(data) {
	  var flattened = data.map(function (stroke, i) {
	    return stroke.map(function (point) {
	      return {
	        x: point.x,
	        y: point.y,
	        strokeId: i + 1
	      };
	    });
	  }).reduce(function (a, b) {
	    return a.concat(b);
	  }, []).map(function (point) {
	    return new _point2.default(point.x, point.y, point.strokeId);
	  });

	  return flattened;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _point = __webpack_require__(1);

	var _point2 = _interopRequireDefault(_point);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  ORIGIN: new _point2.default(0, 0, 0),
	  NUM_POINT_CLOUDS: 16,
	  NUM_POINTS: 32
	};

/***/ }
/******/ ])
});
;