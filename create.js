var urlnv = "http://localhost:3000/sinhvien";
// var urlnv = 'http://192.168.1.113:3000/';
// var urlpb = 'http://192.168.0.103:3000/phongban';
// var urlct = 'http://192.168.0.103:3000/congtac';
// var urllg = 'http://192.168.0.103:3000/luong';

// const db = require('../QL_NhanSu/connect');
// const axios = require('axios');

function start() {
  getNhanVien(renderSV);
  handleFormCrNV();
  //   update()
  // handleDelNV();
  // handleFormCrLuong();
  // getLuong();
  // getKhenThuong();
}

start();

// function (callback) {
//     var manvs = posts.map(function (post) {
//       return `
//                   <tr>
//                       <td  class="widthInput">${post.MaSV}</td>
//                       <td>${post.HoTen}</td>
//                       <td class="widthInput">${post.GioiTinh}</td>
//                       <td class="widthInput">${post.Lop}</td>
//                       <td>${post.QueQuan}</td>
//                       <td class="widthInput">${post.Sdt}</td>
//                       <td>
//                           <div onclick="update()" class="edit"><i class="bx bx-edit-alt"></i></div>
//                           <div class="remove"><i class="bx bxs-trash"></i></div>
//                       </td>
//                   </tr>
//               `;
//     });
//     sinhvien = post
//     var manv = manvs.join("");
//     document.querySelector("#render tbody").innerHTML = manv;
//   });
//   console.log(sinhvien)

//hiển thị danh sách nhân viên
function getNhanVien(callback) {
  fetch(urlnv)
    .then(function (respone) {
      return respone.json();
    })
    .then(callback);
}

var arrSinhVien = [];

function renderSV(sinhvien) {
  var manvs = sinhvien.map(function (sv) {
    return `
        <tr class="boxInput" onclick="showInput()">
            <td class="widthInput inputV">${sv.MaSV}</td>
            <td class="inputV">${sv.HoTen}</td>
            <td class="widthInput inputV">${sv.GioiTinh}</td>
            <td class="widthInput inputV">${sv.Lop}</td>
            <td class="inputV">${sv.QueQuan}</td>
            <td class="widthInput inputV">${sv.Sdt}</td>
            <td>
                <div onclick="updateSV(${sv.MaSV})" class="edit"><i class="bx bx-edit-alt"></i></div>
                <div onclick=del(${sv.MaSV}) class="remove"><i class="bx bxs-trash"></i></div>
            </td>
        </tr>
                  `;
  });
  arrSinhVien = sinhvien;
  var manv = manvs.join("");
  document.querySelector("#render tbody").innerHTML = manv;
  //   console.log(arrSinhVien);
}

{
  /* <button onclick = "handleDelNV(${post.MaSV})">Xóa</button> */
}

// //sự kiện ấn nút xóa nhân viên
// function handleDelNV(MaSV) {
//   var manv = document.querySelector('input[name="MaNV"]').value;

//   var delMaNV = {
//     MaSV: MaSV,
//   };

//   del(delMaNV);
// }

//sự kiện ấn nút thêm nhân viên
function handleFormCrNV() {
  var btnCreateNV = document.querySelector("#createNV");

  btnCreateNV.onclick = function () {
    var manv = document.querySelector('input[name="MaSV"]').value;
    var ht = document.querySelector('input[name="HoTen"]').value;
    var gt = document.querySelector('input[name="GioiTinh"]').value;
    var lop = document.querySelector('input[name="Lop"]').value;
    var qq = document.querySelector('input[name="quequan"]').value;
    var sdt = document.querySelector('input[name="SDT"]').value;
    var formData = {
      MaSV: manv,
      HoTen: ht,
      GioiTinh: gt,
      Lop: lop,
      QueQuan: qq,
      Sdt: sdt,
    };

    create(formData, function () {
      getNhanVien();
      clearInput();
      getNhanVien(renderSV);
      alert('Đã thêm thành công')
    });
  };
}

function create(data, callback) {
  var create = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(urlnv, create)
    .then(function (respone) {
      respone.json();
    })
    .then(callback);
}

function del(MaSV) {
  if (confirm("Bạn có muốn xóa sản phẩm không") == true) {
    var del = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(urlnv + "/" + MaSV, del)
      .then(function (respone) {
        respone.json();
      })
      .then(function () {
        getNhanVien(renderSV);
        alert('Đã xóa thành công')
      });
  } else {
  }
}

//xóa trắng ô nhập liệu
function clearInput() {
  document.getElementById("mnv").value = "";
  document.getElementById("ht").value = "";
  document.getElementById("dc").value = "";
  document.getElementById("gt").value = "";
  document.getElementById("sdt").value = "";
}

function showInput() {
  var clickShowValue = document.querySelectorAll(".boxInput");
  // var manv = document.querySelector('input[name="MaSV"]');
  // var ht = document.querySelector('input[name="HoTen"]');
  // var gt = document.querySelector('input[name="GioiTinh"]');
  // var lop = document.querySelector('input[name="Lop"]');
  // var qq = document.querySelector('input[name="quequan"]');
  // var sdt = document.querySelector('input[name="SDT"]');

  clickShowValue.forEach((value) => {});
}

function updateSV() {
  alert('ok')
}

// //chuyển sang trang xóa nhân viên
// function pageHandleDelNV(manv){
//     window.location = "http://127.0.0.1:5500/xoa-nhansu.html";
// }
