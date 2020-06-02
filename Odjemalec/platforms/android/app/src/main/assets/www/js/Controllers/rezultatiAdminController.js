rezultatiAdmin.controller("rezultatiAdminController", function($scope, $http) {
    $scope.formData = {};
    
    
    $http.get('http://localhost:3000/rezultati/' )
        .then(function(response) {
            $scope.vsirezultati = response.data;
        }), 
        function(error) {
            alert("napaka" + error.data);
        };

    $scope.pridobiRezultat = function(id) {
        $http.get('http://localhost:3000/rezultati/' + id)
            .then(function(response) {
                $('#details').show();
                $scope.details = response.data;
                console.log(response.data);
            }), 
            function(error) {
                alert("napaka" + error.data);
            };
    };

    $scope.dodajRezultat = function() {
        $scope.formData.uporabnik_id = JSON.parse(sessionStorage.getItem('uid'));///--
        $http({
            method: 'POST',
            url: 'http://localhost:3000/rezultati/',
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

    $scope.urediRezultat = function(id) {
        $scope.formData.uporabnik_id = JSON.parse(sessionStorage.getItem('uid')); ///--
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/rezultati/' + id,
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

    $scope.izbrisiRezultat = function(id) {
        $http.delete('http://localhost:3000/rezultati/' + id)
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