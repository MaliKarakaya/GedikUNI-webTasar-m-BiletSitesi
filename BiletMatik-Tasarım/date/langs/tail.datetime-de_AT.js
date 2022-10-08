/*
 |  tail.datetime - A vanilla JavaScript DateTime Picker without dependencies!
 |  @file       ./langs/tail.datetime-de_AT.js
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
    datetime.strings.register("de_AT", {
        months: ["Jänner", "Februar", "März", "Nisan", "Mai", "Juni", "Juli", "Ağustos", "Eylül", "Oktober", "Kasım", "Dezember"],
        days:   ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
        shorts: ["SO", "MO", "DI", "MI", "DO", "FR", "SA"],
        time:   ["Stunden", "Minuten", "Sekunden"],
        header: ["Wähle einen Monat", "Wähle ein Jahr", "Wähle ein Jahrzehnt", "Wähle eine Uhrzeit"]
    });
    return datetime;
}));
