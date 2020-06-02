uporabniskiRacun.controller("uporabniskiRacunController", function($scope, $http) {
    $scope.formData = {};
    $scope.dodajUporabniskiRacun = function() {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/uporabniskiRacun/',
            data: JSON.stringify($scope.formData)
          })
            .then(function(response) {
                if(response.data === true){
                $scope.formData = {}
                window.location = "prijava.html";
                }
                else{
                    alert("email ze obstaja");
                }
            }), 
            function(error) {
                alert(error.data + "napaka");
            };
    };

    $scope.LoginPreveri = function() {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/uporabniskiRacun/preveri',
            data: JSON.stringify($scope.formData)
          })
            .then(function(response) {
                $scope.formData = {}
                if (response.data.vloga === 0){
                    sessionStorage.setItem("uid", JSON.stringify(response.data.id));
                    uporabnik = JSON.parse(sessionStorage.getItem('uid'));
                    window.location = "index.html";
                }
                else if (response.data.vloga === 1){
                    sessionStorage.setItem("uid", JSON.stringify(response.data));
                    uporabnik = JSON.parse(sessionStorage.getItem('uid'));
                   // window.location = "index.html";
                    //admin stran

                }
                else if (response.data === false){
                    alert("narobe email ali geslo");
                  //  location.reload()
                }
            }), 
            function(error) {
                alert(error.data + "narobe email ali geslo");
            };
    };
})