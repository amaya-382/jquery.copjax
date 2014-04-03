;
(function($) {
    $.fn.copjax = function(options) {
        var enable = !! (window.history && window.history.pushState);
        var settings = {};
        var target = "";


        var getNewHtml = function(url) {
            var deferred = $.Deferred();
            $.ajax({
                url: url
            }).then(function(newHtml) {
                deferred.resolve(newHtml);
            }, function(error) {
                console.log("ajax通信に失敗");
                deferred.reject(error);
            });
            return deferred.promise();
        };

        var hideTarget = function() {
            var deferred = $.Deferred();
            switch (settings["inAnimation"]) {
                case "fade":
                    target.fadeOut();
                    break;
                case "slideDown":
                    target.slideDown();
                    break;
                case "slideUp":
                    target.slideUp();
                    break;
                default:
                    target.hide();
                    break;
            }
            return deferred.resolve().promise();
        };

        var showNewTarget = function(newTarget) {
            newTarget.hide();
            target.replaceWith(newTarget);

            switch (settings["outAnimation"]) {
                case "fade":
                    newTarget.fadeIn();
                    break;
                case "slideDown":
                    newTarget.slideDown();
                    break;
                case "slideUp":
                    newTarget.slideUp();
                    break;
                default:
                    newTarget.show();
                    break;
            }
        };

        var transition = function(url) {
            target = $(settings["area"]);
            $.when(getNewHtml(url),
                hideTarget())
                .then(function(newHtml) {
                        var newTarget = $("<div></div>").html(newHtml).find(settings["area"]);
                        if (newTarget[0]) showNewTarget(newTarget);
                        // else show html
                    },
                    function(error) {
                        target.show();
                        console.log("failed");
                        console.log(error);
                    });
        };


        // popState
        if (enable) {
            // 初期ページをpush
            history.pushState(location.pathname, "", location.pathname);
            $(window).on("popstate", function(e) {
                if (e.originalEvent.state) {
                    transition(location.pathname);
                    return true;
                }
            });
        } else {
            // alert("未実装");
            // $.getScript('https://raw.github.com/cowboy/jquery-hashchange/v1.3/jquery.ba-hashchange.min.js', function() {
            //     $(window).hashchange();
            //     $(window).hashchange(function() {
            //         transition(location.hash.replace("#", ""));
            //     });
            // });
            // $(window).hashchange(function() {
            //     transition(location.hash.replace("#", ""));
            // });
            $(window).on("hashchange", function(e) {
                alert(e);
                console.log(e);
            });
            window.onhashchange();
        }

        // click
        this.click(function(e) {
            settings = $.extend({
                area: "body",
                inAnimation: "fade",
                outAnimation: "fade"
            }, options);
            var targetUrl = $(this).attr("href");
            transition(targetUrl);
            if (enable) history.pushState(targetUrl, "", targetUrl);
            else location.hash = targetUrl; //.replace(/^\.\//, "");
            return false;
        });
    };
})(jQuery);