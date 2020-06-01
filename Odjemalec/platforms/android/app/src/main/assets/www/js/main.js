var hrana = angular.module("hrana", []);
var uporabniskiRacun = angular.module("uporabniskiRacun", []);
var rezultati = angular.module("rezultati", []);
var recept = angular.module("recept", []);
var vaja = angular.module("vaja", []);
var trening = angular.module("trening", []);
var user = angular.module("user", []);



var treningAdmin = angular.module("treningAdmin", []);
var receptiAdmin = angular.module("receptiAdmin", []);

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

uporabniskiRacun.controller("uporabniskiRacunController", function($scope, $http) {
    $scope.formData = {};
    $scope.dodajUporabniskiRacun = function() {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/uporabniskiRacun/',
            data: JSON.stringify($scope.formData)
          })
            .then(function(response) {
                $scope.formData = {}
                window.location = "prijava.html";
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
                }
                else if (response.data === false){
                    alert('napacno geslo ali email')
                    //  location.reload()
                }
            }), 
            function(error) {
                alert(error.data + "napaka");
            };
    };
})

rezultati.controller("rezultatiController", function($scope, $http) {
    $scope.formData = {};
    uporabnik = JSON.parse(sessionStorage.getItem('uid'));   
    

    $http.get('http://localhost:3000/rezultati/test/' + uporabnik)
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
      
recept.controller("receptController", function($scope, $http) {
    $scope.formData = {};

    uporabnik = JSON.parse(sessionStorage.getItem('uid'));       


    $http.get('http://localhost:3000/recept/test/' + uporabnik)
        .then(function(response) {
            $scope.vsirecepti = response.data;
        }), 
        function(error) {
            alert("napaka" + error.data);
        };
        $http.get('http://localhost:3000/Kategorija_recepta/')
            .then(function(response) {
                $scope.vsekategorije = response.data;
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
        $scope.formData.uporabnik_id = JSON.parse(sessionStorage.getItem('uid'));///--
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
        $scope.formData.uporabnik_id = JSON.parse(sessionStorage.getItem('uid'));///--
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

trening.controller("treningController", function($scope, $http) {
    $scope.formData = {};
    uporabnik = JSON.parse(sessionStorage.getItem('uid'));
 
    $http.get('http://localhost:3000/trening/test/' + uporabnik)
        .then(function(response) {
            $scope.vsitreningi = response.data;
        }), 
        function(error) {
            alert("napaka" + error.data);
        };
        $http.get('http://localhost:3000/vaja/')
            .then(function(response) {
                $scope.vsevaje = response.data;
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
        $scope.formData.uporabnik_id = JSON.parse(sessionStorage.getItem('uid'));///--
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
        $scope.formData.uporabnik_id = JSON.parse(sessionStorage.getItem('uid'));///--
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




//ADMINISTRATOR CONTRO


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


/*  ---------------------------------------------------
    Template Name: Gutim
    Description: Gutim Fitness HTML Template
    Author: Colorlib
    Author URI: http://colorlib.com
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            Gallery filter
        --------------------*/
        $('.gallery-controls li').on('click', function() {
            $('.gallery-controls li').removeClass('active');
            $(this).addClass('active');
        });
        if($('.gallery-filter').length > 0 ) {
            var containerEl = document.querySelector('.gallery-filter');
            var mixer = mixitup(containerEl);
        }

    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
		Menu Hover
	--------------------*/
    $(".header-section .nav-menu .mainmenu ul li").on('mousehover', function() {
        $(this).addClass('active');
    });
    $(".header-section .nav-menu .mainmenu ul li").on('mouseleave', function() {
        $('.header-section .nav-menu .mainmenu ul li').removeClass('active');
    });

    /*------------------------
		Class Slider
    ----------------------- */
    $(".classes-slider").owlCarousel({
        items: 3,
        dots: true,
        autoplay: true,
        loop: true,
        smartSpeed: 1200,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 3,
            },
            992: {
                items: 3,
            }
        }
    });

    /*------------------------
		Testimonial Slider
    ----------------------- */
    $(".testimonial-slider").owlCarousel({
        items: 1,
        dots: false,
        autoplay: true,
        loop: true,
        smartSpeed: 1200,
        nav: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
    });

    /*------------------
        Magnific Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
        About Counter Up
    --------------------*/
    $('.count').each(function () {
        $(this).prop('Counter',0).animate({
        Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
            $(this).text(Math.ceil(now));
            }
        });
    });

    /*------------------
       Schedule Filter
    --------------------*/
    $('.nav-controls ul li').on('click', function() {
        var tsfilter = $(this).data('tsfilter');
        $('.nav-controls ul li').removeClass('active');
        $(this).addClass('active');
        
        if(tsfilter == 'all') {
            $('.schedule-table').removeClass('filtering');
            $('.ts-item').removeClass('show');
        } else {
            $('.schedule-table').addClass('filtering');
        }
        $('.ts-item').each(function(){
            $(this).removeClass('show');
            if($(this).data('tsmeta') == tsfilter) {
                $(this).addClass('show');
            }
        });
    });

})(jQuery);



;

