jquery.copjax
=============

Client-side only な jquery-pjax プラグイン

jquery1.5↑ / Chrome,FireFox,Safari,IE8↑

```javascript
    $("a[href]").copjax({
        area: "#container",
        inAnimation: "slideUp"
    });
```

リンクのjqueryオブジェクト, 又はそれを含むオブジェクトを指定.

## Usage

### area: string
ajaxで入れ替えを行う範囲を指定するセレクタ

### inAnimation: string / function(html)
fade(default), slideUp, slideDown

### outAnimation: string / function(html)
fade(default), slideUp, slideDown




