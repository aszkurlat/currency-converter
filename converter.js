const API_KEY = "af565851cad8d4c1fea3a542";
const amount = document.querySelector("#amount");
const fromInput = document.querySelector("#from");
const toInput = document.querySelector("#to");
const fromList = [...document.querySelectorAll(".form-select")];
const currentValue = document.querySelector(".exchange-rate");
const result = document.querySelector(".calculated-result");
const btn = document.querySelector(".btn");
const exchangeIcon = document.querySelector(".bi-arrow-left-right");
const currencyInput = document.querySelector(".currency img");
const dropList = document.querySelectorAll(".currency select");
let isRotated = true;

for (let i = 0; i < fromList.length; i++) {
  for (countryCode in countryCodesList) {
    let selected;
    i == 0
      ? (selected = countryCode === "USD" ? "selected" : "")
      : i == 1 && (selected = countryCode == "EUR" ? "selected" : "");

    let option = `<option value="${countryCode}" ${selected} style="background-image:url('https://flagcdn.com/48x36/eu.png');">${countryCode}</option>`;
    fromList[i].insertAdjacentHTML("beforeend", option);
  }
  dropList[i].addEventListener("change", (e) => loadFlag(e.target));
}

function convert() {
  let number = amount.value;
  if (number == 0 || number == "") {
    amount.value = "";
    return;
  }

  fetch(
    `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromInput.value}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      let exchangeRate = data.conversion_rates[toInput.value].toFixed(2);
      let totalExchangeRate = (number * exchangeRate).toFixed(2);
      result.style.backgroundColor = "rgba(86, 221, 203, 0.349)";
      result.innerText = `${number} ${fromInput.value} = ${totalExchangeRate} ${toInput.value}`;
    });
}

function loadFlag(element) {
  for (let code in countryCodesList) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/48x36/${countryCodesList[
        code
      ].toLowerCase()}.png`;
    }
  }
}

const changeCurrency = () => {
  if (isRotated === false) {
    exchangeIcon.style.transform = "rotate(" + 0 + "deg)";
    isRotated = true;
  } else if (isRotated === true) {
    exchangeIcon.style.transform = "rotate(" + 180 + "deg)";
    isRotated = false;
  }

  let tempcode = fromInput.value;
  fromInput.value = toInput.value;
  toInput.value = tempcode;
  loadFlag(fromInput);
  loadFlag(toInput);
  convert();
};
exchangeIcon.addEventListener("click", changeCurrency);
btn.addEventListener("click", convert);
