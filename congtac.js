var urlct = 'http://localhost:3000/kyluat';

function start(){
    getKhenThuong();
    handleFormCrCT();
}

start();

//hiển thị khen thưởng nhân sự
function getKhenThuong(){
    fetch(urlct)
        .then(function(respone){
            return respone.json();
        })
        .then(function(posts){
            var kts = posts.map(function(post){
                return `
                    <tr>
                        <td>${post.MaSV}</td>
                        <td>${post.ViPham}</td>
                        <td>${post.HinhThucPhat}</td>
                        <td>${post.DiemRenLuyen}</td>
                    </tr>
                `;
            });

            var kt = kts.join('');
            document.querySelector('#render-kt tbody').innerHTML = kt;
        })
}

//sự kiện ấn nút thêm công tác nhân viên
function handleFormCrCT(){
    var btnCreateCT = document.querySelector('#createCT');
    
    btnCreateCT.onclick = function(){
        var maph = document.querySelector('input[name="MaPhong"]').value;
        var mnv = document.querySelector('input[name="MaNV"]').value;
        var cv = document.querySelector('input[name="ChucVu"]').value;
        var time = document.querySelector('input[name="TgCongTac"]').value;
        var formData = {
            MaPhong: maph,
            MaNV: mnv,
            ChucVu: cv,
            TgCongTac: time
        };

        create(formData, function(){
            getKhenThuong();
        });
    }
}

function create(data, callback){
    var create = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(urlct, create)
        .then(function(respone){
            respone.json();
        })
        .then(callback);
}