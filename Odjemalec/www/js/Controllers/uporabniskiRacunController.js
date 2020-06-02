uporabniskiRacun.controller("uporabniskiRacunController", function($scope, $http) {
    $scope.formData = {};
    $scope.registrationFormData = {};
    $scope.dodajUporabniskiRacun = function() {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/uporabniskiRacun/',
            data: JSON.stringify($scope.formData)
          })
          .then(function(response){
            $http.get('http://localhost:3000/uporabniskiRacun/')
            .then(function(response){
                zadnji_upR = response.data[response.data.length - 1];
                $scope.registrationFormData['uporabniskiRacun_id'] = zadnji_upR.id
                //console.log(JSON.stringify($scope.registrationFormData))
                $http({
                    method: 'POST',
                    url: 'http://localhost:3000/Uporabnik/',
                    data: JSON.stringify($scope.registrationFormData)
                  })
                    .then(function(response) {
                        $scope.formData = {}
                        console.log(response.data)
                        $scope.registrationFormData = {}
                        window.location = "prijava.html";
                    }), 
                    function(error) {
                        alert(error.data + "napaka");
                    };
                }), 
                function(error) {
                    alert(error.data + "napaka");
                };
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
                var podatki = response.data
                if (response.data === false)
                {
                    alert("narobe email ali geslo");                    
                }  
                
                else{
                $http.get('http://localhost:3000/Uporabnik/pridobi/' + response.data.id)
                .then(function(response){
                    sessionStorage.setItem("uid", JSON.stringify(response.data.id));
                    sessionStorage.setItem("vloga", JSON.stringify(podatki.vloga));
                   
                   console.log(podatki);
                  
                    if (podatki.vloga === 0){
                        //uporabnik = JSON.parse(sessionStorage.getItem('uid'));
                      window.location = "index.html";
                    }
                    else if (podatki.vloga === 1){
                        //uporabnik = JSON.parse(sessionStorage.getItem('uid'));    
                       window.location = "indexAdmin.html";
                        //admin stran
        
                    }
                   
                }), 
                function(error) {
                    alert(error.data + "narobe email ali geslo");
                }; 
                }
            }), 
            function(error) {
                alert(error.data + "narobe email ali geslo");
            };
        };
})