var app_cookies = angular.module('mainModule', ['ngCookies','ngRoute','ng-sweet-alert','ui.bootstrap','angular-loading-bar']);

/**
 * Controlador que permite almacenar los datos del usuario y administrar
 * las credenciales para login y logout
 */
app_cookies.controller('SidebarController', function ($scope, $cookies,SweetAlert,$http,$window) {

    $scope.username_label = $cookies.get('username');
    $scope.myForm={};
    $scope.myForm.nickname="";
    $scope.myForm.pass="";


    $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };

    $scope.state = false;
    $scope.toggleState = function() {
        $scope.state = !$scope.state;
    };

    $scope.mobilecheck = function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };

    $scope.logout = function () {
        if($cookies.get('username') != "") {
            SweetAlert.success("Desconectado" + $scope.myForm.nickname, {title: "Cerrando..."});
            $cookies.put('username', "");
            $scope.myForm.nickname = "";
            $window.location.reload();

        }
        else{
            SweetAlert.error("No ha ingresado al sistema", {title: "Atenci\u00F3n"});
        }
    }

    $scope.login = function() {
        if($scope.myForm.nickname.toString() != "" && $scope.myForm.pass.toString() != "") {
            var parameter = JSON.stringify({
                Nickname: $scope.myForm.nickname.toString(),
                Secure_Pass: $scope.myForm.pass.toString()
            });

            $http.post('http://cewebserver.azurewebsites.net/Service1.svc/postlogin', parameter).success(function (data, status, headers, config) {
                if (data == "responsetrue") {
                    SweetAlert.success("Bienvenido " + $scope.myForm.nickname, {title: "Iniciando..."});
                    $cookies.put('username', $scope.myForm.nickname);
                    $scope.username_label = $cookies.get('username');
                    $scope.showModal = false;
                }
                else {
                    SweetAlert.error("Oops, credenciales incorrectas", {title: "Error de acceso"})
                }
            }).error(function (data, status, headers, config) {
                console.log(data);
            });
        }
        else{
            SweetAlert.error("Por favor ingrese sus datos", {title: "Error de acceso"})
        }
    };

    $scope.mobileRedirect = function() {
        if($scope.mobilecheck() == true){
            $window.location.href = 'pages/app.html';
        }
    };
    $scope.mobileRedirect();

});

/**
 * Permite mostar la ventana emergente para lograr que el usuario ingrese
 * al sistema.
 */
