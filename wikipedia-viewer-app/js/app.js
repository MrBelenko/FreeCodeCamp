$(document).ready(function(){
  //When search is clicked run code
  $("#searchBtn").click(function(){
    //Gets search input
    var searchTerm = $("#searchTerm").val();
    //API url with searchTerm
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=?"; 
    $.ajax({
      type:"GET",
      url: url,
      async: false,
      dataType: "json",
      success: function(data){
      $("#output").html("");
      for (var i =0; i < data[1].length; i++){
        $('#output').append("<li><a href="+data[3][i]+" target='_blank'>"+data[1][i]+"</a><p>"+data[2][i]+"</p></li>");
      }
      $("#searchTerm").val("");  // cleaning a typed word in the search form
      },
      error: function(errorMessage){
        alert("Error");    /* console.log(errorMessage); */
      }
    })
  })

  $("#searchTerm").keypress(function(e){
    if(e.which == 13){
      $("#searchBtn").click();
    }
  })

})