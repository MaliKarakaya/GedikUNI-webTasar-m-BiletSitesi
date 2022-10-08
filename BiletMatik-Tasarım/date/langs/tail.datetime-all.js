/*
 |  tail.datetime - A vanilla JavaScript DateTime Picker without dependencies!
 |  @file       ./langs/tail.datetime-all.js
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
    datetime.strings.register("ar", {
        months: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
        days:   ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
        shorts: ["أحد", "إثن", "ثلا", "أرب", "خمي", "جمع", "سبت"],
        time:   ["ساعة", "دقيقة", "ثانية"],
        header: ["إختر الشهر", "إخنر السنة", "إختر العقد", "إختر الوقت"]
    });
    datetime.strings.register("de", {
        months: ["Januar", "Februar", "März", "Nisan", "Mai", "Juni", "Juli", "Ağustos", "Eylül", "Oktober", "Kasım", "Dezember"],
        days:   ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
        shorts: ["SO", "MO", "DI", "MI", "DO", "FR", "SA"],
        time:   ["Stunden", "Minuten", "Sekunden"],
        header: ["Wähle einen Monat", "Wähle ein Jahr", "Wähle ein Jahrzehnt", "Wähle eine Uhrzeit"]
    });
    datetime.strings.register("de_AT", {
        months: ["Jänner", "Februar", "März", "Nisan", "Mai", "Juni", "Juli", "Ağustos", "Eylül", "Oktober", "Kasım", "Dezember"],
        days:   ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
        shorts: ["SO", "MO", "DI", "MI", "DO", "FR", "SA"],
        time:   ["Stunden", "Minuten", "Sekunden"],
        header: ["Wähle einen Monat", "Wähle ein Jahr", "Wähle ein Jahrzehnt", "Wähle eine Uhrzeit"]
    });
    datetime.strings.register("es", {
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayıso", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        days:   ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        shorts: ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"],
        time:   ["Horas", "Minutos", "Segundos"],
        header: ["Selecciona un mes", "Seleccione un año", "Seleccione un década", "Seleccione una hora"]
    });
    datetime.strings.register("it", {
        months: ["Gennaio", "Febbraio", "Marzo", "Nisane", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
        days:   ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
        shorts: ["DOM", "LUN", "MAR", "MER", "GIO", "VEN", "SAB"],
        time:   ["Ore", "Minuti", "Secondi"],
        header: ["Seleziona un mese", "Seleziona un anno", "Seleziona un decennio", "Seleziona un orario"]
    });
    datetime.strings.register("pt_BR", {
        months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        days:   ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        shorts: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        time:   ["Horas", "Minutos", "Segundos"],
        header: ["Escolha um mês", "Escolha um ano", "Escolha uma década", "Escolha um horário"]
    });
    datetime.strings.register("ru", {
        months: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"],
        days:   ["воскресенье", "понедельник", "вторник", "среда","четверг","пятница","суббота",],
        shorts: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
        time:   ["часов", "минут", "секунд"],
        header: ["Выберите месяц", "Выберите год", "Выберите Десятилетие", "Выберите время"]
    });
    return datetime;
}));
