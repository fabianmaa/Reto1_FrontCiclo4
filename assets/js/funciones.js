/*================================== Funciones formulario Registrar Usuario ===================================*/

// validaciones campos registrar 
$("#formularioReg").validate({
    onkeyup: true,
    onfocusin: true,
    rules: {
        name: {
            required: true,
            minlength: 3,
            maxlength: 80,
        },
        email: {
            required: true,
            minlength: 3,
            maxlength: 50,
            email: true,
        },
        password: {
            required: true,
            minlength: 6,
            maxlength: 50,
        },
        password_confirm: {
            required: true,
            minlength: 6,
            maxlength: 50,
            equalTo: "#password",
        }
    }
})

$("#registrar").click(function () {
    if ($("#formularioReg").valid() == false) {
        return;
    }
    let name = $("#name").val()
    let email = $("#email").val()
    let password = $("#password").val()
    let password_confirm = $("#password_confirm").val()
})// fin validaciones 

//// Guardar usuario
function guardarUsuarios() {
    var email = $("#email").val();

    $.ajax({
        url: "http://129.151.120.50:8088/api/user/" + email,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response)
            if (response == true) {
                swal.fire({
                    title: "El usuario ya existe",
                    text: "Valide por favor",
                    icon: "error",
                    showConfirmButton: true,
                    confirmButtonColor: "#242729",
                    confirmButtonText: "Aceptar",
                    footer: "<a href='index.html'>o de clic aquí ingresar <i class='fas fa-sign-in-alt heart'></a>"
                });
            } else {
                let var1 = {
                    email: $("#email").val(),
                    password: $("#password").val(),
                    name: $("#name").val()
                };
                $.ajax({
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    dataType: 'JSON',
                    data: JSON.stringify(var1),
                    url: "http://129.151.120.50:8088/api/user/new",
                    success: function (response) {
                        console.log(response);
                        console.log("Se guardo correctamente");
                        swal.fire({
                            title: "Cuenta creada de forma correcta",
                            text: "Bienvenido " + response.name,
                            icon: "success",
                            showConfirmButton: false,
                            allowOutsideClick: true,
                            footer: "<a href='index.html'>Ingresar <i class='fas fa-sign-in-alt heart'></i></a>"
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        swal.fire("Error en la aplicacion, comuniquese con el administrador del sistema", "Validación Incorrecta", "error");
                    }
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            swal.fire("Error en la aplicacion, comuniquese con el administrador del sistema", "Validación Incorrecta", "error");
        }
    });
} //// fin guardar usuario

/*================================== Funciones formulario Login ===================================*/

// validaciones campos login
$("#formulario").validate({
    rules: {
        email: {
            required: true,
            minlength: 3,
            maxlength: 50,
            email: true,
        },
        password: {
            required: true,
            minlength: 6,
            maxlength: 50,
        }
    }
})

$("#login").click(function () {
    if ($("#formulario").valid() == false) {
        return;
    }
    let email = $("#email").val()
    let password = $("#password").val()
})// fin validaciones

//// Loguearse 
function traerUsuarios() {
    var email = $("#email").val();
    var password = $("#password").val();

    $.ajax({
        url: "http://129.151.120.50:8088/api/user/" + email,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            if (response == true) {
                $.ajax({
                    url: "http://129.151.120.50:8088/api/user/" + email + "/" + password,
                    type: "GET",
                    datatype: "JSON",
                    success: function (response) {
                        console.log(response)
                        if (response.name != 'NO DEFINIDO') {
                            swal.fire({
                                title: "Bienvenido " + response.name,
                                text: "Validación Correcta",
                                icon: "success",
                                showConfirmButton: false,
                                allowOutsideClick: true,
                                timer: 5000,
                                timerProgressBar: true
                            });
                        } else {
                            swal.fire({
                                title: "La combinación usuario/contraseña es incorrecta",
                                text: "Valide por favor",
                                icon: "error",
                                showConfirmButton: true,
                                confirmButtonColor: "#242729",
                                confirmButtonText: "Aceptar",
                                footer: "<a href='registrar.html'>o de clic aquí para registrarse</a>"
                            });
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        swal.fire("Error en la aplicacion, comuniquese con el administrador del sistema","Validación Incorrecta","error");
                    }
                });
            } else {
                swal.fire({
                    title: "El usuario no existe en el sistema",
                    text: "Valide por favor",
                    icon: "error",
                    showConfirmButton: true,
                    confirmButtonColor: "#242729",
                    confirmButtonText: "Aceptar",
                    footer: "<a href='registrar.html'>o de clic aquí para registrarse</a>"
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            swal.fire("Error en la aplicacion, comuniquese con el administrador del sistema","Validación Incorrecta","error");
        }
    });
}//// fin Loguearse