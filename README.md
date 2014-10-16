jquery.copjax
=============

Client-side only でなんとかする jquery-pjax プラグイン

jquery1.5↑ / Chrome, FireFox, Safari, IE8↑


## Usage
イベントの発火点となるリンクを指定します. **href属性を持っている必要あり.**

```javascript
    $("a[href]").copjax({
        area: "#container",
        inAnimation: function(target) {
            target.slideDown();
        }
    });
```

* 要素入れ替え時のアニメーションを変更したい場合はinAnimation, outAnimationを調整する
* click以外のイベントで使いたい場合はeventTypeを調整する
* ajaxで取得する要素内のscriptを実行したい場合はexecuteScriptsを調整しつつ, **実行したいscriptにtarget(processingObjectClass)というクラスを追加** しておく
* callback関数を使いたい場合はcallbackに設定する


#### area: string
ajaxで入れ替えを行う範囲を指定するセレクタ
```
body(default), #xxx, .yyy,…
```

#### [eventType: string]
バインド対象のイベント
```
click(default), mouseover,…
```

#### [inAnimation: string / function(newTarget): unit]
表示する際のアニメーションの種類 / 表示するオブジェクトを引数とする関数
```
fade(default), slide / function(target){ target.show(); },…
```

#### [outAnimation: string / function(oldTarget): unit]
非表示にする際のアニメーションの種類 / 非表示にするオブジェクトを引数とする関数
```
fade(default), slide / function(target){ target.hide(); },…
```

#### [executeScripts: bool / function(newTarget): bool]
ajaxで得られた要素内のscriptを実行するかどうか / ajaxで得られた要素を引数とする要素内のscriptを実行するかどうかを判定する関数
```
false(default), true / function(newTarget){ return newTarget.find("p")[0]; },…
```
#### [processingObjectClass: string]
ajaxで得られた要素内のscriptのうち, 実行したいscriptにセットしておかなかればならないクラス名. クラス名の衝突などがなければこの変数は既定値を使うこと.
executeScriptsが真にならない場合はこの変数は意味を持たない. **jquery.copjax.jsを読み込む箇所や$.copjax()で初期設定を行う箇所に設定しないこと.**
```
target(default),…
```

#### [callback: function(newTarget): unit]
ajaxで得られた要素を引数とするコールバック関数
```
function(newTarget){ alert(newTarget); },…
```

注意事項
=======

* 一部バージョンのブラウザにはハッシュで対応しています
* *MIT License*
