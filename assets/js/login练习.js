$(function () {
  // ===============  切换登录和注册的盒子 ===============
  //注册
  $("#showReg").click(function () {
    $(".reg-form").show();
    $(".login-form").hide();
  });
  //登录
  $("#showLogin").click(function () {
    $(".reg-form").hide();
    $(".login-form").show();
  });

  //=================自定义验证规则=================
  let form = layui.form;
  form.verify({
    //密码
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    //两次输入的密码必须一致
    samePass: function (value, item) {
      let pwd = $("#regi_pass").val();
      if (value !== pwd) {
        // return 的内容就是匹配不符合的时候出现的提示文字
        return "两次输入的密码不一致";
      }
    },
  });

  //=============== 完成注册功能 ===============
  //1. 注册点击submit事件,  阻止默认行为
  let layer = layui.layer;

  $(".reg-form").on("submit", function (e) {
    e.preventDefault();

    //2.获取变单数据
    let data = $(this).serialize();

    //发送ajax请求  axios  已引入axios的js文件
    //  http://api-breakingnews-web.itheima.net
    axios.post("/api/reguser", data).then(function (res) {
      // console.log(res);

      //判断注册失败
      if (res.data.status !== 0) {
        return layer.msg(res.data.message);
      }

      // 注册成功

      layer.msg("注册成功, 请登录", { icon: 6 });

      // 2.登录界面
      $("#showLogin").click();
    });
  });

  //=============== 完成登录功能 ===============
  $(".login-form").on("submit", function (e) {
    e.preventDefault();

    //2.获取变单数据
    let data = $(this).serialize();

    //发送ajax请求  axios  已引入axios的js文件
    //  http://api-breakingnews-web.itheima.net
    axios.post("/api/login", data).then(function (res) {
      // console.log(res);

      //判断登录失败
      if (res.data.status !== 0) {
        return layer.msg(res.data.message);
      }

      // 登录成功
      //把服务器响应回来的 token 信息给存储到本地存储中(localStorage)
      // 跳转到后台主页
      localStorage.setItem("token", res.data.token);
      // layer.msg("登录成功", { icon: 6 });
      // location.href = "index练习.html";

      //优化版本
      layer.msg("登录成功", { icon: 6 }, function () {
        location.href = "index练习.html";
      });
    });
  });
});
