使用文档 Documentation
====
### 目录 Contents


### 1 关于LaTeX公式编辑 Introduce
**LaTeX**（常被读作/ˈlɑːtɛk/或/ˈleɪtɛk/，正确读音:/ˈlɑːtɛx/音译：拉泰赫，写作  $\LaTeX$），是一种基于TeX的排版系统，由美国计算机科学家[莱斯利·兰伯特](https://zh.wikipedia.org/wiki/%E8%8E%B1%E6%96%AF%E5%88%A9%C2%B7%E5%85%B0%E6%B3%A2%E7%89%B9)在20世纪80年代初期开发。
**MathJax**是一个跨浏览器的JavaScript库，它使用MathML、LaTeX和ASCIIMathML标记在Web浏览器中显示数学符号。
本页面是基于[MathJax](https://www.mathjax.org/)实现的便捷LaTeX公式编辑器，支持导出SVG矢量图、高清PNG位图、MathML代码以及SVGCode，并且可根据需要自定义加载TeX扩展包，实现功能拓展。

#### 1.1 基本使用 Basic

在本页面输入框中输入的公式**不用**放在`<math>`与`</math>`，或`$`与`$`之间，直接输入相关LaTeX代码即可。

在输出框您可以看到即时渲染出来效果，方便进行代码修改。

以下字符在LaTeX环境中是保留字符，它们具有特殊含义，只可以特定语法中起作用，所以并不能在输入框中直接输入它们（会报错或者不会渲染）
```
# % ^ & _ { } ~ \
```

如您因其他原因需要直接显示它们，请在其前面加入`\` 反斜杠或其它转义符。

```
\# \% ^\wedge \& \_ \{ \} \sim \backslash
```
$$
\# \% ^\wedge \& \_ \{ \} \sim \backslash
$$
关于LaTeX代码部分请参考下一章节。

**注意：**本页面不支持文档编辑环境，因此不支持调用`\begin{document}`等相关命令，默认即为数学环境，可直接输入数学公式。

#### 1.2 关于渲染 Render

本页面采用MathJax-tex-svg显示数学符号，支持四种格式导出。

##### 1.2.1 导出SVG

SVG全称**S**calable **V**ector **G**raphics（可缩放矢量图形），是一种基于可扩展标记语言（XML），用于描述二维矢量图形的图形格式，标准由W3C制定，是一个开放标准。

我们可以简单理解为，SVG是一种与图像分辨率无关的矢量格式的拓展名，因此SVG文件可以直接拖入**AI、PS**等绘图软件中进行相应编辑、修改，以满足任意尺寸需求。

##### 1.2.2 导出PNG

PNG全称**P**ortable **N**etwork **G**raphics（便携式网络图形），是一种无损压缩的**位图**图形格式。

因此PNG与图像分辨率有关，本页面导出的PNG分辨率为4K标准（3840x2160），也可以满足绝大部分的文档需求。

##### 1.2.3 导出MathML

MathML全称**Math**ematical **M**arkup **L**anguage（数学标记语言），是一种基于可扩展标记语言（XML）的标准，用来描述数学符号和公式。现已获得**HTML5**和大部分**办公软件**与**数学软件**的支持，例如Microsoft Office、LibreOffice、Mathematica、Maple等，这意味着，您只需将**MathML代码**复制进Microsoft Word当中，便会自动转换成Word支持的LaTeX公式，并可进行相应后续编辑。

##### 1.2.4 导出SVG Code（说不明白）

SVGCode即是一个SVG文件的全部代码，此支持HTML环境。



### 2 数学公式编辑 Displaying a formula
#### 2.1 符号与字母 Symbol and Alphabet
##### 2.1.1 希腊字母 Greek alphabet

序号 | 小写 | LaTeX | 读音 | 序号 | 大写 | LaTeX | 读音
:-: | :----: | :---- | :---- | :-: | :----: | :---- | :----
1 | $\alpha$ | \alpha | /ˈælfə/ | 31 | $\Gamma$ | \Gamma | /ˈɡæmə/
2 | $\beta$ | \beta | /ˈbiːtə/, US: /ˈbeɪtə/ | 32 | $\Delta$ | \Delta | /ˈdɛltə/
3 | $\gamma$ | \gamma | /ˈɡæmə/ | 33 | $\Theta$ | \Theta | /ˈθiːtə/
4 | $\delta$ | \delta | /ˈdɛltə/ | 34 | $\Lambda$ | \Lambda | /ˈlæmdə/
5 | $\epsilon$ | \epsilon | /ˈɛpsɪlɒn/ | 35 | $\Xi$ | \Xi | /zaɪ, ksaɪ/
6 | $\varepsilon$ | \varepsilon | /ˈɛpsɪlɒn/ | 36 | $\Pi$ | \Pi | /paɪ/
7 | $\zeta$ | \zeta | /ˈzeɪtə/ | 37 | $\Sigma$ | \Sigma | /ˈsɪɡmə/
8 | $\eta$ | \eta | /ˈeɪtə/ | 38 | $\Upsilon$ | \Upsilon | /ˈʌpsɪlɒn/
9 | $\theta$ | \theta |  /ˈθiːtə/ | 39 | $\Phi$ | \Phi | /faɪ/
10 | $\vartheta$ | \vartheta |  /ˈθiːtə/ | 40 | $\Psi$ | \Psi | /psaɪ/
11 | $\iota$ | \iota |  /aɪˈoʊtə/ | 41 | $\Omega$ | \Omega | /oʊˈmeɪɡə/
12 | $\kappa$ | \kappa | /ˈkæpə/ |  |  |  | 
13 | $\lambda$ | \lambda | /ˈlæmdə/ |  |  |  | 
14 | $\mu$ | \mu | /mjuː/ |  |  |  | 
15 | $\nu$ | \nu | /njuː/ |  |  |  | 
16 | $\xi$ | \xi | /zaɪ, ksaɪ/ |  |  |  | 
17 | $o$ | o | /ˈɒmɪkrɒn/ |  |  |  | 
18 | $\pi$ | \pi | /paɪ/ |  |  |  | 
19 | $\varpi$ | \varpi | /paɪ/ |  |  |  | 
20 | $\rho$ | \rho | /roʊ/ |  |  |  | 
21 | $\varrho$ | \varrho | /roʊ/ |  |  |  | 
22 | $\sigma$ | \sigma | /ˈsɪɡmə/ |  |  |  | 
23 | $\varsigma$ | \varsigma | /ˈsɪɡmə/ |  |  |  | 
24 | $\tau$ | \tau | /taʊ, tɔː/ |  |  |  | 
25 | $\upsilon$ | \upsilon | /ˈʌpsɪlɒn/ |  |  |  | 
26 | $\phi$ | \phi | /faɪ/ |  |  |  | 
27 | $\varphi$ | \varphi | /faɪ/ |  |  |  | 
28 | $\chi$ | \chi | /kaɪ/ |  |  |  | 
29 | $\psi$ | \psi | /psaɪ/ |  |  |  | 
30 | $\omega$ | \omega | /oʊˈmeɪɡə/ |  |  |  | 

**注意:** MathJax支持的大写希腊字母有限，如需其他（如大写Alpha），可使用**罗马体**转换，如`\mathrm{A}`表示大写Alpha：$\mathrm{A}$。

##### 2.1.2 希伯来字母 Hebrew alphabet
序号 | 图标 | LaTeX | 英文
:----: | :----: | :---- | :----
1 | $\aleph$ | \aleph | aleph
2 | $\beth$ | \beth  | beth 
3 | $\gimel$ | \gimel | gimel
4 | $\daleth$ | \daleth | daleth

##### 2.1.3 二元运算符 Binary operations
序号 | 图标 | LaTeX | 序号 | 图标 | LaTeX
:----: | :----: | :---- | :----: | :----: | :----
1 | $+$ | + | 20 | $\bullet$ | \bullet
2 | $-$ | - | 21 | $\oplus$ | \oplus
3 | $\times$ | \times | 22 | $\ominus$ | \ominus
4 | $\div$ | \div | 23 | $\odot$ | \odot
5 | $\pm$ | \pm | 24 | $\oslash$ | \oslash
6 | $\mp$ | \mp | 25 | $\otimes$ | \otimes
7 | $\triangleleft$ | \triangleleft | 26 | $\bigcirc$ | \bigcirc
8 | $\triangleright$ | \triangleright | 27 | $\diamond$ | \diamond
9 | $\cdot$ | \cdot | 28 | $\uplus$ | \uplus
10 | $\setminus$ | \setminus | 29 | $\bigtriangleup$ | \bigtriangleup
11 | $\star$ | \star | 30 | $\bigtriangledown$ | \bigtriangledown
12 | $\ast$ | \ast | 31 | $\lhd$ | \lhd
13 | $\cup$ | \cup | 32 | $\rhd$ | \rhd
14 | $\cap$ | \cap | 33 | $\unlhd$ | \unlhd
15 | $\sqcup$ | \sqcup | 34 | $\unrhd$ | \unrhd
16 | $\sqcap$ | \sqcap | 35 | $\amalg$ | \amalg
17 | $\vee$ | \vee | 36 | $\wr$ | \wr
18 | $\wedge$ | \wedge | 37 | $\dagger$ | \dagger
19 | $\circ$ | \circ | 38 | $\ddagger$ | \ddagger


##### 2.1.4 二元关系符 Binary relations
序号 | 图标 | LaTeX | 序号 | 图标 | LaTeX
:----: | :----: | :---- | :----: | :----: | :----
1 | $=$ | = | 49 | $\gneq$ | \gneq
2 | $\ne$ | \ne | 50 | $\geqq$ | \geqq
3 | $\neq$ | \neq | 51 | $\ngeq$ | \ngeq
4 | $\equiv$ | \equiv | 52 | $\ngeqq$ | \ngeqq
5 | $\not\equiv$ | \not\equiv | 53 | $\gneqq$ | \gneqq
6 | $\doteq$ | \doteq | 54 | $\gvertneqq$ | \gvertneqq
7 | $\doteqdot$ | \doteqdot | 55 | $\lessgtr$ | \lessgtr
8 | $\overset{\underset{\mathrm{def}}{}}{=}$ | \overset{\underset{\mathrm{def}}{}}{=} | 56 | $\lesseqgtr$ | \lesseqgtr
9 | $:=$ | := | 57 | $\lesseqqgtr$ | \lesseqqgtr
10 | $\sim$ | \sim | 58 | $\gtrless$ | \gtrless
11 | $\nsim$ | \nsim | 59 | $\gtreqless$ | \gtreqless
12 | $\backsim$ | \backsim | 60 | $\gtreqqless$ | \gtreqqless
13 | $\thicksim$ | \thicksim | 61 | $\leqslant$ | \leqslant
14 | $\simeq$ | \simeq | 62 | $\nleqslant$ | \nleqslant
15 | $\backsimeq$ | \backsimeq | 63 | $\eqslantless$ | \eqslantless
16 | $\eqsim$ | \eqsim | 64 | $\geqslant$ | \geqslant
17 | $\cong$ | \cong | 65 | $\ngeqslant$ | \ngeqslant
18 | $\ncong$ | \ncong | 66 | $\eqslantgtr$ | \eqslantgtr
19 | $\approx$ | \approx | 67 | $\lesssim$ | \lesssim
20 | $\thickapprox$ | \thickapprox | 68 | $\lnsim$ | \lnsim
21 | $\approxeq$ | \approxeq | 69 | $\lessapprox$ | \lessapprox
22 | $\asymp$ | \asymp | 70 | $\lnapprox$ | \lnapprox
23 | $\propto$ | \propto | 71 | $\gtrsim$ | \gtrsim
24 | $\varpropto$ | \varpropto | 72 | $\gnsim$ | \gnsim
25 | $<$ | < | 73 | $\gtrapprox$ | \gtrapprox
26 | $\nless$ | \nless | 74 | $\gnapprox$ | \gnapprox
27 | $\ll$ | \ll | 75 | $\prec$ | \prec
28 | $\not\ll$ | \not\ll | 76 | $\nprec$ | \nprec
29 | $\lll$ | \lll | 77 | $\preceq$ | \preceq
30 | $\not\lll$ | \not\lll | 78 | $\npreceq$ | \npreceq
31 | $\lessdot$ | \lessdot | 79 | $\precneqq$ | \precneqq
32 | $>$ | > | 80 | $\succ$ | \succ
33 | $\ngtr$ | \ngtr | 81 | $\nsucc$ | \nsucc
34 | $\gg$ | \gg | 82 | $\succeq$ | \succeq
35 | $\not\gg$ | \not\gg | 83 | $\nsucceq$ | \nsucceq
36 | $\ggg$ | \ggg | 84 | $\succneqq$ | \succneqq
37 | $\not\ggg$ | \not\ggg | 85 | $\preccurlyeq$ | \preccurlyeq
38 | $\gtrdot$ | \gtrdot | 86 | $\curlyeqprec$ | \curlyeqprec
39 | $\le$ | \le | 87 | $\succcurlyeq$ | \succcurlyeq
40 | $\leq$ | \leq | 88 | $\curlyeqsucc$ | \curlyeqsucc
41 | $\lneq$ | \lneq | 89 | $\precsim$ | \precsim
42 | $\leqq$ | \leqq | 90 | $\precnsim$ | \precnsim
43 | $\nleq$ | \nleq | 91 | $\precapprox$ | \precapprox
44 | $\nleqq$ | \nleqq | 92 | $\precnapprox$ | \precnapprox
45 | $\lneqq$ | \lneqq | 93 | $\succsim$ | \succsim
46 | $\lvertneqq$ | \lvertneqq | 94 | $\succnsim$ | \succnsim
47 | $\ge$ | \ge | 95 | $\succapprox$ | \succapprox
48 | $\geq$ | \geq | 96 | $\succnapprox$ | \succnapprox

##### 2.1.5 几何符号 Geometric symbols
序号 | 图标 | LaTeX | 序号 | 图标 | LaTeX
:----: | :----: | :---- | :----: | :----: | :----
1 | $\parallel$ | \parallel | 14 | $\lozenge$ | \lozenge
2 | $\nparallel$ |  \nparallel | 15 | $\blacklozenge$ |  \blacklozenge
3 | $\shortparallel$ |  \shortparallel | 16 | $\bigstar$ |  \bigstar
4 | $\nshortparallel$ |  \nshortparallel | 17 | $\bigcirc$ | \bigcirc
5 | $\perp$ | \perp | 18 | $\triangle$ |  \triangle
6 | $\angle$ |  \angle | 19 | $\bigtriangleup$ |  \bigtriangleup
7 | $\sphericalangle$ |  \sphericalangle | 20 | $\bigtriangledown$ |  \bigtriangledown
8 | $\measuredangle$ |  \measuredangle | 21 | $\vartriangle$ | \vartriangle
9 | $45^\circ$ |  45^\circ | 22 | $\triangledown$ |  \triangledown
10 | $\Box$ | \Box | 23 | $\blacktriangle$ | \blacktriangle
11 | $\blacksquare$ |  \blacksquare | 24 | $\blacktriangledown$ |  \blacktriangledown
12 | $\diamond$ |  \diamond | 25 | $\blacktriangleleft$ |  \blacktriangleleft
13 | $\Diamond$ |  \Diamond \lozenge | 26 | $\blacktriangleright$ |  \blacktriangleright

##### 2.1.6 逻辑符号 Logic symbols
序号 | 图标 | LaTeX | 序号 | 图标 | LaTeX
:----: | :----: | :---- | :----: | :----: | :----
1 | $\forall$ | \forall | 20 | $\neg$ | \neg
2 | $\exists$ | \exists | 21 | $\not\operatorname{R}$ | \not\operatorname{R}
3 | $\nexists$ | \nexists | 22 | $\bot$ | \bot
4 | $\therefore$ | \therefore | 23 | $\top$ | \top
5 | $\because$ | \because | 24 | $\vdash$ | \vdash
6 | $\And$ | \And | 25 | $\dashv$ | \dashv
7 | $\lor$ | \lor | 26 | $\vDash$ | \vDash
8 | $\vee$ | \vee | 27 | $\Vdash$ | \Vdash
9 | $\curlyvee$ | \curlyvee | 28 | $\models$ | \models
10 | $\bigvee$ | \bigvee | 29 | $\Vvdash$ | \Vvdash
11 | $\land$ | \land | 30 | $\nvdash$ | \nvdash
12 | $\wedge$ | \wedge | 31 | $\nVdash$ | \nVdash
13 | $\curlywedge$ | \curlywedge | 32 | $\nvDash$ | \nvDash
14 | $\bigwedge$ | \bigwedge | 33 | $\nVDash$ | \nVDash
15 | $\bar{q}$ | \bar{q} | 34 | $\ulcorner$ | \ulcorner
16 | $\bar{abc}$ | \bar{abc} | 35 | $\urcorner$ | \urcorner
17 | $\overline{q}$ | \overline{q} | 36 | $\llcorner$ | \llcorner
18 | $\overline{abc}$ | \overline{abc} | 37 | $\lrcorner$ | \lrcorner
19 | $\lnot$ | \lnot | 

##### 2.1.7 集合 Sets
序号 | 图标 | LaTeX | 序号 | 图标 | LaTeX
:----: | :----: | :---- | :----: | :----: | :----
1 | $\{\}$ | \{\} | 23 | $\sqsubset$ | \sqsubset
2 | $\emptyset$ | \emptyset | 24 | $\supset$ | \supset
3 | $\varnothing$ | \varnothing | 25 | $\Supset$ | \Supset
4 | $\in$ | \in | 26 | $\sqsupset$ | \sqsupset
5 | $\notin$ | \notin | 27 | $\subseteq$ | \subseteq
6 | $\ni$ | \ni | 28 | $\nsubseteq$ | \nsubseteq
7 | $\cap$ | \cap | 29 | $\subsetneq$ | \subsetneq
8 | $\Cap$ | \Cap | 30 | $\varsubsetneq$ | \varsubsetneq
9 | $\sqcap$ | \sqcap | 31 | $\sqsubseteq$ | \sqsubseteq
10 | $\bigcap$ | \bigcap | 32 | $\supseteq$ | \supseteq
11 | $\cup$ | \cup | 33 | $\nsupseteq$ | \nsupseteq
12 | $\Cup$ | \Cup | 34 | $\supsetneq$ | \supsetneq
13 | $\sqcup$ | \sqcup | 35 | $\varsupsetneq$ | \varsupsetneq
14 | $\bigcup$ | \bigcup | 36 | $\sqsupseteq$ | \sqsupseteq
15 | $\bigsqcup$ | \bigsqcup | 37 | $\subseteqq$ | \subseteqq
16 | $\uplus$ | \uplus | 38 | $\nsubseteqq$ | \nsubseteqq
17 | $\biguplus$ | \biguplus | 39 | $\subsetneqq$ | \subsetneqq
18 | $\setminus$ | \setminus | 40 | $\varsubsetneqq$ | \varsubsetneqq
19 | $\smallsetminus$ | \smallsetminus | 41 | $\supseteqq$ | \supseteqq
20 | $\times$ | \times | 42 | $\nsupseteqq$ | \nsupseteqq
21 | $\subset$ | \subset | 43 | $\supsetneqq$ | \supsetneqq
22 | $\Subset$ | \Subset | 44 | $\varsupsetneqq$ | \varsupsetneqq

##### 2.1.8 箭头 Arrows
序号 | 图标 | LaTeX | 序号 | 图标 | LaTeX
:----: | :----: | :---- | :----: | :----: | :----
1 | $\Rrightarrow$ | \Rrightarrow | 36 | $\longmapsto$ | \longmapsto
2 | $\Lleftarrow$ | \Lleftarrow | 37 | $\rightharpoonup$ | \rightharpoonup
3 | $\Rightarrow$ | \Rightarrow | 38 | $\rightharpoondown$ | \rightharpoondown
4 | $\nRightarrow$ | \nRightarrow | 39 | $\leftharpoonup$ | \leftharpoonup
5 | $\Longrightarrow$ | \Longrightarrow | 40 | $\leftharpoondown$ | \leftharpoondown
6 | $\implies$ | \implies | 41 | $\upharpoonleft$ | \upharpoonleft
7 | $\Leftarrow$ | \Leftarrow | 42 | $\upharpoonright$ | \upharpoonright
8 | $\nLeftarrow$ | \nLeftarrow | 43 | $\downharpoonleft$ | \downharpoonleft
9 | $\Longleftarrow$ | \Longleftarrow | 44 | $\downharpoonright$ | \downharpoonright
10 | $\Leftrightarrow$ | \Leftrightarrow | 45 | $\rightleftharpoons$ | \rightleftharpoons
11 | $\nLeftrightarrow$ | \nLeftrightarrow | 46 | $\leftrightharpoons$ | \leftrightharpoons
12 | $\Longleftrightarrow$ | \Longleftrightarrow | 47 | $\curvearrowleft$ | \curvearrowleft
13 | $\iff$ | \iff | 48 | $\circlearrowleft$ | \circlearrowleft
14 | $\Uparrow$ | \Uparrow | 49 | $\Lsh$ | \Lsh
15 | $\Downarrow$ | \Downarrow | 50 | $\upuparrows$ | \upuparrows
16 | $\Updownarrow$ | \Updownarrow | 51 | $\rightrightarrows$ | \rightrightarrows
17 | $\rightarrow$ | \rightarrow | 52 | $\rightleftarrows$ | \rightleftarrows
18 | $\to$ | \to | 53 | $\rightarrowtail$ | \rightarrowtail
19 | $\nrightarrow$ | \nrightarrow | 54 | $\looparrowright$ | \looparrowright
20 | $\longrightarrow$ | \longrightarrow | 55 | $\curvearrowright$ | \curvearrowright
21 | $\leftarrow$ | \leftarrow | 56 | $\circlearrowright$ | \circlearrowright
22 | $\gets$ | \gets | 57 | $\Rsh$ | \Rsh
23 | $\nleftarrow$ | \nleftarrow | 58 | $\downdownarrows$ | \downdownarrows
24 | $\longleftarrow$ | \longleftarrow | 59 | $\leftleftarrows$ | \leftleftarrows
25 | $\leftrightarrow$ | \leftrightarrow | 60 | $\leftrightarrows$ | \leftrightarrows
26 | $\nleftrightarrow$ | \nleftrightarrow | 61 | $\leftarrowtail$ | \leftarrowtail
27 | $\longleftrightarrow$ | \longleftrightarrow | 62 | $\looparrowleft$ | \looparrowleft
28 | $\uparrow$ | \uparrow | 63 | $\hookrightarrow$ | \hookrightarrow
29 | $\downarrow$ | \downarrow | 64 | $\hookleftarrow$ | \hookleftarrow
30 | $\updownarrow$ | \updownarrow | 65 | $\multimap$ | \multimap
31 | $\nearrow$ | \nearrow | 66 | $\leftrightsquigarrow$ | \leftrightsquigarrow
32 | $\swarrow$ | \swarrow | 67 | $\rightsquigarrow$ | \rightsquigarrow
33 | $\nwarrow$ | \nwarrow | 68 | $\twoheadrightarrow$ | \twoheadrightarrow
34 | $\searrow$ | \searrow | 69 | $\twoheadleftarrow$ | \twoheadleftarrow
35 | $\mapsto$ | \mapsto | 

##### 2.1.9 特殊 Special
序号 | 图标 | LaTeX | 序号 | 图标 | LaTeX
:----: | :----: | :---- | :----: | :----: | :----
1 | $\infty$ | \infty | 33 | $\flat$ | \flat
2 | $\aleph$ | \aleph | 34 | $\natural$ | \natural
3 | $\complement$ | \complement | 35 | $\sharp$ | \sharp
4 | $\backepsilon$ | \backepsilon | 36 | $\diagup$ | \diagup
5 | $\eth$ | \eth | 37 | $\diagdown$ | \diagdown
6 | $\Finv$ | \Finv | 38 | $\centerdot$ | \centerdot
7 | $\hbar$ | \hbar | 39 | $\ltimes$ | \ltimes
8 | $\Im$ | \Im | 40 | $\rtimes$ | \rtimes
9 | $\imath$ | \imath | 41 | $\leftthreetimes$ | \leftthreetimes
10 | $\jmath$ | \jmath | 42 | $\rightthreetimes$ | \rightthreetimes
11 | $\Bbbk$ | \Bbbk | 43 | $\eqcirc$ | \eqcirc
12 | $\ell$ | \ell | 44 | $\circeq$ | \circeq
13 | $\mho$ | \mho | 45 | $\triangleq$ | \triangleq
14 | $\wp$ | \wp | 46 | $\bumpeq$ | \bumpeq
15 | $\Re$ | \Re | 47 | $\Bumpeq$ | \Bumpeq
16 | $\circledS$ | \circledS | 48 | $\doteqdot$ | \doteqdot
17 | $\amalg$ | \amalg | 49 | $\risingdotseq$ | \risingdotseq
18 | $\%$ | \% | 50 | $\fallingdotseq$ | \fallingdotseq
19 | $\dagger$ | \dagger | 51 | $\intercal$ | \intercal
20 | $\ddagger$ | \ddagger | 52 | $\barwedge$ | \barwedge
21 | $\ldots$ | \ldots | 53 | $\veebar$ | \veebar
22 | $\cdots$ | \cdots | 54 | $\doublebarwedge$ | \doublebarwedge
23 | $\smile$ | \smile | 55 | $\between$ | \between
24 | $\frown$ | \frown | 56 | $\pitchfork$ | \pitchfork
25 | $\wr$ | \wr | 57 | $\vartriangleleft$ | \vartriangleleft
26 | $\triangleleft$ | \triangleleft | 58 | $\ntriangleleft$ | \ntriangleleft
27 | $\triangleright$ | \triangleright | 59 | $\vartriangleright$ | \vartriangleright
28 | $\diamondsuit$ | \diamondsuit | 60 | $\ntriangleright$ | \ntriangleright
29 | $\heartsuit$ | \heartsuit | 61 | $\trianglelefteq$ | \trianglelefteq
30 | $\clubsuit$ | \clubsuit | 62 | $\ntrianglelefteq$ | \ntrianglelefteq
31 | $\spadesuit$ | \spadesuit | 63 | $\trianglerighteq$ | \trianglerighteq
32 | $\Game$ | \Game | 64 | $\ntrianglerighteq$ | \ntrianglerighteq

#### 2.2 运算与函数 Operations & Functions

##### 2.2.1 分数 Fractions
类型 | 样式 | LaTeX
:---- | :---- | :----
分数<br/>Fractions | $\frac{2}{4}x=0.5x$ | \frac{2}{4}x=0.5x or {2 \over 4}x=0.5x 
小型分数<br/>Small fractions (force \textstyle) | $\tfrac{2}{4}x = 0.5x$ | \tfrac{2}{4}x = 0.5x 
大型分数（不嵌套）<br/>Large (normal) fractions (force \displaystyle) | $\dfrac{2}{4} = 0.5 \qquad \dfrac{2}{c + \dfrac{2}{d + \dfrac{2}{4}}} = a$ | \dfrac{2}{4} = 0.5 \qquad \dfrac{2}{c + \dfrac{2}{d + \dfrac{2}{4}}} = a
大型分数（嵌套）<br/>Large (nested) fractions | $\cfrac{2}{c + \cfrac{2}{d + \cfrac{2}{4}}} = a$ | \cfrac{2}{c + \cfrac{2}{d + \cfrac{2}{4}}} = a
约分线的使用<br/>Cancellations in fractions | <img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/cancel3.png" alt="cancel3" style="zoom:28%;" /> | \cfrac{x}{1 + \cfrac{\cancel{y}}{\cancel{y}}} = \cfrac{x}{2}

**注意：** 其中`\cancel`命令需要**cancel扩展包**支持，**cancel扩展包**是一款自定义宏包，如需使用请在公式页面右上角【设置】处勾选后使用。

##### 2.2.2 标准数值函数 Standard numerical functions
样式 | LaTeX
:---- | :----
$\exp_a b = a^b, \exp b = e^b, 10^m$ | \exp_a b = a^b, \exp b = e^b, 10^m
$\ln c, \lg d = \log e, \log_{10} f$ | \ln c, \lg d = \log e, \log_{10} f
$\sin a, \cos b, \tan c, \cot d, \sec e, \csc f$ | \sin a, \cos b, \tan c, \cot d, \sec e, \csc f
$\arcsin a, \arccos b, \arctan c$ | \arcsin a, \arccos b, \arctan c
$\operatorname{arccot} d, \operatorname{arcsec} e, \operatorname{arccsc} f$ | \operatorname{arccot} d, \operatorname{arcsec} e, \operatorname{arccsc} f 
$\sinh a, \cosh b, \tanh c, \coth d$ | \sinh a, \cosh b, \tanh c, \coth d
$\operatorname{sh}k, \operatorname{ch}l, \operatorname{th}m, \operatorname{coth}n$ | \operatorname{sh}k, \operatorname{ch}l, \operatorname{th}m, \operatorname{coth}n
$\operatorname{argsh}o, \operatorname{argch}p, \operatorname{argth}q$ | \operatorname{argsh}o, \operatorname{argch}p, \operatorname{argth}q
$\operatorname{sgn}r, \left\vert s \right\vert$ | \operatorname{sgn}r, \left\vert s \right\vert 
$\min(x,y), \max(x,y)$ | \min(x,y), \max(x,y)

**注意：**LaTeX和MathJax支持的操作符有限，如有特殊操作符，可以使用`\operatorname{}` 命令自定义，例如

```
\operatorname{mydefine}x
```
$$
\operatorname{mydefine}x
$$

##### 2.2.3 根式 Radicals

| 样式                          | LaTeX                       |
| :---------------------------- | :-------------------------- |
| $\surd$                       | \surd                       |
| $\sqrt{\pi}$                  | \sqrt{\pi}                  |
| $\sqrt[n]{\pi}$               | \sqrt[n]{\pi}               |
| $\sqrt[3]{\frac{x^3+y^3}{2}}$ | \sqrt[3]{\frac{x^3+y^3}{2}} |

##### 2.2.4 微分与导数 Differentials and derivatives

| 样式                                                         | LaTeX                                                        |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| $dt, \mathrm{d}t, \partial t, \nabla\psi$                    | dt, \mathrm{d}t, \partial t, \nabla\psi                      |
| $dy/dx, \mathrm{d}y/\mathrm{d}x, \frac{dy}{dx}, \frac{\mathrm{d}y}{\mathrm{d}x}, \frac{\partial^2}{\partial x_1\partial x_2}y$ | dy/dx, \mathrm{d}y/\mathrm{d}x, \frac{dy}{dx}, \frac{\mathrm{d}y}{\mathrm{d}x}, \frac{\partial^2}{\partial x_1\partial x_2}y |
| $\prime, \backprime, f^\prime, f', f'', f^{(3)}, \dot y, \ddot y$ | \prime, \backprime, f^\prime, f', f'', f^{(3)}, \dot y, \ddot y |

##### 2.2.5 同余与模算术 Modular arithmetic

| 样式                                   | LaTeX                                |
| :------------------------------------- | :----------------------------------- |
| $s_k \equiv 0 \pmod{m}$                | s_k \equiv 0 \pmod{m}                |
| $a \bmod b$                            | a \bmod b                            |
| $\gcd(m, n), \operatorname{lcm}(m, n)$ | \gcd(m, n), \operatorname{lcm}(m, n) |
| $\mid, \nmid, \shortmid, \nshortmid$   | \mid, \nmid, \shortmid, \nshortmid   |

##### 2.2.6 极限 Limits

| 样式                                | LaTeX                             |
| :---------------------------------- | :-------------------------------- |
| $\lim_{n \to \infty}x_n$            | \lim_{n \to \infty}x_n            |
| $\textstyle \lim_{n \to \infty}x_n$ | \textstyle \lim_{n \to \infty}x_n |

##### 2.2.7 界限与投影 Bounds and Projections

| 样式                                     | LaTeX                                  |
| :--------------------------------------- | :------------------------------------- |
| $\min x, \max y, \inf s, \sup t$         | \min x, \max y, \inf s, \sup t         |
| $\lim u, \liminf v, \limsup w$           | \lim u, \liminf v, \limsup w           |
| $\dim p, \deg q, \det m, \ker\phi$       | \dim p, \deg q, \det m, \ker\phi       |
| $\Pr j, \hom l, \lVert z \rVert, \arg z$ | \Pr j, \hom l, \lVert z \rVert, \arg z |

##### 2.2.8 积分 Integral

| 样式                                        | LaTeX                                     |
| :------------------------------------------ | :---------------------------------------- |
| $\int\limits_{1}^{3}\frac{e^3/x}{x^2}\, dx$ | \int\limits_{1}^{3}\frac{e^3/x}{x^2}\, dx |
| $\int_{1}^{3}\frac{e^3/x}{x^2}\, dx$        | \int_{1}^{3}\frac{e^3/x}{x^2}\, dx        |
| $\textstyle \int\limits_{-N}^{N} e^x dx$    | \textstyle \int\limits_{-N}^{N} e^x dx    |
| $\textstyle \int_{-N}^{N} e^x dx$           | \textstyle \int_{-N}^{N} e^x dx           |
| $\iint\limits_D dx\,dy$                     | \iint\limits_D dx\,dy                     |
| $\iiint\limits_E dx\,dy\,dz$                | \iiint\limits_E dx\,dy\,dz                |
| $\iiiint\limits_F dx\,dy\,dz\,dt$           | \iiiint\limits_F dx\,dy\,dz\,dt           |
| $\int_{(x,y)\in C} x^3\, dx + 4y^2\, dy$    | \int_{(x,y)\in C} x^3\, dx + 4y^2\, dy    |
| $\oint_{(x,y)\in C} x^3\, dx + 4y^2\, dy$   | \oint_{(x,y)\in C} x^3\, dx + 4y^2\, dy   |

**注意：**积分符号可以使用`\int_{}^{}`命令调用，如需双重积分符号只需将`int`替换成`iint`即可，以此类推，最高支持四重。曲线积分可使用`\oint`命令调用，但曲面积分符号在MathJax环境中并不支持`\oiint`的用法，但仍可通过`\unicode{}`命令，即Unicode代码的方式进行调用（前提是您需要在设置中打开Unicode扩展），具体使用方法如下：

```
\unicode{8751}  \unicode{x222F}_C %曲面积分符号的Unicode码十进制为8751,十六进制为x222F(注意x标识符)
```

<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/unicode2.png" alt="unicode2" style="zoom:95%;" />

```
\unicode{8752}  \unicode{x2230}_C %三维曲面积分符号的Unicode码十进制为8752,十六进制为x2230
```

<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/unicode3.png" alt="unicode3" style="zoom:85%;" />

其他积分符号：

```
\unicode{8753} \unicode{x2231}_c
\unicode{8754} \unicode{x2232}_c
\unicode{8755} \unicode{x2233}_c
```

<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/unicode4.png" alt="unicode4" style="zoom:75%;" />



##### 2.2.9 其他大型运算 Large operators

| 类别           | 样式                           | LaTeX                        |
| :------------- | :----------------------------- | :--------------------------- |
| 求和 Summation | $$\sum_{a}^{b}$$              | \sum_{a}^{b}                 |
| 求和 Summation | $$\textstyle \sum_{a}^{b}$$    | \textstyle \sum_{a}^{b}      |
| 连乘积 Product | $$\prod_{a}^{b}$$              | \prod_{a}^{b}                |
| 连乘积 Product | $$\textstyle \prod_{a}^{b}$$   | \textstyle \prod_{a}^{b}     |
| 余积 Coproduct  | $$\coprod_{a}^{b}$$            | \coprod_{a}^{b}              |
| 余积 Coproduct          | $$\textstyle \coprod_{a}^{b}$$ | \textstyle \coprod_{a}^{b}   |
| 并集 Union          | $$\bigcup_{a}^{b}$$            | \bigcup_{a}^{b}              |
| 并集 Union          | $$\textstyle \bigcup_{a}^{b}$$ | \textstyle \bigcup_{a}^{b}   |
| 交集 Intersection          | $$\bigcap_{a}^{b}$$            | \bigcap_{a}^{b}              |
| 交集 Intersection         | $$\textstyle \bigcap_{a}^{b}$$ | \textstyle \bigcap_{a}^{b}   |
| 析取 Disjunction          | $$\bigvee_{a}^{b}$$            | \bigvee_{a}^{b}              |
| 析取 Disjunction          | $$\textstyle \bigvee_{a}^{b}$$ | \textstyle \bigvee_{a}^{b}   |
| 合取 Conjunction          | $$\bigwedge_{a}^{b}$$          | \bigwedge_{a}^{b}            |
| 合取 Conjunction          | $$\textstyle \bigwedge_{a}^{b}$$ | \textstyle \bigwedge_{a}^{b} |



#### 2.3 上下标 Sub & Super

类型 | 样式 | 代码
:---- | :---- | :----
上标 Superscript | $a^2, a^{x+3}$ | a^2, a^{x+3}
下标 Subscript | $a_2$ | a_2
组合 Grouping | $10^{30} a^{2+2}$ | 10^{30} a^{2+2}
 | $a_{i,j} b_{f'}$ | a_{i,j} b_{f'}
上下标混合Combining sub & super without and with horizontal separation | $x_2^3$ | x_2^3
 | ${x_2}^3$ | {x_2}^3
上标的上标 Super super | $10^{10^{8}}$ | 10^{10^{8}}
混合标识 Preceding and/or additional sub & super | $\sideset{_1^2}{_3^4}X_a^b$  | \sideset{_1^2}{_3^4}X_a^b
 | ${}_1^2\!\Omega_3^4$ | {}_1^2\!\Omega_3^4
顶标底标 Stacking | $\overset{\alpha}{\omega}$ | \overset{\alpha}{\omega}
 | $\underset{\alpha}{\omega}$ | \underset{\alpha}{\omega}
 | $\overset{\alpha}{\underset{\gamma}{\omega}}$ | \overset{\alpha}{\underset{\gamma}{\omega}}
 | $\stackrel{\alpha}{\omega}$ | \stackrel{\alpha}{\omega}
导数 Derivatives | $x', y'', f', f''$ | x', y'', f', f''
 | $x^\prime, y^{\prime\prime}$ | x^\prime, y^{\prime\prime}
导数Derivative dots | $\dot{x}, \ddot{x}$ | \dot{x}, \ddot{x}
下划线、上划线与向量<br>Underlines, overlines, vectors | $\hat a \ \bar b \ \vec c$ | \hat a \ \bar b \ \vec c
 | $\overrightarrow{a b} \ \overleftarrow{c d} \ \widehat{d e f}$ | \overrightarrow{a b} \ \overleftarrow{c d} \ \widehat{d e f}
 | $\overline{g h i} \ \underline{j k l}$ | \overline{g h i} \ \underline{j k l}
弧度 Arc (workaround) | $\overset{\frown} {AB}$ | \overset{\frown} {AB}
箭头 Arrows | $A \xleftarrow{n+\mu-1} B \xrightarrow[T]{n\pm i-1} C$ | A \xleftarrow{n+\mu-1} B \xrightarrow[T]{n\pm i-1} C
大括号 Overbraces | $\overbrace{ 1+2+\cdots+100 }^{5050}$ | \overbrace{ 1+2+\cdots+100 }^{5050}
底部大括号 Underbraces | $\underbrace{ a+b+\cdots+z }_{26}$ | \underbrace{ a+b+\cdots+z }_{26}
求和运算 Sum | $$\sum_{k=1}^N k^2$$ | \sum_{k=1}^N k^2
文本模式下的求和运算 Sum (force \textstyle) | $$\textstyle \sum_{k=1}^N k^2$$ | \textstyle \sum_{k=1}^N k^2
分式中的求和运算 Sum in a fraction (default \textstyle) | $$\frac{\sum_{k=1}^N k^2}{a}$$ | \frac{\sum_{k=1}^N k^2}{a}
分式中的求和运算 Sum in a fraction (force \displaystyle) | $$\frac{\displaystyle \sum_{k=1}^N k^2}{a}$$ | \frac{\displaystyle \sum_{k=1}^N k^2}{a} 
分式中的求和运算 Sum in a fraction (alternative limits style) | $$\frac{\sum\limits^{^N}_{k=1} k^2}{a}$$ | \frac{\sum\limits^{^N}_{k=1} k^2}{a}
乘积运算 Product | $$\prod_{i=1}^N x_i$$ | \prod_{i=1}^N x_i
乘积运算 Product (force \textstyle) | $$\textstyle \prod_{i=1}^N x_i$$ | \textstyle \prod_{i=1}^N x_i
副乘运算 Coproduct | $$\coprod_{i=1}^N x_i$$ | \coprod_{i=1}^N x_i
副乘运算 Coproduct (force \textstyle) | $$\textstyle \coprod_{i=1}^N x_i$$ | \textstyle \coprod_{i=1}^N x_i
极限 Limit | $$\lim_{n \to \infty}x_n$$ | \lim_{n \to \infty}x_n
极限 Limit (force \textstyle) | $$\textstyle \lim_{n \to \infty}x_n$$ | \textstyle \lim_{n \to \infty}x_n
积分 Integral | $$\int\limits_{1}^{3}\frac{e^3/x}{x^2}\, dx$$ | \int\limits_{1}^{3}\frac{e^3/x}{x^2}\, dx
积分 Integral (alternative limits style) | $$\int_{1}^{3}\frac{e^3/x}{x^2}\, dx$$ | \int_{1}^{3}\frac{e^3/x}{x^2}\, dx
积分 Integral (force \textstyle) | $$\textstyle \int\limits_{-N}^{N} e^x dx$$ | \textstyle \int\limits_{-N}^{N} e^x dx
积分 Integral (force \textstyle, alternative limits style) | $$\textstyle \int_{-N}^{N} e^x dx$$ | \textstyle \int_{-N}^{N} e^x dx
双重积分 Double integral | $$\iint\limits_D dx\,dy$$ | \iint\limits_D dx\,dy
三重积分 Triple integral | $$\iiint\limits_E dx\,dy\,dz$$ | \iiint\limits_E dx\,dy\,dz
四重积分 Quadruple integral | $$\iiiint\limits_F dx\,dy\,dz\,dt$$ | \iiiint\limits_F dx\,dy\,dz\,dt
路径积分 Line or path integral | $$\int_{(x,y)\in C} x^3\, dx + 4y^2\, dy$$ | \int_{(x,y)\in C} x^3\, dx + 4y^2\, dy
环路积分 Closed line or path integral | $$\oint_{(x,y)\in C} x^3\, dx + 4y^2\, dy$$ | \oint_{(x,y)\in C} x^3\, dx + 4y^2\, dy
交集 Intersections | $$\bigcap_{i=1}^n E_i$$ | \bigcap_{i=1}^n E_i
并集 Unions | $$\bigcup_{i=1}^n E_i$$ | \bigcup_{i=1}^n E_i



#### 2.4 矩阵与多行列式 Matrices & Multilines

类型 | 样式 | LaTeX
:---- | :---- | :----
二项式系数<br/>Binomial coefficients | $\binom{n}{k}$ | \binom{n}{k}
小型二项式系数<br/>Small binomial coefficients (force \textstyle) | $\tbinom{n}{k}$ | \tbinom{n}{k}
大型二项式系数<br/>Large (normal) binomial coefficients (force \displaystyle) | $\dbinom{n}{k}$ | \dbinom{n}{k}
矩阵<br/>Matrices | $\begin{matrix}  x & y \\z & v\end{matrix}$ | \begin{matrix}<br>x & y \\\\ <br>z & v<br>\end{matrix} 
 | $\begin{vmatrix} x & y \\ z & v \end{vmatrix}$ | \begin{vmatrix}<br>x & y \\\\<br>z & v<br>\end{vmatrix} 
 | $\begin{Vmatrix} x & y \\ z & v \end{Vmatrix} $ | "\begin{Vmatrix}<br>x & y \\\\<br>z & v<br>\end{Vmatrix} 
 | $\begin{bmatrix} 0 & \cdots & 0 \\ \vdots & \ddots & \vdots \\ 0 & \cdots & 0 \end{bmatrix}$ | \begin{bmatrix}<br>0 & \cdots & 0 \\\\<br>\vdots & \ddots & \vdots \\\\<br>0 & \cdots & 0<br>\end{bmatrix} 
 | $\begin{Bmatrix} x & y \\ z & v \end{Bmatrix}$ | \begin{Bmatrix}<br>x & y \\\\<br>z & v<br>\end{Bmatrix} 
 | $\begin{pmatrix} x & y \\ z & v \end{pmatrix}$ | \begin{pmatrix}<br>x & y \\\\<br>z & v<br>\end{pmatrix} 
 | $\bigl( \begin{smallmatrix} a&b\\ c&d \end{smallmatrix} \bigr)$ | \bigl( \begin{smallmatrix}<br>a&b\\\\ <br/>c&d<br>\end{smallmatrix} \bigr) 
条件定义<br/>Case distinctions | $f(n) =\begin{cases} n/2, & \text{if }n\text{ is even} \\ 3n+1, & \text{if }n\text{ is odd} \end{cases}$ | f(n) =<br>\begin{cases}<br>n/2, & \text{if }n\text{ is even} \\\\<br>3n+1, & \text{if }n\text{ is odd}<br>\end{cases} 
多行等式<br>Multiline equations | $\begin{align} f(x) & = (a+b)^2 \\ & = a^2+2ab+b^2 \\ \end{align}$ | \begin{align} <br>f(x) & = (a+b)^2\\\\<br>& = a^2+2ab+b^2 \\\\<br>\end{align} 
 | $\begin{alignat}{2} f(x) & = (a-b)^2 \\ & = a^2-2ab+b^2 \\ \end{alignat}$ | \begin{alignat}{2}<br>f(x) & = (a-b)^2 \\\\<br>& = a^2-2ab+b^2 \\\\<br>\end{alignat} 
 | $\begin{array}{lcl} z & = & a \\ f(x,y,z) & = & x + y + z \end{array}$ | \begin{array}{lcl}<br>z & = & a \\\\<br>f(x,y,z) & = & x + y + z<br>\end{array} 
 | $\begin{array}{lcr} z & = & a \\ f(x,y,z) & = & x + y + z \end{array}$ | \begin{array}{lcr}<br>z & = & a \\\\<br>f(x,y,z) & = & x + y + z<br>\end{array} 
方程组<br/>Simultaneous equations | $\begin{cases} 3x + 5y + z \\ 7x - 2y + 4z \\ -6x + 3y + 2z \end{cases}$ | \begin{cases}<br>3x + 5y + z \\\\<br>7x - 2y + 4z \\\\<br>-6x + 3y + 2z<br>\end{cases} 
数组<br/>Arrays | $\begin{array}{ | c | c | c | } a & b & S \\ \hline 0&0&1\\ 0&1&1\\ 1&0&1\\ 1&1&0\\ \end{array}$ | \begin{array}{ \| c \| c \| c \| } a & b & S \\\\<br>\hline<br>0&0&1\\\\<br>0&1&1\\\\<br>1&0&1\\\\<br>1&1&0\\\\<br>\end{array} 

#### 2.5 括号 Brackets

常用的括号符号例如`( )[ ]{ }……`这些也可以在输入环境中直接使用：

```
2(x+y)=z
```

$$
2(x+y)=z
$$

但如果是在较大的表达式中这些符号就显得不合适了

```
( \frac{\pi}{2} )^n
```

$$
( \frac{\pi}{2} )^n
$$

正确用法应配合`\left`和`\right`命令使用。

```
\left ( \frac{\pi}{2} \right )^n
```

$$
\left ( \frac{\pi}{2} \right )^n
$$

具体可参考下表。

类型 | 样式 | LaTeX
:---- | :---- | :----
圆括号、小括号<br>Parentheses | $\left ( \frac{a}{b} \right )$ | \left ( \frac{a}{b} \right )
方括号、中括号<br/>Brackets | $\left [ \frac{a}{b} \right ] \quad \left \lbrack \frac{a}{b} \right \rbrack$ | \left [ \frac{a}{b} \right ] \quad<br>\left \lbrack \frac{a}{b} \right \rbrack
花括号、大括号<br/>Braces | $\left \{ \frac{a}{b} \right \} \quad \left \lbrace \frac{a}{b} \right \rbrace$ | \left \{ \frac{a}{b} \right \} \quad<br>\left \lbrace \frac{a}{b} \right \rbrace
角括号<br/>Angle brackets | $\left \langle \frac{a}{b} \right \rangle$ | \left \langle \frac{a}{b} \right \rangle
单竖线和双竖线<br/>Bars and double bars | $\left | \frac{a}{b} \right \vert \quad \left \Vert \frac{c}{d} \right \|$ | \left  \| \frac{a}{b} \right \vert \quad \left \Vert \frac{c}{d} \right \|
取整函数与取顶函数<br/>Floor and ceiling functions: | $\left \lfloor \frac{a}{b} \right \rfloor \quad \left \lceil \frac{c}{d} \right \rceil$ | \left \lfloor \frac{a}{b} \right \rfloor \quad<br>\left \lceil \frac{c}{d} \right \rceil
斜线与反斜线<br/>Slashes and backslashes | $\left / \frac{a}{b} \right \backslash$ | \left / \frac{a}{b} \right \backslash
上下箭头<br/>Up, down, and up-down arrows | $\left \uparrow \frac{a}{b} \right \downarrow \quad \left \Uparrow \frac{a}{b} \right \Downarrow \quad \left \updownarrow \frac{a}{b} \right \Updownarrow$ | \left \uparrow \frac{a}{b} \right \downarrow \quad<br>\left \Uparrow \frac{a}{b} \right \Downarrow \quad<br>\left \updownarrow \frac{a}{b} \right \Updownarrow
混合括号<br/>Delimiters can be mixed,as long as \left and \right match | $\left [ 0,1 \right )  \left \langle \psi \right  | $ | \left [ 0,1 \right )<br>\left \langle \psi \right  
如果您不希望某一侧括号显示，可以使用\left. 和 \right.（带有英文句号）<br/>Use \left. and \right. if you do not want a delimiter to appear | $\left . \frac{A}{B} \right \} \to X$ | \left . \frac{A}{B} \right \} \to X
括号的大小<br>Size of the delimiters (add "l" or "r" to indicate the side for proper spacing) | $( \bigl( \Bigl( \biggl( \Biggl( \dots \Biggr] \biggr] \Bigr] \bigr] ]$ | ( \bigl( \Bigl( \biggl( \Biggl( \dots \Biggr] \biggr] \Bigr] \bigr] ]
 | $\{ \bigl\{ \Bigl\{ \biggl\{ \Biggl\{ \dots \Biggr\rangle \biggr\rangle \Bigr\rangle \bigr\rangle \rangle$ | \{ \bigl\{ \Bigl\{ \biggl\{ \Biggl\{ \dots<br>\Biggr\rangle \biggr\rangle \Bigr\rangle \bigr\rangle \rangle
 | $\|  \big\|  \Big\|  \bigg\|  \Bigg\|  \dots \Bigg |  \bigg | \Big |  \big | |$ | \|  \big\|  \Big\|  \bigg\|  \Bigg\|  \dots \Bigg \|  \bigg \| \Big \|  \big \|
 | $\lfloor \bigl\lfloor \Bigl\lfloor \biggl\lfloor \Biggl\lfloor \dots \Biggr\rceil \biggr\rceil \Bigr\rceil \bigr\rceil \rceil$ | \lfloor \bigl\lfloor \Bigl\lfloor \biggl\lfloor \Biggl\lfloor \dots<br>\Biggr\rceil \biggr\rceil \Bigr\rceil \bigr\rceil \rceil 
 | $\uparrow \big\uparrow \Big\uparrow \bigg\uparrow \Bigg\uparrow \dots \Bigg\Downarrow \bigg\Downarrow \Big\Downarrow \big\Downarrow \Downarrow$ | \uparrow \big\uparrow \Big\uparrow \bigg\uparrow \Bigg\uparrow \dots<br>\Bigg\Downarrow \bigg\Downarrow \Big\Downarrow \big\Downarrow \Downarrow
 | $\updownarrow \big\updownarrow \Big\updownarrow \bigg\updownarrow \Bigg\updownarrow \dots \Bigg\Updownarrow \bigg\Updownarrow \Big\Updownarrow \big\Updownarrow \Updownarrow$ | \updownarrow \big\updownarrow \Big\updownarrow \bigg\updownarrow \Bigg\updownarrow \dots<br>\Bigg\Updownarrow \bigg\Updownarrow \Big\Updownarrow \big\Updownarrow \Updownarrow
 | $/ \big/ \Big/ \bigg/ \Bigg/ \dots \Bigg\backslash \bigg\backslash \Big\backslash \big\backslash \backslash$ | / \big/ \Big/ \bigg/ \Bigg/ \dots <br>\Bigg\backslash \bigg\backslash \Big\backslash \big\backslash \backslash



#### 2.6 空格与换行 Spacing & Line breaking

##### 2.6.1 空格 Spacing

MathJax能够自动处理大多数空格间距的大小，但如果您需要自己控制，可参考下表。

序号 | 样式 | LaTeX | 中文说明英文说明
:----: | :----: | :---- | :---- | :----
1 | $a \qquad b$ | a \qquad b | 双空格 | double quad space
2 | $a \quad b$ | a \quad b | 单空格 | quad space
3 | $a\ b$ | a\ b | 字符空格 | text space 
4 | $a \text{ } b$ | a \text{ } b | 文本模式中的字符空格 | text space in text mode
5 | $a\;b$ | a\;b | 大空格 | large space
6 | $a\,b$ | a\,b | 小空格 | small space
7 | $ab$ | ab | 极小空格(用于乘因子) | tiny space (use for multiplication of factors) 
8 | $a b$ | a b | 极小空格(用于区分其它语法) | tiny space (syntax space ignored) 
9 | $\mathit{ab}$ | \mathit{ab} | 没有空格(用于多字母变量) | no space (use for multi-letter variables) 
10 | $a\!b$ | a\!b |  负空格 | small negative space

##### 2.6.2 换行 Line breaking
在MathJax3.0中取消了使用`\\`进行强制换行的功能，因此本页面也采取同样的逻辑，默认为单行公式环境。`\\`强制换行命令只在支持多行编辑的数学环境中才起作用，如`eqnarray`环境、`align`环境、`array`环境、`matrix`环境等等。如您需要显示多行公式，请在此类环境中输入公式，具体用法参见章节[2.10](#2.10 LaTeX环境 LaTeX environments)。

#### 2.7 颜色 Colors
##### 2.7.1  字体颜色 Font colors
在公式中可以使用`\color{options}{math}`来调用颜色命令，第一个参数为颜色，第二个参数为公式或文本内容。例如:
```
{\color{Blue}x^2}+{\color{Orange}2x}-{\color{LimeGreen}1}
```
$$
{\color{Blue}x^2}+{\color{Orange}2x}-{\color{LimeGreen}1}
$$

```
x_{1,2}=\frac{{\color{Blue}-b}\pm\sqrt{\color{Red}b^2-4ac}}{\color{Green}2a }
```
$$
x_{1,2}=\frac{{\color{Blue}-b}\pm\sqrt{\color{Red}b^2-4ac}}{\color{Green}2a }
$$

**注意：** 使用`\color`命令时，请将需要设置颜色的部分用`{ }`整体扩住，以表明`\color`函数作用范围。

##### 2.7.2 背景颜色 Background color
在文本环境中可以使用`\colorbox{options}{text}`来调用背景颜色命令，第一个参数为颜色，第二个颜色为文本内容。例如：
```
\colorbox{yellow}{Thistext}
```
$$
\colorbox{yellow}{text}
$$

**注意：** 若需要在数学环境中使用`\colorbox{}{}`，请在第二个参数内加入`$\displaystyle + 公式$`，例如：

```
\colorbox{yellow}{$\displaystyle \frac{a}{b}$}`
```
$$
\colorbox{yellow}{$\displaystyle \frac{a}{b}$}
$$

或者您可以使用 **Bbox扩展** 来替换`\colorbox`命令，详见下条2.7.3。

##### 2.7.3 用Bbox扩展设置背景颜色 Setting background color with Bbox
Bbox扩展是一款自定义宏包，如需使用请在公式页面右上角【设置】处勾选后使用。
具体用法如下：
###### 2.7.3.1 设置背景颜色 Setting Background color

在公式中可以使用`\bbox[options]{math}`来调用背景颜色命令，第一个参数为颜色或大小，需注意用`[ ]`包围，第二个参数为公式。例如:
```
\bbox[red]{x+y}
```
<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/bbox1.png" alt="bbox1" style="zoom:15%;" />

###### 2.7.3.2 调整背景大小 Setting Background Size

默认情况下，背景大小为作用范围的最大边界，如需扩大背景，可在第一个参数中加入大小信息，例如：
```
\bbox[2pt]{x+y}  %设置透明背景，并增加2pt额外距离
```
<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/bbox2.png" alt="bbox2" style="zoom:15%;" />

```
\bbox[red,5pt]{x+y}  %设置红色背景，并增加5pt额外距离
```
<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/bbox3.png" alt="bbox3" style="zoom:15%;" />

##### 2.7.4 默认支持颜色 Colors supported

支 |  持   |  颜  | 色 
:--- | :--- | :--- | :--
${\color{Apricot}Apricot}$ | ${\color{Emerald}Emerald}$ | ${\color{OliveGreen}OliveGreen}$ | ${\color{RubineRed}RubineRed}$
${\color{Aquamarine}Aquamarine}$ | ${\color{ForestGreen}ForestGreen}$ | ${\color{Orange}Orange}$ | ${\color{Salmon}Salmon}$
${\color{Bittersweet}Bittersweet}$ | ${\color{Fuchsia}Fuchsia}$ | ${\color{OrangeRed}OrangeRed}$ | ${\color{SeaGreen}SeaGreen}$
${\color{Black}Black}$ | ${\color{Goldenrod}Goldenrod}$ | ${\color{Orchid}Orchid}$ | ${\color{Sepia}Sepia}$
${\color{Blue}Blue}$ | ${\color{Gray}Gray}$ | ${\color{Peach}Peach}$ | ${\color{SkyBlue}SkyBlue}$
${\color{BlueGreen}BlueGreen}$ | ${\color{Green}Green}$ | ${\color{Periwinkle}Periwinkle}$ | ${\color{SpringGreen}SpringGreen}$
${\color{BlueViolet}BlueViolet}$ | ${\color{GreenYellow}GreenYellow}$ | ${\color{PineGreen}PineGreen}$ | ${\color{Tan}Tan}$
${\color{BrickRed}BrickRed}$ | ${\color{JungleGreen}JungleGreen}$ | ${\color{Plum}Plum}$ | ${\color{TealBlue}TealBlue}$
${\color{Brown}Brown}$ | ${\color{Lavender}Lavender}$ | ${\color{ProcessBlue}ProcessBlue}$ | ${\color{Thistle}Thistle}$
${\color{BurntOrange}BurntOrange}$ | ${\color{LimeGreen}LimeGreen}$ | ${\color{Purple}Purple}$ | ${\color{Turquoise}Turquoise}$
${\color{CadetBlue}CadetBlue}$ | ${\color{Magenta}Magenta}$ | ${\color{RawSienna}RawSienna}$ | ${\color{Violet}Violet}$
${\color{CarnationPink}CarnationPink}$ | ${\color{Mahogany}Mahogany}$ | ${\color{Red}Red}$ | ${\color{VioletRed}VioletRed}$
${\color{Cerulean}Cerulean}$ | ${\color{Maroon}Maroon}$ | ${\color{RedOrange}RedOrange}$ | ${\color{White}White}$
${\color{CornflowerBlue}CornflowerBlue}$ | ${\color{Melon}Melon}$ | ${\color{RedViolet}RedViolet}$ | ${\color{WildStrawberry}WildStrawberry}$
${\color{Cyan}Cyan}$ | ${\color{MidnightBlue}MidnightBlue}$ | ${\color{Rhodamine}Rhodamine}$ | ${\color{Yellow}Yellow}$
${\color{Dandelion}Dandelion}$ | ${\color{Mulberry}Mulberry}$ | ${\color{RoyalBlue}RoyalBlue}$ | ${\color{YellowGreen}YellowGreen}$
${\color{DarkOrchid}DarkOrchid}$ | ${\color{NavyBlue}NavyBlue}$ | ${\color{RoyalPurple}RoyalPurple}$ | ${\color{YellowOrange}YellowOrange}$

##### 2.7.5 使用RGB颜色 Use RGB color
如需在`\color`命令中使用自选RGB颜色，可使用`{\color[RGB]{0,0,0} } `命令，例如：
```
{\color[RGB]{0,200,0} e^{i \pi} + 1 = 0} 
```

$$
{\color[RGB]{0,200,0} e^{i \pi} + 1 = 0}
$$

##### 2.7.6 自定义颜色 Custom colors
可使用`\definecolor`命令进行自定义颜色，例如：
```
\definecolor{mygreen}{RGB}{0,200,0} {\color{mygreen}e^{i \pi} + 1 = 0 } 
```
$$
\definecolor{mygreen}{RGB}{0,200,0} {\color{mygreen}e^{i \pi} + 1 = 0 }
$$


#### 2.8 字体字号 Fonts & Size

##### 2.8.1 字体 Fonts

如您需要替换公式内容的字体，可以点击工具栏下方的**【字体】**按钮进行相关操作。因有一些特定代码Mathjax3.0并没有相关支持，所以下表仅做参考。

样式 | LaTeX
:---- | :----
希腊字母 Greek alphabet|
$\mathrm{A} \mathrm{B} \Gamma \Delta \mathrm{E} \mathrm{Z} \mathrm{H} \Theta$ | \mathrm{A} \mathrm{B} \Gamma \Delta \mathrm{E} \mathrm{Z} \mathrm{H} \Theta 
$\mathrm{I} \mathrm{K} \Lambda \mathrm{M} \mathrm{N} \Xi \mathrm{O} \Pi$ | \mathrm{I} \mathrm{K} \Lambda \mathrm{M} \mathrm{N} \Xi \mathrm{O} \Pi 
$\mathrm{R} \Sigma \mathrm{T} \Upsilon \Phi \mathrm{X} \Psi \Omega$ | \mathrm{R} \Sigma \mathrm{T} \Upsilon \Phi \mathrm{X} \Psi \Omega 
$\alpha \beta \gamma \delta \epsilon \zeta \eta \theta$ | \alpha \beta \gamma \delta \epsilon \zeta \eta \theta
$\iota \kappa \lambda \mu \nu \xi \omicron \pi$ | \iota \kappa \lambda \mu \nu \xi \omicron \pi
$\rho \sigma \tau \upsilon \phi \chi \psi \omega$ | \rho \sigma \tau \upsilon \phi \chi \psi \omega
$\varGamma \varDelta \varTheta \varLambda \varXi \varPi \varSigma \varPhi \varUpsilon \varOmega$ | \varGamma \varDelta \varTheta \varLambda \varXi \varPi \varSigma \varPhi \varUpsilon \varOmega
$\varepsilon \digamma \varkappa \varpi \varrho \varsigma \vartheta \varphi$ | \varepsilon \digamma \varkappa \varpi \varrho \varsigma \vartheta \varphi
希伯来字母 Hebrew symbols |  
$\aleph \beth \gimel \daleth$ | \aleph \beth \gimel \daleth
黑板报体 Blackboard bold/scripts |  
$\mathbb{ABCDEFGHI}$ | \mathbb{ABCDEFGHI}
$\mathbb{JKLMNOPQR}$ | \mathbb{JKLMNOPQR}
$\mathbb{STUVWXYZ}$ | \mathbb{STUVWXYZ}
粗体 Boldface |  
$\mathbf{ABCDEFGHI}$ | \mathbf{ABCDEFGHI}
$\mathbf{JKLMNOPQR}$ | \mathbf{JKLMNOPQR}
$\mathbf{STUVWXYZ}$ | \mathbf{STUVWXYZ}
$\mathbf{abcdefghijklm}$ | \mathbf{abcdefghijklm}
$\mathbf{nopqrstuvwxyz}$ | \mathbf{nopqrstuvwxyz}
$\mathbf{0123456789}$ | \mathbf{0123456789}
粗体希腊字母 Boldface (Greek) |  
$\boldsymbol{\mathrm{A} \mathrm{B} \Gamma \Delta \mathrm{E} \mathrm{Z} \mathrm{H} \Theta}$ | \boldsymbol{\mathrm{A} \mathrm{B} \Gamma \Delta \mathrm{E} \mathrm{Z} \mathrm{H} \Theta} 
$\boldsymbol{\mathrm{I} \mathrm{K} \Lambda \mathrm{M} \mathrm{N} \Xi \mathrm{O} \Pi}$ | \boldsymbol{\mathrm{I} \mathrm{K} \Lambda \mathrm{M} \mathrm{N} \Xi \mathrm{O} \Pi} 
$\boldsymbol{\mathrm{R} \Sigma \mathrm{T} \Upsilon \Phi \mathrm{X} \Psi \Omega}$ | \boldsymbol{\mathrm{R} \Sigma \mathrm{T} \Upsilon \Phi \mathrm{X} \Psi \Omega} 
$\boldsymbol{\alpha \beta \gamma \delta \epsilon \zeta \eta \theta}$ | \boldsymbol{\alpha \beta \gamma \delta \epsilon \zeta \eta \theta}
$\boldsymbol{\iota \kappa \lambda \mu \nu \xi \omicron \pi}$ | \boldsymbol{\iota \kappa \lambda \mu \nu \xi \omicron \pi}
$\boldsymbol{\rho \sigma \tau \upsilon \phi \chi \psi \omega}$ | \boldsymbol{\rho \sigma \tau \upsilon \phi \chi \psi \omega}
$\boldsymbol{\varepsilon\digamma\varkappa\varpi}$ | \boldsymbol{\varepsilon\digamma\varkappa\varpi}
$\boldsymbol{\varrho\varsigma\vartheta\varphi}$ | \boldsymbol{\varrho\varsigma\vartheta\varphi}
斜体 Italics (拉丁字母默认default for Latin alphabet) |  
$\mathit{0123456789}$ | \mathit{0123456789}
罗马体 Roman typeface | Roman typeface
$\mathrm{ABCDEFGHI}$ | \mathrm{ABCDEFGHI}
$\mathrm{JKLMNOPQR}$ | \mathrm{JKLMNOPQR}
$\mathrm{STUVWXYZ}$ | \mathrm{STUVWXYZ}
$\mathrm{abcdefghijklm}$ | \mathrm{abcdefghijklm}
$\mathrm{nopqrstuvwxyz}$ | \mathrm{nopqrstuvwxyz}
$\mathrm{0123456789}$ | \mathrm{0123456789}
无衬线体 Sans serif |  
$\mathsf{ABCDEFGHI}$ | \mathsf{ABCDEFGHI}
$\mathsf{JKLMNOPQR}$ | \mathsf{JKLMNOPQR}
$\mathsf{STUVWXYZ}$ | \mathsf{STUVWXYZ}
$\mathsf{abcdefghijklm}$ | \mathsf{abcdefghijklm}
$\mathsf{nopqrstuvwxyz}$ | \mathsf{nopqrstuvwxyz}
$\mathsf{0123456789}$ | \mathsf{0123456789}
手写体 Calligraphy/花体 script |  
$\mathcal{ABCDEFGHI}$ | \mathcal{ABCDEFGHI}
$\mathcal{JKLMNOPQR}$ | \mathcal{JKLMNOPQR}
$\mathcal{STUVWXYZ}$ | \mathcal{STUVWXYZ}
德文尖角体 Fraktur typeface |  
$\mathfrak{ABCDEFGHI}$ | \mathfrak{ABCDEFGHI}
$\mathfrak{JKLMNOPQR}$ | \mathfrak{JKLMNOPQR}
$\mathfrak{STUVWXYZ}$ | \mathfrak{STUVWXYZ}
$\mathfrak{abcdefghijklm}$ | \mathfrak{abcdefghijklm}
$\mathfrak{nopqrstuvwxyz}$ | \mathfrak{nopqrstuvwxyz}
$\mathfrak{0123456789}$ | \mathfrak{0123456789}
小型手写体 Small scriptstyle text |  
${\scriptstyle\text{abcdefghijklm}}$ | {\scriptstyle\text{abcdefghijklm}}

##### 2.8.2 字号 Size

| 样式                              | LaTeX                           |
| :-------------------------------- | :------------------------------ |
| ${\tiny abc巨小tiny}$             | {\tiny abc巨小tiny}             |
| ${\scriptsize abc超小scriptsize}$ | {\scriptsize abc超小scriptsize} |
| ${\small abc小small}$             | {\small abc小small}             |
| ${\normalsize abc正常normal}$     | {\normalsize abc正常normal}     |
| ${\large abc大large}$             | {\large abc大large}             |
| ${\Large abc超大Large}$           | {\Large abc超大Large}           |
| ${\LARGE abc特大LARGE}$           | {\LARGE abc特大LARGE}           |
| ${\huge abc巨大huge}$             | {\huge abc巨大huge}             |
| ${\Huge abc巨无霸Huge}$           | {\Huge abc巨无霸Huge}           |

**注意：**如您导出**SVG格式**，理论上字体的整体大小并无用处，因为**SVG**为矢量图，所以大可不必担心图片不清晰的问题，即便是您选择下载**PNG格式**的公式图片，图片整体尺寸也被默认设定为**4K**。所以此处的字号命令只为设置公式**相对大小**时使用，例如：

```
{\tiny x+y=z}x+y=z{\Huge x+y=z}
```

$$
{\tiny x+y=z}x+y=z{\Huge x+y=z}
$$



#### 2.9 方程式编号 Equation numbering

本页面可采用开启AMS宏包的方式获得方程自动编号，AMS拓展包的具体开启方式请参考2.11.4。

默认自动编号只在部分环境中起作用，如{equation}、{eqnarray}等，例如：

在AMS包开启状态下，会在公式后进行自动编号：

```
\begin{eqnarray}
E = mc^2 \\
e^{i\pi}+1=0 
\end{eqnarray}
```


$$
\begin{eqnarray}
E = mc^2 \tag{1}\\
e^{i\pi}+1=0 \tag{2}
\end{eqnarray}
$$
如您在开启了AMS包状态下，全部公式均不希望出现编号，可使用{equation\*}、或者{eqnarray\*}环境，如：

```
\begin{eqnarray*}
E = mc^2 \\
e^{i\pi}+1=0 
\end{eqnarray*}
```

$$
\begin{eqnarray*}
E = mc^2 \\
e^{i\pi}+1=0 
\end{eqnarray*}
$$

如您在开启了AMS包状态下，个别公式不希望出现编号，或者个别公式希望出现特有编号，可在公式后面使用`\tag{}`或者`\notag`命令，如：

```
\begin{eqnarray}
E = mc^2 \notag\\
e^{i\pi}+1=0 \tag{b}
\end{eqnarray}
```

$$
\begin{eqnarray}
E = mc^2 \notag\\
e^{i\pi}+1=0 \tag{b}
\end{eqnarray}
$$



#### 2.10 LaTeX环境 LaTeX environments

环境通常是对代码段的整体描述，用于表达此段代码的角色，如，是矩阵？单行公式？多行公式？还是对齐公式等（本页面不支持文档环境），不同的环境起到的作用不同。以`\begin{environments}`开始，`\end{environments}`结束。如最常用的矩阵命令，也是环境的一种，用法如下：

```
\begin{bmatrix}
1 & 0 \\
0 & 1
\end{bmatrix}
```


$$
\begin{bmatrix}
1 & 0 \\
0 & 1
\end{bmatrix}
$$
具体矩阵用法可参考章节[2.4](#2.4 矩阵与多行列式 Matrices & Multilines)，下面给出几种其它常用环境的具体用法：

##### 2.10.1 equation环境

\begin{equation}是单行公式环境，这意味着在此环境中只可以输入单行公式，同时`\\`等强制换行命令失效。如需对单行长公式进行强制换行，可使用`\begin{split}`环境进行嵌套，并用`&`字符表示对齐位置，如：

```
\begin{equation}
\begin{split}
 e ^ { x } = & 1 + \frac { x } { 1 ! } + \frac { x ^ { 2 } } { 2 ! } + \frac { x ^ { 3 } } { 3 ! } + \cdots \\
& - \infty < x < \infty  
\end{split}
\end{equation}
```

$$
\begin{equation}
\begin{split}
 e ^ { x } = & 1 + \frac { x } { 1 ! } + \frac { x ^ { 2 } } { 2 ! } + \frac { x ^ { 3 } } { 3 ! } + \cdots \\
& - \infty < x < \infty  
\end{split}
\end{equation}
$$



##### 2.10.2 eqnarray环境

\begin{eqnarray}是多行公式环境，环境内的所有公式默认右对齐，由LaTeX内核提供。

##### 2.10.3 align环境

\begin{align}是多行公式环境，环境内的所有公式默认右对齐，由amsmath提供，排版较为灵活，如需表示多行公式推荐使用此环境。

```
\begin{align}
y = x \\
y = 3x^2 + 5x + 2 
\end{align}
```


$$
\begin{align}
y = x \\
y = 3x^2 + 5x + 2 
\end{align}
$$
可使用`&`字符调整对齐位置。

```
\begin{align}
y & = x \\
y & = 3x^2 + 5x + 2 
\end{align}
```

$$
\begin{align}
y & = x \\
y & = 3x^2 + 5x + 2 
\end{align}
$$



##### 2.10.4 array环境

\begin{array}是数组环境，需手动输入对齐参数：

```
\begin{array}{|c|l|r|} 
a & b & S \\
\hline 
0 & 0 & 1 \\
0 & 1 & 1 \\
1 & 0 & 1 \\
1 & 1 & 0 \\
\end{array}
```

$$
\begin{array}{|c|l|r|} 
a & b & S \\
\hline 
00 & 00 & 10 \\
0 & 1 & 1 \\
1 & 0 & 1 \\
1 & 1 & 0 \\
\end{array}
$$

对齐参数使用`c l r`分别表示居中、居左和居右，如需竖线边框可直接在对齐参数区域输入`|`即可，如需横线边框可使用`\hline`命令。

更多环境使用可参考章节[2.4](#2.4 矩阵与多行列式 Matrices & Multilines)。



#### 2.11 TeX扩展包使用 TeX and LaTeX extensions

##### 2.11.1 physics扩展包

physics是一款便携出入物理符号、矩阵及方程的拓展包，使用前需要在设置中手动勾选。其具体用法可参考[此文档](http://mirrors.ibiblio.org/CTAN/macros/latex/contrib/physics/physics.pdf)。

##### 2.11.2 mhchem扩展包

mhchem是一款便捷输入化学方程式的扩展包，使用前需要在设置中手动勾选。其具体用法如下：

###### 2.11.2.1 引用

基本命令为`\ce{}`，可在`{}`中输入化学相关符号。

###### 2.11.2.2 化学式

在化学环境中，数字`0123456789`默认为下标，`+-`默认为上标，如需强制上标可使用`^`符号，例如
```
\ce{H2O}  \ce{Sb2O3}  \ce{H+}  \ce{CrO4^2-}  \ce{[AgCl2]-}  \ce{Y^99+}  \ce{Y^{99+}}
```
<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/ce1.png" alt="ce1" style="zoom:85%;" />

###### 2.11.2.3 化学计量数

在化学环境中，计量数应与前面的大写字母使用**空格**分割，对于分数计量数，只需输入`1/2`即可显示$\frac{1}{2}$的效果，如特殊情况需要显示`1/2`格式，请用`( )`扩起。

```
\ce{2H2O}  \ce{0.5 H2O}  \ce{1/2H2O}  \ce{(1/2)H2O}  \ce{$n$ H2O}
```

<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/ce2.png" alt="ce2" style="zoom:75%;" />


###### 2.11.2.4 同位素

```
\ce{^{227}_{90}Th+}  \ce{^227_90Th+}  \ce{^{0}_{-1}n^{-}}  \ce{^0_-1n-}
```

<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/ce3.png" alt="ce3" style="zoom:55%;" />

在一个复杂的化学式中，上标属于左侧元素还是右侧元素可能并不会明显的体现出来，但为了规范输入，建议使用`{}`分隔符作为区分：

```
\ce{H{}^3HO}  \ce{H^3HO}
```

<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/ce4.png" alt="ce4" style="zoom:25%;" />

###### 2.11.2.5 反应箭头

mhchem提供了方便的反应箭头输入模式

```
\ce{A -> B}   \ce{A <- B}  \ce{A <-> B} 
```

<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/ce5.png" alt="ce5" style="zoom:50%;" />

```
\ce{A <--> B}  \ce{A <=> B}  \ce{A <=>> B}  \ce{A <<=> B}
```

<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/ce6.png" alt="ce6" style="zoom:68%;" />

箭头可以带有两个参数，即`>[][]`，第一个`[]`表示上方参数，第二个`[]`表示下方参数

```
\ce{A ->[H2O] B}   \ce{A ->[{上方文字}][{下方文字}] B}
```

<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/ce7.png" alt="ce7" style="zoom:40%;" />

###### 2.11.2.6 气体和沉淀

在化学环境中可使用独立的`^`表示气体$\uparrow$，使用独立的`v`(小写字母v)表示沉淀$\downarrow$ 

```
\ce{SO4^2- + Ba^2+ -> BaSO4 v}
```

<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/ce8.png" alt="ce8" style="zoom:45%;" />

```
\ce{A v B (v) -> B ^ B (^)}
```

<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/ce9.png" alt="ce9" style="zoom:38%;" />

###### 2.11.2.7 一些复杂的例子

```
\ce{Zn^2+  <=>[+ 2OH-][+ 2H+]  $\underset{\text{amphoteres Hydroxid}}{\ce{Zn(OH)2 v}}$  <=>[+ 2OH-][+ 2H+]  $\underset{\text{Hydroxozikat}}{\ce{[Zn(OH)4]^2-}}$}
```

<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/ce10.png" alt="ce10" style="zoom:75%;" />

```
\ce{$K = \frac{[\ce{Hg^2+}][\ce{Hg}]}{[\ce{Hg2^2+}]}$}
```

<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/ce11.png" alt="ce11" style="zoom:30%;" />

```
\ce{$K = \ce{\frac{[Hg^2+][Hg]}{[Hg2^2+]}}$}
```

<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/ce12.png" alt="ce12" style="zoom:30%;" />

```
\ce{Hg^2+ ->[I-]  $\underset{\mathrm{red}}{\ce{HgI2}}$  ->[I-]  $\underset{\mathrm{red}}{\ce{[Hg^{II}I4]^2-}}$}
```

<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/ce13.png" alt="ce13" style="zoom:45%;" />



##### 2.11.3 cancel扩展包

cancel扩展包为显示分数中**约分线**的TeX宏包，或显示其他划除效果，基本命令为`\cancel{}`，例如：

```
\cfrac{x}{1 + \cfrac{\cancel{y}}{\cancel{y}}} = \cfrac{x}{2}
```

<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/cancel1.png" alt="cancel1" style="zoom:28%;" />

```
\cancel{e^{i \pi} + 1 =0}
```

<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/cancel2.png" alt="cancel2" style="zoom:20%;" />



##### 2.11.4 Ams扩展包

本页面集成了大部分ams命令，即默认已打开。本拓展只为自动显示公式序号使用。

如，以下代码：

```
\begin{equation}
E = mc^2
\end{equation}
```



在ams包未开启状态下：
$$
\begin{equation}
E = mc^2
\end{equation}
$$
在ams包开启状态下：
$$
\begin{equation}
E = mc^2 \tag{1}
\end{equation}
$$
具体自动编号用法请参考章节[2.9](#2.9 方程式编号 Equation numbering)。

##### 2.11.5 AmsCd扩展包

amsCd扩展包是一款生成矩阵图的TeX宏包环境，基本环境命令为`\begin{CD}`  `\end{CD}`，基本用法如下：

`@<<<`表示左箭头；

`@>>>`表示右箭头；

`@AAA`表示上箭头；

`@VVV`表示下箭头；

`@=`表示水平等号；

`@|`表示数值等号；

`@.`表示空箭头（占位）。

以`@`表示箭头开始，以`<、>、A、V`等表示箭头方向。如需在箭头上或下插入变量，直接在第一和第二，或第二和第三个箭头方向符号中插入即可，用法实例如下：

```
\begin{CD}
A @>a>> B\\
@VVbV @VVcV\\
C @>d>> D
\end{CD}
```

<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/cd1.png" alt="cd1" style="zoom:40%;" />

```
\begin{CD}
A @>a>b> B\\
@VlVrV @AlArA\\
C @<a<b< D
\end{CD}
```

<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/cd2.png" alt="cd2" style="zoom:45%;" />



##### 2.11.6 Unicode扩展包

Unicode扩展包一款显示Unicode字符的TeX宏包，基本命令为`\unicode{}`，`{}`中参数应输入指定字符的**十进制**或**十六进制**Unicode代码，注意十六进制编码需在前面添加标识位`x`，例如：

```
\unicode{8751} \unicode{x220f}
```

<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/unicode1.png" alt="unicode1" style="zoom:25%;" />



##### 2.11.7 Bbox扩展包

Bbox扩展包一款用于设置公式背景颜色的TeX宏包，具体用法参见[2.7.3](#2.7.3 用Bbox扩展设置背景颜色 Setting background color with Bbox)

##### 2.11.8 NoErrors扩展包

NoErrors扩展包是一款阻止显示 TeX 错误消息的宏包，使用后将不会像是代码具体错误，而只会显示原始 TeX 代码。

##### 2.11.9 NewCommand扩展包

Newcommand扩展包提供了\def, \newcommand，\renewcommand，\let，\newenvironment 和 \renewenvironment 宏命令，用于在 TeX中创建新的宏和环境。例如：

```
\def\RR{{\bf R}}  %将{\bf R}（加粗的R）定义为\RR
\RR               %调用\RR命令
```

<img src="https://oursite-resourse.oss-cn-qingdao.aliyuncs.com/formula-images/readme/new1.png" alt="new1" style="zoom:5%;" />

### 3 关于 About

如有任何问题可以点击页面下方的邮箱图标向我们反馈，感谢您的使用！

### 4 参考文献 Reference
[1. LaTeX公式编辑器](http://47.104.179.138/)
[2. MathJax Documentation](https://docs.mathjax.org/en/latest/index.html)
[3. Displaying a formula](https://en.wikipedia.org/wiki/Help:Displaying_a_formula)
[4. mathjax/MathJax: Beautiful math in all browsers - GitHub](https://github.com/mathjax/MathJax)
[5. mhchem for MathJax](https://mhchem.github.io/MathJax-mhchem/)

