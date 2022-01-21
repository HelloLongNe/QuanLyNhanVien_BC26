function Validation() {

    //Chứa các phương thức kiểm tra hợp lệ
    this.kiemTraRong = function (value,selectorError) {
        //Xử lý không hợp lệ
        //.trim(): loại bỏ khoảng trắng đầu và cuối chuỗi
        if(value.trim() === '') {
            document.querySelector(selectorError).innerHTML = ' Không được bỏ trống !';
            return false;
        }
        //Xử lý hợp lệ
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.kiemTraTatCaSo = function (value, selectorError) {
        var regexNumber = /^[0-9]+$/;
        if (regexNumber.test(value)) {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = 'Phải nhập số !';
        return false;
    }

    this.kiemTraDoDai = function (value, selectorError,minLength,maxLength) {

        if(value.length < minLength || value.length>maxLength) {
            document.querySelector(selectorError).innerHTML = 'Nhập từ ' + minLength + ' - ' + maxLength  + ' ký tự!';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraTatCaKyTu = function (value, selectorError) {
        var regexLetter = /^[A-Z a-z]+$/;
        if (regexLetter.test(value)) {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = 'Tên Nhân Viên Phải Là Chữ !';
        return false;
    }
    this.kiemTraGiaTri = function (value,selectorError,minValue,maxValue) {
        if(Number(value)> maxValue || Number(value) < minValue) {
            document.querySelector(selectorError).innerHTML = 'Giá Trị Nhập Vào Chỉ Từ ' + minValue + ' - ' + maxValue ;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

}