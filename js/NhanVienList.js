function NhanVienList() {
    this.list = [];

    this.addNV = function(nv) {
        this.list.push(nv);
    }

    // this.findNV = function(xepLoai) {
    //     var xepLoai_Value = '';
    //     this.list.map(function(nv, loaiNV) {
    //         if(nv.xepLoai === xepLoai)
    //             xepLoai_Value = loaiNV;
    //     });
    //     return xepLoai_Value;
    // }

    this.isDuplicate = function(tknv) {
        return this.list.some(function(nv) {
            return nv.tknv === tknv;
        })
    }
}