const clave_api = "be1be44293de79e50ecf86a8c1cb6266";
const dias_op = [0,8,16,24,32,39];
const guardar_informacion_dia = [];
const guardar_informacion_estado_clima = [];
const guardar_informacion_img_clima = [];
const guardar_informacion_temperatura = [];
const guardar_informacion_estado_viento = [];
const guardar_informacion_humedad = [];
const guardar_informacion_temp_max = [];
const guardar_informacion_temp_min = [];
const guardar_informacion_presion = [];
const guardar_informacion_visibilidad = [];

// var guardar_informacion_dia = [];
// var guardar_informacion_estado_clima = [];
// var guardar_informacion_img_clima = [];
// var guardar_informacion_temperatura = [];
// var guardar_informacion_estado_viento = [];
// var guardar_informacion_humedad = [];
// var guardar_informacion_temp_max = [];
// var guardar_informacion_temp_min = [];
// var guardar_informacion_presion = [];
// var guardar_informacion_visibilidad = [];

// evento mouse ubicacion actual 
const buscar_mi_ubicacion = document.querySelector("#btn_1")
buscar_mi_ubicacion.addEventListener("click", ()=>{
    navigator.geolocation.getCurrentPosition(mi_Ubicacion);
})

//busca e imprime la ubicacion actual
function mi_Ubicacion (position){
    const {latitude,longitude} = position.coords;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${clave_api}`)
    .then(informacion_api => informacion_api.json())
    .then(buscar_informacion =>{
        //iterar dias para guardar informacion 
        console.log(buscar_informacion)
        dias_op.forEach(dyas =>{
            informacion_todo(buscar_informacion,dyas)
        })
// tarjeta principal informacion 
    let m_img_cli = imagenClima(guardar_informacion_img_clima[0]);
    let m_temp = kelvin_A_celcuius(guardar_informacion_temperatura[0]);
    let m_es_dia = guardar_informacion_estado_clima[0];
    let m_fecha = fechaCompleta(guardar_informacion_dia[0])
    let m_ciudad = buscar_informacion.city.name;
    let m_mph = guardar_informacion_estado_viento[0];
    let m_humedad = guardar_informacion_humedad[0];
    let m_viss = km_a_millas(guardar_informacion_visibilidad[0]);
    let m_press = guardar_informacion_presion[0];
    tarjeta_principal(m_img_cli,m_temp,m_es_dia,m_fecha,m_ciudad,m_mph,m_humedad,m_viss,m_press)
// tarjeta 1 informacion
    let m_img_t1 = imagenClima(guardar_informacion_img_clima[1]);
    let m_tmx_t1 = kelvin_A_celcuius(guardar_informacion_temp_max[1]);
    let m_tmn_t1 = kelvin_A_celcuius(guardar_informacion_temp_min[1]);
    tarjeta_1(m_img_t1,m_tmx_t1,m_tmn_t1);
// tarjeta 2 informacion 
    let m_ft2 = fechaCompleta(guardar_informacion_dia[2]);
    let m_imgt2 = imagenClima(guardar_informacion_img_clima[2]);
    let m_tmx_t2 = kelvin_A_celcuius(guardar_informacion_temp_max[2]);
    let m_tmn_t2 = kelvin_A_celcuius(guardar_informacion_temp_min[2]);
    tarjeta_2(m_ft2,m_imgt2,m_tmx_t2,m_tmx_t2);
// tarjeta 3 informacion 
    let m_ft3 = fechaCompleta(guardar_informacion_dia[3]);
    let m_imgt3 = imagenClima(guardar_informacion_img_clima[3]);
    let m_tmx_t3 = kelvin_A_celcuius(guardar_informacion_temp_max[3]);
    let m_tmn_t3 = kelvin_A_celcuius(guardar_informacion_temp_min[3]);
    tarjeta_3(m_ft3,m_imgt3,m_tmx_t3,m_tmx_t3);
// tarjeta 4 informacion 
    let m_ft4 = fechaCompleta(guardar_informacion_dia[4]);
    let m_imgt4 = imagenClima(guardar_informacion_img_clima[4]);
    let m_tmx_t4 = kelvin_A_celcuius(guardar_informacion_temp_max[4]);
    let m_tmn_t4 = kelvin_A_celcuius(guardar_informacion_temp_min[4]);
    tarjeta_4(m_ft4,m_imgt4,m_tmx_t4,m_tmx_t4);
// tarjeta 5 informacion 
    let m_ft5 = fechaCompleta(guardar_informacion_dia[5]);
    let m_imgt5 = imagenClima(guardar_informacion_img_clima[5]);
    let m_tmx_t5 = kelvin_A_celcuius(guardar_informacion_temp_max[5]);
    let m_tmn_t5 = kelvin_A_celcuius(guardar_informacion_temp_min[5]);
    tarjeta_5(m_ft5,m_imgt5,m_tmx_t5,m_tmx_t5); 
    // reset de informacion 
    guardar_informacion_dia.length = 0;
    guardar_informacion_estado_clima.length = 0;
    guardar_informacion_img_clima.length = 0;
    guardar_informacion_temperatura.length = 0;
    guardar_informacion_estado_viento.length = 0;
    guardar_informacion_humedad.length = 0;
    guardar_informacion_temp_max.length = 0;
    guardar_informacion_temp_min.length = 0;
    guardar_informacion_presion.length = 0;
    guardar_informacion_visibilidad.length = 0;

    })
}
//evento buscar ciudades 
const buscar_city = document.querySelector("#bton")
buscar_city.addEventListener("click",guardar_dato_ciudad)

function guardar_dato_ciudad (eventos){
    eventos.preventDefault();
    let buscar_ciudades = document.getElementById("inpu_text").value;
    city_funcion(buscar_ciudades)
}

// imprime la informacion de las ciudades seleccionadas 
function city_funcion (ciudades){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${ciudades}&appid=${clave_api}`)
    .then(respuesta_api => respuesta_api.json())
    .then(API_respuesta =>{
        let informacion_ciudad = API_respuesta.city.name;

        dias_op.forEach(dyas =>{
            informacion_todo(API_respuesta,dyas);

        })
    // tarjeta principal informacion 
    let m_img_cli = imagenClima(guardar_informacion_img_clima[0]);
    let m_temp = kelvin_A_celcuius(guardar_informacion_temperatura[0]);
    let m_es_dia = guardar_informacion_estado_clima[0];
    let m_fecha = fechaCompleta(guardar_informacion_dia[0])
    let m_ciudad = informacion_ciudad;
    let m_mph = guardar_informacion_estado_viento[0];
    let m_humedad = guardar_informacion_humedad[0];
    let m_viss = km_a_millas(guardar_informacion_visibilidad[0]);
    let m_press = guardar_informacion_presion[0];
    tarjeta_principal(m_img_cli,m_temp,m_es_dia,m_fecha,m_ciudad,m_mph,m_humedad,m_viss,m_press)
    // tarjeta 1 informacion
    let m_img_t1 = imagenClima(guardar_informacion_img_clima[1]);
    let m_tmx_t1 = kelvin_A_celcuius(guardar_informacion_temp_max[1]);
    let m_tmn_t1 = kelvin_A_celcuius(guardar_informacion_temp_min[1]);
    tarjeta_1(m_img_t1,m_tmx_t1,m_tmn_t1);
    // tarjeta 2 informacion 
    let m_ft2 = fechaCompleta(guardar_informacion_dia[2]);
    let m_imgt2 = imagenClima(guardar_informacion_img_clima[2]);
    let m_tmx_t2 = kelvin_A_celcuius(guardar_informacion_temp_max[2]);
    let m_tmn_t2 = kelvin_A_celcuius(guardar_informacion_temp_min[2]);
    tarjeta_2(m_ft2,m_imgt2,m_tmx_t2,m_tmx_t2);
    // tarjeta 3 informacion 
    let m_ft3 = fechaCompleta(guardar_informacion_dia[3]);
    let m_imgt3 = imagenClima(guardar_informacion_img_clima[3]);
    let m_tmx_t3 = kelvin_A_celcuius(guardar_informacion_temp_max[3]);
    let m_tmn_t3 = kelvin_A_celcuius(guardar_informacion_temp_min[3]);
    tarjeta_3(m_ft3,m_imgt3,m_tmx_t3,m_tmx_t3);
    // tarjeta 4 informacion 
    let m_ft4 = fechaCompleta(guardar_informacion_dia[4]);
    let m_imgt4 = imagenClima(guardar_informacion_img_clima[4]);
    let m_tmx_t4 = kelvin_A_celcuius(guardar_informacion_temp_max[4]);
    let m_tmn_t4 = kelvin_A_celcuius(guardar_informacion_temp_min[4]);
    tarjeta_4(m_ft4,m_imgt4,m_tmx_t4,m_tmx_t4);
    // tarjeta 5 informacion 
    let m_ft5 = fechaCompleta(guardar_informacion_dia[5]);
    let m_imgt5 = imagenClima(guardar_informacion_img_clima[5]);
    let m_tmx_t5 = kelvin_A_celcuius(guardar_informacion_temp_max[5]);
    let m_tmn_t5 = kelvin_A_celcuius(guardar_informacion_temp_min[5]);
    tarjeta_5(m_ft5,m_imgt5,m_tmx_t5,m_tmx_t5); 
        // reset de la informacion 
    guardar_informacion_dia.length = 0;
    guardar_informacion_estado_clima.length = 0;
    guardar_informacion_img_clima.length = 0;
    guardar_informacion_temperatura.length = 0;
    guardar_informacion_estado_viento.length = 0;
    guardar_informacion_humedad.length = 0;
    guardar_informacion_temp_max.length = 0;
    guardar_informacion_temp_min.length = 0;
    guardar_informacion_presion.length = 0;
    guardar_informacion_visibilidad.length = 0;
    })
}
//buscar dias 
function fechaCompleta (buscar_dias){

const dia_semana = ["Sun.","Mon.","Tue.","Wed.","Thu.","Fri.","Sat."];
const mes_año = ["Jan.","Feb.","Mar.","Apr.","May.","May.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."];

let fecha = new Date(`${buscar_dias}`);
let mostrar_dia_semana = dia_semana[fecha.getDay()];
let mostrar_mes_año = mes_año[fecha.getMonth()];
let dia_de_mes = fecha.getDate();
return `${mostrar_dia_semana} ${dia_de_mes} ${mostrar_mes_año}`
}
// imagen de los climas por semana 
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

