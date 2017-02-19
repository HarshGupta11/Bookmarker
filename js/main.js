$(document).ready(function(){
	// Listening for form submit event
	fetchData();
	$("#myForm").submit( saveBookmark);
});

function saveBookmark(event){
	//Get Form values
	var siteName = $(this).find("#siteName").val();
	var siteURL = $(this).find("#siteURL").val();
	
	// Performing form validations
	if(!validateForm(siteName, siteURL)) return false;

	// Updating local storage for bookmarks
	var bookmarks = localStorage.getItem('bookmarks')
	// Test if bookmarks is empty
	if (bookmarks === null){
		// Init array
		bookmarks = {};
	}
	else{
		// Get bookmarks from localstorage
		bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	}
	// Add bookmark to array
	bookmarks[siteName] = siteURL;
	// Set to localstorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	// Updating HTML Form
	$(this)[0].reset();
	fetchData();
	// Prevent form from submitting
	event.preventDefault();	
}

function removeBookmark(siteName){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Removing the data from bookmarks
	delete bookmarks[siteName];
	// Updating local storage back
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	// Updating the HTML content to display
	fetchData();
}
function fetchData(){
	var content = '';
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Forming the content to display
	for (key in bookmarks){
		content+= '<div class = "well">'+
				  '<h1>'+key+
				  '<a href = "'+bookmarks[key]+'" class = "btn btn-default" target = "_blank" >Visit</a>'+
				  '<a href="#" class = "btn btn-danger" onclick = "removeBookmark(\''+key+'\')">Delete</a>'+
				  '</h1>'+
				  '</div>';
	}
	// Displaying the content in html
	$('#BookmarksResults').html(content);
}
function validateForm(siteName, siteURL){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

	// Checking if any field is empty
	if( !siteName || !siteURL){
		alert("Please fill all the fields");
		return false;
	}
	// Checking that entered url is valid or not
	else if(!siteURL.match(regex)){
		alert("Please enter valid enter URL");
		return false;
	}
	// Checking if bookmark already exists
	else if (bookmarks != null && siteName in bookmarks){
		alert("Bookmark already exists with this site name");
		return false;
	}
	return true;
}