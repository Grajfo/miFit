treningAdmin.controller("treningControllerAdmin", function($scope, $http) {
    $scope.formData = {};
    uporabnik = JSON.parse(sessionStorage.getItem('uid'));
 
    $http.get('http://localhost:3000/trening/')
        .then(function(response) {
            $scope.vsitreningi = response.data;
        }), 
        function(error) {
            alert("napaka" + error.data);
        };

    $scope.pridobiTreninge = function(id) {
        $http.get('http://localhost:3000/trening/' + id)
            .then(function(response) {
                $('#details').show();
                $scope.details = response.data;
                console.log(response.data);
            }), 
            function(error) {
                alert("napaka" + error.data);
            };
    };

    $scope.dodajTrening = function() {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/trening/',
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

    $scope.urediTrening = function(id) {
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/trening/' + id,
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

    $scope.izbrisiTrening = function(id) {
        $http.delete('http://localhost:3000/trening/' + id)
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

