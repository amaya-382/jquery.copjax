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
                console.log("ajax通信に失敗しました");
                deferred.reject(error);
            });
            return deferred.promise();
        };

        var hideTarget = function() {
            var deferred = $.Deferred();
            var inAnimation = settings["inAnimation"];
            if ($.isFunction(inAnimation))
                inAnimation(target);
            else
                switch (inAnimation) {
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
            var outAnimation = settings["outAnimation"];
            if ($.isFunction(outAnimation))
                outAnimation(newTarget);
            else
                switch (outAnimation) {
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

        // 遷移処理
        // 新要素取得 // 入れ替え要素非表示
        // => 新要素表示
        var transition = function(url) {
            target = $(settings["area"]);
            $.when(getNewHtml(url),
                hideTarget())
                .then(function(newHtml) {
                        var newTargets = $("<div/>").html(newHtml).find(settings["area"]);
                        if (newTargets[0]) showNewTarget($(newTargets[0]));
                        else target.show();
                    },
                    function(error) {
                        target.show();
                        console.log("failed:\n" + error);
                    });
        };

        // popstate or hashchange
        if (enable) {
            // 初期ページをpush
            history.pushState(location.pathname, "", location.pathname);
            $(window).on("popstate", function(e) {
                if (e.originalEvent.state) {
                    transition(location.pathname);
                    return true;
                }
            });
            location.reload = function() {
                transition(location.href);
                return false;
            };
        } else {
            $(window).on("hashchange", function() {
                var hash = location.hash;
                transition(location.hash.replace("#", ""));
                if (hash !== "") location.hash = hash;
            });
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
            else location.hash = targetUrl;
            return false;
        });
    };
})(jQuery);