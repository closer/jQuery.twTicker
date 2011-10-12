#&quot;twTicker&quot; jQuery plugin

##Description
このスクリプトはjQueryプラグインです。
指定したエリア内に横スライドするだけのシンプルなTwitterティッカーを表示します。

---
##Demos
http://kaelab.ranadesign.com/blog/demo/twTicker/

---
##Usage

###Step01
head要素内で jquery.twTicker.jsと、jquery.twTicker.cssをそれぞれ読み込みます。もちろん、jquery.jsを読み込んだ後に読み込みましょう。

	<script type="text/javascript" src="jquery.js"></script>
	<script type="text/javascript" src="jquery.twTicker.js"></script>
	<link rel="stylesheet" type="text/css" href="jquery.twTicker.css" />

###Step02
Step01の通りスクリプトファイルを読み込んだ後に、以下の例のように実行します。
ティッカーのコンテナとなる要素をjQueryセレクタで指定して、実行します。引数でオプションを指定できます。

	<script type="text/javascript">
	$(function() {
		$('#twTicker').twTicker({
			// some options...
			query:'from%3Atoptweets_ja',
			length: 10
		});
	});
	</script>
	...
	<div id="twTicker"></div>

オプションの一覧は次の表の通りです。

<table border="1">
<colgroup span="1" class="colh">
<colgroup span="1" class="colh">
<colgroup span="1" class="cold">
<thead>
<tr>
<th>オプション名<br>(option name)</th>
<th>デフォルト値<br>(default value)</th>
<th>備考<br>(note)</th>
</tr>
</thead>
<tbody>
<tr>
<td>query</td>
<td>'from%3Atoptweets_ja'</td>
<td>Twitter APIに投げるクエリ<br>
例：'TagName'タグを検索 -&gt; %23TagName<br>
'UserName'ユーザーを検索 -&gt; from%3AUserName</td>
</tr>
<tr>
<td>length</td>
<td>10</td>
<td>Tweetを取得する数</td>
</tr>
<tr>
<td>tweetLink</td>
<td>true</td>
<td>Tweetにパーマリンクを張るかどうかを示す論理値</td>
</tr>
<tr>
<td>duration</td>
<td>20000</td>
<td>アニメーションにかける時間。多いとスピードが遅くなります。</td>
</tr>
<tr>
<td>loading</td>
<td>true</td>
<td>ローディング画像を表示するかどうかを示す論理値</td>
</tr>
<tr>
<td>loadingImg</td>
<td>'loading.gif'</td>
<td>ローディング画像のパス</td>
</tr>
<tr>
<td>loadingImgId</td>
<td>'twTickerLoadingImg'</td>
<td>ローディング画像のid属性</td>
</tr>
<tr>
<td>className</td>
<td>'twTicker'</td>
<td>jQueryセレクタで指定した要素に追加するclass属性。
デフォルト値から変更する場合は<span class="file">jquery.twTicker.css</span>内の指定も合わせて変更する必要があります。</td>
</tr>
<tr>
<td>wrapperClassName</td>
<td>'twTickerWrapper'</td>
<td>Tweet全体を包むラッパー要素のclass属性。
デフォルト値から変更する場合は<span class="file">jquery.twTicker.css</span>内の指定も合わせて変更する必要があります。</td>
</tr>
<tr>
<td>datePosition</td>
<td>'after'</td>
<td>日付をTweetテキストの前につけるか、後ろにつけるかを示す文字列。'before'で前に、それ以外を指定すると後ろにつきます。</td>
</tr>
<tr>
<td>dateFormat</td>
<td>

	function(y,m,d,hs,ms,ss) {
	  return " (" + y + "-" + m
		+ "-" + d + " " + hs+ ":"
		+ ms + ":" + ss + ")";
	}

</td>
<td>日付表示のフォーマットを返す関数。引数に 年/月/日/時/分/秒 を順番に6つ受け取るのでそれを使って適当な文字列を返すようにします。</td>
</tr>
</tbody>
</table>

---
##License
<a href="http://www.opensource.org/licenses/mit-license.html">MIT License</a><br />
参考: <a href="https://secure.wikimedia.org/wikipedia/ja/wiki/MIT_License">MIT License - Wikipedia</a>

---
##Contact
<a href="http://kaelab.ranadesign.com/blog/2010/09/twticker.html">シンプルなTwitterティッカーを表示するjQueryプラグイン | かえラボBlog</a>

---
##Note
構成ファイルのうち、loading.gifは <a href="http://www.chimply.com/Generator#spinner">Chimply generates your images</a> で生成したものです。

