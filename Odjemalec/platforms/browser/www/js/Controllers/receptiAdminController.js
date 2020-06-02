receptiAdmin.controller("receptControllerAdmin", function($scope, $http) {
    $scope.formData = {};

    $http.get('http://localhost:3000/recept/')
        .then(function(response) {
            $scope.vsirecepti = response.data;
        }), 
        function(error) {
            alert("napaka" + error.data);
        };

    $scope.pridobiRecept = function(id) {
        $http.get('http://localhost:3000/recept/' + id)
            .then(function(response) {
                $('#details').show();
                $scope.details = response.data;
                console.log(response.data);
            }), 
            function(error) {
                alert("napaka" + error.data);
            };
    };

    $scope.dodajRecept = function() {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/recept/',
            data: JSON.stringify($scope.formData)
          })
            .then(function(response) {
                $scope.formData = {}
                console.log(response.data);
                location.reload();
            }), 
            function(error) {
                alert(error.data + "napaka");
            };
    };

    $scope.urediRecept = function(id) {
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/recept/' + id,
            data: JSON.stringify($scope.formData)
          })
          .then(function(response) {
            $scope.formData = {}
            console.log(response.data);
            location.reload();
          })
          .catch(error => {
            console.error('Error:', error);
          });
    };

    $scope.izbrisiRecept = function(id) {
        $http.delete('http://localhost:3000/recept/' + id)
            .then(function(response) {
                $scope.recept = response.data;
                console.log(response.data);
                location.reload();
            }), 
            function(error) {
                alert('napaka' + error.data);
            };
    };
    $scope.zapri = function() {
        $('#details').hide();
    };
})