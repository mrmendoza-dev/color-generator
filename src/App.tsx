import { useState, useEffect, useRef } from 'react'
import './css/App.css'
import "./css/Form.css";

import logo from "./assets/logo.png"
import {nanoid} from "nanoid"
import Footer from "./components/Nav/Footer";
import Nav from "./components/Nav/Nav";





function App() {
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
    
    const [currentColor, setCurrentColor] = useState("#000000");
    const [alteredColor, setAlteredColor] = useState("#000000");
    const [numColors, setNumColors] = useState(5);
    const [colorMode, setColorMode] = useState(modes[0]);
    const [hashed, setHashed] = useState(false);
    const [alterMode, setAlterMode] = useState(true);
    const [alterPercent, setAlterPercent] = useState(25);
    const [colorTheme, setColorTheme] = useState([]);


    const modeInput = useRef();
    const apiUrl = "https://www.thecolorapi.com/scheme";


    useEffect(() => {
      setCurrentColor(generateRandomColor());
      generateTheme();
    }, []); 



  function copyColor(e: any) {
    let color = e.currentTarget.style.backgroundColor.replace("#", "");
    console.log(color);

    let copyText = "";
    if (!hashed) {
      copyText = color;
    } else {
      copyText = "#" + color;
    }
    
    navigator.clipboard.writeText(color);
  }

 

function toggleHash() {
    setHashed((prevState) => !prevState);
}
function toggleAlter() {
    setAlterMode((prevState) => !prevState);
}

function updateColor(color: string) {
    setCurrentColor(color);
}
function updateNumColors(e: any) {
    let num = e.target.value
    setNumColors(num);
}
function updateAlterPercent(e: any) {
  let num = e.target.value;
  setAlterPercent(num);
}

function updateMode(e: any) {
    let mode = e.target.value;
    setColorMode(mode);
}

function generateRandomColor() {
    function randomValue() {
      let r = Math.random() * 256;
      return Math.floor(r);
    }
    let r = randomValue();
    let g = randomValue();
    let b = randomValue();

  let hex = convertRGBToHex(r, g, b).toUpperCase();
  updateColor(hex);
  return hex
}


function generateTheme() {
    let hexVal = currentColor.replace("#", "");
    let url = `${apiUrl}?hex=${hexVal}&mode=${colorMode}&count=${numColors}`;

    fetch(url, { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
        let colorsArray = data.colors;
        setColorTheme(colorsArray);
        });
}


  function isValidHex(hex: string) {
    if (!hex) return false;
    const strippedHex = hex.replace("#", "");
    return strippedHex.length === 3 || strippedHex.length === 6;
  }

  function convertHexToRGB(hex: any) {
    if (!isValidHex(hex)) return null;
    let strippedHex = hex.replace("#", "");

    if (strippedHex.length === 3) {
      strippedHex =
        strippedHex[0] +
        strippedHex[0] +
        strippedHex[1] +
        strippedHex[1] +
        strippedHex[2] +
        strippedHex[2];
    }
    const r = parseInt(strippedHex.substring(0, 2), 16);
    const g = parseInt(strippedHex.substring(2, 4), 16);
    const b = parseInt(strippedHex.substring(4, 6), 16);
    return { r, g, b } as any;
  }

  function convertRGBToHex(r: any, g: any, b: any) {
    const firstPair = ("0" + r.toString(16)).slice(-2);
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);
    const hex = "#" + firstPair + secondPair + thirdPair;
    return hex as any;
  }

  function alterColor(hex: any, percentage: any) {
    if (alterMode) {
      percentage = -percentage;
    }
    const { r, g, b } = convertHexToRGB(hex);
    const amount = Math.floor((percentage / 100) * 255);
    const newR = increaseWithin0To255(r, amount);
    const newG = increaseWithin0To255(g, amount);
    const newB = increaseWithin0To255(b, amount);
    const altered =  convertRGBToHex(newR, newG, newB);
    // setAlteredColor(altered);
    return altered;

  }

  function increaseWithin0To255(hex: any, amount: any) {
    return Math.min(255, Math.max(0, hex + amount));
  }

  return (
    <div className="App">
      <div className="title-banner">
        <img className="title-logo" src={logo} />
        <p className="app-title">Color Generator</p>
      </div>

      <div className="content-wrapper">
        <div className="color-editor controls-banner">
          <div className="controls">
            <div className="color-selector">
              <input
                name="color"
                type="color"
                className="form-color"
                onChange={(e) => updateColor(e.target.value.toUpperCase())}
                value={currentColor}
              />
              <input
                name="hex"
                type="text"
                id="hexInput"
                placeholder="#000000"
                value={currentColor}
                className="form-input"
                onChange={(e) => updateColor(e.target.value.toUpperCase())}
              />
              <button className="form-btn" onClick={generateRandomColor}>
                Random
              </button>
            </div>

            <div className="color-editor">
              <div className="toggle">
                <p className="toggle-text">Lighten/Darken</p>
                <button className="form-btn" onClick={toggleAlter}>
                  TOGGLE
                </button>
                <div className="form-silder">
                  <p className="silder-text">{alterPercent}%</p>
                  <input
                    name="slider"
                    type="range"
                    className="slider"
                    min="0"
                    max="100"
                    value={alterPercent}
                    onChange={updateAlterPercent}
                  />
                </div>
              </div>
            </div>

            <div className="theme-filters">
              <div className="">
                <label htmlFor="numColors">Number of colors</label>
                <input
                  name="numColors"
                  type="number"
                  value={numColors}
                  onChange={updateNumColors}
                  className="form-input"
                />
              </div>

              <div className="">
                <label htmlFor="mode">Theme Mode</label>
                <select
                  name="mode"
                  className="form-select"
                  onChange={updateMode}
                  value={colorMode}
                >
                  {modes.map((mode) => {
                    return (
                      <option key={nanoid()} value={mode.toLowerCase()}>
                        {mode}
                      </option>
                    );
                  })}
                </select>
              </div>

              <button
                type="submit"
                className="form-btn"
                onClick={generateTheme}
              >
                Generate
              </button>
            </div>
          </div>

          <div className="color-altered-display">
            <div className="altered-col">
              <p className="color-text">Input Color</p>
              <button
                className="color-box"
                style={{ backgroundColor: currentColor }}
                onClick={copyColor}
              ></button>
              <p className="color-col-hex">{currentColor}</p>
            </div>
            <div className="altered-col">
              <p className="color-text">Altered</p>
              <button
                className="color-box"
                style={{
                  backgroundColor: alterColor(currentColor, alterPercent),
                }}
                onClick={copyColor}
              ></button>
              <p className="color-col-hex">
                {alterColor(currentColor, alterPercent)}
              </p>
            </div>
          </div>
        </div>

        <div className="color-theme-display">
          {colorTheme.map((color: any) => {
            return (
              <div className="color-col">
                <button
                  key={nanoid()}
                  className="color-col-display"
                  style={{ backgroundColor: color.hex.value }}
                  onClick={copyColor}
                ></button>
                <p className="color-col-hex">{color.hex.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App


              // <div className="color-col">
              //   <button
              //     key={nanoid()}
              //     className="color-col-display"
              //     style={{ backgroundColor: color.hex.value }}
              //     onClick={copyColor}
              //   ></button>
              //   <p className="color-col-hex">{color.hex.value}</p>
              // </div>