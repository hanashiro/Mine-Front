'use strict';

/**
 * @ngdoc service
 * @name mineApp.FctObjReader
 * @description
 * # FctObjReader
 * Factory in the mineApp.
 */
angular.module('mineApp')
  .factory('FctObjReader', function (FctApi) {
    var that = {
        calc: function (number) {
            var Objs = that.Objects,
        result = 0,
        totalObjects = 0;

            var i = Objs.totalRead.length;
            while (i--) {
                totalObjects++;
                result += that.ObjectReader.read(Objs.totalRead[i]);
            }

            i = Objs.ignoreRead.length;
            while (i--) {
                totalObjects++;
                result += that.ObjectReader.readIgnoreFields(Objs.ignoreRead[i][0], Objs.ignoreRead[i][1]);
            }

            i = Objs.includeRead.length;
            while (i--) {
                totalObjects++;
                result += that.ObjectReader.readFields(Objs.includeRead[i][0], Objs.includeRead[i][1]);
            }

            if (totalObjects == 0) {
                result = 1;
            } else {
                result = result / totalObjects;
            }

            return result;
        },
        Objects: { totalRead: [], ignoreRead: [], includeRead: [] },
        ObjectReader: {
            read: function (obj) {
                var objReader = that.ObjectReader,
          properties = Object.keys(obj),
          i = properties.length,
          progress = 0,
          result = 0;

                while (i--) {
                    if (objReader.isReadableType(obj[properties[i]])) {
                        progress += objReader.fieldValue(obj[properties[i]]);
                    } else {
                        if (obj[properties[i]].length != undefined) {
                            progress += obj[properties[i]].length == 0 ? 0 : 1;
                        } else {
                            progress += objReader.read(obj[properties[i]]);
                        }
                    }
                }
                result = progress / properties.length;
                result = parseFloat(result.toFixed(2));
                if (!isNaN(result)) {
                    return result;
                } else {
                    return obj.length === 0 ? 1 : 0;
                }
            },
            readIgnoreFields: function (obj, fields) {
                obj = JSON.parse(JSON.stringify(obj));
                var properties = Object.keys(obj),
          i = fields.length;
                while (i--) {
                    delete obj[fields[i]];
                }
                return that.ObjectReader.read(obj);
            },
            readFields: function (obj, fields) {
                var newObj = {},
          i = fields.length;
                while (i--) {
                    newObj[fields[i]] = obj[fields[i]];
                }
                return that.ObjectReader.read(newObj);
            },
            isReadableType: function (property) {
                return typeof (property) != "object" ? true : false;
            },
            fieldValue: function (field) {
                if (typeof (field) == "string") {
                    //field = Controle.EditorTexto.tagEscape(field);
                }
                if (field === "" || field === undefined || field === null) {
                    return 0;
                } return 1;
            }
        }
    }
    return that;
  });
