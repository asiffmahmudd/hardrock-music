

function takeInput(){
    let userInput = document.getElementById('userInput').value;
    if(userInput == null || userInput == undefined || userInput == "")
        alert("Please enter a name");
    else{
        getData(userInput);
    }
}

function getData(userInput){
    let url = `https://api.lyrics.ovh/suggest/${userInput}`;
    loadSpinner();
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data));
}

function displayData(data){
    console.log(data);
    document.getElementById('lyrics').innerText = "";
    let html = "";
    let l = data['data'].length;
    for(let i = 0; i < l; i++){
        html = html+`<div class="search-result col-md-8 mx-auto py-4">
                        <div class="single-result row align-items-center my-3 p-3">
                            <div class="col-md-9">
                                <h3 class="lyrics-name">${data['data'][i].title}</h3>
                                <p class="author lead">Album by <span>${data['data'][i].artist.name}</span></p>
                                <audio controls>
                                    <source src="${data['data'][i].preview}" type="audio/mpeg">
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                            <div class="col-md-3 text-md-right text-center">
                                <button onclick="getLyrics('${data['data'][i].artist.name}', '${data['data'][i].title}')" class="btn btn-success">Get Lyrics</button>
                            </div>
                        </div>
                    </div>`;
    }
    loadSpinner();
    document.getElementById('songs').innerHTML = html;
}

function getLyrics(artist, title){
    let url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showLyrics(data));
}

function showLyrics(data){
    if(data.lyrics == null || data.lyrics == "" || data.lyrics == undefined){
        document.getElementById('lyrics').innerText = "No Lyrics Found";  
    }
    else{
        document.getElementById('lyrics').innerText = data.lyrics;
    }
    document.getElementById('lyrics').scrollIntoView();
}

function loadSpinner(){
    document.getElementById('loading-data').classList.toggle("d-none");
}

document.addEventListener('keypress', function(e) {
    if(e.key === 'Enter'){
        document.getElementById('search-btn').click();
    }
});