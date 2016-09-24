var app_cookies = angular.module('mainModule', ['ngCookies','ngRoute','ng-sweet-alert','ui.bootstrap']);

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
        .when('/contacto', {
            templateUrl : 'pages/contacto.html',
            controller  : 'contactController'
        });
});

// create the controller and inject Angular's $scope
app_cookies.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Pagina de inicio';
});

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

app_cookies.controller('ProductosController',['$scope','$http','CarritoService', function ($scope,$http,carService) {
    $scope.productos = [];

    $scope.agregar = function (p) {
        carService.agregar(p);
    }

    $scope.formatoMoneda = function(valor){
        var valor = parseFloat(valor);
        return "C." + Math.floor(valor) + "." + (valor * 100) % 100;
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


app_cookies.controller('CarritoController', ['$scope','$http', 'CarritoService',function ($scope,$http, carService) {
    $scope.carrito = [];

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

    $scope.realizarCompra = function () {
        //TODO VERIFICAR EL NOMBRE Y LA SESION EN LAS COOKIES
        //$cookies.get('username');

        var infoToSend = "fasm22:Cartago"
        angular.forEach($scope.carrito, function(item){
            infoToSend += "," + item.Producto.ID_Product + ":" + item.Cantidad + ":" + item.Producto.Price;
            //console.log("Name: " + item.Producto.Name + " ID: " + item.Producto.ID_Product + " Cantidad " + item.Cantidad);
        });


        var parameter = JSON.stringify({
            DataG: infoToSend
        });

        $http.post('http://cewebserver.azurewebsites.net/Service1.svc/postshop', parameter).success(function (data, status, headers, config) {
            console.log(data);
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    }
}]);

app_cookies.filter('formatoMoneda', function() {
    return function(input) {
        var out = "";
        var valor = parseFloat(input);
        out = "C." + Math.floor(valor) + "." + ((valor * 100) % 100 + '00').substr(0,2);
        return out;
    }
});

app_cookies.factory('CarritoService', ['$http','SweetAlert', function($http,SweetAlert){
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
            if (!itemActual) {
                servicio.carrito.push({
                    Producto: p,
                    Cantidad: 1
                });
            } else {
                itemActual.Cantidad++;
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


/*app_cookies.factory('ProductosService', [function(){
    var servicio = {};

    var datos = [{"Id": "1", "Categoria": "Libreria", "ID_Supplier": "Borrador Perfecto", "Price": "0.5", "Imagen": "http://images.wikia.com/inciclopedia/images/5/57/Borrador.jpg"},
        {"Id": "2", "Categoria": "Libreria", "ID_Supplier": "Lapiz Carboncito", "Price": "1", "Imagen": "http://cd1.dibujos.net/dibujos/pintados/201110/45bdaddccd13fdcfd61764cc91302190.png"},
        {"Id": "3", "Categoria": "Libreria", "ID_Supplier": "Regla Rectitud", "Price": "1.2", "Imagen": "http://us.123rf.com/400wm/400/400/wayoutwest/wayoutwest0705/wayoutwest070500013/912524-una-regla-de-madera-de-30-centimetros-aislada-en-un-fondo-blanco-muevalo-de-un-tiron-encima-para-una.jpg"},
        {"Id": "4", "Categoria": "Bano", "ID_Supplier": "Jabon Cochinin", "Price": "1.5", "Imagen": "http://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Tualetsapo.jpg/200px-Tualetsapo.jpg"},
        {"Id": "5", "Categoria": "Bano", "ID_Supplier": "Papel Higienico", "Price": "0.7", "Imagen": "http://sobrecuriosidades.com/wp-content/uploads/2011/12/papel-higienico.jpg"},
        {"Id": "6", "Categoria": "Alimentos", "ID_Supplier": "Leche Gloria", "Price": "2.5", "Imagen": "http://www.connuestroperu.com/images/stories/cosas/alimentos/lacteos/lata_leche_gloria.jpg"},
        {"Id": "7", "Categoria": "Alimentos", "ID_Supplier": "Mantequilla La Vaquita", "Price": "2.8", "Imagen": "http://www.semillalandia.com/blog/wp-content/uploads/2012/02/mantequilla.jpg"},
        {"Id": "8", "Categoria": "Alimentos", "ID_Supplier": "Mantequilla La Vaquita", "Price": "2.8", "Imagen": "http://www.semillalandia.com/blog/wp-content/uploads/2012/02/mantequilla.jpg"},
        {"Id": "9", "Categoria": "Alimentos", "ID_Supplier": "Mantequilla La Vaquita", "Price": "2.8", "Imagen": "http://www.semillalandia.com/blog/wp-content/uploads/2012/02/mantequilla.jpg"}];

    console.log(datos);

    servicio.listar = function(fc){
        fc(datos);
    };
    return servicio;

}]);*/

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

