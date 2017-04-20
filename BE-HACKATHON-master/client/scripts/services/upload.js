'use strict';

/**
 * @ngdoc service
 * @name techkidsWebApp.upload
 * @description
 * # upload
 * Service in the techkidsWebApp.
 */
angular.module('techkidsWebApp')
  .service('upload', function (toastr, Upload) {
    var upload = [];

    upload.upload = function (file, callback) {
      Upload.upload({
        url: 'http://localhost:8887/api/user/upload',
        arrayKey: '',
        cache: false,
        contentType: false,
        processData: false,
        data: {file: file}
      }).then(function (res) {
        if(res.data.status == 1){
          toastr.success(res.data.message);
          callback(res.data.resutl)
        }
        else {
          toastr.error(res.data.message);
        }
      });
    };

    return upload;

  });
