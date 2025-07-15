const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/";

const DropDown = document.querySelectorAll(".DropDown select");
const FormButton = document.querySelector(".FormButtons");
const FromCurr = document.querySelector(".from select");
const ToCurr = document.querySelector(".to select");
const Msg = document.querySelector(".msg");

// Here we are accessing the countryList object from code.js
// and populating the dropdowns with currency codes.

// A new Option is Created here just to add the Currency Codes to the dropdowns
// The value and innerText of the option is set to the currency code.
for(let select of DropDown)
{
  for(CurrCode in countryList)
  {
    let newoption = document.createElement("option");
    newoption.innerText = CurrCode;
    newoption.value = CurrCode;
    select.append(newoption);
    if(select.name === "From" && CurrCode === "USD")
    {
      newoption.selected = true;
    }
    else if (select.name === "To" && CurrCode === "INR")
    {
      newoption.selected = true;
    }
  }

  select.addEventListener("change", (evt) => {
  UpdateFlag(evt.target);
});

}
// This function updates the flag image based on the selected currency code.
// It retrieves the country code from the countryList object and updates the image source.
// The image is located in the parent element of the select dropdown.
// The image source is constructed using the flagsapi.com service.
// This allows the flag to change dynamically when the user selects a different currency.
// The function is called whenever a dropdown value changes.
const UpdateFlag = (element) => {
  let CurrCode = element.value;
  let countryCode = countryList[CurrCode];
  let newImg = `https://flagsapi.com/${countryCode}/flat/64.png`;
  // Find the image element in the parent of the select dropdown
  // and update its source to the new image URL.
  let img = element.parentElement.querySelector("img");
  img.src = newImg;
};

FormButton.addEventListener("click", async (evt) =>{
  evt.preventDefault();
  let amount = document.querySelector(".Amount input");
  let amountvalue = amount.value;
  if(amountvalue === "" || amountvalue <= 0)
  {
    alert("Please enter a valid amount");
    return;
    amountvalue = 1;
    amount.value = "1";
  }
const URL = `${Base_URL}currencies/${FromCurr.value.toLowerCase()}.json`;
let response = await fetch(URL);
let data = await response.json();
let rate = data[FromCurr.value.toLowerCase()][ToCurr.value.toLowerCase()];
// If the rate is not found, it means the currency conversion is not available.
// This Console log is for debugging purposes to see the rate fetched from the API.
console.log(`1 ${FromCurr.value} = ${rate} ${ToCurr.value}`);

let finalAmount = (amountvalue * rate);
Msg.innerText = `${amountvalue} ${FromCurr.value} = ${finalAmount.toFixed(2)} ${ToCurr.value}`;
});