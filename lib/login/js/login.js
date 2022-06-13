/* 命名空间mylogin */

$(function () {
    // var url = "https://localhost:44390/api/default";
    // var data = {
    //     id: 7802,
    //     name: "jjjxxxjjj",
    //     age:35
    // };
    // var data = {
    //     id: 7802,
    //     name:"jjjxxxjjj"
    // };
    // function callback(rs) {
    //     console.log(rs);
    // }
    // myAJAX.Commu(url, data, callback, true);

    mylogin.init();//初始化
    ///** 捕捉回车事件绑定默认登录按钮 */
    //$(document).keyup(function(e){
    //    if(e.keyCode ==13){
    //     $("#btn-gologin").trigger("click");
    //    }
    //});
})

var mylogin = {
    /** 初始化登录页面 */
    init: function () {
        $("#select_telarea").html(myfunc.getTelAreaStr());//初始化填充国际区号下拉菜单
        $(".errinfo").hide();//初始化隐藏所有错误信息
        $(".input-number").keypress(function (e) {//初始化数字类型的输入框不许输入数字以外的字符
            return myfunc.init_inputForbidChar(e);
        });
        $(".input-number").on("input", function () {//初始化限制数字类型的输入框最大长度
            myfunc.init_inputSetMaxLen("txt-tel", 11);
            myfunc.init_inputSetMaxLen("txt-code", 6);
            mylogin.refreshAllInfo();//一旦开始输入清空所有错误信息
        });
        $("#drag").drag();//初始化滑块验证
        $("#btn-sendcode").prop("disabled", true);//初始化发送验证码按钮为不可用
        $("#btn-sendcode").click(mylogin.sendCode);//初始化绑定发送验证码函数
        $("#btn-gologin").click(mylogin.gologin);//初始化绑定登录函数
        $('#myModal1').on('show.bs.modal',//初始换绑定协议模态框
            function () {
                mylogin.showModel(myconst_login.content_copyright);
            });
        $('#myModal2').on('show.bs.modal',
            function () {
                mylogin.showModel(myconst_login.content_privace);
            });
        $('.modal').on('hide.bs.modal',
            function () {
                $(".modal-body").scrollTop(0)
            });
        $("#chk-agree").click(mylogin.checkLoginButton);
    },
    /** 检查所有输入信息 */
    checkAllInfo: function () {
        var rtnbool = true;
        var re_tel = myfunc.checkTel($("#txt-tel").val());
        var re_code = myfunc.checkCode($("#txt-code").val());
        if (re_tel != "") {
            myfunc.showErrorInfo("dock-tel", re_tel, "txt-tel");
            rtnbool = false;
        }
        if (re_code != "") {
            myfunc.showErrorInfo("dock-code", re_code, "txt-code");
            rtnbool = false;
        }
        return rtnbool;
    },
    /** 隐藏所有错误信息 */
    refreshAllInfo: function () {
        myfunc.hideErrorInfo("dock-tel", "txt-tel");
        myfunc.hideErrorInfo("dock-code", "txt-code");
    },
    /** 发送验证码 */
    sendCode: function () {
        var re_tel = myfunc.checkTel($("#txt-tel").val());
        if (re_tel != "") {
            myfunc.showErrorInfo("dock-tel", re_tel, "txt-tel");
            return false;
        } else {
            var data = {
                tel: $("#txt-tel").val()
            }
            myAJAX.Commu(myconfig.backhandler.sendecode, data, mylogin.cb_sendcode, true);
        }
    },
    /** 发送验证码回调函数 */
    cb_sendcode: function (re) {
        var re_obj = JSON.parse(re);
        if (re_obj.res == "fail") {
            toastr.error("获取验证码过于频繁，请稍后再试");
        }else{
            toastr.success("验证码已发送");
        }
    },
    /**登录 */
    gologin: function () {
        if (mylogin.checkAllInfo()) {
            console.log("去后台登录了");
        }
    },
    /** 显示模态框协议内容 */
    showModel: function (content) {
        //$(".modal-body").html("");
        $(".modal-body").html(content);
    },
    /** 是否同意协议关联是否可以登录 */
    checkLoginButton: function () {
        if ($("#chk-agree").prop("checked")) {
            $("#btn-gologin").prop("disabled", false);
        } else {
            $("#btn-gologin").prop("disabled", true);
        }
    }
}

