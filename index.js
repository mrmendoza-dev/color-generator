
// API Base and Endpoint
//https://www.thecolorapi.com/docs#schemes-generate-scheme-get

const schemeBtn = document.getElementById("schemeBtn");
schemeBtn.addEventListener("click", getScheme);

const colorInput = document.getElementById("colorInput");
const modeInput = document.getElementById("modeInput");
const numColorsInput = document.getElementById("numColorsInput");

colorInput.addEventListener("change", ()=> {
  hexInput.value = colorInput.value;
  renderInputColor();
})


function renderInputColor() {
    sliderInput.value = 25;
    sliderText.innerText = `25%`;

    let inputHex = hexInput.value;
    inputColor.style.backgroundColor = inputHex;
    inputColorText.innerText = `Input Color ${inputHex}`;

    let alteredHex = alterColor(inputHex, 25);
    alteredColor.style.backgroundColor = alteredHex;
    alteredColorText.innerText = `Altered Color ${alteredHex}`; 
}


let numColors = 5;
const modes = [
  "analogic",
  "analogic-complement",
  "monochrome",
  "monochrome-dark",
  "monochrome-light",
  "complement",
  "triad",
  "quad",
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
colorDisplay = document.getElementById("colorDisplay");

function renderColors(colors) {
    let render_html = ``
    for (let color of colors) {
      render_html += `
            <div class="color-col" onclick="copyColor('${color.hex.value}')">
                <div class="color" style="background-color:${color.hex.value}"></div>
                <p class="color-code">${color.hex.value}</p>
            </div>
        `;
    }
    colorDisplay.innerHTML = render_html;
}


let includeHash = false;

toggleHashBtn = document.getElementById("toggleHashBtn");
toggleHashBtn.addEventListener("click", ()=> {
  includeHash = !includeHash;
  if (includeHash) {
    toggleHashBtn.style.backgroundColor = "#14aaaa";
  } else {
    toggleHashBtn.style.backgroundColor = "#14459A";
  }
})



function copyColor(color) {
  color = color.replace("#", "");

  if (!includeHash) {copyText = color;}
  else {
    copyText = "#" + color;
  };
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
  // reset(); 
  renderInputColor();
})

hexInput.addEventListener('keyup', () => {
    const hex = hexInput.value;
  if(!isValidHex(hex)) return;
    const strippedHex = hex.replace('#', '');
  inputColor.style.backgroundColor = "#" + strippedHex; 

  console.log();
  colorInput.value = "#" + strippedHex;

  reset(); 
})






function isValidHex(hex) {
  if (!hex) return false;
  const strippedHex = hex.replace("#", "");
  return strippedHex.length === 3 || strippedHex.length === 6;
}


function convertHexToRGB(hex) {
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

function convertRGBToHex(r,g,b) {
  const firstPair = ("0" + r.toString(16)).slice(-2);
  const secondPair = ("0" + g.toString(16)).slice(-2);
  const thirdPair = ("0" + b.toString(16)).slice(-2);
  const hex = "#" + firstPair + secondPair + thirdPair;
  return hex;
}

function alterColor(hex, percentage) {
  const { r, g, b } = convertHexToRGB(hex);
  const amount = Math.floor((percentage / 100) * 255);
  const newR = increaseWithin0To255(r, amount);
  const newG = increaseWithin0To255(g, amount);
  const newB = increaseWithin0To255(b, amount);
  return convertRGBToHex(newR, newG, newB);
}


function increaseWithin0To255(hex, amount) {
    return Math.min(255, Math.max(0, hex + amount));
}



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



function reset() {
  sliderInput.value = 25;
  sliderText.innerText = `25%`;

  let inputHex = hexInput.value;
  inputColor.style.backgroundColor = inputHex;
  inputColorText.innerText = `Input Color ${inputHex}`; 


  let alteredHex = alterColor(inputHex, 25);
  alteredColor.style.backgroundColor = alteredHex;
  alteredColorText.innerText = `Altered Color ${alteredHex}`; 
}








function roll(min, max, floatFlag) {
    let r = Math.random() * (max - min) + min
    return floatFlag ? r : Math.floor(r)
}


function generateRandomColor() {
  let r = roll(0, 256, 0);
  let g = roll(0, 256, 0);
  let b = roll(0, 256, 0);
  let hex = convertRGBToHex(r,g,b);
  console.log(hex);
  hexInput.value = hex;
  colorInput.value = hex;
  

  inputColor.style.backgroundColor = hexInput.value;
  console.log(colorInput.value);

  let alteredHex =  alterColor(hexInput.value, 25);
  alteredColor.style.backgroundColor = alteredHex;
getScheme();

  reset();



}




const randomColorBtn = document.getElementById("randomColorBtn");
randomColorBtn.addEventListener("click", generateRandomColor);
reset();
generateRandomColor();


inputColor.addEventListener("click", ()=> {
  console.log(colorInput.value);
  copyColor(colorInput.value);
})
// alteredColor.addEventListener("click", () => {
//   console.log(colorInput.value);
//   copyColor(colorInput.value);
// });








// generate random theme, num colors and mode
// copy altered color to clipboard
// upate hex input when color chosen and rerender
//create general render function

// chrome extension
// valid hex character check
// add rgb sliders for each value