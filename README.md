jquery.copjax
=============

Client-side only な jquery-pjax プラグイン

```javscript
    $("a[href]").copjax({
        area: "#container",
        inAnimation: "slideUp"
    });
```

リンクのjqueryオブジェクト, 又はそれを含むオブジェクトを指定.

area: string
----
セレクタ

inAnimation: string, function(html)
-----------
fade(default), slideUp, slideDown

outAnimation: string, function(html)
------------
fade(default), slideUp, slideDown



jquery1.5↑

Chrome,FireFox,Safari,IE8↑
