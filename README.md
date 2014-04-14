jquery.copjax
=============

Client-side only な jquery-pjax プラグイン

jquery1.5↑ / Chrome,FireFox,Safari,IE8↑


## Usage

リンク, 又はそれを含む要素を指定します.

```javascript
    $("a[href]").copjax({
        area: "#container",
        inAnimation: function(target) {
            target.slideDown();
        }
    });
```

### area: string
ajaxで入れ替えを行う範囲を指定するセレクタ

### [inAnimation: string / function(target)]
fade(default), slide / 表示するオブジェクトを引数とする関数

### [outAnimation: string / function(target)]
fade(default), slide / 非表示にするオブジェクトを引数とする関数




