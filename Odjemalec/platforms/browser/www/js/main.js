const hrana = angular.module("hrana", []);

hrana.controller("hranaController", function($scope, $http) {
    $scope.formData = {};   
    // če hočeš da dela na andorid emulatorju morš dat svoj  ip namets local host
    
    if (navigator.connection.type === 'none') {
        alert('there is no internet')
        $scope.vsahrana = JSON.parse(localStorage.getItem('vsaHrana'));
    }
    else {
        $http.get('localhost:3000/hrana/')
        .then(function(response) {
            allfood = JSON.parse(localStorage.getItem('vsaHrana'));
            if (allfood == null){
                localStorage.setItem("vsaHrana", JSON.stringify(response.data));
                allfood = JSON.parse(localStorage.getItem('vsaHrana'));
            }
            $scope.vsahrana = response.data;
            stevilo = allfood.length - response.data.length
            console.log(stevilo)
            if (stevilo > 0){
                reversedFood = allfood.reverse();
                for (i = 0; i < stevilo; i++){
                    $scope.formData = reversedFood[i]
                    $http({method: 'POST',url: 'localhost:3000/hrana/',data: JSON.stringify($scope.formData)})
                }
                $scope.formData = {};
                location.reload();
            }         
        })
        .catch(function(error) {
            console.log('napaka ' + error);           
        });
    }

    $scope.pridobiHrano = function(id) {
        if (navigator.connection.type === 'none') {
            hranaOne = JSON.parse(localStorage.getItem('vsaHrana'));
            $('#details').show();
            $scope.details = hranaOne.find(h => h.id === id)
        }
        else {
        $http.get('localhost:3000/hrana/' + id)
            .then(function(response) {
                $('#details').show();
                $scope.details = response.data;
            })
            .catch(function(error) {
                console.log('napaka ' + error);   
            });
        }
    };

    $scope.dodajHrano = function() {
        if (navigator.connection.type === 'none') {
            vsahrana = JSON.parse(localStorage.getItem('vsaHrana'));

            vsahrana.push($scope.formData)
            $scope.formData = {}
            localStorage.setItem("vsaHrana", JSON.stringify(vsahrana));
            location.reload();
        }
        else {
            $http({
                method: 'POST',
                url: 'localhost:3000/hrana/',
                data: JSON.stringify($scope.formData)
            })
            .then(function() {
                $scope.formData = {}
                location.reload();
            })
            .catch(function(error) {
                console.log("napaka" + error);
            });
        }
    };

    $scope.izbrisiHrano = (id) => {
        $http.delete('localhost:3000/hrana/' + id)
            .then(function(response) {
                if (navigator.connection.type !== 'none'){
                    $scope.hrana = response.data;
                    console.log($scope.hrana)
                    localStorage.removeItem('vsaHrana')
                    location.reload();
                }
            }) 
            .catch(function(error) {
                console.log('napaka ' + error.data);
            });
    };
    $scope.zapri = function() {
        $('#details').hide();
    };

});