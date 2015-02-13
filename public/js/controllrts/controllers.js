var kexingAppControllers = angular.module('kexingAppControllers', ['angularFileUpload']);

kexingAppControllers.controller('HorsesListCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('/api/get_all').success(function(data) {
      $scope.houses = data;
    });

    $scope.orderProp = 'age';




  }]);


kexingAppControllers.controller('DemoController', function($scope) {

  $scope.options = [
    { label: '公', value: "公" },
    { label: '母', value: "母" }
  ];
    

    
  // Here we are referencing the same object, so Angular inits the select box correctly
  //$scope.correctlySelected = $scope.options[1];
});

kexingAppControllers.controller('UpLoadctrl', [ '$scope', '$http', '$timeout', '$compile', '$upload', function($scope, $http, $timeout, $compile, $upload) {
  	// $scope.$watch('picFile', function() {

   //    //var file = $scope.picFile;
   //    $scope.upload = $upload.upload({
   //      url: 'http://localhost:8080/api/save', // upload.php script, node.js route, or servlet url
   //      method: 'POST',
   //      //headers: {'Authorization': 'xxx'}, // only for html5
   //      //withCredentials: true,
   //      data: {myObj: $scope.myModelObj},
   //      file: $scope.file// single file or a list of files. list is only for html5
   //      //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
   //      //fileFormDataName: myFile, // file formData name ('Content-Disposition'), server side request form name
   //                                  // could be a list of names for multiple files (html5). Default is 'file'
   //      //formDataAppender: function(formData, key, val){}  // customize how data is added to the formData. 
   //                                                          // See #40#issuecomment-28612000 for sample code

   //    }).progress(function(evt) {

   //      console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :');
   //    }).success(function(data, status, headers, config) {
   //      // file is uploaded successfully
   //      console.log('file '+ 'is uploaded successfully. Response: ' + data);
   //    });
      //.error(...)
      //.then(success, error, progress); // returns a promise that does NOT have progress/abort/xhr functions
      //.xhr(function(xhr){xhr.upload.addEventListener(...)}) // access or attach event listeners to 
                                                              //the underlying XMLHttpRequest
        /* alternative way of uploading, send the file binary with the file's content-type.
       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
       It could also be used to monitor the progress of a normal http post/put request. 
       Note that the whole file will be loaded in browser first so large files could crash the browser.
       You should verify the file size before uploading with $upload.http().
    */
    // $scope.upload = $upload.http({...})  // See 88#issuecomment-31366487 for sample code.

  // });
 $scope.$watch('files', function(files) {
    $scope.formUpload = false;
    //$scope.picFile[0].result = false;
    if (files != null) {
      for (var i = 0; i < files.length; i++) {
        $scope.errorMsg = null;
        (function(file) {
          $scope.generateThumb(file);
          eval($scope.uploadScript);
        })(files[i]);
      }
    }
    //storeS3UploadConfigInLocalStore();
  });


	$scope.onFileSelect = function($file) {
    	
      var data = {
        pinzong:$scope.pinzong,
        chandi:$scope.chandi,
        maose:$scope.maose,
        riqi:$scope.riqi,
        mingzi:$scope.mingzi,
        jianjie:$scope.jianjie
      }

      var file = $file;
      console.log($scope.file);
      $upload.upload({
        url: 'http://localhost:8080/api/save', // upload.php script, node.js route, or servlet url
        method: 'POST',
        //headers: {'Authorization': 'xxx'}, // only for html5
        //withCredentials: true,
        data: data,
        file: $scope.file,// single file or a list of files. list is only for html5,
        progress: function(e){}
      }).then(function(data, status, headers, config) {
        $scope.picFile[0].result = true;
        // file is uploaded successfully
        //console.log(data);
      }); 

     


  	}
  $scope.generateThumb = function(file) {
    if (file != null) {
      if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
        $timeout(function() {
          var fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = function(e) {
            $timeout(function() {
              file.dataUrl = e.target.result;
            });
          }
        });
      }
    }
  }



	$scope.uploadPic = function(files) {
		//
		$scope.file = files[0];
		$scope.formUpload = true;
		if (files != null) {
			var file = files;
			$scope.generateThumb(file);
			$scope.errorMsg = null;
			eval($scope.onFileSelect(files));	
		}


	}

	
}]);