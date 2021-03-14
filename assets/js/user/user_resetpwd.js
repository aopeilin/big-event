$(function () {
  let form = layui.form;
  let layer = layui.layer;

  //==============添加表单校验规则==============================

  form.verify({
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    // samePass 新密码和原密码不能相同的校验规则

    samePass: function (value, item) {
      // 获取到新密码  value
      // 获取到原密码  $("[name=oldPwd]").val();

      //还需要获取原密码的内容
      let pwd = $("[name=oldPwd]").val();

      //两次密码进行比较判断, 是否一致,  如果不一致, 出现提示文字
      if (value === pwd) {
        // return 的内容就是匹配不符合的时候出现的提示文字
        return "新旧密码不能一致";
      }
    },

    // rePass 确认新密码和新密码必须要一致
    rePass: (value) => {
      // value; 确认新密码
      // 新密码 $("[name=newPwd]").val()

      if (value !== $("[name=newPwd]").val()) {
        return "两次输入的新密码不一致";
      }
    },
  });

  //================实现重置密码======================

  $("#form").on("submit", function (e) {
    e.preventDefault();

    //2.获取变单数据
    let data = $(this).serialize();

    //发送ajax请求  axios  已引入axios的js文件
    //  http://api-breakingnews-web.itheima.net
    axios.post("/my/updatepwd", data).then(function (res) {
      // console.log(res);

      //判断修改密码失败
      if (res.data.status !== 0) {
        return layer.msg(res.data.message);
      }

      // 修改密码成功

      layer.msg("修改成功", { icon: 6 });

      // 重置表单
      //   $("#form")[0].reset();
    });
  });
});
