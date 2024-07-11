let x = async ()=>{
    let city = document.getElementById("inputcity").value;
    let temp = document.getElementById("temp")
    let humidity = document.getElementById("humidity")
    let windspeed = document.getElementById("wind-speed")
    let updatedcity = document.getElementById("city")
    let img = document.getElementById("weather")
    let humid = document.getElementById("humid")
    let wind = document.getElementById("wind")
    // console.log(city);
    // let city = "London";
    let url = "http://api.weatherapi.com/v1/current.json?key=9b35e5dba0314b9ca18120448241902&q="+city+"&aqi=no"
    // console.log(url);
    if (city == "") {
        alert('Please enter a City');
    } else {
        try {
            let x =  await fetch(url);
            let data = await x.json();
            temp.innerHTML= `${data.current.temp_c} °C`
            let temp_c = data.current.temp_c;
            // console.log("🚀 ~ x ~ temp_c:", temp_c)
            humidity.innerHTML= `${data.current.humidity}%`
            windspeed.innerHTML= `${data.current.wind_kph}km/h`
            updatedcity.innerHTML= `${data.location.name}, ${data.location.country}`
            if(temp_c<5){
                img.src="cold.png"
            }
            else if(data.current.condition.text=="Sunny")
            
            {
                img.src="sunny.png"
            }
            else if(data.current.condition.text=="Light rain")
            {
                img.src="rainy.png"
            }
            else if(data.current.condition.text=="Cloudy" || data.current.condition.text=="Partly cloudy"||data.current.condition.text=="Mist")
            {
                img.src="cloudy.png"
            }
            else if(data.current.condition.text=="Sunny")
            {
                img.src="sunny.png"
            }
            else{
                img.src="sunny.png"
            }
            img.classList.remove("d-none")
            humid.classList.remove("d-none")
            wind.classList.remove("d-none")
            console.log(data)
        }catch(err){
            alert("please enter a valid city!")
            console.log(err);
        }
    }

    // console.log("inside fun");
    // // let x =  await fetch(url);
    // let x=null;
    //  x= await fetch(url).then((response) => {
    //     if (response.status >= 400 && response.status < 600) {
    //       throw new Error("Bad response from server");
    //     }
    //     fun2()
    // }).then( (returnedResponse) => {
    //     // fun2();
    //     const fun2=async()=>{

    //         let y = await x.json();
    //         console.log(y);
    //     }

    // }).catch((error) => {
    //   // Your error is here!
    //   alert("Enter valid city")
    //   console.log(error)
    // });
    // console.log( x);
    // let y = await x.json();
    // console.log(y);
    // try {
    //     let x =  await fetch(url);
    //     console.log( x);
    //     let y = await x.json();
    //     console.log(y);
    // } catch (error) {
    //     alert("Enter valid city")
    // }
    
    // let z = y[0].id;
    // console.log(y[0]);
    // console.log(typeof y);
}
function showDetails(){
    x();
}




