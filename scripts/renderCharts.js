

function setModalText(tempDif){

    var modalTitle = document.getElementById("modalTitle");
    var modalBody =  document.getElementById("modalBody");

    if (tempDif < 0.0) {

        modalTitle.innerHTML = "Nothing to worry about"
        modalBody.innerHTML = "It's actually cooler than it normally would be, you can relax."
    }else if (tempDif <  1.5){
        modalTitle.innerHTML = "Everythings under control"
        modalBody.innerHTML = "The World's leaders decided at COP26 that we're going to limit temperature rise to 1.5°C. Which means that what your experiencing today is probably totally fine."

    }else if (tempDif <  2.4){
        modalTitle.innerHTML = "More of what's to come"
        modalBody.innerHTML = "It's been predicted that unless major global trends change we're headed for a 2.4°C temperature rise."

    }else if (tempDif < 3){
        modalTitle.innerHTML = "Start stocking up on toilet paper"
        modalBody.innerHTML = "Your palms should be getting sweaty. This is dangerously close to the estimated threshold global temperature rise of 3°C."
    }else {
        modalTitle.innerHTML = "ABANDON ALL HOPE"
        modalBody.innerHTML = "It's far far too hot today. You are right to have climate anxiety"
    }
}


async function showTempComparisons(postcode, comparisonYear){
    
    var currentMonth = new Date().toLocaleString('default', { month: 'long' })
    var todaysData = await getTodaysForcast(postcode);
    var forcastTemp = todaysData.days[0].tempmax;
    var town = todaysData.resolvedAddress.split(",")[1].trim()

    // var forcastTemp = 20.9;
    // var town = "Leamington Spa";


    var averageComparisonTemp = await getComparisonWeather(postcode, comparisonYear)

    // var averageComparisonTemp = 21

    var todayLabel =  document.getElementById("todayLabel")
    todayLabel.hidden = false;

    var todayTemp =  document.getElementById("todayTemp")
    todayTemp.hidden = false;
    todayTemp.innerHTML = String(forcastTemp) + "°C" 

    var comparisonLabel =  document.getElementById("comparisonLabel");
    comparisonLabel.hidden = false;
    comparisonLabel.innerHTML = "Average max temperature in " + town + " during " + currentMonth + " " + String(comparisonYear)


    var comparisonTemp =  document.getElementById("comparisonTemp");
    comparisonTemp.hidden = false;
    comparisonTemp.innerHTML = String(averageComparisonTemp) + "°C" ;

    var tempDif = forcastTemp - averageComparisonTemp;

    setModalText(tempDif);



    var revealBtn =  document.getElementById("buttonContainer");
    revealBtn.hidden = false;
    
}

function revealArticle(){
    var articleContainer = document.getElementById("articleContainer");
    articleContainer.hidden = false;
}

async function renderCharts(){
    postcode = document.getElementById("postcodeInput").value;
    comparisonYear = Number(document.getElementById("comparisonInput").value); 
    // postcode = "cv311hw";
    // comparisonYear = 2005;

    showTempComparisons(postcode, comparisonYear)




    


}