app_cookies.directive('modal', function () {
    return {
        template: '<div id="loginbg"class="modal fade">' +
        '<div>' +
        '<div>' +
        '<div ng-transclude></div>' +
        '</div>' +
        '</div>' +
        '</div>',
        restrict: 'E',
        transclude: true,
        replace:true,
        scope:true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function(value){
                if(value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function(){
                scope.$apply(function(){
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function(){
                scope.$apply(function(){
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});

/**
 * Directive que permite administar la clase que se muestra segun
 * la seleccion del usuario
 */
app_cookies.directive('sidebarDirective', function() {
    return {
        link : function(scope, element, attr) {
            scope.$watch(attr.sidebarDirective, function(newVal) {
                if(newVal)
                {
                    element.addClass('show');
                    return;
                }
                element.removeClass('show');
            });
        }
    };
});

/******************************************************************************************/
/******************************************************************************************/
/******************************************************************************************/

/**
 * Controlador de configuracion que permite detectar el redireccionamiento
 * y cargar una pagina y controlador especificos
 */
app_cookies.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })

        .when('/home', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })

        // route for the about page
        .when('/productos', {
            //templateUrl : 'pages/oldproducts.html',
            templateUrl : 'pages/productos.html',
            controller  : 'productsController'
        })

        // route for the contact page
        .when('/cuenta', {
            templateUrl : 'pages/cuenta.html',
            controller  : 'contactController'
        });
});

/**
 * Controlador que muestra un mensaje en la pagina principal
 */
app_cookies.controller('mainController', function($scope) {
    $scope.message = 'Gracias por preferirnos';
});

/**
 * Controlador que permite controlar la funcionalidad de las funciones
 * de productos para mostrarlos por pagina y categoria
 */
app_cookies.controller('productsController', function($scope) {
    $scope.filteredTodos = []
        ,$scope.currentPage = 1
        ,$scope.numPerPage = 10
        ,$scope.maxSize = 5;

    $scope.makeTodos = function() {
        $scope.todos = [];
        for (i=1;i<=100;i++) {
            $scope.todos.push({ text:'todo '+i, done:false});
        }
    };
    $scope.makeTodos();

    $scope.$watch('currentPage + numPerPage', function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

        $scope.filteredTodos = $scope.todos.slice(begin, end);
    });
});

app_cookies.controller('contactController', function($scope) {
    $scope.message = 'Esta es una pagina de contacto';
});

/******************************************************************************************/
/******************************************************************************************/
/******************************************************************************************/

/**
 * Controlador que permite obtener todos productos accediento al webservice
 */
app_cookies.controller('ProductosController',['$scope','$http','CarritoService', function ($scope,$http,carService) {
    $scope.productos = [];

    $scope.agregar = function (p) {
        carService.agregar(p);
    }

    $scope.formatoMoneda = function(valor){
        var valor = parseFloat(valor);
        return "\u00A2 " + Math.floor(valor) + "." + (valor * 100) % 100;
    }

    $scope.listProducts = function () {

        $http.get('http://cewebserver.azurewebsites.net/Service1.svc/GetProducts?params=all').success(function (data, status, headers, config) {
            $scope.productos = (JSON).parse(data.toString());
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    }

    $scope.listProducts();
}]);

/**
 * Controlador que permite controlar el carrito de compras, así como almacenar
 * la informacion de las sucursales.
 */
app_cookies.controller('CarritoController', ['$scope','$http', 'CarritoService','SweetAlert','$cookies','$window', function ($scope,$http, carService, SweetAlert,$cookies,$window) {
    $scope.carrito = [];
    $scope.sucursales = [];
    $scope.infosurcursal = [];
    $scope.selectedSucursal = $scope.sucursales[0];
    /*carService.listar(function(data){
        $scope.carrito = data;
    });*/

    carService.carrito = $scope.carrito;

    $scope.precioTotal = function(){
        var total = 0;
        angular.forEach($scope.carrito, function(item){
            total = total + (item.Cantidad * item.Producto.Price);
        });
        return total;
    };

    $scope.eliminar = function(item){
        carService.eliminar(item);
    };

    $scope.getSucursales = function () {
        $http.get('http://cewebserver.azurewebsites.net/Service1.svc/getboffice').success(function (data, status, headers, config) {
            $scope.infosurcursal = (JSON).parse(data.toString());
            angular.forEach($scope.infosurcursal, function (item) {
                $scope.sucursales.push(item.Name)
            });
            $scope.selectedSucursal = $scope.sucursales[0];

        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    }


    $scope.realizarCompra = function () {
        var loginUser = $cookies.get('username');

        if(loginUser != null) {
            if(loginUser != "") {
                var infoToSend = loginUser + ":" + $scope.selectedSucursal;

                angular.forEach($scope.carrito, function (item) {
                    infoToSend += "," + item.Producto.ID_Product + ":" + item.Cantidad + ":" + item.Producto.Price;
                });


                var parameter = JSON.stringify({
                    DataG: infoToSend
                });
                console.log(parameter);
                $http.post('http://cewebserver.azurewebsites.net/Service1.svc/postshop', parameter).success(function (data, status, headers, config) {
                    console.log(data);
                }).error(function (data, status, headers, config) {
                    console.log(data);
                });


                $scope.carrito = [];
                //$window.location.reload();
                //SweetAlert.success("La compra ha sido realizada exitosamente", {title: "Proceso Completado"});

            }
            else{
                SweetAlert.error("Por favor ingrese al sistema", {title: "Credenciales Requeridas"})
            }
        }
        else{
            SweetAlert.error("Por favor ingrese al sistema", {title: "Credenciales Requeridas"})
        }


    }

    $scope.getSucursales();
}]);

/**
 * Filtro que permite establecer el formato de la moneda de colones.
 */
app_cookies.filter('formatoMoneda', function() {
    return function(input) {
        var out = "";
        var valor = parseFloat(input);
        out = "\u00A2 " + Math.floor(valor) + "." + ((valor * 100) % 100 + '00').substr(0,2);
        return out;
    }
});

/**
 * Controlador para el carrito de compras que permite realizar operaciones sobre esta
 * informacion, como añadir y quitar del carrito.
 */
app_cookies.factory('CarritoService', ['$http','SweetAlert','$cookies', function($http,SweetAlert,$cookies){
    var servicio = {};

    servicio.carrito = [];

    var filtrar = function(id){
        for (var i = 0; i < servicio.carrito.length; i++) {
            if (servicio.carrito[i].Producto.ID_Product == id) {
                return servicio.carrito[i];
            }
        };
        return null;
    };

    servicio.agregar = function(p){
        var itemActual = filtrar(p.ID_Product);

        if(p.Stock > 0){
            var audio = new Audio('../assets/audio/beep.mp3');

            if (!itemActual) {
                servicio.carrito.push({
                    Producto: p,
                    Cantidad: 1
                });
                audio.play();
            }
            else {
                itemActual.Cantidad++;
                audio.play();
            }
        }
        else{
            SweetAlert.error("Lo sentimos, no tenemos stock del producto seleccionado", {title: "Producto No Disponible"})
        }


    };

    servicio.eliminar = function(item){
        servicio.carrito.splice(servicio.carrito.indexOf(item),1);
    };

    return servicio;
}]);




app_cookies.directive('tabs', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: [ "$scope", function($scope) {
            var panes = $scope.panes = [];

            $scope.select = function(pane) {
                angular.forEach(panes, function(pane) {
                    pane.selected = false;
                });
                pane.selected = true;
            }

            this.addPane = function(pane) {
                if (panes.length == 0) $scope.select(pane);
                panes.push(pane);
            }
        }],
        template:
        '<div class="tabbable">' +
        '<ul class="nav nav-tabs">' +
        '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
        '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
        '</li>' +
        '</ul>' +
        '<div class="tab-content" ng-transclude></div>' +
        '</div>',
        replace: true
    };
});

app_cookies.directive('pane', function() {
    return {
        require: '^tabs',
        restrict: 'E',
        transclude: true,
        scope: { title: '@' },
        link: function(scope, element, attrs, tabsCtrl) {
            tabsCtrl.addPane(scope);
        },
        template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
        replace: true
    };
})
/*******************************************************************************/
/*******************************************************************************/

/**
 * Controlador que permite obtener datos y realizar operaciones sobre la
 * informacion del usuario.
 */
app_cookies.controller('cuentaController',['$scope','$http','$cookies','$window', function ($scope,$http,$cookies,$window) {
    $scope.soldItems = [];
    $scope.customer = [];

    $scope.data = {};
    $scope.data.pcard="";
    $scope.data.pname="";
    $scope.data.presidence="";
    $scope.data.pbpdate="";
    $scope.data.pnickname="";
    $scope.data.ppass="";
    $scope.data.pphone="";
    $scope.data.pemail="";
    $scope.data.ppriority="";

    $scope.data.saveUser = function () {
        var parameter = JSON.stringify({
            ID_Card:$scope.data.pcard.toString(),
            Name: $scope.data.pname.toString(),
            Residence: $scope.data.presidence.toString(),
            Nickname: $scope.data.pnickname.toString(),
            Secure_Pass: $scope.data.ppass.toString(),
            BDate: $scope.data.pbpdate.toString(),
            Phone: $scope.data.pphone.toString(),
            Email: $scope.data.pemail.toString(),
            PriorityLevel: $scope.data.ppriority.toString()
        });
        $http.post('http://cewebserver.azurewebsites.net/Service1.svc/updatecustomer', parameter).
        success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            console.log("status " + status);
            console.log("config " + data);
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(data);
            console.log(status);
        });
    }

    $scope.deleteUser = function () {
        var loginUser = $cookies.get('username');

        if(loginUser != null) {
            if (loginUser != "") {
                $http.get('http://cewebserver.azurewebsites.net/Service1.svc/deletecustomer/' + loginUser).success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log("status " + status);
                    console.log("config " + data);
                }).error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log(data);
                    console.log(status);
                });
                $cookies.put('username', "");
                $window.location.reload();
            }
        }
    }

    $scope.getUserInfo = function () {
        var loginUser = $cookies.get('username');

        if(loginUser != null) {
            if (loginUser != "") {
                $http.get('http://cewebserver.azurewebsites.net/Service1.svc/getcustomer/' + loginUser).success(function (data, status, headers, config) {
                    $scope.customer = (JSON).parse(data.toString());
                    $scope.data.pcard=$scope.customer[0].ID_Card;
                    $scope.data.pname=$scope.customer[0].Name;
                    $scope.data.presidence=$scope.customer[0].Residence;
                    $scope.data.pbpdate=$scope.customer[0].BDate;
                    $scope.data.pnickname=$scope.customer[0].Nickname;
                    $scope.data.ppass=$scope.customer[0].Secure_Pass;
                    $scope.data.pphone=$scope.customer[0].Phone;
                    $scope.data.pemail=$scope.customer[0].Email;
                    $scope.data.ppriority=$scope.customer[0].PriorityLevel;

                }).error(function (data, status, headers, config) {
                    console.log(data);
                });
            }
        }

        ;
    }

    $scope.getAllItems = function () {
        var loginUser = $cookies.get('username');

        if(loginUser != null) {
            if (loginUser != "") {
                $http.get('http://cewebserver.azurewebsites.net/Service1.svc/getorder/'+loginUser).success(function (data, status, headers, config) {
                    $scope.soldItems = (JSON).parse(data.toString());
                }).error(function (data, status, headers, config) {
                    console.log(data);
                });
            } else{ SweetAlert.error("Por favor ingrese al sistema", {title: "Credenciales Requeridas"}) }
        } else{ SweetAlert.error("Por favor ingrese al sistema", {title: "Credenciales Requeridas"}) }
    }

    $scope.autoGetAllItems = function () {
        var loginUser = $cookies.get('username');

        if(loginUser != null) {
            if (loginUser != "") {
                $http.get('http://cewebserver.azurewebsites.net/Service1.svc/getorder/' + loginUser).success(function (data, status, headers, config) {
                    $scope.soldItems = (JSON).parse(data.toString());
                }).error(function (data, status, headers, config) {
                    console.log(data);
                });
            }
        }
    }

    $scope.autoGetAllItems();
    $scope.getUserInfo();
}]);