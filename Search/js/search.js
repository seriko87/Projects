const searchField = document.querySelector('#query');
const icon = document.querySelector('#search-btn');
const searchForm = document.querySelector('#search-form');
const result = document.querySelector('#results');
const buttonGroup = document.querySelector('#buttons');

searchForm.addEventListener('submit', function(e){
    e.preventDefault();
})

function search(token){
    //clearing results old results
    result.innerHTML = '';
    buttonGroup.innerHTML='';
    
    // what we are looking for
    let query = searchField.value;
    apiRequest(query,token);
   
}

function apiRequest (query, token){
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search', 
        data: {part:'snippet, id', q: query, type:'video', pageToken: token, key:''}, 
        type: 'GET', 
        dataType: 'json',
        success: function(data){
            console.log(data)
            let nextPageToken = data.nextPageToken;
            let prevPageToken = data.prevPageToken;
            data.items.forEach(item => {
                let output = getOutput(item);
                //display the output
                result.innerHTML += output;
            });

            let buttons = getButtons(prevPageToken, nextPageToken, query)
            buttonGroup.innerHTML = buttons;
        },
        error:function(jqXHR, textStatus, ex) {
            console.log(`${textStatus}, ${ex}, ${jqXHR.responseText}`);
            alert(`${textStatus}, ${ex}, ${jqXHR.responseText}`);
        }
    });
}

function getButtons(prevPageToken, nextPageToken, query){
    if(!prevPageToken) {
        return `<div class='button-container'>`+
                    `<button id="next-button" class='paging-button' data-token='${nextPageToken}' data-query='${query}' onclick='nextPage();'> Next Page </button>` +
                `</div>`
    } else {
        return `<div class='button-container'>`+
                    `<button id="prev-button" class='paging-button' data-token='${prevPageToken}' data-query='${query}' onclick='prevPage();'> Previous Page </button>` +
                    
                    `<button id="next-button" class='paging-button' data-token='${nextPageToken}' data-query='${query}' onclick='nextPage();'> Next Page </button>` +
                    `</div>`
    }
}

function prevPage(){
    let prevButton = document.querySelector('#prev-button');
    let token = prevButton.dataset.token;
    
    search(token);
}

function nextPage(){
    let nextButton = document.querySelector('#next-button');
    let token = nextButton.dataset.token;
    
    search(token);
}

function getOutput(item){
    let videoId = item.id.videoId
    let picture = item.snippet.thumbnails.high.url;
    let title = item.snippet.title;
    let desc = item.snippet.description;
    let channelTitle = item.snippet.channelTitle;
    let publishedDate = item.snippet.publishedAt;

    
    let output = `<li>` +
                    `<div class="list-left">` +
                        `<img src='${picture}'>` +
                    `</div>` +
                    `<div class="list-right">` +
                        `<h3><a data-fancybox class='fancybox fancybox.iframe' href="http://www.youtube.com/embed/${videoId}">${title}</a></h3>` +
                        `<small> By <span>${channelTitle}</span> on ${publishedDate}</small>` +
                        `<p> ${desc} </p>` +
                    `</div>` +
                `</li>`;    
    return output;
}