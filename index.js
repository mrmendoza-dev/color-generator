
// API Base and Endpoint
//https://www.thecolorapi.com/docs#schemes-generate-scheme-get

const schemeBtn = document.getElementById("schemeBtn");
schemeBtn.addEventListener("click", getScheme);

const colorInput = document.getElementById("colorInput");
const modeInput = document.getElementById("modeInput");
const numColorsInput = document.getElementById("numColorsInput");


let numColors = 5;
const modes = [
  "monochrome",
  "monochrome-dark",
  "monochrome-light",
  "analogic",
  "analogic-complement",
  "complement",
  "triad",
  "quad"
];
const base = "https://www.thecolorapi.com/";
const endpoint = "scheme";




for (let i = 0; i < modes.length; i++) {
    let option = document.createElement("option");
    option.value = modes[i];
    option.text = modes[i];
    modeInput.appendChild(option);
}




getScheme();

function getScheme() {
    let hexVal = colorInput.value.replace("#", "");
    let mode = modeInput.value;
    let numColors = numColorsInput.value;
    let url = `${base}scheme?hex=${hexVal}&mode=${mode}&count=${numColors}`;
    
    fetch(url, {method: "GET"})
    .then(res => res.json())
    .then(data => {
        let colorsArray = data.colors;
        renderColors(colorsArray);
    })
}


function renderColors(colors) {
    let html = ""
    for (let color of colors) {
      html += `
            <button class="color-btn" onclick="copyColor(this)">
            <div class="color-col">
                <div class="color" style="background-color:${color.hex.value}"></div>
                <p class="color-code">${color.hex.value}</p>
            </div>
            </button>
        `;
    }
    document.getElementById("colorDisplay").innerHTML = html;
}


function copyColor(color) {
    var copyText = color.innerText.replace("#", "");
    // var copyText = color.innerText;
    navigator.clipboard.writeText(copyText);
}





const hexInput = document.getElementById("hexInput");
const inputColor = document.getElementById("inputColor");

const alteredColor = document.getElementById("alteredColor");
const alteredColorText = document.getElementById("alteredColorText");

const sliderInput = document.getElementById("sliderInput");
const sliderText = document.getElementById("sliderText");

const lightenText = document.getElementById("lightenText");
const darkenText = document.getElementById("darkenText");
const toggleBtn = document.getElementById("toggleBtn");




toggleBtn.addEventListener('click', () => {
  if(toggleBtn.classList.contains('toggled')){
    toggleBtn.classList.remove('toggled');
    lightenText.classList.remove('unselected');
    darkenText.classList.add('unselected');
  } else {
    toggleBtn.classList.add('toggled');
    lightenText.classList.add('unselected');
    darkenText.classList.remove('unselected');
  }
  reset(); 
})

hexInput.addEventListener('keyup', () => {
  
  const hex = hexInput.value;
  if(!isValidHex(hex)) return;
  
  const strippedHex = hex.replace('#', '');

  inputColor.style.backgroundColor = "#" + strippedHex; 
  reset(); 
})

const isValidHex = (hex) => {
    if(!hex) return false;
    
    const strippedHex = hex.replace('#', '');
    return strippedHex.length === 3 || strippedHex.length === 6;
}



const convertHexToRGB = (hex) => {
  if(!isValidHex(hex)) return null;
  
  let strippedHex = hex.replace('#', '');

  if(strippedHex.length === 3){
    strippedHex = strippedHex[0] + strippedHex[0] 
    + strippedHex[1] + strippedHex[1] 
    + strippedHex[2] + strippedHex[2];
  }
  
  const r  = parseInt(strippedHex.substring(0,2), 16);
  const g  = parseInt(strippedHex.substring(2,4), 16);
  const b  = parseInt(strippedHex.substring(4,6), 16);
  
  return {r,g,b};
}

const convertRGBToHex = (r,g,b) => {
  const firstPair = ("0" + r.toString(16)).slice(-2);
  const secondPair = ("0" + g.toString(16)).slice(-2);
  const thirdPair = ("0" + b.toString(16)).slice(-2);
  
  const hex = "#" + firstPair + secondPair + thirdPair;
  return hex;
}

const alterColor = (hex, percentage) => {
  const {r, g, b} = convertHexToRGB(hex);
  
  const amount = Math.floor((percentage/100) * 255);
  
  const newR = increaseWithin0To255(r,amount);
  const newG = increaseWithin0To255(g,amount);
  const newB = increaseWithin0To255(b,amount)
  return convertRGBToHex(newR, newG, newB);
}

const increaseWithin0To255 = (hex, amount) => {
  return Math.min(255, Math.max(0, hex + amount));
}

alterColor("fff", 10)

sliderInput.addEventListener('input', () => {
  if(!isValidHex(hexInput.value)) return;
  
  sliderText.textContent = `${sliderInput.value}%`;

  const valueAddition = toggleBtn.classList.contains("toggled")
    ? -sliderInput.value
    : sliderInput.value;
  
  const alteredHex = alterColor(hexInput.value, valueAddition);
  alteredColor.style.backgroundColor = alteredHex;
  alteredColorText.innerText = `Altered Color ${alteredHex}`; 
})

const reset = () =>{ 
  sliderInput.value = 0;
  sliderText.innerText=`0%`;
  alteredColor.style.backgroundColor = hexInput.value;
  alteredColorText.innerText = `Altered Color ${hexInput.value}`; 

}



// Start with random color
// chrome extension
// valid hex character check