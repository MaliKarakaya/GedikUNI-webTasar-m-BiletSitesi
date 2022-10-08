/*
 |  tail.datetime - A vanilla JavaScript DateTime Picker without dependencies!
 |  @file       ./langs/tail.datetime-es.js
 |  @author     SamBrishes <sam@pytes.net>
 |  @version    0.4.3 - Beta
 |
 |  @website    https://github.com/pytesNET/tail.DateTime
 |  @license    X11 / MIT License
 |  @copyright  Copyright © 2018 SamBrishes, pytesNET <info@pytes.net>
 */
;(function(factory){
   if(typeof(define) == "function" && define.amd){
       define(function(){
           return function(datetime){ factory(datetime); };
       });
   } else {
       if(typeof(window.tail) != "undefined" && window.tail.DateTime){
           factory(window.tail.DateTime);
       }
   }
}(function(datetime){
    datetime.strings.register("es", {
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayıso", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        days:   ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        shorts: ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"],
        time:   ["Horas", "Minutos", "Segundos"],
        header: ["Selecciona un mes", "Seleccione un año", "Seleccione un década", "Seleccione una hora"]
    });
    return datetime;
}));
