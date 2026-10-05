$(document).ready(function() {

    $('#weatherForm').on('submit', function(e) {
        e.preventDefault();
        
        const city = $('#cityInput').val().trim();

        if(city !== "") {
            getWeather(city);
        }
    });

    function getWeather(cityName) {
        const apiKey = "70db08ea30f385e4e72cbfb4800fbefd"; 
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=tr`;

        $.ajax({
            url: apiUrl,
            method: "GET",
            beforeSend: function() {
                $('#result').html('<p class="placeholder-text">Hava durumu getiriliyor...</p>');
            },
            success: function(response) {
                const sicaklik = Math.round(response.main.temp); 
                const aciklama = response.weather[0].description.toUpperCase();

                const htmlIcerik = `
                    <div class="weather-box">
                        <h3>📍 ${response.name}, ${response.sys.country}</h3>
                        <p>Sıcaklık: <strong>${sicaklik}°C</strong></p>
                        <p>Durum: <strong>${aciklama}</strong></p>
                    </div>
                `;

                $('#result').hide().html(htmlIcerik).fadeIn(800);
            },
            error: function() {
                const hataMesaji = `<p style="color: red; font-weight:bold;">Şehir bulunamadı veya API hatası!</p>`;
                $('#result').hide().html(hataMesaji).fadeIn(500);
            }
        });
    }
});