const minRange = document.getElementById("min-range");
const maxRange = document.getElementById("max-range");
const minInput = document.getElementById("min-input");
const maxInput = document.getElementById("max-input");
const minSymbol = document.getElementById("min-symbol");
const maxSymbol = document.getElementById("max-symbol");
const progress = document.querySelector(".progress");
const selectCurrency = document.getElementById("currency");
const themeToggle = document.getElementById("themeToggle");

const rate = {
  "$USD" : 1,
  "₹INR" : 83.0,
  "€EUR" : 0.92
};

let currencySymbol = "$USD";
let previous = 1;

function format(num){
  return Math.round(num).toLocaleString();
}

function sliderUpdate (){
  let minimumVal = parseInt(minRange.value);
  let maximumVal = parseInt(maxRange.value);

  if (minimumVal>maximumVal){
    [minimumVal, maximumVal] = [maximumVal, minimumVal];
  }

  const symbolOnly = currencySymbol.substring(0, 1);
  minSymbol.textContent = symbolOnly;
  maxSymbol.textContent = symbolOnly;

  minInput.value = format(minimumVal);
  maxInput.value = format(maximumVal);

  let maxSlide = parseInt(minRange.max);
  let minPercentage = (minimumVal/maxSlide)*100;
  let maxPercentage = (maximumVal/maxSlide)*100;

  progress.style.left = minPercentage + "%";
  progress.style.width = (maxPercentage-minPercentage) + "%";

  const equivalent = maximumVal/rate[currencySymbol];

  if(equivalent<3000){
    progress.style.background = "#EE4B2B";
  }
  else if (equivalent<7000){
    progress.style.background = "#FFA500";
  }
  else{
    progress.style.background = "#4CBB17"
  }
}

selectCurrency.addEventListener("change", (e)=>{
  const newCurrency = e.target.value;
  const newRate = rate[newCurrency];

  const conversion = newRate/previous;

  [minRange, maxRange].forEach(input => {
    const currentValue = parseInt(input.value);
    const currentMax = parseInt(input.max);

    input.max = Math.round(currentMax*conversion);
    input.value = Math.round(currentValue*conversion);
  });

  currencySymbol = newCurrency;
  previous = newRate;

  sliderUpdate();
})

themeToggle.addEventListener("click", () =>{
  document.body.classList.toggle("dark");

  if(document.body.classList.contains("dark")){
    themeToggle.textContent="☀️";
  }
  else{
    themeToggle.textContent="🌙";
  }
});

minRange.addEventListener("input", sliderUpdate);
maxRange.addEventListener("input", sliderUpdate);

sliderUpdate();
