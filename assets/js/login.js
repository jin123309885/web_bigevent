$(function () {
  // 点击“去注册账号”的链接
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  // 点击“去登录”的链接
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      var pwd = $('.reg-box [name="password"]').val();
      if (pwd != value) {
        return "两次密码不一致";
      }
    },
  });

  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    $.post(
      "http://ajax.frontend.itheima.net/api/reguser",
      {
        username: $('#form_reg [name="username"]').val(),
        password: $('#form_reg [name="password"]').val(),
      },
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("注册成功，请登陆");
        $("#link_login").click();
      }
    );
  });

  $("#form_login").submit(function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "http://ajax.frontend.itheima.net/api/login",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("登陆失败");
        }
        layer.msg("登陆成功");
        localStorage.setItem("token", res.token);
        location.href = "/index.html";
      },
    });
  });
});
