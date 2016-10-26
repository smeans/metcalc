/*
 *  global site scripts
 */

$(function () {
  $('.about').click(showAbout);
  $('.about_page, .close_about').click(hideAbout);

  $('*[name=exp]').on('input', function () {
    try {
      $('.error').addClass('hidden');

      var exp = $(this).text();
      if (!exp.trim()) {
        $('.result').empty();
        return;
      }

      var r = metcalc.parse(exp);
      $('.result').html(r.scaled.value + '<sub>' + r.scaled.units + '</sub>');
      $('.result').attr('title', r.value);
    } catch (e) {
      $('.result').text('');
      if (e.message.indexOf('end of input') < 0) {
        $('.error').text(e.message);
        $('.error').removeClass('hidden');
      }
    }
  });
  $('*[name=exp]').focus();
});

function showAbout() {
  $('.about_page').removeClass('hidden');
}

function hideAbout() {
  $('.about_page').addClass('hidden');
}
