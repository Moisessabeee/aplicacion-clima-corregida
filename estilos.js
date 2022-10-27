// funciones en css para activar y desactivar barra desplegable
let btn_buscar = document.getElementById("btn_buscar");
let btn_exit = document.getElementById("btn_exit");
let header_contenedor = document.getElementById("header_contenedor");
let s_desactivar = document.getElementById("s_desactivar");

btn_exit.addEventListener("click",ocultar_b_header)
btn_buscar.addEventListener("click",ocultar_b_header)

function ocultar_b_header (){
    header_contenedor.classList.toggle("s_h_desactivar");//se agregra la clase que elimina header display none
    s_desactivar.classList.toggle("s_b_des_desactivar");//desactiva la clase indicada y muestra la seccion buscar ciudades 
}

//buscar ciudades
const API_KEY =`7205bc9eca60638f705580a0be22db28`;
const form_submit = document.getElementById("form_submit");

form_submit.addEventListener("submit",(prevenirsalto)=>{
    let escribir_ciudad = document.getElementById("escribir_ciudad").value;
    inf_tarj_principal(escribir_ciudad);
    informacion_tarjestas_5(escribir_ciudad);
    prevenirsalto.preventDefault()
    form_submit.reset()
})

function inf_tarj_principal (n_ciudad){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${n_ciudad}&appid=${API_KEY}&units=metric`)
    .then(informacion_API => informacion_API.json())
    .then(buscar_inf_api =>{
        buscarDatos_TP(buscar_inf_api);
    })
}

//funcion para tarjeta principal de informacioon 
function buscarDatos_TP(buscar) {
    let img_clima = document.getElementById("img_clima");
    img_clima.innerHTML = `<img src="./imagenes/${imagenClima(buscar.weather[0].id)}.png" alt="${buscar.weather[0].main}">`;
    let temperatura = document.getElementById("temperatura");
    temperatura.innerHTML = Math.round(buscar.main.temp);
    let estado_dia = document.getElementById("estado_dia");
    estado_dia.innerHTML = buscar.weather[0].description;
    let informacion_dia = document.getElementById("informacion_dia");
    informacion_dia.innerHTML = fechaCompleta(fecha_actual)
    let ciudad = document.getElementById("ciudad");
    ciudad.innerHTML = buscar.name;

    let v_mph = document.getElementById("v_mph")
    v_mph.innerHTML =Math.round(buscar.wind.speed);
    let S_hummedad = document.getElementById("S_hummedad");
    S_hummedad.innerHTML = buscar.main.humidity;
    let visibilidad = document.getElementById("visibilidad");
    visibilidad.innerHTML = parseInt(buscar.visibility) / 1000;
    let pres_ad = document.getElementById("pres_ad");
    pres_ad.innerHTML = buscar.main.pressure;

    barrahumedad(buscar.main.humidity)
    informacion_tarjestas_5(buscar.name)
}
// evento mouse ubicacion actual 
const buscar_mi_ubicacion = document.querySelector("#btn_1")
buscar_mi_ubicacion.addEventListener("click", ()=>{
    navigator.geolocation.getCurrentPosition(mi_Ubicacion);
})
function mi_Ubicacion(posicion){
  const {latitude,longitude} = posicion.coords;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
  .then(informacion => informacion.json())
  .then(bus_info =>{
    buscarDatos_TP(bus_info)
    
  })
}
// ilustrar la barra de humedad de color amarillo 
function barrahumedad (color){
  let caja2 = document.getElementById("caja2")
  caja2.style.backgroundColor = "yellow";
  caja2.style.width = `${color}%`;
}
//funcion para cambiar las imagenes de los climas 
function imagenClima (informacion_clima_imagen){
  let comparacion_de_imagen = informacion_clima_imagen
  const Thunderstorm =  [200,201,202,210,211,212,221,230,231,232];
  const LightCloud = [801,802];
  const Clear = [800];
  const Niebla = [701,711,721,731,741,751,"56s",762,771,781];
  const Snow = [600,601,602];
  const Sleet = [611,612,613,615,616,620,621,622];
  const n10 = [500,501,502,503,504];
  const Hail = [511];
  const HeavyRain = [520,521,522,531];
  const Shower = [300,301,302,310,311,312,313,314,321];
  const HeavyCloud = [803,804];
  if (Thunderstorm.includes(comparacion_de_imagen)) {
      return "Thunderstorm" 

  } else if (LightCloud.includes(comparacion_de_imagen)){
      return "LightCloud"

  } else if (Clear.includes(comparacion_de_imagen)) {
      return "Clear"

  } else if (Niebla.includes(comparacion_de_imagen)) {
      return "Niebla"

  } else if (Snow.includes(comparacion_de_imagen)) {
      return "Snow"

  } else if (Sleet.includes(comparacion_de_imagen)) {
      return "Sleet"

  } else if (n10.includes(comparacion_de_imagen)) {
      return "10n"

  } else if (Hail.includes(comparacion_de_imagen)) {
      return "Hail"

  } else if (HeavyRain.includes(comparacion_de_imagen)) {
      return "HeavyRain"

  } else if (Shower.includes(comparacion_de_imagen)) {
      return "Shower"

  } else if (HeavyCloud.includes(comparacion_de_imagen)) {
      return "HeavyCloud" 

  } else {
      return "none"
  }
}
//funcion para buscar las fechas 
let fecha_actual = new Date()
function fechaCompleta (buscar_fecha){
  const dia_semana = ["Sun.","Mon.","Tue.","Wed.","Thu.","Fri.","Sat."];
  const mes_año = ["Jan.","Feb.","Mar.","Apr.","May.","May.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."];
  
  let fecha = new Date(`${buscar_fecha}`);
  let mostrar_dia_semana = dia_semana[fecha.getDay()];
  let mostrar_mes_año = mes_año[fecha.getMonth()];
  let dia_de_mes = fecha.getDate();
  return `${mostrar_dia_semana} ${dia_de_mes} ${mostrar_mes_año}`
  }

  function selecion_ciudad (){
    let seleccion_city = document.getElementById("seleccion_city").value;
    inf_tarj_principal(seleccion_city)
  }

function informacion_tarjestas_5 (buscar_ciudad){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${buscar_ciudad}&appid=${API_KEY}&units=metric`)
    .then(inf_tarjetas_5 => inf_tarjetas_5.json())
    .then(buscar_inf_t5 =>{
        const dia_1 = [0,1,2,3,4,5,6,7]
        const dia_2 = [8,9,10,11,12,13,14,15]
        const dia_3 = [16,17,18,19,20,21,22,22]
        const dia_4 = [24,25,26,27,28,29,30,31]
        const dia_5 = [32,33,34,34,36,37,38,39]
        dia_1.forEach(Element => {
            inf_temp_max.push(buscar_inf_t5.list[Element].main.temp_max);
            inf_temp_min.push(buscar_inf_t5.list[Element].main.temp_min);
        })
        dia_2.forEach(Element => {
            inf_temp_max_d2.push(buscar_inf_t5.list[Element].main.temp_max);
            inf_temp_min_d2.push(buscar_inf_t5.list[Element].main.temp_min);
        })
        dia_3.forEach(Element => {
            inf_temp_max_d3.push(buscar_inf_t5.list[Element].main.temp_max);
            inf_temp_min_d3.push(buscar_inf_t5.list[Element].main.temp_min);
        })
        dia_4.forEach(Element => {
            inf_temp_max_d4.push(buscar_inf_t5.list[Element].main.temp_max);
            inf_temp_min_d4.push(buscar_inf_t5.list[Element].main.temp_min);
        })
        dia_5.forEach(Element => {
            inf_temp_max_d5.push(buscar_inf_t5.list[Element].main.temp_max);
            inf_temp_min_d5.push(buscar_inf_t5.list[Element].main.temp_min);
        })
        tarjeta_1(buscar_inf_t5);
        tarjeta_2(buscar_inf_t5);
        tarjeta_3(buscar_inf_t5);
        tarjeta_4(buscar_inf_t5);
        tarjeta_5(buscar_inf_t5);

        console.log(buscar_inf_t5)
    })
}

