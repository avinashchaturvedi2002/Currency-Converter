// console.log(countryList);
const drpdwn=document.querySelectorAll(".countryList");
const baseURL="https://open.er-api.com/v6/latest/"
const amount=document.querySelector(".inputArea input")
const msgbox=document.querySelector("#msgbox");
const lastUpdated=document.querySelector("#lastUpdated");
const fromCountry=document.querySelector("#from")
const toCountry=document.querySelector("#to")
const convertBtn=document.querySelector("#convert")

function roundToDecimals(number, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round(number * factor) / factor;
}

for(let option  of drpdwn){
    for(let currcode in countryList)
    {
        // console.log(currcode)
        let newopt=document.createElement("option");
        newopt.innerText=currcode;
        newopt.value=currcode;
        if((newopt.value=="USD")&&(option.id=="from"))
        {
            newopt.selected="selected"
        }
        if((newopt.value=="INR")&&(option.id=="to"))
            {
                newopt.selected="selected"
            }
        option.append(newopt);
    }
    option.addEventListener("change",(evt)=>{
        changeFlag(evt.target);

    })
}

const changeFlag=(target)=>{

    let key=target.value;
    let country=countryList[key];
    let flagimg=target.parentElement.querySelector("img");
    flagimg.src=`https://flagsapi.com/${country}/shiny/64.png`


}

convertBtn.addEventListener("click",findExchangeRate)

async function findExchangeRate(evt){
    {
        evt.preventDefault();
        let amtVal=amount.value;
    
        if (amtVal === "" || amtVal < 1) {
            amtVal = 1;
            amount.value = "1";
          }
        let url=`${baseURL}${fromCountry.value}`
        let resultcurr=toCountry.value
        let prom1=await fetch(url);
        let prom2=await prom1.json();
        let conversionrate=prom2.rates[resultcurr];
        let result=roundToDecimals(amtVal * conversionrate,2);
        msgbox.innerText=`${amtVal} ${fromCountry.value} = ${result} ${resultcurr}`; 
        let lupdate=prom2.time_last_update_utc;
        lastUpdated.innerText=`Last Updated : ${lupdate.substring(0,16)}`;
        
        
    
    }
}

window.addEventListener("load",findExchangeRate)