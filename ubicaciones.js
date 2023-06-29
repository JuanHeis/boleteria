// Version: 1.0
const querystring = window.location.search;
const params = new URLSearchParams(querystring);
const funcion = params.get("id");
console.log(funcion);
var no_login = document.cookie;
(new CookieManager(this).userID == 0).ToString().ToLower();
var ubicaciones = [];
var cont = 0;

document.addEventListener("DOMContentLoaded", function () {
  RequestUbicaciones();
});

function LoadEvents() {
  let seats = document.querySelectorAll(".seat[x][y]");

  seats.forEach(function (seat) {
    seat.addEventListener("click", function () {
      let ubicacion = ubicaciones.find(
        (u) => u.x == seat.getAttribute("x") && u.y == seat.getAttribute("y")
      );

      if (!ubicacion || no_login) return;

      //update .contenido element inside element
      this.innerHTML = "<i class='fas fa-circle-notch spinning'></i>";

      if (ubicacion.seleccionado) {
        CancelarReserva(ubicacion.x, ubicacion.y);
      } else {
        ReservarUbicacion(ubicacion.x, ubicacion.y);
      }
    });
  });
}

function LoadSeats(ubicaciones) {
  ubicaciones.forEach(function (ubicacion) {
    let element = $(".seat[x='" + ubicacion.x + "'][y='" + ubicacion.y + "']");
    let estado = "";
    if (ubicacion.reservado) estado = "seat--booked";
    if (ubicacion.seleccionado) estado = "seat--selected";
    if (ubicacion.ocupado) estado = "seat--purchased";

    //remove 'seat--booked', 'seat--selected', 'seat--purchased', 'seat--purchased-by-user' classes from element
    element.removeClass(
      "seat--booked seat--selected seat--purchased seat--purchased-by-user"
    );
    element.addClass(estado);
    element.attr("id", "ubi" + ubicacion.id);
    element.empty();

    if (no_login) {
      element.attr("data-toggle", "modal");
      element.attr("data-target", "#modalInicarCarrito");
    }

    switch (estado) {
      case "seat--purchased":
        element.append("<i class='fa fa-user'></i>");
        break;
      case "seat--booked":
        element.append("<i class='fas fa-cart-arrow-down'></i>");
        break;
      default:
        element.append(ubicacion.text);
        break;
    }
  });
}

function RequestUbicaciones() {
//   $.ajax({
//     url: "../servicios/UbicacionesService.asmx/Ubicaciones",
//     type: "POST",
//     contentType: "application/json",
//     data: JSON.stringify({ id: funcion, pv: false }),
//     success: function (data) {
//       console.log(data);
//       ubicaciones = data.d.product;
//       LoadEvents();
//       LoadSeats(ubicaciones);
//     },
//     error: function (data) {
//       console.log(data);
//     },
//   });

  axios
    .post(
      "http://desa.boleteriadigital.com.ar/servicios/UbicacionesService.asmx/Ubicaciones",
      { id: funcion, pv: false }
    )
    .then((data) => {
      console.log(data);
      ubicaciones = data.d.product;
      LoadEvents();
      LoadSeats(ubicaciones);
    })
    .error((data) => {
      console.log(data);
    });
}

function ReservarUbicacion(x, y) {
  $.ajax({
    url: "../servicios/UbicacionesService.asmx/Reservar",
    type: "POST",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({ x: x, y: y, id: funcion, pv: false }),
    success: function (data) {
      console.log(data.d);
      ubicaciones = data.d.product;
      LoadSeats(ubicaciones);
      if (data.d.statusCode !== 200)
        printAlert({
          tipo: "alert-info",
          primerMensaje: "",
          segundoMensaje: data.d.mensaje,
        });
    },
    error: function (data) {
      console.log(data);
    },
  });
}

function CancelarReserva(x, y) {
  $.ajax({
    url: "../servicios/UbicacionesService.asmx/CancelarReserva",
    type: "POST",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({ x: x, y: y, id: funcion, pv: false }),
    success: function (data) {
      console.log(data.d);
      ubicaciones = data.d.product;
      LoadSeats(ubicaciones);
      if (data.d.statusCode !== 200)
        printAlert({
          tipo: "alert-info",
          primerMensaje: "",
          segundoMensaje: data.d.mensaje,
        });
    },
    error: function (data) {
      console.log(data);
    },
  });
}
