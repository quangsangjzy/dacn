var urltk = "http://localhost:3000/taikhoan";

function login() {
  const username = document.querySelector(".username").value;
  const password = document.querySelector(".password").value;
  var type = "";
  fetch(urltk)
    .then(function (respone) {
      return respone.json();
    })
    .then(function (posts) {
      posts.map(function (post) {
        if (post.TaiKhoan == username && post.MatKhau == password)
          return (type = `${post.LoaiTK}`);
      });
      if (type == "admin") {
        alert('Bạn đã đăng nhập với tư cách admin')
        window.location = "./index.html";
      } else if (type == "user") {
        alert('Bạn đã đăng nhập với tư cách sinh viên')
        window.location = "./test.html";
      } else {
        alert("Ôi, sai tài khoản hoặc mật khẩu rồi (😭)!!!");
        return
      }
      // var user = tk.join('');
      // // document.getElementById('render').innerHTML = user;
      // document.getElementById('username').value = user;
    });
}
