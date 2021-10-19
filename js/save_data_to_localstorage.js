$(document).on('click', '.js-gift-btn', function(){
    let fio = $('.gift_name').val()
    let phone = $('.gift_phone').val()

    localStorage.setItem('user_fio', fio,);
    localStorage.setItem('user_number', phone,);
})
