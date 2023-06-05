var urllg = 'http://localhost:3000/hoctap';

function start(){
    getLuong();
    handleFormCrLuong();
}

start();

//hiển thị lương nhân sự
function getLuong(){
    fetch(urllg)
        .then(function(respone){
            return respone.json();
        })
        .then(function(posts){
            var lgs = posts.map(function(post){
                return `
                    <tr>
                        <td>${post.MaSV}</td>
                        <td>${post.MaHP}</td>
                        <td>${post.DiemCC}</td>
                        <td>${post.DiemGK}</td>
                        <td>${post.DiemCK}</td>
                    </tr>
                `;
            });

            var lg = lgs.join('');
            document.querySelector('#render-lg tbody').innerHTML = lg;
        });
}

//sự kiện ấn nút thêm lương
function handleFormCrLuong(){
    var btnCreateLg = document.querySelector('#createLg');
    
    btnCreateLg.onclick = function(){
        var manv = document.querySelector('input[name="MaNV"]').value;
        var cv = document.querySelector('input[name="ChucVu"]').value;
        var nc = document.querySelector('input[name="NgayCong"]').value;
        var tc = document.querySelector('input[name="TroCap"]').value;
        var lc = document.querySelector('input[name="LuongCung"]').value;
        var formData = {
            MaNV: manv,
            ChucVu: cv,
            NgayCong: nc,
            TroCap: tc,
            LuongCung: lc
        };

        create(formData, function(){
            getLuong();
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
    fetch(urllg, create)
        .then(function(respone){
            respone.json();
        })
        .then(callback);
}