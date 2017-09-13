define(["jquery", "cookie"], function ($) {//cookie不需要返回值,所以不需要设置接收的参数
    $(function () {
        // console.log(2);
        //1. 获取登录按钮，注册点击事件

        //1. 获取表单，注册提交事件
        $("form").submit(function () {
            // console.log("form");
            //1. 获取用户输入的信息
            var userName = $("#tc_name").val();
            var pass = $("#tc_pass").val();
            //console.log("pass");
//            因为后台接口的问题,如果不输入姓名/密码也能跳转到首页,
//            所以需要判断验证 如果没有输入姓名或密码不能跳转
            if (userName.trim() == '') {
                alert('请输入用户名');
                return false;
            }
            if (pass.trim() == '') {
                alert('请输入密码');
                return false;
            }
            //2. 要将数据发送给后台，让后台进行验证
            //2.1 数据接口地址是什么  //http://studyit.com/api/login
            //2.2 请求的方式是什么   post
            //2.3 请求要的参数是什么  tc_name tc_pass
            $.ajax({
                url: "/api/login",
                type: "post",
                data: {
                    tc_name: userName,
                    tc_pass: pass
                },
                success: function (data) {
                    console.log(data);
                    if (data.code == 200) {
                        //如果data.code的值为200,说明登录成功,跳转到首页,即根目录
                        //先将登陆成功后后台返回的用户名和头像保存到cookie 中,以便在index.html中可以使用
                        //后台返回的数据存储在data.result中,先将data.result对象转成json格式的字符串,然后在存储
                        $.cookie("userinfo", JSON.stringify(data.result), {expires: 365, path: "/"});
                        location.href = "/"

                    }
                },
            });
            //阻止表单的默认提交事件
            // e.preventDefault();
            return false;
        })
    })

})