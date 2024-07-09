const list = document.getElementById('tableDanhSach');
const ds_NhanVien = new NhanVienList();

const account = document.getElementById('tknv');
const fullName = document.getElementById('name');
const mail = document.getElementById('email');
const password = document.getElementById('password');
const date = document.getElementById('datepicker');
const position = document.getElementById('chucvu');
const standardFee = document.getElementById('luongCB');
const hour = document.getElementById('gioLam');

const nutThem = document.getElementById('btnThem');
const nutThemNV = document.getElementById('btnThemNV');
const nutTimNV = document.getElementById('btnTimNV');
const nutCapNhatNV = document.getElementById('btnCapNhatNV');

const xacNhanXoaNV = document.getElementById('delNV');
const confirmDel = document.getElementById('confirmDel');
const cancelDel = document.getElementById('cancelDel');

let deleteIndex = -1;
let updateIndex = -1;

//Khi nhấn thêm nhân viên thì hiển thị nút thêm người dùng và ẩn nút cập nhật
nutThem.addEventListener('click', function(e) {
    e.preventDefault();
    nutCapNhatNV.style.display = 'none';
    nutThemNV.style.display = 'block';
    resetModal();
});

nutThemNV.addEventListener("click", function(e) {
    e.preventDefault();
    themNV();
});

nutTimNV.addEventListener("click", function(e) {
    e.preventDefault();
    timNV();
});

//Nút sửa nhân viên sẽ ẩn nút thêm người dùng của modal và hiển thị nút cập nhật
list.addEventListener('click', function(e) {
    if(e.target && e.target.classList.contains('suaNV')) {
        const index = e.target.getAttribute('data-index');
        updateIndex = index;
        resetModal();
        nutThemNV.style.display = 'none';
        nutCapNhatNV.style.display = 'block';
    }
});

nutCapNhatNV.addEventListener('click', function(e) {
    e.preventDefault();
    capNhatNV();
})

//Reset thông tin hiển thị trên modal
function resetModal() {
    account.value = '';
    fullName.value = '';
    mail.value = '';
    password.value = '';
    date.value = '';
    position.value = '';
    standardFee.value = '';
    hour.value = '';

    var thongBao = document.getElementsByClassName('sp-thongbao');
    for (let i = 0; i < thongBao.length; i++) {
        thongBao[i].style.display = 'none';
    }
}

//Tải thông tin vào modal, thường sử dụng cho update
// function fillModal(nv) {
//     account.value = nv.tknv;
//     fullName.value = nv.hoTen;
//     mail.value = nv.gmail;
//     password.value = nv.matKhau;
//     date.value = nv.ngayLam;
//     position.value = nv.chucVu;
//     standardFee.value = nv.luongCB;
//     hour.value = nv.gioLam;
// }

//Function thêm nhân viên
function themNV() {
    var tknv = account.value;
    var hoTen = fullName.value;
    var gmail = mail.value;
    var matKhau = password.value;
    var ngayLam = date.value;
    var chucVu = position.value;
    var luongCB = standardFee.value;
    var gioLam = hour.value;

    var nv = new NhanVien(tknv, hoTen, gmail, matKhau, ngayLam, luongCB, chucVu, gioLam);

    var thongBao = document.getElementsByClassName('sp-thongbao');
    if(validateForm() == false) {
        for (let i = 0; i < thongBao.length; i++) {
            thongBao[i].style.display = 'inline-block';
        }
    }
    //Nếu tài khoản trùng thì đưa ra thông báo trùng, nếu không 
    // thì thêm nhân viên vào và hiển thị danh sách
    else {
        if(ds_NhanVien.isDuplicate(nv.tknv)) {
            alert('Tài khoản đã tồn tại! Không thể thêm');
            return;
        }
        else {
            ds_NhanVien.addNV(nv);
            hienThiDS();
        }
    }
}

//Function tìm nhân viên theo loại 
function timNV() {
    var filterXepLoai = getID_Value("searchName");
    hienThiDS(filterXepLoai);
}

//Function cập nhật nhân viên
function capNhatNV() {
    var tknv = account.value;
    var hoTen = fullName.value;
    var gmail = mail.value;
    var matKhau = password.value;
    var ngayLam = date.value;
    var chucVu = position.value;
    var luongCB = standardFee.value;
    var gioLam = hour.value;

    var nv = ds_NhanVien.list[updateIndex];

    var thongBao = document.getElementsByClassName('sp-thongbao');
    if(validateForm() == false) {
        for (let i = 0; i < thongBao.length; i++) {
            thongBao[i].style.display = 'inline-block';
        }
    }
    else {
    //     if(ds_NhanVien.isDuplicate(nv.tknv)) {
    //         alert('Tài khoản đã tồn tại! Không thể đổi');
    //         return;
    //     }
    //     else {
        nv.tknv = tknv;
        nv.hoTen = hoTen;
        nv.gmail = gmail;
        nv.matKhau = matKhau;
        nv.ngayLam = ngayLam;
        nv.chucVu = chucVu;
        nv.luongCB = luongCB;
        nv.gioLam = gioLam;

        hienThiDS();             
    //     }
    }
}

//Hiển thị danh sách nhân viên, có kèm điều kiện loại nhân viên để thực hiện lọc nhân viên theo loại
function hienThiDS(filterXepLoai = '') {
    var content = "";
    ds_NhanVien.list.map(function (nv, index) {
        var loaiNV = xepLoai(nv.gioLam);
        if(filterXepLoai === '' || filterXepLoai == loaiNV) {
            content += `
                    <tr>
                        <td>${nv.tknv}</td>
                        <td>${nv.hoTen}</td>
                        <td>${nv.gmail}</td>
                        <td>${nv.ngayLam}</td>
                        <td>${nv.chucVu}</td>
                        <td>${tongLuong(nv.chucVu, nv.luongCB)}</td>
                        <td>${loaiNV}</td>
                        <td>
                            <button type="button" class="btn btn-success suaNV" data-target='#myModal' data-toggle='modal' data-index="${index}">Sửa</button>
                            <button type="button" class="btn btn-danger" onclick="openDeletePopup(${index})">Xóa</button>
                        </td>
                    </tr>
            `;
        }
    }); 

    list.innerHTML = content;
}

// Mở ô Pop-up xác nhận có xóa nhân viên hay không
confirmDel.addEventListener('click', function() {
    if (deleteIndex !== -1) {
        ds_NhanVien.list.splice(deleteIndex, 1);
        hienThiDS();
        closeDeletePopup();
    }
});

cancelDel.addEventListener('click', function() {
    closeDeletePopup();
});

function openDeletePopup(index) {
    deleteIndex = index;
    xacNhanXoaNV.style.display = 'block';
}

function closeDeletePopup() {
    xacNhanXoaNV.style.display = 'none';
    deleteIndex = -1;
}
///////////////////////////////////////////




