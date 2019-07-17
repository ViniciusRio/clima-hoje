// Pretty Date Tests
// =============================================================================

(function () {

    "use strict";

    var second = 1000,
        minute = 60 * second,
        hour = 60 * minute,
        day = 24 * hour,
        week = 7 * day,
        month = 31 * day,
        year = 365 * day,
        now = (new Date()).getTime(),
        $target = $("<div>");

    // Test time: just now
    // -------------------------------------------------------------------------

    test("Just now", function () {
        $target.prettydate("destroy").prettydate({
            date: now
        });

        equal($target.text(), "Just now");
    });


    // Test time: before now
    // -------------------------------------------------------------------------

    test("2 seconds ago", function () {
        $target.prettydate("destroy").prettydate({
            date: now - 2 * second
        });

        equal($target.text(), "2 seconds ago");
    });

    test("One minute ago", function () {
        $target.prettydate("destroy").prettydate({
            date: now - minute
        });

        equal($target.text(), "One minute ago");
    });

    test("2 minutes ago", function () {
        $target.prettydate("destroy").prettydate({
            date: now - 2 * minute
        });

        equal($target.text(), "2 minutes ago");
    });

    test("One hour ago", function () {
        $target.prettydate("destroy").prettydate({
            date: now - hour
        });

        equal($target.text(), "One hour ago");
    });

    test("2 hours ago", function () {
        $target.prettydate("destroy").prettydate({
            date: now - 2 * hour
        });

        equal($target.text(), "2 hours ago");
    });

    test("Yesterday", function () {
        $target.prettydate("destroy").prettydate({
            date: now - day
        });

        equal($target.text(), "Yesterday");
    });

    test("The day before yesterday", function () {
        $target.prettydate("destroy").prettydate({
            date: now - 2 * day
        });

        equal($target.text(), "The day before yesterday");
    });

    test("One week ago", function () {
        $target.prettydate("destroy").prettydate({
            date: now - week
        });

        equal($target.text(), "One week ago");
    });

    test("2 weeks ago", function () {
        $target.prettydate("destroy").prettydate({
            date: now - 2 * week
        });

        equal($target.text(), "2 weeks ago");
    });

    test("One month ago", function () {
        $target.prettydate("destroy").prettydate({
            date: now - month
        });

        equal($target.text(), "One month ago");
    });

    test("2 months ago", function () {
        $target.prettydate("destroy").prettydate({
            date: now - 2 * month
        });

        equal($target.text(), "2 months ago");
    });

    test("One year ago", function () {
        $target.prettydate("destroy").prettydate({
            date: now - year
        });

        equal($target.text(), "One year ago");
    });

    test("2 years ago", function () {
        $target.prettydate("destroy").prettydate({
            date: now - 2 * year
        });

        equal($target.text(), "2 years ago");
    });


    // Test time: after now
    // -------------------------------------------------------------------------

    test("2 seconds later", function () {
        $target.prettydate("destroy").prettydate({
            date: now + 2 * second
        });

        equal($target.text(), "2 seconds later");
    });

    test("One minute later", function () {
        $target.prettydate("destroy").prettydate({
            date: now + minute
        });

        equal($target.text(), "One minute later");
    });

    test("2 minutes later", function () {
        $target.prettydate("destroy").prettydate({
            date: now + 2 * minute
        });

        equal($target.text(), "2 minutes later");
    });

    test("One hour later", function () {
        $target.prettydate("destroy").prettydate({
            date: now + hour
        });

        equal($target.text(), "One hour later");
    });

    test("2 hours later", function () {
        $target.prettydate("destroy").prettydate({
            date: now + 2 * hour
        });

        equal($target.text(), "2 hours later");
    });

    test("Tomorrow", function () {
        $target.prettydate("destroy").prettydate({
            date: now + day
        });

        equal($target.text(), "Tomorrow");
    });

    test("The day after tomorrow", function () {
        $target.prettydate("destroy").prettydate({
            date: now + 2 * day
        });

        equal($target.text(), "The day after tomorrow");
    });

    test("One week later", function () {
        $target.prettydate("destroy").prettydate({
            date: now + week
        });

        equal($target.text(), "One week later");
    });

    test("2 weeks later", function () {
        $target.prettydate("destroy").prettydate({
            date: now + 2 * week
        });

        equal($target.text(), "2 weeks later");
    });

    test("One month later", function () {
        $target.prettydate("destroy").prettydate({
            date: now + month
        });

        equal($target.text(), "One month later");
    });

    test("2 months later", function () {
        $target.prettydate("destroy").prettydate({
            date: now + 2 * month
        });

        equal($target.text(), "2 months later");
    });

    test("One year later", function () {
        $target.prettydate("destroy").prettydate({
            date: now + year
        });

        equal($target.text(), "One year later");
    });

    test("2 years later", function () {
        $target.prettydate("destroy").prettydate({
            date: now + 2 * year
        });

        equal($target.text(), "2 years later");
    });


    // Test options: dateFormat
    // -------------------------------------------------------------------------

    test("dateFormat: YY.M.D", function () {
        var diff = Math.floor((now - (new Date(2008, 7, 8)).getTime()) / year);

        $target.prettydate("destroy").prettydate({
            date: "08.8.8",
            dateFormat: "YY.M.D"
        });

        equal($target.text(), diff + " years ago");
    });

    test("dateFormat: YYYY.MM.DD", function () {
        var diff = Math.floor((now - (new Date(2008, 7, 8)).getTime()) / year);

        $target.prettydate("destroy").prettydate({
            date: "2008.08.08",
            dateFormat: "YYYY.MM.DD"
        });

        equal($target.text(), diff + " years ago");
    });


    // Test methods: prettify & destroy
    // -------------------------------------------------------------------------

    test("Method: prettify", function () {
        $target.prettydate("destroy").prettydate({
            date: now // Just now
        });

        $target.prettydate("setDate", new Date(now - 2 * second)); // 2 seconds ago
        $target.prettydate("prettify");

        equal($target.text(), "2 seconds ago");

        $target.prettydate("setDate", new Date(now - 2 * minute)); // 2 minutes ago
        $target.prettydate("prettify");

        equal($target.text(), "2 minutes ago");
    });

    test("Method: destroy", function () {
        $target.prettydate("destroy");
        equal($target.data("prettydate"), undefined);
    });

}());
