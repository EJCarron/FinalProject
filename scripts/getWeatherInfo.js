

function convertToDatetimeFormat(dateObj){
    return dateObj.toISOString().split('T')[0]
}

function getThisWeeksWeather(postcode){

    d1 = new Date()
    d1.setDate(d1.getDate() - 1)
    d2 = new Date ()
    d2.setDate(d2.getDate() - 8)

    yesterday = convertToDatetimeFormat(d1)
    aWeekAgo = convertToDatetimeFormat(d2)

    callWeatherApi(postcode, aWeekAgo, yesterday)

}

async function getTodaysForcast(postcode){

    var todaysDate = new Date().toISOString()

    var url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${postcode}/${todaysDate}/${todaysDate}?unitGroup=metric&include=current&key=CA8BKN6GQKHPFZ2JZ3RGVLBF6&contentType=json`

    const res = await axios.get(url).then(res => (res))

    console.log(res.data)

    return res.data;

}

async function getComparisonWeather(postcode, comparisonYear){

    today = new Date()

    var firstDayMonth = new Date(comparisonYear, today.getMonth(), 1)
    var lastDayMonth = new Date(comparisonYear, today.getMonth() + 1, 0)


    var weatherData = await callWeatherApi(postcode, convertToDatetimeFormat(firstDayMonth), convertToDatetimeFormat(lastDayMonth))

    var averagerTemp = 0

    var weatherData = weatherData.locations[postcode].values

    var days = weatherData.length

    for (let i = 0; i < days; i++) {
        averagerTemp = averagerTemp + weatherData[i].maxt
    }

    averagerTemp = averagerTemp / days

    return Math.round(averagerTemp,1)

}


async function getWeatherInfo(){

    

    // var todaysData = await getTodaysForcast(postcode)
    // var forcastTemp = todaysData.days[0].tempmax
    // var currentTemp = todaysData.currentConditions.temp
    
    // getThisWeeksWeather(postcode)

    getComparisonWeather(postcode, comparisonYear)

}


async function callWeatherApi(postcode, startDate, endDate){

    var url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history?aggregateHours=24&contentType=json&&startDateTime=${startDate}&endDateTime=${endDate}&unitGroup=uk&dayStartTime=0:0:00&dayEndTime=0:0:00&location=${postcode}&key=CA8BKN6GQKHPFZ2JZ3RGVLBF6`

    const res = await axios.get(url).then(res => (res))

    console.log(res.data)

    return res.data;
}
