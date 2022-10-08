/*
 |  tail.datetime - A vanilla JavaScript DateTime Picker without dependencies!
 |  @file       ./js/tail.datetime.js
 |  @author     SamBrishes <sam@pytes.net>
 |  @version    0.4.3 - Beta
 |
 |  @website    https://github.com/pytesNET/tail.DateTime
 |  @license    X11 / MIT License
 |  @copyright  Copyright © 2018 SamBrishes, pytesNET <info@pytes.net>
 */
;(function(factory){
    if(typeof(define) == "function" && define.amd){
        define(function(){ return factory(window); });
    } else {
        if(typeof(window.tail) == "undefined"){
            window.tail = {};
        }
        window.tail.DateTime = factory(window);
    }
}(function(root){
    "use strict";
    var w = root, d = root.document;

    // Internal Helper Methods
    function cHAS(e, name){
        return (new RegExp("\\b" + name + "\\b")).test((e.className || ""));
    }
    function cADD(e, name){
        if(!(new RegExp("\\b" + name + "\\b")).test(e.className || name)){
            e.className += " " + name;
        }
        return e;
    }
    function cREM(e, name, regex){
        if((regex = new RegExp("\\b(" + name + ")\\b")) && regex.test(e.className || "")){
            e.className = e.className.replace(regex, "");
        }
        return e;
    }
    function trigger(e, event, opt){
        if(CustomEvent && CustomEvent.name){
            var ev = new CustomEvent(event, opt);
        } else {
            var ev = d.createEvent("CustomEvent");
            ev.initCustomEvent(event, !!opt.bubbles, !!opt.cancelable, opt.detail);
        }
        return e.dispatchEvent(ev);
    }
    function clone(obj, rep){
        if(Object.assign){
            return Object.assign({}, obj, rep || {});
        }
        var clone = Object.constructor();
        for(var key in obj){
            clone[key] = (key in rep)? rep[key]: obj[key];
        }
        return clone;
    }
    function first(str){ return str.charAt(0).toUpperCase() + str.slice(1); };
    function parse(str, time, reset){
        var date = (str instanceof Date)? str: (str)? new Date(str): false;
        if(!(date instanceof Date) || isNaN(date.getDate())){
            return false;
        }
        (reset)? date.setHours(0, 0, 0, 0): date;
        return (time === true)? date.getTime(): date;
    };

    /*
     |  CONSTRUCTOR
     |  @version    0.4.0 [0.2.0]
     */
    var tailDateTime = function(el, config){
        el = (typeof(el) == "string")? d.querySelectorAll(el): el;
        if(el instanceof NodeList || el instanceof HTMLCollection || el instanceof Array){
            for(var _r = [], l = el.length, i = 0; i < l; i++){
                _r.push(new tailDateTime(el[i], config));
            }
            return (_r.length === 1)? _r[0]: ((_r.length === 0)? false: _r);
        }
        if(!(el instanceof Element)){
            return false;
        } else if(!(this instanceof tailDateTime)){
            return new tailDateTime(el, config);
        }

        // Check el
        if(tailDateTime.inst[el.getAttribute("data-tail-datetime")]){
            return tailDateTime.inst[el.getAttribute("data-tail-datetime")];
        }
        if(el.getAttribute("data-datetime")){
            var test = JSON.parse(el.getAttribute("data-datetime").replace(/\'/g, '"'));
            if(test instanceof Object){
                config = clone(config, test);
            }
        }

        // Init Instance
        this.e = el;
        this.id = ++tailDateTime.count;
        this.con = clone(tailDateTime.defaults, config);
        tailDateTime.inst["tail-" + this.id] = this;
        return this.init();
    };
    tailDateTime.version = "0.4.3";
    tailDateTime.status = "beta";
    tailDateTime.count = 0;
    tailDateTime.inst = {};

    /*
     |  STORAGE :: DEFAULT OPTIONS
     */
    tailDateTime.defaults = {
        animate: true,
        classNames: false,
        dateFormat: "YYYY-mm-dd",
        dateStart: false,
        dateRanges: [],
        dateBlacklist: true,
        dateEnd: false,
        locale: "en",
        position: "bottom",
        rtl: "auto",
        startOpen: false,
        stayOpen: false,
        timeFormat: "HH:ii:ss",
        timeHours: null,
        timeMinutes: null,
        timeSeconds: 0,
        timeStepHours: 1,
        timeStepMinutes: 5,
        timeStepSeconds: 5,
        today: true,
        tooltips: [],
        viewDefault: "days",
        viewDecades: true,
        viewYears: true,
        viewMonths: true,
        viewDays: true,
        weekStart: 0
    };

    /*
     |  STORAGE :: STRINGS
     */
    tailDateTime.strings = {
        en: {
            months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
            days:   ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
            shorts: ["PAZ", "PZT", "SAL", "ÇAR", "PER", "CUM", "CMT"],
            time:   ["Saat", "Dakika", "Saniye"],
            header: ["Bir Ay Seçiniz", "Bir Yıl Seçiniz", "Bir Onyıl Seçiniz", "Bir Zaman Seçiniz"]
        },
        modify: function(locale, id, string){
            if(!(locale in this)){
                return false;
            }
            if((id instanceof Object)){
                for(var key in id){
                    this.modify(locale, key, id[key]);
                }
            } else {
                this[locale][id] = (typeof(string) == "string")? string: this[locale][id];
            }
            return true;
        },
        register: function(locale, object){
            if(typeof(locale) != "string" || !(object instanceof Object)){
                return false;
            }
            this[locale] = object;
            return true;
        }
    };

    /*
     |  METHODS
     */
    tailDateTime.prototype = {
        /*
         |  INTERNAL :: INIT CALENDAR
         |  @version    0.4.3 [0.2.0]
         */
        init: function(){
            var self = this, temp;

            // Options
            this.__ = tailDateTime.strings[this.con.locale] || tailDateTime.strings.en;
            this.con.dateStart = parse(this.con.dateStart, true, true) || 0;
            this.con.dateEnd = parse(this.con.dateEnd, true, true) || 9999999999999;
            this.con.viewDefault = (!this.con.dateFormat)? "time": this.con.viewDefault;
            if(typeof(this.con.weekStart) == "string"){
                this.con.weekStart = tailDateTime.strings.en.shorts.indexOf(this.con.weekStart);
            }
            if(this.con.weekStart < 0 && this.con.weekStart > 6){
                this.con.weekStart = 0;
            }

            // Prepare Date Ranges
            if(this.con.dateRanges.length > 0){
                for(var r = [], e = this.con.dateRanges, l = e.length, i = 0; i < l; i++){
                    if(!(e[i] instanceof Object) || (!e[i].start && !e[i].days)){
                        continue;
                    }

                    // Prepare Dates
                    if((e[i].start = parse(e[i].start || false, true, true)) === false){
                        e[i].start = e[i].end = Infinity;
                    } else {
                        if((e[i].end = parse(e[i].end || false, true, true)) === false){
                            e[i].end = e[i].start;
                        }
                        e[i].start = (e[i].start > e[i].end)? [e[i].end, e[i].end = e[i].start][0]: e[i].start;
                    }

                    // Prepare Days
                    e[i].days = ("days" in e[i])? e[i].days: true;
                    e[i].days = (typeof(e[i].days) !== "boolean")? (function(days){
                        for(var _r = [], _l = days.length, _i = 0; _i < _l; _i++){
                            if(typeof(days[_i]) == "string"){
                                days[_i] = tailDateTime.strings.en.shorts.indexOf(days[_i]);
                            }
                            if(days[_i] >= 0 && days[_i] <= 6){ _r.push(days[_i]); }
                        }
                        return _r;
                    }((e[i].days instanceof Array)? e[i].days: [e[i].days])): [0, 1, 2, 3, 4, 5, 6];

                    // Append
                    r.push({start: e[i].start, end: e[i].end, days: e[i].days});
                }
                this.con.dateRanges = r;
            }

            // Prepare Tooltips
            if(this.con.tooltips.length > 0){
                for(var r = [], t = this.con.tooltips, l = t.length, i = 0, s, e; i < l; i++){
                    if(!(t[i] instanceof Object) || !t[i].date){
                        continue;
                    }

                    // Prepare Dates
                    if(t[i].date instanceof Array){
                        s = parse(t[i].date[0] || false, true, true);
                        e = parse(t[i].date[0] || false, true, true) || s;
                    } else {
                        s = e = parse(t[i].date || false, true, true);
                    }
                    if(!s){ continue; }

                    // Append
                    r.push({
                        date: (s !== e)? [s, e]: s,
                        text: t[i].text || "Tooltip",
                        color: t[i].color || "inherit",
                        element: t[i].element || (function(tooltip){
                            tooltip.className = "calendar-tooltip";
                            tooltip.innerHTML = '<div class="tooltip-inner">' + t[i].text || "Tooltip" + '</div>';
                            return tooltip;
                        }(d.createElement("DIV")))
                    });
                }
                this.con.tooltips = r;
            }

            // Prepare WeekDays
            var week = this.__["shorts"].slice(this.con.weekStart).concat(this.__["shorts"].slice(0, this.con.weekStart));
            this.weekdays = "<thead>\n<tr>\n";
            for(var i = 0; i < 7; i++){
                this.weekdays += '<th class="calendar-week">' + week[i] + '</th>';
            }
            this.weekdays += "\n</tr>\n</thead>"

            // Set Main Data and Render
            this.select = parse(this.e.getAttribute("data-value") || this.e.value);
            if(!this.select || this.select < this.con.dateStart || this.select > this.con.dateEnd){
                this.select = null;
            }
            if(this.view == undefined){
                this.view = {
                    type: this.con.viewDefault,
                    date: this.select || new Date()
                };
            }
            for(var l = ["Hours", "Minutes", "Seconds"], i = 0; i < 3; i++){
                if(typeof(this.con["time" + l[i]]) == "number"){
                    this.view.date["set" + l[i]](this.con["time" + l[i]]);
                }
            }
            this.events = {};
            this.dt = this.renderCalendar();

            // Hook Events
            if(this._bind == undefined){
                var e = "addEventListener";
                this.e[e]("focusin", function(event){
                    self.open.call(self);
                });
                this.e[e]("keyup", function(event){
                    self.bind.call(self, event);
                });
                d[e]("keyup", function(event){
                    if(self.dt.contains(event.target)){
                        self.bind.call(self, event);
                    }
                });
                d[e]("click", function(event){
                    if(self.dt.contains(event.target)){
                        self.bind.call(self, event);
                    } else if(!self.e.contains(event.target) && cHAS(self.dt, "calendar-open")){
                        if(event.target != self.dt && event.target != self.e && !self.con.stayOpen){
                            self.close.call(self);
                        }
                    }
                });
                d[e]("mouseover", function(event){
                    if(self.dt.contains(event.target)){
                        self.bind.call(self, event);
                    }
                });
                this._bind = true;
            }

            // Store Instance and Return
            this.e.setAttribute("data-tail-datetime", "tail-" + this.id);
            if(this.con.startOpen){
                this.open();
            }
            if(this.select){
                this.selectDate(this.select);
            }
            return this;
        },

        /*
         |  INTERNAL :: EVENT LISTENER
         |  @version    0.4.1 [0.4.0]
         */
        bind: function(event){
            var self = event.target, a = "getAttribute", d = "data-action", v = "data-view",
                elem = self[a](d)? self: self.parentElement[a](d)? self.parentElement: self;

            // Hover Events
            var t = "data-tooltip", tip;
            if(event.type == "mouseover"){
                if((tip = self[a](t)? self: elem[a](t)? elem: false) !== false){
                    if(!this.dt.querySelector("#tooltip-" + tip[a](t) + "-" + tip[a](t + "-time"))){
                        this.showTooltip(tip[a](t), tip, tip[a](t + "-time"));
                    }
                } else if(this.dt.querySelector(".calendar-tooltip:not(.remove)")){
                    this.hideTooltip(this.dt.querySelector(".calendar-tooltip").id.slice(8));
                }
            }

            // Click Events
            if(event.type == "click"){
                if(!elem || (event.buttons != 1 && (event.which || event.button) != 1)){
                    return;
                }
                if(elem.hasAttribute("data-disabled")){
                    return;
                }
                switch(elem[a](d)){
                    case "prev":    //@Fallthrough
                    case "next":
                        return this.browseView(elem[a](d));
                    case "submit":
                        return this.selectDate(this.fetchDate(parseInt(elem[a]("data-date"))));
                    case "cancel":
                        if(!this.con.stayOpen){
                            this.close();
                        }
                        break;
                    case "view":
                        this.switchDate(elem[a]("data-year") || null, elem[a]("data-month") || null, elem[a]("data-day") || null);
                        return this.switchView(elem[a](v));
                }
            }

            // KeyEvents
            if(event.type == "keyup"){
                if(event.target.tagName != "INPUT" && event.target !== this.e){
                    if(/calendar-(static|close)/i.test(this.dt.className)){
                        return false;
                    }
                }
                if((event.keyCode || event.which) == 13){ // Enter || Return
                    this.selectDate(this.fetchDate(this.select));
                    event.stopPropagation();
                    if(!this.con.stayOpen){ this.close(); }
                }
                if((event.keyCode || event.which) == 27){ // ESC
                    if(!this.con.stayOpen){ this.close(); }
                }
            }
        },

        /*
         |  INTERNAL :: EVENT TRIGGER
         |  @version    0.4.0 [0.4.0]
         */
        trigger: function(event){
            var obj = {bubbles: false, cancelable: true, detail: {args: arguments, self: this}};
            if(event == "change"){
                trigger(this.e, "input", obj);
                trigger(this.e, "change", obj);
            }
            trigger(this.dt, "tail::" + event, obj);
            for(var l = (this.events[event] || []).length, i = 0; i < l; i++){
                this.events[event][i].cb.apply(this, (function(args, a, b){
                    for(var l = a.length, i = 0; i < l; ++i){
                        args[i-1] = a[i];
                    }
                    args[i] = b;
                    return args;
                }(new Array(arguments.length), arguments, this.events[event][i].args)));
            }
            return true;
        },

        /*
         |  HELPER :: CALCULATE POSITION
         |  @version    0.4.2 [0.3.1]
         */
        calcPosition: function(){
            var a = this.dt.style, b = w.getComputedStyle(this.dt),
                x = parseInt(b.marginLeft)+parseInt(b.marginRight),
                y = parseInt(b.marginTop) +parseInt(b.marginBottom),
                p = (function(e, r){
                    r = {
                        top:    e.offsetTop    || 0, left:   e.offsetLeft   || 0,
                        width:  e.offsetWidth  || 0, height: e.offsetHeight || 0
                    };
                    while(e = e.offsetParent){ r.top  += e.offsetTop; r.left += e.offsetLeft; }
                    return r;
                })(this.e, {});

            // Set Position
            a.visibility = "hidden";
            switch(this.con.position){
                case "top":
                    var top = p.top - (this.dt.offsetHeight + y),
                        left = (p.left + (p.width / 2)) - (this.dt.offsetWidth / 2 + x / 2);
                    break;
                case "left":
                    var top = (p.top + p.height/2) - (this.dt.offsetHeight / 2 + y),
                        left = p.left - (this.dt.offsetWidth + x);
                    break;
                case "right":
                    var top = (p.top + p.height/2) - (this.dt.offsetHeight / 2 + y),
                        left = p.left + p.width;
                    break;
                default:
                    var top = p.top + p.height,
                        left = (p.left + (p.width / 2)) - (this.dt.offsetWidth / 2 + x / 2);
                    break;
            }
            a.top = ((top >= 0)? top: this.e.offsetTop) + "px";
            a.left = ((left >= 0)? left: 0) + "px";
            a.visibility = "visible";
            return this;
        },

        /*
         |  HELPER :: CONVERT DATE
         |  @version    0.4.0 [0.1.0]
         */
        convertDate: function(inDate, format){
            var dateObject = {
                H: String("00" + inDate.getHours()).toString().slice(-2),
                G: function(hours){ return (hours % 12)? hours % 12: 12; }(inDate.getHours()),
                A: inDate.getHours() >= 12? "PM": "AM",
                a: inDate.getHours() >= 12? "pm": "am",
                i: String("00" + inDate.getMinutes()).toString().slice(-2),
                s: String("00" + inDate.getSeconds()).toString().slice(-2),
                Y: inDate.getFullYear(),
                y: parseInt(inDate.getFullYear().toString().slice(2)),
                m: String("00" + (inDate.getMonth() + 1)).toString().slice(-2),
                M: this.__["months"][inDate.getMonth()].slice(0, 3),
                F: this.__["months"][inDate.getMonth()],
                d: String("00" + inDate.getDate()).toString().slice(-2),
                D: this.__["days"][inDate.getDay()],
                l: this.__["shorts"][inDate.getDay()].toLowerCase()
            };
            return format.replace(/([HGismd]{1,2}|[Y]{2,4}|y{2})/g, function(token){
                if(token.length == 4 || token.length == 2){
                    return dateObject[token.slice(-1)].toString().slice(-Math.abs(token.length));
                } else if(token.length == 1 && datePart[0] == "0"){
                    return dateObject[token.slice(-1)].toString().slice(-1)
                }
                return dateObject[token.slice(-1)].toString();
            }).replace(/(A|a|M|F|D|l)/g, function(token){ return dateObject[token]; });
        },

        /*
         |  RENDER :: CALENDAR
         |  @version    0.4.1 [0.4.0]
         */
        renderCalendar: function(){
            var _s, _c = ["tail-datetime-calendar", "calendar-close"], dt = d.createElement("DIV"),
                _t = (this.con.classNames === true)? this.e.className: this.con.classNames;

            // Configure Calendar
            if(["top", "left", "right", "bottom"].indexOf(this.con.position) < 0){
                _s = d.querySelector(this.con.position);
                _c.push("calendar-static");
            }
            if(typeof(_t) == "string" || _t instanceof Array){
                _c = _c.concat(((typeof(_t) == "string")? _t.split(" "): _t));
            }
            var rtl = ["ar", "he", "mdr", "sam", "syr"], _rt = this.con.rtl;
            if(_rt === true || (_rt === "auto" && rtl.indexOf(this.con.locale) >= 0)){
                _c.push("rtl");
            }
            if(this.con.stayOpen){
                _c.push("calendar-stay");
            }

            dt.id = "tail-datetime-" + this.id;
            dt.className = _c.join(" ");
            dt.style.cssText = (this.con.rtl)? "direction:rtl;": "direction:ltr;";

            // Render Action
            if(this.con.dateFormat){
                var _a = '<span class="action action-prev" data-action="prev"></span>'
                       + '<span class="label" data-action="view" data-view="up"></span>'
                       + '<span class="action action-next" data-action="next"></span>'
            } else if(this.con.timeFormat){
                var _a = '<span class="action action-submit" data-action="submit"></span>'
                       + '<span class="label"></span>'
                       + '<span class="action action-cancel" data-action="cancel"></span>'
            }
            if(typeof(_a) != "undefined"){
                dt.innerHTML = '<div class="calendar-actions">' + _a + '</div>';
            }

            // Render Date and Time Picker
            if(this.con.dateFormat){
                this.renderDatePicker(dt, this.con.viewDefault);
            }
            if(this.con.timeFormat){
                this.renderTimePicker(dt);
            }

            // Append Calendar
            if(_s){
                dt.style.cssText = 'position:static;visibility:visible;';
            } else {
                dt.style.cssText = 'top:0;left:0;z-index:999;position:absolute;visibility:hidden;';
            }
            (_s || document.body).appendChild(dt);
            return dt;
        },

        /*
         |  RENDER :: DATE PICKER
         |  @version    0.4.0 [0.4.0]
         */
        renderDatePicker: function(dt, view){
            if(!view || ["decades", "years", "months", "days"].indexOf(view) < 0){
                view = this.con.viewDays? "days": this.con.viewMonths? "months":
                       this.con.viewYears? "years": this.con.viewDecades? "decades": false;
            }
            if(!view || !this.con["view" + first(view)] || !this.con.dateFormat){ return false; }

            // Render View
            var content = d.createElement("DIV");
                content.className = "calendar-datepicker calendar-view-" + view;
                content.innerHTML = this["view" + first(view)]();

            // Append Element
            if(dt.querySelector(".calendar-datepicker")){
                dt.replaceChild(content, dt.querySelector(".calendar-datepicker"));
            } else {
                dt.appendChild(content);
            }
            this.view.type = view;
            return this.handleLabel(dt);
        },

        /*
         |  RENDER :: TIME PICKER
         |  @version    0.4.3 [0.4.0]
         */
        renderTimePicker: function(dt){
            if(!this.con.timeFormat){ return false; }
            var h ='<div class="timepicker-field timepicker-hours">'
                  + '<input type="number" name="dt[h]" value="" min="00" max="23" step="' + this.con.timeStepHours + '" />'
                  + '<label>' + this.__["time"][0] + '</label>'
                  + '</div>',
                m = '<div class="timepicker-field timepicker-minutes">'
                  + '<input type="number" name="dt[m]" value="" min="00" max="59" step="' + this.con.timeStepMinutes + '" />'
                  + '<label>' + this.__["time"][1] + '</label>'
                  + '</div>',
                s = '<div class="timepicker-field timepicker-seconds">'
                  + '<input type="number" name="dt[s]" value="" min="00" max="59" step="' + this.con.timeStepSeconds + '" />'
                  + '<label>' + this.__["time"][2] + '</label>'
                  + '</div>';

            // Render View
            var div = d.createElement("DIV");
            div.className = "calendar-timepicker";
            div.innerHTML = h + m + s;

            // Set Data
            var selectTime = function(event){
                var time = this.parentElement.parentElement.querySelectorAll("input");
                self.selectTime(time[0].value, time[1].value, time[2].value);
            }, self = this, inp = div.querySelectorAll("input");
            inp[0].value = this.view.date.getHours();
            inp[0].addEventListener("input", selectTime);
            inp[1].value = this.view.date.getMinutes();
            inp[1].addEventListener("input", selectTime);
            inp[2].value = this.view.date.getSeconds();
            inp[2].addEventListener("input", selectTime);

            // Append Element
            if(dt.querySelector(".calendar-timepicker")){
                dt.replaceChild(div, dt.querySelector(".calendar-timepicker"));
            } else {
                dt.appendChild(div);
            }
            return this.handleLabel(dt);
        },

        /*
         |  VIEW :: HANDLE LABEL
         |  @version    0.4.0 [0.4.0]
         */
        handleLabel: function(dt){
            var label = dt.querySelector(".label"), text, year;
            switch(this.view.type){
                case "days":
                    text = this.__["months"][this.view.date.getMonth()] + ", " + this.view.date.getFullYear(); break;
                case "months":
                    text = this.view.date.getFullYear(); break;
                case "years":
                    year = parseInt((this.view.date.getFullYear()).toString().slice(0, 3) + "0");
                    text = year + " - " + (year+10); break;
                case "decades":
                    year = parseInt((this.view.date.getFullYear()).toString().slice(0, 2) + "00");
                    text = year + " - " + (year+100); break;
            }
            label.innerText = text;
            return dt;
        },

        /*
         |  VIEW :: SHOW DECADEs
         |  @version    0.4.0 [0.4.0]
         */
        viewDecades: function(){
            var year = this.view.date.getFullYear(),
                date = new Date(this.view.date.getTime()),
                today = this.con.today? (new Date()).getYear(): 0;
                date.setFullYear(year-parseInt(year.toString()[3])-30);

            for(var c, a, t = [], r = [], i = 1; i <= 16; i++){
                c = 'calendar-decade' + (today >= date.getYear() && today <= (date.getYear()+10)? ' date-today': '');
                a = 'data-action="view" data-view="down" data-year="' + date.getFullYear() + '"';
                t.push('<td class="' + c + '" ' + a + '><span class="inner">' + date.getFullYear() + " - " + (date.getFullYear()+10) + '</span></td>');

                if(i >= 4 && i%4 == 0){
                    r.push("<tr>\n" + t.join("\n") + "\n</tr>"); t = [];
                }
                date.setFullYear(date.getFullYear() + 10);
            }
            return '<table class="calendar-decades">'
                 + '<thead><tr><th colspan="4">' + this.__["header"][2] + '</th></tr></thead>'
                 + '<tbody>' + r.join("\n") + '</tbody></table>';
        },

        /*
         |  VIEW :: SHOW YEARs
         |  @version    0.4.0 [0.4.0]
         */
        viewYears: function(){
            var year = this.view.date.getFullYear(),
                date = new Date(this.view.date.getTime()),
                today = this.con.today? (new Date()).getYear(): 0;
                date.setFullYear(year-parseInt(year.toString()[3])-2);

            for(var c, a, t = [], r = [], i = 1; i <= 16; i++){
                c = 'calendar-year' + ((date.getYear() == today)? ' date-today': '');
                a = 'data-action="view" data-view="down" data-year="' + date.getFullYear() + '"';
                t.push('<td class="' + c + '" ' + a + '><span class="inner">' + date.getFullYear() + '</span></td>');

                if(i >= 4 && i%4 == 0){
                    r.push("<tr>\n" + t.join("\n") + "\n</tr>"); t = [];
                }
                date.setFullYear(date.getFullYear() + 1);
            }
            return '<table class="calendar-years">'
                 + '<thead><tr><th colspan="4">' + this.__["header"][1] + '</th></tr></thead>'
                 + '<tbody>' + r.join("\n") + '</tbody></table>';
        },

        /*
         |  VIEW :: SHOW MONTHs
         |  @version    0.4.0 [0.4.0]
         */
        viewMonths: function(){
            var strings = this.__["months"], today = this.con.today? (new Date()).getMonth(): -1;
                today = (this.view.date.getYear() == (new Date()).getYear())? today: -1;

            for(var c, a, t = [], r = [], i = 0; i < 12; i++){
                c = 'calendar-month' + ((today == i)? ' date-today': '');
                a = 'data-action="view" data-view="down" data-month="' + i + '"';
                t.push('<td class="' + c + '" ' + a + '><span class="inner">' + strings[i] + '</span></td>');

                if(t.length == 3){
                    r.push("<tr>\n" + t.join("\n") + "\n</tr>"); t = [];
                }
            }
            return '<table class="calendar-months">'
                 + '<thead><tr><th colspan="3">' + this.__["header"][0] + '</th></tr></thead>'
                 + '<tbody>' + r.join("\n") + '</tbody></table>';
        },

        /*
         |  VIEW :: SHOW DAYs
         |  @version    0.4.1 [0.4.0]
         */
        viewDays: function(){
            var date = new Date(this.view.date.getTime()), time,
                today = new Date().toDateString(),
                month = date.getMonth(), c, a, t = [], r = [], i,
                disabled = [0, []], check, ranges = [].concat(this.con.dateRanges),
                tooltips = [].concat(this.con.tooltips), tooltip = [0, 0];

            // Reset Date
            date.setHours(0, 0, 0, 0);
            date.setDate(1);
            date.setDate((1 - (date.getDay() - this.con.weekStart)));

            // Create Table
            while(r.length < 6){
                time = date.getTime();

                // Attributes and ClassNames
                a = 'data-action="submit" data-date="' + date.getTime() + '"';
                c = 'calendar-day date-' + ((date.getMonth() > month)? 'next':
                    (date.getMonth() < month)? 'previous': 'current');
                if(this.con.today && today == date.toDateString()){
                    c += ' date-today';
                }

                // Calc Disabled
                if(this.con.dateBlacklist && ((time) < this.con.dateStart || time > this.con.dateEnd)){
                    disabled = [(time < this.con.dateStart)? this.con.dateStart: Infinity, [0, 1, 2, 3, 4, 5, 6], true];
                } else if(disabled[0] == 0){
                    ranges = ranges.filter(function(obj){
                        if(obj.start == Infinity || (time >= obj.start && time <= obj.end)){
                            disabled = [obj.end, obj.days];
                            return false;
                        }
                        return obj.start > time;
                    }, this);
                } else if(disabled.length == 3){
                    disabled = [0, [0, 1, 2, 3, 4, 5, 6]];
                }

                // Calc Tooltips
                if(this.con.tooltips.length > 0){
                    tooltips = this.con.tooltips.filter(function(obj, index){
                        if(obj.date instanceof Array){
                            if(obj.date[0] <= time && obj.date[1] >= time){
                                tooltip = [obj.date[1], index, obj.color];
                            }
                        } else if(obj.date == time){
                            tooltip = [obj.date, index, obj.color]
                        }
                    }, this);
                }
                if(tooltip[0] < time){
                    tooltip = [0, 0];
                }

                // Disabled
                check = disabled[0] >= time && disabled[1].indexOf(date.getDay()) >= 0;
                if((check && this.con.dateBlacklist) || (!check && !this.con.dateBlacklist)){
                    c += ' date-disabled';
                    a += ' data-disabled="true"';
                } else if(disabled[0] !== 0 && disabled[0] <= time){
                    disabled = [0, []];
                }

                // Curent
                if(this.select && this.select.toDateString() == date.toDateString()){
                    c += ' date-select';
                }

                // Create Calendar Item
                i = '<span class="inner">' + date.getDate() + '</span>';
                if(tooltip[0] > 0){
                    c += ' date-tooltip';
                    a += ' data-tooltip="' + tooltip[1] + '" data-tooltip-time="' + time + '"';
                    if(tooltip[2] !== "inherit"){
                        i += '<span class="tooltip-tick" style="background:' + tooltip[2] + ';"></span>';
                    } else {
                        i += '<span class="tooltip-tick"></span>';
                    }
                }
                t.push('<td class="' + c + '" ' + a + '>' + i + '</td>')

                // Next
                if(t.length == 7){
                    r.push("<tr>\n" + t.join("\n") + "\n</tr>"); t = [];
                }
                date.setDate(date.getDate()+1);
            }
            r = "<tbody>" + r.join("\n") + "</tbody>";

            // Create Table Header
            return '<table class="calendar-days">' + this.weekdays + r + '</table>';
        },

        /*
         |  VIEW :: SHOW TOOLTIP
         |  @version    0.4.0 [0.4.0]
         */
        showTooltip: function(id, field, time){
            var t = this.con.tooltips[id].element, e = t.style, w, h,
                d = this.dt.querySelector(".calendar-datepicker");

            // Calc Tooltip Rect
            e.cssText = "opacity:0;visibility:hidden;";
            t.id = "tooltip-" + id + "-" + time;
            d.appendChild(t);
            w = t.offsetWidth; h = t.offsetHeight;

            // Set Tooltip Rect
            e.top = field.offsetTop + field.offsetHeight + "px";
            e.left = (field.offsetLeft + (field.offsetWidth/2)) - (w/2) + "px"
            e.visibility = "visible";

            // Animate Tooltip
            if(this.con.animate){
                t.setAttribute("data-top", parseInt(e.top));
                e.top = (parseInt(e.top) + 5) + "px";
                (function fade(){
                    if(parseFloat(e.top) > t.getAttribute("data-top")){
                        e.top = (parseFloat(e.top) - 0.5) + "px";
                    }
                    if((e.opacity = parseFloat(e.opacity)+0.125) < 1){
                        setTimeout(fade, 20);
                    }
                })();
            } else {
                e.opacity = 1;
            }
        },

        /*
         |  VIEW :: HIDE TOOLTIP
         |  @version    0.4.0 [0.4.0]
         */
        hideTooltip: function(id){
            var t = this.dt.querySelector("#tooltip-" + id), e = t.style;

            // Animate Tooltip
            if(this.con.animate){
                t.className += " remove";
                (function fade(){
                    if(parseFloat(e.top) < (parseInt(t.getAttribute("data-top"))+5)){
                        e.top = (parseFloat(e.top) + 0.5) + "px";
                    }
                    if((e.opacity -= 0.125) < 0){
                        return (t.className = "calendar-tooltip")? t.parentElement.removeChild(t): "";
                    }
                    setTimeout(fade, 20);
                })();
            } else {
                t.parentElement.removeChild(t);
            }
        },

        /*
         |  PUBLIC :: SWITCH VIEW
         |  @version    0.4.1 [0.1.0]
         */
        switchView: function(view){
            var order = [null, "days", "months", "years", "decades", null];
            if(order.indexOf(view) == -1){
                if(view == "up"){
                    view = order[(order.indexOf(this.view.type) || 5)+1] || null;
                } else if(view == "down"){
                    view = order[(order.indexOf(this.view.type) || 1)-1] || null;
                }
                if(!(view && this.con["view" + first(view)])){
                    view = false;
                }
            }
            if(!view){
                return false;
            }
            this.renderDatePicker(this.dt, view);
            return this.trigger("view", view);
        },

        /*
         |  PUBLIC :: SWITCH DATE
         |  @version    0.4.1 [0.4.0]
         */
        switchDate: function(year, month, day, none){
            this.view.date.setFullYear((year == undefined)? this.view.date.getFullYear(): year);
            this.view.date.setMonth((month == undefined)? this.view.date.getMonth(): month);
            if(day == "auto"){
                var test = this.view.date, now = new Date();
                if(test.getMonth() == now.getMonth() && test.getYear() == now.getYear()){
                    day = now.getDate();
                } else {
                    day = 1;
                }
            }
            this.view.date.setDate(day || this.view.date.getDate());
            return (none === true)? true: this.switchView(this.view.type);
        },

        /*
         |  PUBLIC :: SWITCH MONTH
         |  @version    0.4.0 [0.1.0]
         */
        switchMonth: function(month, year){
            if(typeof(month) == "string"){
                month = ["previous", "prev"].indexOf(month) >= 0? -1: 1;
                month = this.view.date.getMonth() + type;
            }
            return this.switchDate(year || this.getFullYear(), month);
        },

        /*
         |  PUBLIC :: SWITCH YEAR
         |  @version    0.4.0 [0.1.0]
         */
        switchYear: function(year){
            if(typeof(year) == "string"){
                year = ["previous", "prev"].indexOf(year) >= 0? -1: 1;
                year = this.view.date.getFullYear() + type;
            }
            return this.switchDate(year);
        },

        /*
         |  PUBLIC :: BROWSE VIEW
         |  @version    0.4.0 [0.4.0]
         */
        browseView: function(type){
            type = (["previous", "prev"].indexOf(type) >= 0)? -1: 1;
            switch(this.view.type){
                case "days":
                    return this.switchDate(null, this.view.date.getMonth() + type, "auto");
                case "months":
                    return this.switchDate(this.view.date.getFullYear() + type, null, "auto");
                case "years":
                    return this.switchDate(this.view.date.getFullYear() + (type*10), null, "auto");
                case "decades":
                    return this.switchDate(this.view.date.getFullYear() + (type*100), null, "auto");
            }
            return false;
        },

        /*
         |  PUBLIC :: FETCH DATE / DTIME
         |  @version    0.4.0 [0.4.0]
         */
        fetchDate: function(date){
            date = parse(date || false) || this.view.date;
            var inp = this.dt.querySelectorAll("input[type=number]");
            if(inp && inp.length == 3){
                date.setHours(inp[0].value || 0, inp[1].value || 0, inp[2].value || 0, 0);
            }
            return date;
        },

        /*
         |  PUBLIC :: SELECT DATE / TIME
         |  @version    0.4.2 [0.1.0]
         */
        selectDate: function(Y, M, D, H, I, S){
            var n = new Date(), f = [];
            (this.con.dateFormat)? f.push(this.con.dateFormat): null;
            (this.con.timeFormat)? f.push(this.con.timeFormat): null;

            // Set Value
            this.select = (Y instanceof Date)? Y: new Date(
                Y? Y: (Y == undefined)? this.view.date.getFullYear(): n.getFullYear(),
                M? M: (M == undefined)? this.view.date.getMonth():    n.getMonth(),
                D? D: (D == undefined)? this.view.date.getDate():     n.getDate(),
                H? H: (H == undefined)? this.view.date.getHours():    0,
                I? I: (I == undefined)? this.view.date.getMinutes():  0,
                S? S: (S == undefined)? this.view.date.getSeconds():  0
            );
            this.view.date = new Date(this.select.getTime());

            this.e.value = this.convertDate(this.select, f.join(" "));
            this.e.setAttribute("data-value", this.select.getTime());
            this.switchView("days");
            return this.trigger("change");
        },
        selectTime: function(H, I, S){
            return this.selectDate(undefined, undefined, undefined, H, I, S);
        },

        /*
         |  PUBLIC :: OPEN CALENDAR
         |  @version    0.4.0 [0.1.0]
         */
        open: function(){
            if(!cHAS(this.dt, "calendar-close")){
                return this;
            }
            var self = this, e = this.dt.style;

            // Animate
            e.opacity = this.con.animate? 0: 1; e.display = "block";
            cADD(cREM(this.dt, "calendar-close"), "calender-idle");
            cHAS(this.dt, "calendar-static")? null: this.calcPosition();
            (function fade(){
                if((e.opacity = parseFloat(e.opacity)+0.125) >= 1){
                    cADD(cREM(self.dt, "calendar-idle"), "calendar-open");
                    return self.trigger("open");
                }
                setTimeout(fade, 20);
            })();
            return this;
        },

        /*
         |  PUBLIC :: CLOSE CALENDAR
         |  @version    0.4.0 [0.1.0]
         */
        close: function(){
            if(!cHAS(this.dt, "calendar-open")){
                return this;
            }
            var self = this, e = this.dt.style;

            // Animate
            cADD(cREM(this.dt, "calendar-open"), "calender-idle");
            e.opacity = this.con.animate? 1: 0; e.display = "block";
            (function fade(){
                if((e.opacity -= 0.125) <= 0){
                    cADD(cREM(self.dt, "calendar-idle"), "calendar-close");
                    e.display = "none";
                    return self.trigger("close");
                }
                setTimeout(fade, 20);
            })();
            return this;
        },

        /*
         |  PUBLIC :: CLOSE CALENDAR
         |  @version    0.4.0 [0.1.0]
         */
        toggle: function(){
            if(cHAS(this.dt, "calendar-open")){
                return this.close();
            }
            return cHAS(this.dt, "calendar-close")? this.open(): this;
        },

        /*
         |  PUBLIC :: ADD EVENT LISTENER
         |  @version    0.4.0 [0.3.0]
         */
        on: function(event, func, args){
            var events = ["open", "close", "change", "view"];
            if(events.indexOf(event) < 0 || typeof(func) != "function"){
                return false;
            }
            if(!(event in this.events)){
                this.events[event] = [];
            }
            this.events[event].push({cb: func, args: (args instanceof Array)? args: []});
            return this;
        },

        /*
         |  PUBLIC :: REMOVE CALENDAR
         |  @version    0.4.0 [0.3.0]
         */
        remove: function(){
            this.e.removeAttribute("data-tail-datetime");
            this.e.removeAttribute("data-value");
            this.dt.parentElement.removeChild(this.dt);
            return this;
        },

        /*
         |  PUBLIC :: REMOVE CALENDAR
         |  @version    0.4.0 [0.3.3]
         */
        reload: function(){
            this.remove();
            return this.init();
        },

        /*
         |  PUBLIC :: (G|S)ET OPOTION
         |  @version    0.4.0 [0.4.0]
         */
        config: function(key, value, rebuild){
            if(key instanceof Object){
                for(var k in key){
                    this.config(k, key[k], false);
                }
                this.reload();
                return this.con;
            }
            if(typeof(key) == "undefined"){
                return this.con;
            } else if(!(key in this.con)){
                return false;
            }

            // Set | Return
            if(typeof(value) == "undefined"){
                return this.con[key];
            }
            this.con[key] = value;
            if(this.rebuild !== false){
                this.reload();
            }
            return this;
        }
    }

    // Return
    return tailDateTime;
}));
