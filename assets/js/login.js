$(function () {
  // 去注册按钮点击功能
  $("#showReg").click(function () {
    // 显示注册界面
    $(".reg-form").show();

    // 隐藏登录界面
    $(".login-form").hide();
  });

  //   ===========去登录按钮点击界面=================
  $("#showLogin").click(function () {
    //  隐藏注册界面
    $(".reg-form").hide();

    // 显示登录界面
    $(".login-form").show();
  });

  //==============layui 提供的自定义校验规则======================
  // 自定义校验规则： 通过layui提供的form.verify方法可以实现
  let form = layui.form;
  form.verify({
    //密码校验规则
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    //两次输入的密码必须一致
    samePass: function (value, item) {
      // value：表单的值(就是再次输入密码的内容)、item：表单的DOM对象
      //   console.log(value, item);

      //还需要获取注册表单中密码的内容
      let pwd = $("#regi_pass").val();

      //两次密码进行比较判断, 是否一致,  如果不一致, 出现提示文字
      if (value !== pwd) {
        // return 的内容就是匹配不符合的时候出现的提示文字
        return "两次输入的密码不一致";
      }
    },
  });

  //===================实现注册功能====================
  // 1. 给注册的form表单注册submit事件, 阻止默认行为
  //2. ajax请求, 实现注册功能
  let layer = layui.layer;

  $(".reg-form").on("submit", function (e) {
    e.preventDefault();

    // 收集表单数据
    let data = $(this).serialize();

    //发送ajax请求 JQ的$.ajax() 或者 axios
    axios
      .post("http://ajax.frontend.itheima.net/api/reguser", data)
      .then(function (res) {
        // console.log(res);

        //注册失败
        if (res.data.status !== 0) {
          return layer.msg(res.data.message);
        }

        //注册成功
        layer.msg("注册成功，请登录", { icon: 6 });

        // 显示登录界面
        $("#showLogin").click();
      });
  });

  // ================ 实现登录功能 ================
  $(".login-form").on("submit", function (e) {
    e.preventDefault();

    // 表单数据
    let data = $(this).serialize();

    //发送请求
    axios
      .post("http://ajax.frontend.itheima.net/api/login", data)
      .then(function (res) {
        //登录失败
        if (res.data.status !== 0) {
          return layer.msg(res.data.message);
        }

        //登录成功
        // layer.msg("登录成功, 跳转中", { icon: 6 });
        //跳转页面
        // location.href = "./index.html";

        //把服务器响应回来的 token 信息给存储到本地存储中(localStorage)
        localStorage.setItem("token", res.data.token);

        //以上代码细节优化： layer.msg当它隐藏之后才跳转页面
        layer.msg("登录成功", { icon: 6 }, function () {
          // do something
          // 跳转页面，跳转到index页面
          location.href = "./index.html";
        });
      });
  });
});
