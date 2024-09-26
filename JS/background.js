$(function() {
    let $love = $('.heart');
    for(let i = 0; i < 4; i++) {
        $('.wrapper').append($love.clone());
    }
});