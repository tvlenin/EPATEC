var app_cookies = angular.module('mainModule', ['ngCookies','ngRoute','ng-sweet-alert','ui.bootstrap','angularFileUpload','angular-loading-bar']);

app_cookies.controller('SidebarController', function ($scope, $cookies,SweetAlert,$http,$window) {

    $scope.username_label = $cookies.get('username');
    $scope.userposition = $cookies.get('position');
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
        //console.log($cookies.get('username'));
        if($cookies.get('username') != "") {
            SweetAlert.confirm("\u00BFDesea salir del sistema?", {title: "Aviso"}).then(function (p) {
                $cookies.put('username', "");
                $cookies.put('position', "");
                $scope.myForm.nickname = "";
                $scope.userposition = "";
                $window.location.reload();
            });
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

            $http.post('http://cewebserver.azurewebsites.net/Service1.svc/postloginemployee', parameter).success(function (data, status, headers, config) {
                if (data == "responsefalse") {
                    SweetAlert.error("Oops, credenciales incorrectas", {title: "Error de acceso"});
                }
                else {
                    var prearray = data.split("\"");
                    var array = prearray[2].split(':');

                    //console.log("DATOS: " + prearray[1] + " OO " + array[1]);


                    SweetAlert.success("Bienvenido " + $scope.myForm.nickname, {title: "Iniciando..."});
                    $cookies.put('username', $scope.myForm.nickname);
                    $scope.username_label = $cookies.get('username');
                    $cookies.put('position', prearray[1]);
                    $scope.userposition  = $cookies.get('position');
                    $cookies.put('boffice', array[1]);
                    $scope.userposition  = $cookies.get('boffice');
                    $scope.showModal = false;

                    //console.log("cookie " + $cookies.get('position'));
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


    $scope.activarVentas=function(){
        $scope.verificarAcceso("ventas");
    }

    $scope.activarOrdenes=function(){
        $scope.verificarAcceso("ordenes");
    }

    $scope.activarContacto=function(){
        $scope.verificarAcceso("contacto");
    }

    $scope.activarEstadistica=function(){
        $scope.verificarAcceso("estadisticas");
    }

    $scope.verificarAcceso=function(dir){
        var tmpPosition=$cookies.get('position');
        var user = $cookies.get('username');
        console.log("USUARIO:" + user);
        console.log("POSITION:" + tmpPosition)

        if((dir == "ventas" && (tmpPosition == "dependiente" || (user == "root"))) ){
            $window.location.href = '/index.html#ventas';
        }
        else if((dir == "ordenes" && (tmpPosition == "supervisor" || (user == "root"))) ){
            $window.location.href = '/index.html#ordenes';
        }
        else if((dir == "contacto" && (tmpPosition == "supervisor" || (user == "root"))) ){
            $window.location.href = '/index.html#contacto';
        }
        else if((dir == "estadisticas" && (tmpPosition == "gerente" || (user == "root"))) ){
            $window.location.href = '/index.html#estadistica';
        }
        else{
            SweetAlert.error("No tiene permiso para acceder.", {title: "Credenciales Invalidas"});
        }
    }

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

        .when('/estadistica', {
            templateUrl : 'pages/estadistica.html',
            controller  : 'statscontroller'
        })

        // route for the about page
        .when('/ordenes', {
            //templateUrl : 'pages/oldproducts.html',
            templateUrl : 'pages/ordenes.html',
            controller  : 'contactController'
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


app_cookies.controller('ProviderController',['$scope','$http','$window', function ($scope,$http,carService,$window) {
    $scope.productos = [];

    $scope.agregar = function (p) {
        carService.agregar(p);
    };

    $scope.formatoMoneda = function(valor){
        var valor = parseFloat(valor);
        return "C." + Math.floor(valor) + "." + (valor * 100) % 100;
    };

    $scope.listProvider = function () {

        $http.get('http://cewebserver.azurewebsites.net/Service1.svc/GetSupplier').success(function (data, status, headers, config) {
            $scope.productos = (JSON).parse(data.toString());

        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    };

    $scope.listProvider();


    $scope.deleteProvider = function (producto) {

        console.log('ESTE ES EL ID' + producto.ID_Product);

        var idProvider = producto.ID_Supplier.toString()

        console.log(idProvider);

        $http.get('http://cewebserver.azurewebsites.net/Service1.svc/DeleteSupplier/'+ idProvider).
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
        $window.location.reload();

        $window.location.reload();
    };
}]);


app_cookies.controller('ProductosController',['$scope','$http','$window', function ($scope,$http,carService,$window) {
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

            console.log(data);
            
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    }

    $scope.listProducts();


    $scope.deleteProduct = function (producto) {

        var idProduct = producto.ID_Product.toString();

        $http.get('http://cewebserver.azurewebsites.net/Service1.svc/DeleteProduct/'+ idProduct).
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
        $window.location.reload();
    };
}]);

/*PEDAZO DE CODIGO DE ABRAHAM*/

app_cookies.controller('BestSellerController',['$scope','$http', function ($scope,$http,carService) {
    $scope.PBestSellers = [];

    $scope.agregar = function (p) {
        carService.agregar(p);
    }

    $scope.formatoMoneda = function(valor){
        var valor = parseFloat(valor);
        return "C." + Math.floor(valor) + "." + (valor * 100) % 100;
    }

    $scope.listProducts = function () {

        $http.get('http://cewebserver.azurewebsites.net/Service1.svc/getStadistics/bestseller').success(function (data, status, headers, config) {
            $scope.PBestSellers = (JSON).parse(data.toString());

            //console.log("JSON::"+PBestSellers);

            //           angular.forEach($scope.PBestSellers,function(item){console.log(item.)}



        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    }

    $scope.listProducts();
}]);

app_cookies.controller('SalesPerBranchController',['$scope','$http', function ($scope,$http,carService) {
    $scope.SalesPerBranch = [];

    $scope.agregar = function (p) {
        carService.agregar(p);
    }

    $scope.formatoMoneda = function(valor){
        var valor = parseFloat(valor);
        return "C." + Math.floor(valor) + "." + (valor * 100) % 100;
    }

    $scope.listProducts = function () {

        $http.get('http://cewebserver.azurewebsites.net/Service1.svc/getStadistics/salesperbranch').success(function (data, status, headers, config) {
            $scope.SalesPerBranch = (JSON).parse(data.toString());
            console.log("->>> "+data.toString());
            //           angular.forEach($scope.PBestSellers,function(item){console.log(item.)}



        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    }

    $scope.listProducts();
}]);

app_cookies.controller('BestSalesPerBranchController',['$scope','$http', function ($scope,$http,carService) {
    $scope.BestSalesPerBranch = [];

    $scope.agregar = function (p) {
        carService.agregar(p);
    }

    $scope.formatoMoneda = function(valor){
        var valor = parseFloat(valor);
        return "C." + Math.floor(valor) + "." + (valor * 100) % 100;
    }

    $scope.listProducts = function () {

        $http.get('http://cewebserver.azurewebsites.net/Service1.svc/getStadistics/bestsalesperbranch').success(function (data, status, headers, config) {
            $scope.BestSalesPerBranch = (JSON).parse(data.toString());

        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    }

    $scope.listProducts();
}]);

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

app_cookies.filter('formatoMoneda', function() {
    return function(input) {
        var out = "";
        var valor = parseFloat(input);
        out = "C." + Math.floor(valor) + "." + ((valor * 100) % 100 + '00').substr(0,2);
        return out;
    }
});


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

app_cookies.controller('statscontroller', function ($scope, $cookies,SweetAlert,$http,$window) {
    $scope.data={};

    $scope.getBestSeller = function() {
        $http.get('http://cewebserver.azurewebsites.net/Service1.svc/postlogin', parameter).success(function (data, status, headers, config) {
            if (data == "responsetrue") {
                SweetAlert.success("Bienvenido " + $scope.myForm.nickname, {title: "..."});
                $cookies.put('username', $scope.myForm.nickname);
                $scope.username_label = $cookies.get('username');
                $scope.showModal = false;
            }
            else {
                SweetAlert.error("Oops, error del server", {title: "Error de acceso"})
            }
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    };

})

app_cookies.controller('AddCategory',['$scope','$http','$window','SweetAlert', function ($scope,$http,$window,SweetAlert) {
    $scope.myForm = {};
    $scope.myForm.Category = "";

    $scope.myForm.submitDetail = function (item, event) {

        var detail = JSON.stringify({
            Details: $scope.myForm.Category.toString()
        });

        $http.post('http://cewebserver.azurewebsites.net/Service1.svc/postCategory', detail).
        success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            console.log("status " + status);
            console.log("config " + data);
            SweetAlert.success("",{title: "Categoria agregada"});
            $window.location.reload();
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            SweetAlert.error("",{title: "Ha ocurrido un error"});
            console.log(data);
            console.log(status);
        });

    }
}]);

app_cookies.controller('AddSupplier',['$scope','$http','$window','SweetAlert', function ($scope,$http,$window,SweetAlert) {
    $scope.myForm = {};
    $scope.myForm.ID_Supplier = "";
    $scope.myForm.Active = "";
    $scope.myForm.SName = "";
    $scope.myForm.Country = "";
    $scope.myForm.Phone = "";

    $scope.myForm.submitSupplier = function (item, event) {

        var Supplier = JSON.stringify({
            ID_Supplier: $scope.myForm.ID_Supplier.toString(),
            Active: $scope.myForm.Active.toString(),
            Name: $scope.myForm.SName.toString(),
            Country: $scope.myForm.Country.toString(),
            Phone: $scope.myForm.Phone.toString()
        });

        $http.post('http://cewebserver.azurewebsites.net/Service1.svc/postSupplier', Supplier).
        success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            console.log("status " + status);
            console.log("config " + data);
            SweetAlert.success("",{title: "Proveedor agregado"});
            $window.location.reload();
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            SweetAlert.error("",{title: "Ha ocurrido un error"});
            console.log(data);
            console.log(status);
        });
    }
}]);

app_cookies.controller('MyController', function ($scope, $cookies,SweetAlert,$http,$window,FileUploader) {
    $scope.myForm={};
    $scope.myForm.Categoria="";
    $scope.myForm.Active="";

    $scope.myForm.Supplier="";
    $scope.myForm.taxFree="";
    $scope.myForm.BOffice="";
    $scope.myForm.Price="";
    $scope.myForm.InStock="";
    $scope.myForm.Details="";
    $scope.myForm.Name="";

    $scope.myForm.uploadFile=function() {
        var name = $scope.myForm.Name + $scope.myForm.Supplier;
        $window.open('http://admin-epatec.codigo22.com/upload/files.html', '_blank', 'width=550, height=400').fileName= name;
    }

    $scope.myForm.submitTheForm=function(item,event) {
        var parameter = JSON.stringify({
            Details: $scope.myForm.Details.toString(),
            Stock: $scope.myForm.InStock.toString(),
            Price: $scope.myForm.Price.toString(),
            TaxFree: $scope.myForm.taxFree.toString(),
            ID_Supplier:$scope.myForm.Supplier.toString(),
            ID_Category:$scope.myForm.Categoria.toString(),
            Active:$scope.myForm.Active.toString(),
            Name: $scope.myForm.Name.toString().replace(/[\s]/g, ''),
            BOffice: $scope.myForm.BOffice.toString()
        });
        
        console.log(parameter);

        
        $http.post('http://cewebserver.azurewebsites.net/Service1.svc/postproduct', parameter).
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
});

app_cookies.controller('ActualizarProductoController', function ($scope, $cookies,SweetAlert,$http,$window,FileUploader) {
    $scope.myForm={};
    $scope.myForm.ID="";
    $scope.myForm.Categoria="";
    $scope.myForm.Active="";

    $scope.myForm.Supplier="";
    $scope.myForm.taxFree="";
    $scope.myForm.BOffice="";
    $scope.myForm.Price="";
    $scope.myForm.InStock="";
    $scope.myForm.Details="";
    $scope.myForm.Name="";

    $scope.myForm.uploadFile=function() {
        var name = $scope.myForm.Name + $scope.myForm.Supplier;
        $window.open('http://admin-epatec.codigo22.com/upload/files.html', '_blank', 'width=550, height=400').fileName= name;
    }

    $scope.myForm.updateProduct=function(item,event) {
        var parameter = JSON.stringify({
            ID_Product: $scope.myForm.ID.toString(),
            Details: $scope.myForm.Details.toString(),
            Stock: $scope.myForm.InStock.toString(),
            Price: $scope.myForm.Price.toString(),
            TaxFree: $scope.myForm.taxFree.toString(),
            ID_Supplier:$scope.myForm.Supplier.toString(),
            ID_Category:$scope.myForm.Categoria.toString(),
            Active:$scope.myForm.Active.toString(),
            Name: $scope.myForm.Name.toString().replace(/[\s]/g, ''),
            BOffice: $scope.myForm.BOffice.toString()
        });

        console.log(parameter);


        $http.post('http://cewebserver.azurewebsites.net/Service1.svc/updateProduct', parameter).
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
});





















app_cookies.controller('OrdenesController',['$scope','$http','$window','$cookies', function ($scope,$http,$window,$cookies,carService) {
    $scope.productos = [];



    $scope.listOrdenes = function () {

        if($cookies.get('username') == "root") {
            $http.get('http://cewebserver.azurewebsites.net/Service1.svc/GetOrders/all').success(function (data, status, headers, config) {
                $scope.productos = (JSON).parse(data.toString());

                /*console.log(data);*/

            }).error(function (data, status, headers, config) {
                console.log(data);
            });
        }
        else{
            $http.get('http://cewebserver.azurewebsites.net/Service1.svc/GetOrders/'+$cookies.get('boffice')).success(function (data, status, headers, config) {
                $scope.productos = (JSON).parse(data.toString());

                /*console.log(data);*/

            }).error(function (data, status, headers, config) {
                console.log(data);
            });
        }

    }
    $scope.listOrdenes();


    $scope.updateOrder1 = function (producto) {


        $http.get('http://cewebserver.azurewebsites.net/Service1.svc/UpdateOrder?id=' + producto.Invoice_ID + '&status=Cancelado').
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
        $window.location.reload();
    }

    $scope.updateOrder2 = function (producto) {


        $http.get('http://cewebserver.azurewebsites.net/Service1.svc/UpdateOrder?id=' + producto.Invoice_ID + '&status=pendiente').
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
        $window.location.reload();
    }


    $scope.updateOrder3 = function (producto) {


        $http.get('http://cewebserver.azurewebsites.net/Service1.svc/UpdateOrder?id=' + producto.Invoice_ID + '&status=Completado').
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
        $window.location.reload();
    }


}]);




app_cookies.controller('updateSupplier',['$scope','$http','$window','SweetAlert', function ($scope,$http,$window,SweetAlert) {
    $scope.myForm = {};
    $scope.myForm.ID_Supplier = "";
    $scope.myForm.Active = "";
    $scope.myForm.SName = "";
    $scope.myForm.Country = "";
    $scope.myForm.Phone = "";

    $scope.myForm.updateSupplier = function (item, event) {

        var Supplier = JSON.stringify({
            ID_Supplier: $scope.myForm.ID_Supplier.toString(),
            Active: $scope.myForm.Active.toString(),
            Name: $scope.myForm.SName.toString(),
            Country: $scope.myForm.Country.toString(),
            Phone: $scope.myForm.Phone.toString()
        });

        $http.post('http://cewebserver.azurewebsites.net/Service1.svc/updateSupplier', Supplier).
        success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            console.log("status " + status);
            console.log("config " + data);
            SweetAlert.success("",{title: "Proveedor agregado"});
            $window.location.reload();
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            SweetAlert.error("",{title: "Ha ocurrido un error"});
            console.log(data);
            console.log(status);
        });
    }
}]);























