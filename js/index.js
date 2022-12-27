var nameInput = document.getElementById('nameInput');
var urlInput = document.getElementById('urlInput');
let outputBody = document.getElementById('outputBody');
var alerts = document.querySelectorAll(".alert");
var bookmarks=[];

if(localStorage.getItem('bookmark') != null){
    bookmarks = JSON.parse(localStorage.getItem('bookmark'));
    displayBookmark();
}

function addBookmark() {
    var siteName = nameInput.value;
    var siteUrl = urlInput.value;
    if (checkName(siteName) && checkUrl(siteUrl)) {
        hideAlerts();
        var bookmark = {
            name : siteName,
            url : siteUrl
        };

        bookmarks.push(bookmark);
        localStorage.setItem('bookmark', JSON.stringify(bookmarks));
        displayBookmark();   
        clearData();
    }
    else {
        if (checkName(siteName) == false) {
            showNameAlert("this name already exist");
        }
        if (checkUrl(siteUrl) == false) {
            showUrlAlert("this url already exist");
        }
        if (siteName == null || siteName == "") {
            showNameAlert("Name is required");
        }
        if (siteUrl == null || siteUrl == "") {
            showUrlAlert("Url Field is required");
        }
    }
}    

function displayBookmark() {
    var output = ``;
    for(var i = 0 ; i < bookmarks.length ; i++){
        output += `<div class="form output d-flex align-items-center justify-content-evenly shadow-sm">
        <div><h3>${bookmarks[i].name}</h3></div>
        <div><a class="btn btn-primary" href="${bookmarks[i].url}">Visit</a>
            <button class="btn btn-danger" onclick="deleteBookmark(${i})">Delete</button></div>
        </div>`
    }
    outputBody.innerHTML = output;
}

function deleteBookmark(index) {
    bookmarks.splice(index,1);
    localStorage.setItem('bookmark', JSON.stringify(bookmarks));
    displayBookmark();
}

function clearData() {
    nameInput.value = "";
    urlInput.value = "";
}

function hideAlerts() {
    for (var i = 0; i < alerts.length; i++)
        alerts[i].style.display = "none";
}

function checkName(name){
    if(name == null || name == ""){
        return false;
    }
    for(var i = 0 ; i < bookmarks.length ; i++){
        if(bookmarks[i].name == name){
            return false;
        }
    }
    return true;
}

function checkUrl(url){
    if(url == null || url == ""){
        return false;
    }
    for(var i = 0 ; i < bookmarks.length ; i++){
        if(bookmarks[i].url == url){
            return false;
        }
    }
    return true;
}

function showNameAlert(alert) {
    var nameAlertInput =document.getElementById('nameAlertInput');
    nameAlertInput.innerHTML = alert;
    nameAlertInput.style.display = 'block';
}

function showUrlAlert(alert) {
    var urlAlertInput = document.getElementById('urlAlertInput');
    urlAlertInput.innerHTML = alert;
    urlAlertInput.style.display = 'block';
}















