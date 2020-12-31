
function updateApi (){
    $.ajax({
         url: `https://api.nasa.gov/planetary/apod?`,
         data:{api_key: 'NaQ9geoTkHNXybutx7eD9h3zjilArlXgOd3fydf8'},
         type: 'GET',
         datatype: 'json',
         success: function(data){
                updateInterface(data);
                console.log(data)
         }
     });
 };



$('#start').on("click", ()=> {
    updateApi();
    $('#start').hide();
    $('#main').show();
} )

function updateInterface(data){
    let url = data.url;
    $('iframe').attr('src', url);
    /*asdasdasd*/
    $('#title').text(data.title);
    $('#expln').text(data.explanation);
}

const getData = async ( url = 'https://api.nasa.gov/planetary/apod?api_key=NaQ9geoTkHNXybutx7eD9h3zjilArlXgOd3fydf8', data = {})=>{
    let url = new URL(url)
    
      const response = await fetch(url);
      

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
}

getData();