vaja.controller("vajaController", function($scope, $http) {
    $scope.formData = {};

    $http.get('http://localhost:3000/vaja/')
        .then(function(response) {
            $scope.vsevaje = response.data;
        }), 
        function(error) {
            alert("napaka" + error.data);
        };

        $http.get('http://localhost:3000/misicnaSkupina/')
        .then(function(response) {
            $scope.vseMisicneSkupine = response.data;
        }), 
        function(error) {
            alert("napaka" + error.data);
        };

    $scope.pridobiVajo = function(id) {
        $http.get('http://localhost:3000/vaja/' + id)
            .then(function(response) {
                $('#details').show();
                $scope.details = response.data;
                console.log(response.data);
            }), 
            function(error) {
                alert("napaka" + error.data);
            };
    };

    $scope.dodajVajo = function() {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/vaja/',
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

    $scope.urediVajo = function(id) {
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/vaja/' + id,
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

    $scope.izbrisiVajo = function(id) {
        $http.delete('http://localhost:3000/vaja/' + id)
            .then(function(response) {
                $scope.rezultat = response.data;
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