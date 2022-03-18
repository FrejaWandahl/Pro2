// Wrap every letter in a span
var textWrapper = document.querySelector('.ml11 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml11 .line',
    scaleY: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700
  })
  .add({
    targets: '.ml11 .line',
    translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
    easing: "easeOutExpo",
    duration: 700,
    delay: 100
  }).add({
    targets: '.ml11 .letter',
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=775',
    delay: (el, i) => 34 * (i+1)
  }).add({
    targets: '.ml11',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });


  /*
  @datasæt hentes sådan:

  http://api.openweathermap.org/data/2.5/weather?
  q=Aarhus
  &lang=da
  &units=metric
  &appid=201d090c9cceacfc8931df89310ebfbb
  */

  /* Saml alt i en funktion */
  let GetWeather = function(city) {

    // get the weather data via query URI
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&lang=da&units=metric&appid=94df7f9ff51ea5f99470094fe37eeb0e").then(response => {
      return response.json();
    }).then(data => {

      // Work with JSON data here
      console.log(data); // show what's in the json

      // solnedgang
      var sunsetMs = data.sys.sunset * 1000 // dato-objektet har brug for millisek. Derfor * 1000
      var sunset = new Date(sunsetMs)
      var sunsetTime = sunset.getHours() + ":" + sunset.getMinutes();

      // nul foran minutter
      if (sunset.getMinutes() < 10) {
        etNul = "0"
      } else {
        etNul = ""
      }

      // solopgang
      var sunriseMs = data.sys.sunrise * 1000
      var sunrise = new Date(sunriseMs)

      if (sunrise.getMinutes() < 10) {
        srNul = "0"
      } else {
        srNul = ""
      }

      // Tilføjer resultatet
      result.innerHTML += `
              <div class="weatherInfo">
                <h1> ${data.name} </h1>

                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt=""/>
                <p> Her er ${data.weather[0].description}.</p>

                <aside>
                    <p>Solopgang: ${sunrise.getHours()}:${srNul}${sunrise.getMinutes()}<br>
                    Solnedgang: ${sunset.getHours()}:${etNul}${sunset.getMinutes()} <br>
                    <span class="small">(NB: Dansk tid!)</span>

                    </p>
                </aside>
              </div>
              `
    }).catch(err => {
      // Do something for an error here
      console.log('There was an error: ' + err);
    });

  } // ends GetWeather()

  // Use the function :-)
  GetWeather("Aarhus")

  let Da = function(){
	velkommen.innerHTML = "Hvordan ser vejret ud i Aarhus lige nu?"
}

  let En = function(){
	velkommen.innerHTML = "What is the weather like in Aarhus right now?"
}
