CHANGELOG
=========

Version 0.4.3
-------------
-   Add: The new Italian Translation. Many Thanks to [Fabio Di Stasio](https://github.com/Fabio286)
         [#10](https://github.com/pytesNET/tail.DateTime/issues/10)!
-   Add: The new Brazilian Portuguese Translation. Many Thanks to [Júnior Garcia](https://github.com/juniorgarcia)
         [#10](https://github.com/pytesNET/tail.DateTime/issues/13)!
-   Add: The new options `timeStep*` to change the step size of the input fields.
         Thanks to: [#9](https://github.com/pytesNET/tail.DateTime/issues/9)
-   Bugfix: Error in dateRanges visualization
            Thanks to: [#12](https://github.com/pytesNET/tail.DateTime/issues/12)

Version 0.4.2
-------------
-   Add: The new `modify()` method on the string Storage to change the strings globally.
-   Update: The `.register()` method checks now if locale is a string and object a object.
-   Update: The `.register()` method returns now `true` on success and `false` on failure!
-   Bugfix: The `.selectTime()` method didn't used the "already select / current viewed" date.
-   Bugfix: Changing time has no effect.
            Thanks to: [#5](https://github.com/pytesNET/tail.DateTime/issues/5)
-   Bugfix: Calculations are wrong in some Environments.
            Thanks to: [#6](https://github.com/pytesNET/tail.DateTime/issues/6),
            **Fixed by:** AndrewDRX @ [#8](https://github.com/pytesNET/tail.DateTime/pull/8)

Version 0.4.1 - Beta
--------------------
-   Add: The new Arabic Translation. Many Thanks to [Mohammed Alsiddeeq Ahmed](https://github.com/mosid)
         [#1](https://github.com/pytesNET/tail.DateTime/issues/1)!
-   Add: The new option `rtl`, which allows to display the DateTime picker in an RTL style.
-   Add: The new event `view`.
-   Update: The new RTL supported Stylesheets.
-   Update: The default tooltip tick color depends now on the used theme.
-   Update: The "Enter/Escape" Key listener now also works when the cursor is within an input field.
-   Update: The events now gets fired AFTER the DateTime picker has done his actions!
-   Bugfix: Disabled dates could still be selected / clicked.
-   Bugfix: The `keyup` document event listener has fired per instance.
-   Bugfix: The "Enter" Key listener doesn't notice / used already selected dates!
-   Bugfix: You cannot go back farther than to February of the displayed year.
            [#3](https://github.com/pytesNET/tail.DateTime/issues/3)!
-   Bugfix: Issue with Date Selection with Update to 0.4.0.
            [#2](https://github.com/pytesNET/tail.DateTime/issues/2)!

Version 0.4.0 - Beta
--------------------
-   Info: This is the first BETA version! :3
-   Info: This Repository is now completely independent, due to the removal of the last original
          lines of MrGuiseppes pureJSCalendar script!
-   Add: Russian translation (ru).
-   Add: Designs in LESS Format (I'm new at this Pre-Processing Stuff :/).
-   Add: Support as Asynchronous Module Definition.
-   Add: The default design has 3 new, and the "harx" design has one additional color schemes.
-   Add: The new option `animate` to enable and disable the fade and tooltip animations.
-   Add: The new option `dateBlacklist` to turn the `dateRange` from a blacklist to a whitelist.
-   Add: The new option `dateStart` to limit the calendar.
-   Add: The new option `dateEnd` to limit the calendar.
-   Add: The new option `locale` to change the used locale by the calendar.
-   Add: The new option `timeHours` to set the default Hours on init (pass null for current).
-   Add: The new option `timeMintes` to set the default Minutes on init (pass null for current).
-   Add: The new option `timeSeconds` to set the default Seconds on init (pass null for current).
-   Add: The new option `today` to mark the current day within the calendar script.
-   Add: The new option `tooltips` to create tooltips on specific dates.
-   Add: The new option `viewDefault` to select the default view, when the calendar gets opened.
-   Add: The new option `viewDecades` enables the view "Decades" (Show different Decades).
-   Add: The new option `viewYears` enables the view "Years" (Show 12 Years - One Decade).
-   Add: The new option `viewMonths` enables the view "Months" (January - December).
-   Add: The new option `viewDays` enables the view "Days" (01 - 28|29|30|31).
-   Add: The new internal event trigger method `.trigger()`.
-   Add: A new custom event listener, using `.on()` and `.trigger()`.
-   Add: The new internal render and view methods `.renderCalendar()`, `.renderDatePicker()`,
         `.renderTimePicker()`,`.viewDecades()`, `.viewYears()`, `.viewMonths()`, `.viewDays()`,
         `.handleLabel()`, `.showTooltip()` and `.hideTooltip()`.
-   Add: The new public method `.config()` to get and set settings during the runtime.
-   Add: The new public methods `.switchView()`, `.browseView()`, `.switchDate()` and `.fetchDate()`
         to control the calendar interface and fetch the current Date.
-   Add: The new public methods `.appendTooltip()` and `.appendRange()` to append tooltips and date
         ranges during the runtime.
-   Update: The translations itself, as well as the translation / locale system behind.
-   Update: Both designs has been updated to the new structure.
-   Update: The main helper methods.
-   Update: The calendar render process has been re-written, now it will always show 6 rows of
            dates, including days from the previous and next month!
-   Update: The locale system is now usable per instance, the strings doesn't get replaced!
-   Update: The option `classNames` allows now `true` to copy the class names from the main
            element and false, to do nothing.
-   Update: The option `position` and `static` has been merged, so use "top", "left", "right" or
            or "bottom" to show the calendar on an absolute position relative to the passed element
            or pass any selector, which should be used as container.
-   Update: The option `weekStart` supports now also numbers (SUN = 0, MON = 1, ... SAT = 6)!
-   Update: The option `dateRange` requires now a new range format, the old one is NOT supported!
-   Update: The public methods `.switchMonth()` and `switchYear()` now just aliases for the main
            public method `.switchDate()`.
-   Update: The public methods `.open()` and `.close()` now using `setTimeout()` instead of an
            interval.
-   Update: The public methods `.reload()` reloads the same instance instead of creating a new one.
-   Update: The public event method `.on()` has been updated and supports now a third argument.
-   Remove: The option `static` has been removed (use `position` instead).
-   Remove: The option `zeroSeconds` has been removed (use `timeSeconds` instead).
-   Remove: The option `static` has been removed (use `position` instead).
-   Remove: The `isIE11` and `tail.IE` variables.
-   Remove: The old render functions `.renderDay()`, `.renderMonth()` and `.renderTime()` has been
            replaced by the new `.view*()` and `.render*()` methods!
-   Remove: The `.createCalendar()` method has been replaced by the new `.view*()` methods.
-   Bugfix: The `tbdy` typo has been fixed.
-   Bugfix: Incorrect `colspan` value on the thead element (on the Months View).

Version 0.3.4 - Alpha
---------------------
-   Info: Official support for IE >= 9 starts now :(
-   Add: New `clone()` helper function as Fallback for IE >= 9.
-   Add: New `.IE` helper variable for Fallback use for IE >= 9.
-   Bugfix: Almost complete IE >= 9 support.

Version 0.3.3 - Alpha
---------------------
-   Add: A new internal translate / string function called `__()`.
-   Add: New `reload()` method, which calls `remove()` and re-inits the DateTime Calendar.
-   Update: Use `this` to call the main DateTime IIFE function.
-   Update: Update the selected date when the input field has been filled out manually.
-   BugFix: Fix Typo and wrong attribute name in `remove()` method.
-   BugFix: `Enter` / `Return` executes all events, even if just one field is in focus.
-   Removed: The `dateRange` fallback option has been removed, to clean the source up for the next major version.

Version 0.3.2 - Alpha
---------------------
-   Info: npmJS Version Fix.
-   Add: Spanish translation

Version 0.3.1 - Alpha
---------------------
-   BugFix: Position Absolute doesn't recalculate [#2](https://github.com/pytesNET/tail.DateTime/issues/2)
-   BugFix: Today on every Year! [#1](https://github.com/pytesNET/tail.DateTime/issues/1)

Version 0.3.0 - Alpha
---------------------
-   Info: Uses now some Vectors from GitHubs [Octicons](https://octicons.github.com/).
-   Add: A minified version, minified with [jsCompress](https://jscompress.com/).
-   Add: A new "white" design, used with `tail.datetime.white.css` (together with the main style sheet).
-   Add: A new `span` HTML element wraps each single day number.
-   Add: Events for `open`, `close` and `select` (used with `tail.DateTime::` prefix).
-   Add: New helper methos `trigger` to trigger tail.DateTime specific CustomEvents.
-   Add: New Option `static`, which allows a selector or an element as wrapper for a static view.
-   Add: New option `classNames`, which adds additional class names to the DateTime container.
-   Add: New option `startOpen`, which opens the picker after init.
-   Add: New option `stayOpen`, which disables some auto-closing events.
-   Add: New option `zeroSeconds`, which sets the seconds to 0 on init.
-   Add: New method `remove()` to remove the DateTime Picker.
-   Add: Current selected date class name and color.
-   Add: A colon between hours, minutes and seconds (That was really important!).
-   Add: The language strings für `de` (German) and `de_AT` (Austrian German)
-   Update: The SVG arrows on the default theme has been changed into angle images (Octicon).
-   Update: All SVG images has been changed into the Octicon vector graphics.
-   Update: The constructor allows now `NodeList`s and `HTMLCollection`s and uses `querySelectorAll` on strings.
-   Update: Renamed any `data-fox-*` attribute names into `data-tail-*`.
-   Update: The internal `element` input variable has renamed into `e`.
-   Update: The internal `calendar` DateTime Picker variable has renamed into `dt`.
-   Update: The internal `options` configuration variable has renamed into `con`.
-   Update: The internal `view` / `current` variables has been merged under `view`.
-   Update: The internal `select` variable holds the last (current) selected Date and Time as Date object.
-   Update: The option `dateRange` has renamed into `dateRanges` and allows multiple arrays with Date Objects, Date Values (YYYY-mm-dd) and Week-Day names.
-   BugFix: Current Date object has been shared between each prototype instance.

Version 0.2.0 - Alpha
---------------------
-   Info: Project has been renamed to `tail.DateTime` and adapted to the tail implementation.

Version 0.1.2 - Alpha
---------------------
-   Add: Use the `data-fox-value` attribute for pre-defined dates, before trying to parse the input value.
-   Add: Helper Methods `Fox.hasClass`, `Fox.addClass`, `Fox.removeClass`.
-   Add: Calendar Class Names `calendar-close`, `calendar-idle`, `calendar-open`.
-   Update: Changed '\&lsaquo;' and '\&rsaquo;' into SVG background images.
-   Update: Stores now a (current) Date Object instead of the year / month number.
-   Update: Some minimalistic style and script changes.
-   BugFix: Double Use of the `data-fox-calendar` attribute.
-   BugFix: Calendar closes after selecting a month.
-   BugFix: The `switchYear()` method doesn't supported a year argument.

Version 0.1.1 - Alpha
---------------------
-   Update: Change Calendar Counter Calculation (CCCC)
-   Update: Return `this` on the public methods

Version 0.1.0 - Alpha
---------------------
-   Initial Release (Fork of Pure JS Calendar](https://github.com/MrGuiseppe/pureJSCalendar))
