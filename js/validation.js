function validateAccount(tknv) {
    const regex = /^.{4,6}$/;
    return regex.test(tknv);
}

function validateName(hoTen) {
    const regex = /^[A-Za-zÀ-ỹà-ỹ\s]+$/;
    return regex.test(hoTen);
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePassword(matKhau) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    return regex.test(matKhau);
}

function validateDate(date) {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/;
    if (!regex.test(date)) return false;
    
    const [month, day, year] = date.split('/').map(Number);
    const dateObj = new Date(year, month - 1, day);

    return (
        dateObj.getFullYear() === year &&
        dateObj.getMonth() === month - 1 &&
        dateObj.getDate() === day
    );
}

function validateLuongCB(luongCB) {
    if(luongCB >= 1000000 && luongCB <= 20000000) 
        return true;
    return false;
}

function validateChucVu(chucVu) {
    if(chucVu == '') return false;
    return true;
}

function validateGioLam(gioLam) {
    if(gioLam >= 80 && gioLam <= 200) 
        return true;
    return false;
}

function validateForm() {
    var tknv = getID_Value('tknv');
    var hoTen = getID_Value('name');
    var gmail = getID_Value('email');
    var matKhau = getID_Value('password');
    var ngayLam = getID_Value('datepicker');
    var chucVu = getID_Value('chucvu');
    var luongCB = getID_Value('luongCB');
    var gioLam = getID_Value('gioLam');

    let isValid = true;

    if(!validateAccount(tknv)) {
        document.getElementById('tbTKNV').innerHTML = 'Tài khoản phải chứa từ 4-6 kí tự';
        isValid = false;
    }
    else document.getElementById('tbTKNV').innerHTML = '';

    if(!validateName(hoTen)) {
        document.getElementById('tbTen').innerHTML = 'Họ tên chỉ bao gồm chữ';
        isValid = false;
    }
    else document.getElementById('tbTen').innerHTML = '';

    if(!validateEmail(gmail)) {
        document.getElementById('tbEmail').innerHTML = 'Mail không đúng định dạng';
        isValid = false;
    }
    else document.getElementById('tbEmail').innerHTML = '';

    if(!validatePassword(matKhau)) {
        document.getElementById('tbMatKhau').innerHTML = 'Mật khẩu phải từ 6-10 kí tự, gồm 1 nhất 1 ký tự số, 1 ký tự in hoa và 1 ký tự đặc biệt';
        isValid = false;
    }
    else document.getElementById('tbMatKhau').innerHTML = '';

    if(!validateDate(ngayLam)) {
        document.getElementById('tbNgay').innerHTML = 'Ngày vào làm không hợp lệ';
        isValid = false;
    }
    else document.getElementById('tbNgay').innerHTML = '';

    if(!validateChucVu(chucVu)) {
        document.getElementById('tbChucVu').innerHTML = 'Chức vụ không hợp lệ';
        isValid = false;
    }
    else document.getElementById('tbChucVu').innerHTML = '';

    if(!validateLuongCB(luongCB)) {
        document.getElementById('tbLuongCB').innerHTML = 'Lương cơ bản phải từ 1tr - 20tr';
        isValid = false;
    }
    else document.getElementById('tbLuongCB').innerHTML = '';

    if(!validateGioLam(gioLam)) {
        document.getElementById('tbGiolam').innerHTML = 'Giờ làm hợp lệ phải từ 80h - 200h';
        isValid = false;
    }
    else document.getElementById('tbGiolam').innerHTML = '';

    return isValid;
}