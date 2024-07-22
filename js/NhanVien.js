function NhanVien(tknv, hoTen, gmail, matKhau, ngayLam, luongCB, chucVu, gioLam) {
    this.tknv = tknv;
    this.hoTen = hoTen;
    this.gmail = gmail;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.tinhTongLuong = function() {
        var tongLuong = 0;
        if(this.chucVu == "Sếp")
            tongLuong = this.luongCB * 3;
        else if(chucVu == "Trưởng phòng")
            tongLuong = this.luongCB * 2;
        else tongLuong = this.luongCB;

        return tongLuong;
    }
    this.xepLoai = function() {
        var xepLoai = '';

        if (this.gioLam >= 192) xepLoai = "Xuất sắc";
        else if (this.gioLam >= 176) xepLoai = "Giỏi";
        else if (this.gioLam >= 160) xepLoai = "Khá";
        else xepLoai = "Trung bình";

        return xepLoai;
    }
}