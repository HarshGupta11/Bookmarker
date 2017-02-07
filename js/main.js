$(document).ready(function(){
	// Listening for form submit event
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

	// Prevent form from submitting
	event.preventDefault();	
}

function validateForm(siteName, siteURL){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	if (bookmarks === null) return true;
	else if (siteName in bookmarks){
		alert("Bookmark already exists with this site name");
		return false;
	}
	else if( !siteName || !siteURL){
		alert("Please fill all the fields");
		return false;
	}
	else if(!siteURL.match('(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})')){
		alert("Please enter valid enter URL");
		return false;
	}
	return true;
}