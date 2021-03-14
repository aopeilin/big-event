getUserInfo();
//getUserInfo()必须是全局函数
function getUserInfo() {
  //发送ajax请求获取到用户信息 ==> 渲染名字, 头像 http://api-breakingnews-web.itheima.net
  axios
    .get("/my/userinfo", {
      //请求头信息, 这个请求头信息的配置一定要有, 否则无法获取到用户信息
      // headers: {
      //   // Authorization的值token，token的值是在登录的时候，存储到本地
      //   Authorization: localStorage.getItem("token"),
      // },
    })
    .then((res) => {
      console.log("then 数据来了", res);

      // 处理响应回来的结果

      //关于头像
      // 1. 图片头像
      // 2. 文字头像(名字的首字母 大写)
      //    如果有图片用图片,没有用文字

      //关于名字
      // 1. 登录名称
      // 2. 昵称
      // 优先展示昵称

      //获取到用户信息
      let info = res.data.data;

      //处理名字
      // let name = info.nickname || info.username;
      let name = info.nickname || info.username;

      //设置名字
      $("#welcome").text("欢迎" + name);

      //处理头像
      if (info.user_pic) {
        //有图片,设置src, 显示
        $(".layui-nav-img").attr("src", info.user_pic).show();

        //隐藏文字头像
        $(".text-avatar-box").hide();
      } else {
        //无图片, 显示文字头像
        $(".text-avatar-box").show().children().text(name[0].toUpperCase());
        $(".layui-nav-img").hide();
      }
    });
}
$(function () {
  // layer的处理
  let layer = layui.layer;

  //===========退出功能========
  $("#btnLogout").click(function () {
    layer.confirm("确定退出吗?", { icon: 3, title: "提示" }, function (index) {
      // 点击了确认按钮会执行的函数
      layer.close(index);

      //做的事情和登录做的事情相反
      //第一件事情: 把本地存储的 token 信息删除掉
      localStorage.removeItem("token");
      //第二件事情: 跳回登录页面
      location.href = "./login.html";
    });
  });
});