// esta funcion guarda todos los datos en variables 
function informacion_todo(dat_informacion,dato_dias){

let informacion_dia = dat_informacion.list[dato_dias].dt_txt;
guardar_informacion_dia.push(informacion_dia)

let informacion_estado_clima = dat_informacion.list[dato_dias].weather[0].description;
guardar_informacion_estado_clima.push(informacion_estado_clima)

let informacion_img_clima = dat_informacion.list[dato_dias].weather[0].id;
guardar_informacion_img_clima.push(informacion_img_clima)

let informacion_temperatura = dat_informacion.list[dato_dias].main.temp;
guardar_informacion_temperatura.push(informacion_temperatura)

let informacion_estado_viento = dat_informacion.list[dato_dias].wind.speed;
guardar_informacion_estado_viento.push(informacion_estado_viento)

let informacion_humedad = dat_informacion.list[dato_dias].main.humidity;
guardar_informacion_humedad.push(informacion_humedad)

let informacion_presion = dat_informacion.list[dato_dias].main.pressure;
guardar_informacion_presion.push(informacion_presion)

let informacion_visibilidad = dat_informacion.list[dato_dias].visibility;
guardar_informacion_visibilidad.push(informacion_visibilidad)

// informacion que esta en las tarjetas pequeñas
let informacion_temp_max = dat_informacion.list[dato_dias].main.temp_max;
guardar_informacion_temp_max.push(informacion_temp_max)

let informacion_temp_min = dat_informacion.list[dato_dias].main.temp_min;
guardar_informacion_temp_min.push(informacion_temp_min)

}

