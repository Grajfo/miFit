user.controller("userController", function($scope, $http) {
    $scope.formData = {};

    uporabnik = JSON.parse(sessionStorage.getItem('uid'));       


    $http.get('http://localhost:3000/Uporabnik/' + uporabnik)
        .then(function(response) {
            $scope.trening = response.data;
        }), 
        function(error) {
            alert("napaka" + error.data);
        };

    $scope.pridobiUserje = function(id) {
        $http.get('http://localhost:3000/Uporabnik/' + id)
            .then(function(response) {
                $('#details').show();
                $scope.details = response.data;
                console.log(response.data);
            }), 
            function(error) {
                alert("napaka" + error.data);
            };
    };

    $scope.dodajUserja = function() {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/Uporabnik/',
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

    $scope.urediUserja= function(id) {
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/Uporabnik/' + id,
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

    $scope.izbrisiUserja = function(id) {
        $http.delete('http://localhost:3000/Uporabnik/' + id)
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
