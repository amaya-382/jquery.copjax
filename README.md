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

body(default), #xxx, .yyy,…


### [eventType: string]
バインド対象のイベント

click(default), mouseover,…


### [inAnimation: string / function(newTarget): unit]
表示する際のアニメーションの種類 / 表示するオブジェクトを引数とする関数

fade(default), slide / function(target){ target.show(); },…


### [outAnimation: string / function(oldTarget): unit]
非表示にする際のアニメーションの種類 / 非表示にするオブジェクトを引数とする関数

fade(default), slide / function(target){ target.hide(); },…


### [executeScripts: bool / function(newTarget): bool]
ajaxで得られた要素内のscriptを実行するかどうか / ajaxで得られた要素を引数とする要素内のscriptを実行するかどうかを判定する関数

false(default), true / function(newTarget){ return newTarget.find("p")[0]; },…

#### [processingObjectClass: string]
ajaxで得られた要素内のscriptのうち, 実行対象が持っていなければならないクラス名.
executeScriptsが真である必要あり.

target(default),…


### [callback: function(newTarget): unit]
ajaxで得られた要素を引数とするコールバック関数

function(newTarget){ alert(newTarget); },…