//tarjeta principal 
function tarjeta_principal (im,tem,s_d,di,ciu,v_mp,hum,vis,ad){
    let img_clima = document.getElementById("img_clima");
    img_clima.innerHTML = `<img src="./imagenes/${im}.png">`

    let temperatura = document.getElementById("temperatura");
    temperatura.innerHTML = tem;

    let estado_dia = document.getElementById("estado_dia");
    estado_dia.innerHTML = s_d;

    let informacion_dia = document.getElementById("informacion_dia");
    informacion_dia.innerHTML = di;

    let ciudad = document.getElementById("ciudad")
    ciudad.innerHTML = ciu;
    // las tarjetas finales con los datos del viento, presion admosferica,visibilidad,humedad
    let v_mph = document.getElementById("v_mph");
    v_mph.innerHTML = v_mp;

    let S_hummedad = document.getElementById("S_hummedad");
    S_hummedad.innerHTML = hum;

    let visibilidad = document.getElementById("visibilidad");
    visibilidad.innerHTML = vis;
    
    let pres_ad = document.getElementById("pres_ad")
    pres_ad.innerHTML = ad
}
// tarjeta 1 //////////////////////////////////////////////////////////
function tarjeta_1 (img,tmx1,tmn1){
    let img_t1 = document.getElementById("img_t1");
    img_t1.innerHTML = `<img src="./imagenes/${img}.png">`;

    let temp_max_t1 = document.getElementById("temp_max_t_1");
    temp_max_t1.innerHTML = tmx1;

    let temp_min_t1 = document.getElementById("temp_min_t_1");
    temp_min_t1.innerHTML = tmn1;
}
// tarjeta 2 //////////////////////////////////////////////////////////
function tarjeta_2 (fecha_t2,imagen_t2,t_max_t2,t_min_t2){
    let fech_t2 = document.getElementById("fecha_t2");
    fech_t2.innerHTML = fecha_t2;

    let img_t2 = document.getElementById("img_t2");
    img_t2.innerHTML = `<img src="./imagenes/${imagen_t2}.png">`;

    let temp_max_t2 = document.getElementById("temp_max_t_2");
    temp_max_t2.innerHTML = t_max_t2;

    let temp_min_t2 = document.getElementById("temp_min_t_2");
    temp_min_t2.innerHTML = t_min_t2;
}
// tarjeta 3 //////////////////////////////////////////////////////////
function tarjeta_3 (fecha_t3,imagen_t3,t_max_t3,t_min_t3){
    let fech_t3 = document.getElementById("fecha_t3");
    fech_t3.innerHTML = fecha_t3;

    let img_t3 = document.getElementById("img_t3");
    img_t3.innerHTML = `<img src="./imagenes/${imagen_t3}.png">`;

    let temp_max_t3 = document.getElementById("temp_max_t_3");
    temp_max_t3.innerHTML = t_max_t3;

    let temp_min_t3 = document.getElementById("temp_min_t_3");
    temp_min_t3.innerHTML = t_min_t3;
}
// tarjeta 4 //////////////////////////////////////////////////////////
function tarjeta_4 (fecha_t4,imagen_t4,t_max_t4,t_min_t4){
    let fech_t4 = document.getElementById("fecha_t4");
    fech_t4.innerHTML = fecha_t4;

    let img_t3 = document.getElementById("img_t4");
    img_t4.innerHTML = `<img src="./imagenes/${imagen_t4}.png">`;

    let temp_max_t4 = document.getElementById("temp_max_t_4");
    temp_max_t4.innerHTML = t_max_t4;

    let temp_min_t4 = document.getElementById("temp_min_t_4");
    temp_min_t4.innerHTML = t_min_t4;
}
// tarjeta 5 //////////////////////////////////////////////////////////
function tarjeta_5 (fecha_t5,imagen_t5,t_max_t5,t_min_t5){
    let fech_t5 = document.getElementById("fecha_t5");
    fech_t5.innerHTML = fecha_t5;

    let img_t5 = document.getElementById("img_t5");
    img_t5.innerHTML = `<img src="./imagenes/${imagen_t5}.png">`;

    let temp_max_t5 = document.getElementById("temp_max_t_5");
    temp_max_t5.innerHTML = t_max_t5;

    let temp_min_t5 = document.getElementById("temp_min_t_5");
    temp_min_t5.innerHTML = t_min_t5;
}

// funcion transformar de kelvian a grados
function kelvin_A_celcuius (grados_kelvin){
    let grados_celcius = parseFloat(grados_kelvin) - 273;
    grados_celcius = Math.round(grados_celcius)
    return grados_celcius
}

function km_a_millas (kilometros){
    let millas = parseFloat(kilometros) * 0.62137;
    millas = Math.round(millas);
    return millas
}

city_funcion("india")