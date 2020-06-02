hrana.controller("hranaController", function($scope, $http) {
    $scope.formData = {};
    
    $http.get('http://localhost:3000/hrana/')
        .then(function(response) {
            $scope.vsahrana = response.data;
        }), 
        function(error) {
            alert("napaka" + error.data);
        };

    $scope.pridobiHrano = function(id) {
        $http.get('http://localhost:3000/hrana/' + id)
            .then(function(response) {
                $('#details').show();
                $scope.details = response.data;
                console.log(response.data);
            }), 
            function(error) {
                alert("napaka" + error.data);
            };
    };

    $scope.dodajHrano = function() {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/hrana/',
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

    $scope.izbrisiHrano = function(id) {
        $http.delete('http://localhost:3000/hrana/' + id)
            .then(function(response) {
                $scope.hrana = response.data;
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

    $scope.urediHrano = function(id) {
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/hrana/' + id,
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
})