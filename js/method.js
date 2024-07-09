function getID_Value(id) {
    var output = document.getElementById(id).value;
    return output;
}

function tongLuong(chucVu, luong) {
    var tongLuong = 0;

    if(chucVu == "Sếp") 
        tongLuong = luong * 3;
    else if(chucVu == "Trưởng phòng")
        tongLuong = luong * 2;
    else tongLuong = luong;

    return tongLuong;
}

function xepLoai(gioLam) {
    var xepLoai = '';

    if(gioLam >= 192) xepLoai = "Xuất sắc";
    else if(gioLam >= 176) xepLoai = "Giỏi";
    else if(gioLam >= 160) xepLoai = "Khá";
    else xepLoai = "Trung bình";

    return xepLoai;
}
