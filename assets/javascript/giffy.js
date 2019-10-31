$(function(){
    populateButtons(searchArray,'searchButton', '#buttonsArea');
    console.log('Page Loaded.');
});

var searchArray = ['Dog', 'Cat', 'Bird'];

function populateButtons(searchArray,classToAdd,areaToAddTo){
//Clear the area so duplicate buttons are not added
    $(areaToAddTo).empty();
    for (var i=0; i<searchArray.length; i++){
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
    }
}
$(document).on('click', '.searchButton', function(){
    var type = $(this).data('type');
    //console.log(type);
    var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=Ya9paNnwBn8vrNUGu9bvlGXlyjWE2nCx&limit=10';
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })  
})
