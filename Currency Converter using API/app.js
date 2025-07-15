const Base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const DropDown = document.querySelectorAll(".DropDown select");


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
