define(['jquery', 'template', 'cookie'], function ($, template) {
    $(function () {
        console.log(1);

        if (location.pathname != 'dashboard/login') {
            //如果cookie中没有PHPSESSID,说明没有登陆过,跳转回登录页
            if (!$.cookie('PHPSESSID')) {
                location.href = '/dashboard/login';
            }
            //否则就是存在PHPSESSID,说明已经登陆过,可以从cookie中获取在login页存储的用户信息了,利用模板引擎将用户姓名和头像,渲染到页面对应位置
            var userinfo = JSON.parse($.cookie('userinfo'));
            console.log(userinfo);
            $('#profile').html(template('profile-tpl', userinfo));
        }

    })
})
//判断用户是否登录了,如果没有登录,就跳回到登录页
//判断用户是否登录的依据,最好就是通过向后台发送ajax请求,查询后台,用户是否登录过,这才是最严谨的判断登录的方式,当前项目中没有提供这个借口,所以不能这么做
//我们可以使用PHPSESSID来判断用户是否登录的依据即可
//如果在cookie中有PHPSESSID,那么就证明用户已经登录过了
//如果在cookie中没有PHPSESSID,那么就证明用户没有登录过
//如果不在登录页才执行下面的内容
// window.location中有一个pathname属性,属性中的值就是/dashboard/login,所以判断是不是在登录页局可以以此为依据,

//如果location.pathname != 'dashboard/login'说明目前不在登录页,再次判断有没有登陆过,在登录页输入新用户名密码后从后台获取的数据中已近将侧边导航栏需要的用户名和对应的用户名头像返回来了,但是我们要将数据从login页面传递到index页面,这属于在页面之间传递数据,
//(1.cookie中的数据的存储是以域名为单位的,各个域名之间是不能共享的,)
// 2.cookie中的数据会随着每一次请求,将数据发送到服务器,我们就可以通过cookie来完成页面之间的数据传递,但是又由于cookie中的数据会伴随每一次的请求发送到服务器,所以如果cookie中的数据太大会影响请求的效率
// 但是cookie有大小限制,所以不能使用cookie传输较大的数据,
//cookie这次我们只是传递用户名和头像的信息,可以通过cookie完成
// 3.cookie的存储是分路径的,在cookie中子页面可以访问父级路径中的cookie信息,但是父路径访问不到子路径中cookie的内容,所以,我们一般我们将信息存储到父路径中,这样页面中的所有子路径都能访问到cookie信息
//4.cookie中存储的数据是有时效性的,默认是关闭浏览器cookie就会消失,但是可以手动修改cookie的过期时间

//location.pathname != 'dashboard/login'说明目前不在登录页,再次判断有没有登陆过,我们可以在login.js中将我们所需要的信息存储到cookie中,然后在这里做判断