var myconst_login = {
    content_copyright: function () {
        return "<div class=\'main-right fr\' style=\'width:90%;margin:0 auto;\'><h3>版权声明</h3><h4>科技坞根据用户指令提供作品上传、下载以及传播等，向来十分重视网络版权及其他知识产权以及用户权益的保护。</h4><p>"
            + "科技坞作为网络服务提供者，对非法转载，盗版行为的发生不具备充分的监控能力，如果您认为科技坞用户通过科技坞提供的信息存储空间所上载、传播的内容侵犯了您的相关权益的，<br>"
            + "请您向科技坞发出权利通知，科技坞将根据相关法律规定采取措施删除相关内容，您可以向科技坞所设立的专门接受版权投诉和侵权通知的邮箱发送通知书。"
            + "本网站所有作品均由本公司或版权所有人授权发布，如果您侵犯了该作品的知识产权，上海品图网络科技有限公司有权依据著作权侵权惩罚性赔偿标准或最高达50万元人民币的法定标准要求赔偿，且有权不以本网站发布的作品授权价格作为参考标准。"
            + "            </p><h3>申诉需知</h3><p>投诉方应当提供包含下列文件：</p><p><i>1</i>权利人的姓名（名称）、联系方式、地址、身份证扫描件（自然人）、企业法人营业执照（单位）、法定代表人身份证明（单位）。</p><p><i>2</i>要求删除或者断开链接的侵权作品的准确名称和网络地址，以便科技坞能够发现并初步审核涉嫌侵权作品。</p><p><i>3</i>认为构成侵权的初步证明材料，包括但不限于对作品享有版权或依法享有信息网络传播权的权属证明，以及对涉嫌侵权作品侵权事实的举证。</p><p><i>4</i>通知书需由权利人或其合法授权人亲笔签名，若为单位则需加盖单位公章。</p><p><i>5</i>权利人应对通知书的真实性负责。若通知书的内容不真实，权利人将承担由此造成的全部法律责任。</p><p class=\'text-b\'>一旦收到符合上述要求之通知，我们将在合理时间内删除涉嫌侵权的作品。如不符合上述条件，我们会请阁下提供相应信息，且暂不采取包括删除等相应措施。</p><p>在科技坞上传作品的用户视为同意科技坞就上述情况所采用的相应措施，科技坞不因此而承担任何违约责任或其他任何法律责任。科技坞在收到上述通知后会发送电子邮件通知上传该作品的用户，对于多次上传涉嫌侵权作品的用户，科技坞将有权删除下架并且扣除相应的积分或者VIP奖励；若发现盗图3张以上的用户，则取消其上传资格以及相应的奖励；若发现盗图5张以上的用户，将永久封禁账号等惩罚措施。</p><p class=\'text-b\'>在您发送邮件后，工作人员会尽快处理，由于涉及内容不同，所需周期也不同，请您耐心等待。</p><br><h3>版权举报通道</h3><p><em class=\'icon-tel\'></em>电话：400-998-7011（周一到周五，9:30-18:00）</p><p><em class=\'icon-email\'></em>邮箱：copyright@58pic.com</p><br><h3>一 、VIP会员类型</h3><p class=\'text-orange\'>目前科技坞提供的作品可划分两类：非字库类作品及字库作品。</p><p>（您同意，科技坞可根据经营需要适当调整VIP定价、名称或类型等）</p><p class=\'text-orange\'><strong class=\'text-b\'>非字库作品：</strong>针对的是科技坞合法享有版权或经权利人授权的作品。包括元素、背景、插画、PPT等所有图片类作品以及音频类作品。</p><p>授权模式分为 “个人VIP”、“企业VIP”、“单图转售”授权的形式。<br>"
            + "（授权范围对比详见 <a href=\'https://www.58pic.com/introduce/?p_r=1&amp;u_v=1\' style=\'text-decoration: underline;\' target=\'_blank\'>https://www.58pic.com/introduce/?p_r=1&amp;u_v=1</a> ）"
            + "            </p><p class=\'text-orange\'><strong class=\'text-b\'>字库作品：</strong>针对的是字体公司授权科技坞代理分发的字库包，字库作品的版权人为其所属字体公司。</p><p>授权模式分为用户购买适合个人使用的“字库普通VIP”，适合企业使用的“字库商用VIP（基础版）”和“字库商用VIP（期间版）”。<br>"
            + "（授权范围对比见 <a href=\'https://www.58pic.com/index.php?m=FontLibrary&amp;a=Zkpresentation\' style=\'text-decoration: underline;\' target=\'_blank\'>https://www.58pic.com/index.php?m=FontLibrary&amp;a=Zkpresentation</a> ）"
            + "            </p><br><h3>（一）非字库作品VIP</h3><p>1) 个人VIP：指的是自然人注册科技坞会员并购买选定种类的科技坞个人VIP套餐后，成为科技坞个人VIP用户，该个人VIP用户即享有使用该选定种类的个人VIP套餐范围内所有作品的权利。</p><p>目前个人VIP套餐分为：基础VIP、精选VIP、公办VIP。</p><p>（套餐对比详见 <a href=\'https://www.58pic.com/index.php?m=sponsor&amp;a=intro&amp;on=2&amp;p_r=1&amp;u_v=1\' style=\'text-decoration: underline;\' target=\'_blank\'>https://www.58pic.com/index.php?m=sponsor&amp;a=intro&amp;on=2&amp;p_r=1&amp;u_v=1</a>）</p><p>个人VIP仅限购买者本人使用，不得以任何免费、收费形式提供给第三方，不得超出选定的个人VIP套餐许可范围使用，一经发现，科技坞有权暂时封禁该个人VIP账号。</p><p>2) 企业VIP：指的是企业员工或自然人接受企业委托，代表该企业注册科技坞会员，并向科技坞提供对应的企业资质等身份证明文件，代表该企业购买选定种类的科技坞企业VIP套餐后，该企业即享有使用该选定种类的企业VIP套餐范围内所有作品的权利。</p><p>目前企业VIP套餐分为：单人版、基础版、专业版、旗舰版</p><p>（套餐对比详见 <a href=\'https://www.58pic.com/introduce/?p_r=1&amp;u_v=1\' style=\'text-decoration: underline;\' target=\'_blank\'>https://www.58pic.com/introduce/?p_r=1&amp;u_v=1</a>）</p><p>企业VIP会员仅供被授权企业使用，授权代表或企业员工不得利用便利将会员账号用作与该企业无关的个人用途，企业会员用户不得超出选定的企业VIP套餐许可范围使用，一经发现，科技坞有权暂时封禁该企业VIP账号。</p><p><span class=\'text-orange\'><strong class=\'text-b\'>3) 单图转售：</strong>针对科技坞单独定价的作品，用户可以通过对价购买指定作品后，即享有对该作品的使用权利。</span>用户可以在授权范围内直接使用购买的作品或者将作品进行衍生创作，作为元素形式用在线下实体产品及网络环境中的线上商品中，并直接销售或分销，包括纺织品、艺术品、贺卡、软件、电子贺卡等形态的转售品。转售数量根据不同价格有不同的限制。</p><p>（授权范围详见：<a href=\'https://www.58pic.com/blog/629.html\' style=\'text-decoration: underline;\' target=\'_blank\'>https://www.58pic.com/blog/629.html</a>）</p><p>单独转售形式作品的使用，可以由个人获得也可由企业获得，用户可以在约定的授权范围内使用作品，但不得超过转售数量的最高限度。若超过约定的转售数量，科技坞有权暂时封禁会员账号。</p><br><h3>二、关于商用授权</h3><h3>（一）商用定义</h3><p><strong class=\'text-b\'>非商用/个人非商用：</strong>指不以营利为目的，用户以个人为单位、非商业产品运作的方式，运用科技坞作品完成个人作品的展示，如用于个人海报、个人作品、个人展览、个人论文等。仅限个人学习使用为目的，不能带有任何商业发布的行为。</p><p><strong class=\'text-b\'>可商用：</strong>指出于盈利的目的，用户通过购买标注为可商用的不同等级的科技坞会员套餐，在特定的商业授权范围内，用户有权将作品用于个人或者企业的商业化经营性使用，如将作品直接或修改后用于网络推广、广告、印刷等。科技坞站内作品带&nbsp;<span class=\'icon icon-shangyongbiaoshi\'></span>&nbsp;商标作品均可在购买的会员权限内进行商用。</p><h3>（二）商用范围</h3><p><strong class=\'text-b\'>非字库作品商用授权范围：</strong></p><p>VIP授权形式<a href=\'https://www.58pic.com/introduce/?p_r=1&amp;u_v=1#view\' style=\'text-decoration: underline;\' target=\'_blank\'>https://www.58pic.com/introduce/?p_r=1&amp;u_v=1#view</a></p><p>单图转售形式<a href=\'https://www.58pic.com/blog/629.html\' style=\'text-decoration: underline;\' target=\'_blank\'>https://www.58pic.com/blog/629.html</a></p><p><strong class=\'text-b\'>字库作品商用范围详见：</strong></p><p><a href=\'https://www.58pic.com/index.php?m=FontLibrary&amp;a=Zkpresentation\' style=\'text-decoration: underline;\' target=\'_blank\'>https://www.58pic.com/index.php?m=FontLibrary&amp;a=Zkpresentation</a></p><br><h3>三、可商用授权协议类型</h3><div class=\'addcopy\' name=\'cc0\' id=\'cc0\'><h3>（一）扩展许可1.0协议（VRF1.0协议）</h3><p class=\'text-orange\'>科技坞内容详情页标示为（VRF协议）的作品，即遵循此授权协议，版权归属科技坞。</p><p>您只需要购买网站VIP会员，在会员有效期以及VIP授权权限内，您可以免费下载获取作品使用权，会员过期后，在会员有效期内下载并使用的作品（包括下载有效期内产生的作品、利用作品创作的衍生品等）可永久使用，不受时间、地域等的限制，并根据署名约定进行署名或者不署名。</p><p><strong class=\'text-b\'>您可以在授权范围内使用这张作品，如：</strong><br>"
            + "-&nbsp;<strong class=\'text-orange-b\'>可商用</strong>，也可学习，交流使用。<br>"
            + "-&nbsp;<strong class=\'text-orange-b\'>可下载，可编辑修改</strong>这些作品。<br>"
            + "-&nbsp;<strong class=\'text-orange-b\'>企业VIP会员使用无需署名，个人或其他类型VIP使用时需署名，署名备注“ 来源于‘科技坞’ ”</strong><br></p><p><strong class=\'text-b\'>您不能：</strong><br>"
            + "-&nbsp;转让，出售或出租任何科技坞的作品（或科技坞内容的修改版本）。<br>"
            + "-&nbsp;分发科技坞的作品。<br>"
            + "-&nbsp;将科技坞的作品储存在联机、脱机数据库或局域网中进行共享。<br>"
            + "-&nbsp;将科技坞的作品（或科技坞内容的修改版）提供给他人或其他机构，企业下载。<br>"
            + "-&nbsp;将科技坞内容的版权占据为自己版权。<br>"
            + "-&nbsp;下载有效期到期后，不得就科技坞的作品再进行任何形式的使用，如直接使用、再创作、加工、衍生使用等。<br>"
            + "-&nbsp;其他科技坞禁止以及法律禁止的事项。<br></p></div><div class=\'addcopy\' name=\'vrf\' id=\'vrf\'><h3>（二）扩展许可2.0授权协议（VRF2.0协议）</h3><p class=\'text-orange\'>科技坞内容详情页标示为（VRF协议）的作品并通过单张转售购买的作品，即遵循此授权协议，版权归属科技坞。</p><p>您通过单图转售形式购买的作品，成为科技坞会员，在会员下载效期以及授权权限内，您可以免费下载获取作品使用权，下载有效期内下载并使用的作品（包括下载有效期内产生的作品、利用作品创作的衍生品、转售品等）可不受时间、地域等的限制使用，但您应在约定的转售数量限制内进行生产和使用，使用时无需进行署名。</p><p><strong class=\'text-b\'>您可以在授权范围内使用这张作品，如：</strong><br>"
            + "-&nbsp;<span class=\'text-orange-b\'>可商用，也可学习，交流使用</span>。<br>"
            + "-&nbsp;可下载，可编辑修改这些作品。<br>"
            + "-&nbsp;<span class=\'text-orange-b\'>可转售</span>。<br>"
            + "-&nbsp;使用时无需署名。<br></p><p><strong class=\'text-b\'>您不能：</strong><br>"
            + "-&nbsp;超出转售数量限制。<br>"
            + "-&nbsp;分发科技坞的作品。<br>"
            + "-&nbsp;将科技坞的作品储存在联机、脱机数据库或局域网中进行共享。<br>"
            + "-&nbsp;将科技坞的作品（或科技坞内容的修改版）提供给他人或其他机构，企业下载。<br>"
            + "-&nbsp;将科技坞作品的版权占据为自己版权。<br>"
            + "-&nbsp;下载有效期到期后，不得就科技坞的作品再进行任何形式的使用，如直接使用、再创作、加工、衍生使用、转售等。<br>"
            + "-&nbsp;其他科技坞禁止以及法律禁止的事项。<br></p></div><div class=\'addcopy\' name=\'cce\' id=\'cce\'><h3>（三）CCE协议&nbsp;</h3><p>Creative&nbsp;Commons&nbsp;（Exclusive&nbsp;distribution&nbsp;channel）</p><p class=\'text-orange\'>科技坞内容详情页标示为（CCE协议）的作品，即遵循此授权协议，版权归属设计师与科技坞共有。</p><p>CCE是科技坞根据作品版权归属情况特别制定的一种特有的版权授权模式。您只需要购买网站VIP会员，在会员有效期以及VIP授权权限内，可以免费下载获取作品使用权，会员过期后，在会员有效期内下载并使用的作品可永久使用，不受时间、地域等的限制，且使用时无需署名。</p><p><strong class=\'text-b\'>您可以在授权范围内使用这张作品，如：</strong><br>"
            + "-&nbsp;<strong class=\'text-orange-b\'>可商用</strong>，也可学习，交流使用。<br>"
            + "-&nbsp;<strong class=\'text-orange-b\'>可下载，可编辑修改</strong>这些作品。<br>"
            + "-&nbsp;使用时<strong class=\'text-orange-b\'>无需署名</strong><br></p><p><strong class=\'text-b\'>您不能：</strong><br>"
            + "-&nbsp;转让，出售或出租任何科技坞的作品（或科技坞内容的修改版本）。<br>"
            + "-&nbsp;分发科技坞的作品。<br>"
            + "-&nbsp;将科技坞的作品储存在联机、脱机数据库或局域网中进行共享。<br>"
            + "-&nbsp;将科技坞的作品（或科技坞内容的修改版）提供给他人或其他机构，企业下载。<br>"
            + "-&nbsp;将科技坞作品的版权占据为自己的版权。<br>"
            + "-&nbsp;下载有效期到期后，不得就科技坞的作品再进行任何形式的使用，如直接使用、再创作、加工、衍生使用等。<br>"
            + "-&nbsp;其他科技坞禁止以及法律禁止的事项。<br></p></div><h3>温馨提示：</h3><p>网站作品模板内出现的任何摄影图、商品图、字体、人物肖像仅供作参考展示，未经权利人许可不得用于商用，若擅自使用，后果将由使用者自行承担。</p><br></div>"
    },
    content_privace: "这里是隐私协议",
}

