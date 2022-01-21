console.log(axios);
var kiemTra = new Validation();



function getApiData(){
    var promise = axios({
        url:'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        method:'GET',
    });
    promise.then(function(result){
        console.log('Kết quả',result.data);
        renderTable(result.data);
    })
    promise.catch(function(error){
        console.log('Lỗi',error);
    })
}
getApiData();
function renderTable (mangNhanVien){
    var content = '';
    for (var i = 0; i < mangNhanVien.length; i++){
        var nhanVien = mangNhanVien[i];
        content += ` 
        <tr>
            <td>${nhanVien.maNhanVien}</td>
            <td>${nhanVien.tenNhanVien}</td>
            <td>${nhanVien.chucVu}</td>
            <td>${nhanVien.heSoChucVu}</td>
            <td>${nhanVien.luongCoBan}</td>
            <td>${nhanVien.soGioLamTrongThang}</td>
            <td>
                <button class="btn btn-danger" onclick="xoaNhanVien('${nhanVien.maNhanVien}')">Xóa</button>
                <button class="btn btn-success" onclick="suaNhanVien('${nhanVien.maNhanVien}')">Sửa</button>
            </td>    
        </tr>
        `
    }
    document.querySelector('tbody').innerHTML = content;
}

document.querySelector('#btnThemNhanVien').onclick = function(){
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.chucVu = document.querySelector('#chucVu').value;
    nhanVien.heSoChucVu = document.querySelector('#heSoChucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;
    var valid = true;
    valid &= kiemTra.kiemTraRong(nhanVien.maNhanVien, '#spanMaNV') & kiemTra.kiemTraRong(nhanVien.tenNhanVien, '#spanTenNV') & kiemTra.kiemTraRong(nhanVien.luongCoBan, '#spanLuongCoBan') & kiemTra.kiemTraRong(nhanVien.soGioLamTrongThang, '#spanSoGioLamTrongThang') & kiemTra.kiemTraRong(nhanVien.heSoChucVu, '#spanHeSoChucVu');

    valid &= kiemTra.kiemTraTatCaSo(nhanVien.maNhanVien, '#error_kiemTraSo_maNV') & kiemTra.kiemTraTatCaSo(nhanVien.luongCoBan, '#error_kiemTraSo_luongCoBan') & kiemTra.kiemTraTatCaSo(nhanVien.heSoChucVu, '#error_kiemTraSo_heSoChucVu') & kiemTra.kiemTraTatCaSo(nhanVien.soGioLamTrongThang, '#error_kiemTraSo_soGioLamTrongThang')

    valid &= kiemTra.kiemTraDoDai(nhanVien.maNhanVien, '#err_kiemTraSoLuong_maNV',4,6 )

    valid &= kiemTra.kiemTraTatCaKyTu(nhanVien.tenNhanVien, '#err_kiemTraKyTu_tenNV')

    valid &= kiemTra.kiemTraGiaTri(nhanVien.luongCoBan, '#err_kiemTraGiaTri_luongCoBan',1000000,20000000) & kiemTra.kiemTraGiaTri(nhanVien.heSoChucVu, '#err_kiemTraGiaTri_heSoChucVu',1,3) & kiemTra.kiemTraGiaTri(nhanVien.soGioLamTrongThang, '#err_kiemTraGiaTri_soGioLamTrongThang',50,150)

    var promise = axios({
        url:'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
        method:'POST',
        data: nhanVien
    })
    promise.then(function(result){
        console.log('Thành công',result.data);
        getApiData();
    })
    promise.catch(function(err){
        console.log('Lỗi',err.response?.data);
    })
}
function xoaNhanVien(maNhanVienClick){
    console.log(maNhanVienClick);

    var promise = axios({
        url:'http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien='+maNhanVienClick,
        method:'DELETE',
    })
    promise.then(function(result){
        console.log(result);
        getApiData();
    })
    promise.catch(function(err){
        console.log(err.response?.data);
    })
}
function suaNhanVien(maNhanVienClick){
    var promise = axios({
        url:'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=' + maNhanVienClick,
        method:'GET'
    });
    promise.then(function(result){
        console.log(result);
        var nhanVien = result.data;
        document.querySelector('#maNhanVien').value = nhanVien.maNhanVien;
        document.querySelector('#tenNhanVien').value = nhanVien.tenNhanVien;
        document.querySelector('#chucVu').value = nhanVien.chucVu;
        document.querySelector('#heSoChucVu').value = nhanVien.heSoChucVu;
        document.querySelector('#luongCoBan').value = nhanVien.luongCoBan;
        document.querySelector('#soGioLamTrongThang').value = nhanVien.soGioLamTrongThang;
        document.querySelector('#maNhanVien').disabled = true;


    })
    promise.catch(function(err){
        console.log(err.response?.data);
    })
}
document.querySelector('#btnCapNhap').onclick = function(){
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.chucVu = document.querySelector('#chucVu').value;
    nhanVien.heSoChucVu = document.querySelector('#heSoChucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;

    var valid = true;
    valid &= kiemTra.kiemTraRong(nhanVien.maNhanVien, '#spanMaNV') & kiemTra.kiemTraRong(nhanVien.tenNhanVien, '#spanTenNV') & kiemTra.kiemTraRong(nhanVien.luongCoBan, '#spanLuongCoBan') & kiemTra.kiemTraRong(nhanVien.soGioLamTrongThang, '#spanSoGioLamTrongThang') & kiemTra.kiemTraRong(nhanVien.heSoChucVu, '#spanHeSoChucVu');

    valid &= kiemTra.kiemTraTatCaSo(nhanVien.maNhanVien, '#error_kiemTraSo_maNV') & kiemTra.kiemTraTatCaSo(nhanVien.luongCoBan, '#error_kiemTraSo_luongCoBan') & kiemTra.kiemTraTatCaSo(nhanVien.heSoChucVu, '#error_kiemTraSo_heSoChucVu') & kiemTra.kiemTraTatCaSo(nhanVien.soGioLamTrongThang, '#error_kiemTraSo_soGioLamTrongThang')

    valid &= kiemTra.kiemTraDoDai(nhanVien.maNhanVien, '#err_kiemTraSoLuong_maNV',4,6 )

    valid &= kiemTra.kiemTraTatCaKyTu(nhanVien.tenNhanVien, '#err_kiemTraKyTu_tenNV')

    valid &= kiemTra.kiemTraGiaTri(nhanVien.luongCoBan, '#err_kiemTraGiaTri_luongCoBan',1000000,20000000) & kiemTra.kiemTraGiaTri(nhanVien.heSoChucVu, '#err_kiemTraGiaTri_heSoChucVu',1,3) & kiemTra.kiemTraGiaTri(nhanVien.soGioLamTrongThang, '#err_kiemTraGiaTri_soGioLamTrongThang',50,150)


    var promise = axios({
        url:'http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien='+ nhanVien.maNhanVien,
        method:'PUT',
        data: nhanVien
    });
    promise.then(function(result){
        console.log(result);
        getApiData();
    });
    promise.catch(function(err){
        console.log(err.response?.data);
    })

}