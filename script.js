$('.w-btn').click(() => showWeather($('.w-input').val()));
function showWeather(city){
    if (!city){
    alert('Enter a city');
    return;
    }
    $.ajax({
        url:`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f89e161a878685dcfa708dfbc08a670e`
    })
        .done(function (data){
            if (data.name){
                $('.w-placeholder').css('visibility','visible','display','flex');
                $('.city').text(data.name);
                $('.weather-img').css('background-image',`url(http://openweathermap.org/img/w/${data.weather[0].icon}.png)`);
                $('.weather-desk').text(`Weather: ${data.weather[0].description}`);
                $('.temp').text(`Temperature: ${Math.round(data.main.temp - 273.15)}°C`);
                $('.wind').text(`Wind speed: ${data.wind.speed} m/s`);
                $('.humidity').text(`Humidity: ${data.main.humidity}%`);
            }else {
                $('.error-placeholder').css('visibility','visible');
                $('.w-placeholder').css('display','none');
                $('.err').text(data.message);
            }
            let now = new Date();
            let month;
            if (now.getMonth()+1<10){
                month = `0${now.getMonth()+1}`;
            }else {
                month = `${now.getMonth()+1}`;
            }
            document.querySelector('.time').innerText = `${now.getDate()}.${month} ${now.getHours()}:${now.getMinutes()}`;
        }

        );
    $('.w-input').val('');
}
$('.w-input').keydown(function (e){
    if (e.keyCode === 13){
        showWeather($('.w-input').val());
    }
});
