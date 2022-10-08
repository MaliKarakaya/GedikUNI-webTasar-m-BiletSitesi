/*
 |  tail.datetime - A vanilla JavaScript DateTime Picker without dependencies!
 |  @file       ./langs/tail.datetime-pt_BR.js
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
    datetime.strings.register("pt_BR", {
        months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        days:   ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        shorts: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        time:   ["Horas", "Minutos", "Segundos"],
        header: ["Escolha um mês", "Escolha um ano", "Escolha uma década", "Escolha um horário"]
    });
    return datetime;
}));
