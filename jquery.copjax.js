;
(function($) {
    $.fn.copjax = function(options) {
        var available = !! (window.history && window.history.pushState);
        var wrappedHtml = null;

        // init settings
        var settings = $.extend({
            eventType: "click",
            area: "body",
            inAnimation: "fade",
            outAnimation: "fade",
            executeScripts: false,
            processingObjectClass: "target"
        }, options);

        var getNewHtml = function(url) {
            var deferred = $.Deferred();
            $.ajax({
                url: url
            }).then(function(obtainedHtml) {
                deferred.resolve(obtainedHtml);
            }, function(error) {
                console.log("failed in ajax");
                deferred.reject(error);
            });
            return deferred.promise();
        };

        var hideTarget = function(target) {
            var deferred = $.Deferred();
            var outAnimation = settings["outAnimation"];
            if ($.isFunction(outAnimation))
                outAnimation(target);
            else
                switch (outAnimation) {
                    case "fade":
                        target.fadeOut("slow");
                        break;
                    case "slide":
                        target.slideUp("slow");
                        break;
                    default:
                        target.hide();
                        break;
                }
            return deferred.resolve().promise();
        };

        var showTarget = function(target) {
            target.hide();
            var inAnimation = settings["inAnimation"];
            if ($.isFunction(inAnimation))
                inAnimation(target);
            else
                switch (inAnimation) {
                    case "fade":
                        target.fadeIn("slow");
                        break;
                    case "slide":
                        target.slideDown("slow");
                        break;
                    default:
                        target.show();
                        break;
                }
        };

        // CORE FUNCTION
        // get the new //parallelism// hide the old
        // => replace and show the new, execute scripts, call back
        var transition = function(url) {
            var oldTarget = $(settings["area"]);
            $.when(getNewHtml(url),
                hideTarget(oldTarget))
                .then(function(obtainedHtml) {
                        // replace and show
                        wrappedHtml = $("<div/>").html(obtainedHtml);
                        var newTargets = wrappedHtml.find(settings["area"]);
                        if (newTargets[0]) {
                            var newTarget = $(newTargets[0]);
                            oldTarget.replaceWith(newTarget);
                            showTarget(newTarget);
                        } else oldTarget.show();

                        // script
                        if ($.isFunction(settings["executeScripts"])) {
                            if (settings["executeScripts"](wrappedHtml.html()))
                                $("body").append(wrappedHtml.find("script." + settings["processingObjectClass"]));
                        } else if (settings["executeScripts"]) {
                            $("body").append(wrappedHtml.find("script." + settings["processingObjectClass"]));
                        }

                        // callback
                        if ("callback" in settings) settings["callback"](wrappedHtml.html());
                    },
                    function(error) {
                        oldTarget.show();
                        console.log("failed:\n" + error);
                    });
        };

        // popstate or hashchange
        if (available) {
            // initial push
            history.pushState(location.pathname, "", location.pathname);

            // popstate
            $(window).on("popstate", function(e) {
                if (e.originalEvent.state) {
                    transition(location.pathname);
                }
            });
        } else {
            // hashchange
            $(window).on("hashchange", function() {
                var hash = location.hash;
                transition(location.hash.replace("#", ""));
                if (hash !== "") location.hash = hash;
            });
        }

        // bind event
        this.on(settings["eventType"], function() {
            //transition
            var targetUrl = $(this).attr("href");
            transition(targetUrl);

            //change state
            if (available) history.pushState(targetUrl, "", targetUrl);
            else location.hash = targetUrl;

            //reset
            wrappedHtml = null;
            return false;
        });
    };
})(jQuery);