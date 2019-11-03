//Call the function to fill html
//Check to see that JS is connected to html 
$(function(){
    populateButtons(searchArray,'searchButton', '#buttonsArea');
    //console.log('Page Loaded.');
});
//Create array with initial values
var searchArray = ['Long jump', 'Snow board', 'Curling'];
//Create the function to populte the html with buttons and array values, add a class and add to an area
function populateButtons(searchArray,classToAdd,areaToAddTo){
//Clear the area so duplicate buttons are not added
    $(areaToAddTo).empty();
    //For loop to cycle through the initial array and create html
    for (var i=0; i<searchArray.length; i++){
        //local var a to make button, add class = 'data-type'
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', searchArray[i]);
        //use array values to set attributes then add to html
        a.text(searchArray[i]);
        //append buttons with array values to variable areaToAddTo
        $(areaToAddTo).append(a);
    }
}
//Set up an Ajax request using an on-click event
$(document).on('click', '.searchButton', function(){ //Check this???
    $('#searches').empty();
    //Create variable to capture data text from user input then test it
    var type = $(this).data('type');
    //console.log(type);
    //Build the url using two variables q = type and apiKey
    var apiKey = 'Ya9paNnwBn8vrNUGu9bvlGXlyjWE2nCx';
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=' + apiKey + '&limit=10';
    //Build the actual ajax request using the URL and 'GET' method; Test the response for the object(s)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        //console.log(response);
        //Create a for loop to cycle through the retrieved object
        for(i=0; i<response.data.length; i++){
            //Creat a var that creates an element and assign a class 
            var searchDiv = $('<div class="search-tiem">');
            //Create a var that captures the rating
            var rating    = response.data[i].rating;
            //Create a  vare to create a second plain p element to display the rating via .text
            var p         = $('<p>').text('Rating: ' + rating);
            //Creat two vars to obtian the animated and still copies of the gif files
            var animated  = response.data[i].images.fixed_height.url;
            var still     = response.data[i].images.fixed_height_still.url;
            //Create a var to generate an image element
            var image     = $('<img>');
            //Add atributes to the image i.e. src, data-still, data-animated with the URLs
            image.attr('src', still);
            image.attr('data-still', still);
            image.attr('data-animated', animated);
            //add two more attributes to image
            image.attr('data-state', 'still');
            //Add a class to the image
            image.addClass('searchImage');
            //The searchDiv is then appended with the p element (ratings) and the image
            searchDiv.append(p);
            searchDiv.append(image);
            //Content is then displaye in the html div with id = searches
            $('#searches').append(searchDiv);
        }
    })  
})
//Animate and Still the gifs
//Create a function that upon click of image plays the gif
//assigned class is searchImage
$(document).on('click', '.searchImage', function(){
    //Create a variable and set an attribute of data-state
    var state = $(this).attr('data-state');
    //If Else statement in order to distinguish between still and animated
    if (state=='still'){
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})
//Create function that adds buttons from input
//Create a click event on the input button class addSearch
$('#addSearch').on('click', function(event){
    event.preventDefault();
    //Creaate a var that captures the input and set it to 0 followed by a val
    var newSearch = $('input').val();
    //Add these values (push) to the array
    searchArray.push(newSearch);
    //Run the function that was previously created to add buttons with array data
    populateButtons(searchArray, 'searchButton', '#buttonsArea');
    //Not sure why false but this code keeps it from duplicating buttons in initial array
    return false;
})