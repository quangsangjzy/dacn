var urlpb = 'http://localhost:3000/hocphan';

function start(){
    getPhongBan();
    handleFormCrPB();
}

start();

//hiển thị danh sách phòng ban
function getPhongBan(){
    fetch(urlpb)
        .then(function(respone){
            return respone.json();
        })
        .then(function(posts){
            // console.log(posts);
            var pbs = posts.map(function(post){
                return `
                    <tr>
                        <td>${post.MaHP}</td>
                        <td>${post.TenHP}</td>
                        <td>${post.SoTin}</td>
                        <td>${post.DonGia}</td>
                    </tr>
                `;

            });

            var pb = pbs.join('');
            document.querySelector('#render-pb tbody').innerHTML = pb;
        });
}

//sự kiện ấn nút thêm phòng ban
function handleFormCrPB(){
    var btnCreatePB = document.querySelector('#createPB');
    console.log(btnCreatePB);
    
    btnCreatePB.onclick = function(){
        var mpb = document.querySelector('input[name="MaPhong"]').value;
        var tenph = document.querySelector('input[name="TenPhong"]').value;
        var truongph = document.querySelector('input[name="TruongPhong"]').value;

        var formData = {
            MaPhong: mpb,
            TenPhong: tenph,
            TruongPhong: truongph
        };

        create(formData, function(){
            getPhongBan();
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
    fetch(urlpb, create)
        .then(function(respone){
            respone.json();
        })
        .then(callback);
}