const inf_temp_max = []
const inf_temp_min = []

const inf_temp_max_d2 = []
const inf_temp_min_d2 = []

const inf_temp_max_d3 = []
const inf_temp_min_d3 = []

const inf_temp_max_d4 = []
const inf_temp_min_d4 = []

const inf_temp_max_d5 = []
const inf_temp_min_d5 = []

function tarjeta_1 (ingresar){
    let img_t1 = document.getElementById("img_t1");
    img_t1.innerHTML = `<img src="./imagenes/${imagenClima(ingresar.list[7].weather[0].id)}.png">`
    let temp_max_t_1 = document.getElementById("temp_max_t_1");
    temp_max_t_1.innerHTML = Math.round(Math.max.apply(null,inf_temp_max))
    let temp_min_t_1 = document.getElementById("temp_min_t_1");
    temp_min_t_1.innerHTML = Math.round(Math.min.apply(null,inf_temp_min))
   inf_temp_max.length = 0;
   inf_temp_min.length = 0;
}
function tarjeta_2 (ingresar){
    let fecha_t2 = document.getElementById("fecha_t2");
    fecha_t2.innerHTML = fechaCompleta(ingresar.list[15].dt_txt)
    let img_t2 = document.getElementById("img_t2");
    img_t2.innerHTML = `<img src="./imagenes/${imagenClima(ingresar.list[15].weather[0].id)}.png">`
    let temp_max_t_2 = document.getElementById("temp_max_t_2");
    temp_max_t_2.innerHTML = Math.round(Math.max.apply(null,inf_temp_max_d2))
    let temp_min_t_2 = document.getElementById("temp_min_t_2");
    temp_min_t_2.innerHTML = Math.round(Math.min.apply(null,inf_temp_min_d2))
   inf_temp_max_d2.length = 0;
   inf_temp_min_d2.length = 0;

}
function tarjeta_3 (ingresar){
    let fecha_t3 = document.getElementById("fecha_t3");
    fecha_t3.innerHTML = fechaCompleta(ingresar.list[22].dt_txt)
    let img_t3 = document.getElementById("img_t3");
    img_t3.innerHTML = `<img src="./imagenes/${imagenClima(ingresar.list[22].weather[0].id)}.png">`
    let temp_max_t_3 = document.getElementById("temp_max_t_3");
    temp_max_t_3.innerHTML = Math.round(Math.max.apply(null,inf_temp_max_d3))
    let temp_min_t_3 = document.getElementById("temp_min_t_3");
    temp_min_t_3.innerHTML = Math.round(Math.min.apply(null,inf_temp_min_d3))
   inf_temp_max_d3.length = 0;
   inf_temp_min_d3.length = 0;
}
function tarjeta_4 (ingresar){
    let fecha_t4 = document.getElementById("fecha_t4");
    fecha_t4.innerHTML = fechaCompleta(ingresar.list[31].dt_txt)
    let img_t4 = document.getElementById("img_t4");
    img_t4.innerHTML = `<img src="./imagenes/${imagenClima(ingresar.list[31].weather[0].id)}.png">`
    let temp_max_t_4 = document.getElementById("temp_max_t_4");
    temp_max_t_4.innerHTML = Math.round(Math.max.apply(null,inf_temp_max_d4))
    let temp_min_t_4 = document.getElementById("temp_min_t_4");
    temp_min_t_4.innerHTML = Math.round(Math.min.apply(null,inf_temp_min_d4))
   inf_temp_max_d4.length = 0;
   inf_temp_min_d4.length = 0;
}
function tarjeta_5 (ingresar){
    let fecha_t5 = document.getElementById("fecha_t5");
    fecha_t5.innerHTML = fechaCompleta(ingresar.list[39].dt_txt)
    let img_t5 = document.getElementById("img_t5");
    img_t5.innerHTML = `<img src="./imagenes/${imagenClima(ingresar.list[39].weather[0].id)}.png">`
    let temp_max_t_5 = document.getElementById("temp_max_t_5");
    temp_max_t_5.innerHTML = Math.round(Math.max.apply(null,inf_temp_max_d5))
    let temp_min_t_5 = document.getElementById("temp_min_t_5");
    temp_min_t_5.innerHTML = Math.round(Math.min.apply(null,inf_temp_min_d5))
   inf_temp_max_d5.length = 0;
   inf_temp_min_d5.length = 0;
}

  inf_tarj_principal("japon")
