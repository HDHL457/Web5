$(document).ready(function(){
  var source = $("#girl_item_template").html();
  var girlTemplate = Handlebars.compile(source);

  $.ajax({
    method: "get",
    url: "/posts/newsfeed"
  }).then(function(data){

    var listContent = girlTemplate(data);
    $('#girl_list').html(listContent);

    $('#girl_list').masonry({
      itemSelector: '.item_container',
      columnWidth:'.item_container',
      percentPosition: true
    });

    $('#girl_list').imagesLoaded().progress(function(){
      $("#girl_list").masonry('layout');
    });
  }).fail(function(err){
    console.error(err);
  });
});
