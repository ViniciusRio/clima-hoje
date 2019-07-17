/*!
 * Pretty Date v0.1.0
 * https://github.com/fengyuanchen/prettydate
 *
 * Copyright 2014 Fengyuan Chen
 * Released under the MIT license
 */

 (function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as anonymous module.
        define(["jquery"], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
})(function ($) {

    "use strict";

    $.fn.prettydate.setDefaults({
        afterSuffix: "后",
        beforeSuffix: "前",
        dateFormat: "YYYY-MM-DD hh:mm:ss",
        messages: {
            second: "刚刚",
            seconds: "%s秒%s",
            minute: "一分钟%s",
            minutes: "%s分钟%s",
            hour: "一小时%s",
            hours: "%s小时%s",
            day: "一天%s",
            days: "%s天%s",
            week: "一周%s",
            weeks: "%s周%s",
            month: "一个月%s",
            months: "%s个月%s",
            year: "一年%s",
            years: "%s年%s",
            yesterday: "昨天",
            beforeYesterday: "前天",
            tomorrow: "明天",
            afterTomorrow: "后天"
        }
    });
});
