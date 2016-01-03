$('#sidebar a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

$(function(){
$(".sidebar").hover(
        function() {
        //    $('.dropdown-menu', this).stop( true, true ).fadeIn("fast");
            $('.fa', this).toggleClass("fa-caret-right");
            $('.fa', this).toggleClass("fa-caret-down");
        },
        function() {          
            $('.fa', this).toggleClass("fa-caret-right");
            $('.fa', this).toggleClass("fa-caret-down");
        });
});
