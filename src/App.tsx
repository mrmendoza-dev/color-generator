import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './css/App.css'

function App() {
  const [count, setCount] = useState(0)



  
  return (
    <div className="App">
     <header className="container">
            <h2>Theme Creator</h2>
        </header>

        <section className="color-selector container">



            <div className="inputs__color">

                <div>
                    <div className="color__input">
                        <label for="color"></label>
                        <input name="color" type="color" id="colorInput"/>
                        <label for="hex"></label>
                        <input name="hex" type="text" id="hexInput" placeholder="#000000" value="#00ff00"/>
                    </div>
                    <button type="submit" className="btn" id="randomColorBtn">Random Color</button>
                    <button className="btn" id="toggleHashBtn">Include #</button>

                </div>


                <div className="color__editor">
                    <div className="toggle">
                        <p id="lightenText" className="toggle-text">Light</p>
                        <div id="toggleBtn" className="toggle-btn" >
                            <div className="inner-circle"></div>
                        </div>
                        <p id="darkenText" className="toggle-text">Darken</p>
                    </div>
                    
                    <label for="slider" id="sliderText">0%</label>
                    <input name="slider" type="range" id="sliderInput" className="slider"
                    value="0" min="0" max="100"/>
                </div>



            </div>


            <div className="editor__display">
                <div>
                    <p className="color-text" id="inputColorText">Input Color</p>
                    <div id="inputColor" className="box"></div>
                </div>
                <div>
                    <p className="color-text" id="alteredColorText">Altered Color</p>
                    <div id="alteredColor" className="box"></div>
                </div>
            </div>



            <div className="inputs__scheme">
                <label for="numColors"></label>
                <input name="numColors" type="number" value="5" id="numColorsInput" className="num-input"/>

                <label for="mode"></label>
                <select name="mode" id="modeInput" className="mode-input"></select>

                <button type="submit" className="btn" id="schemeBtn">Generate</button>
            </div>
            
        </section>

        <section id="colorDisplay" className="container"></section>
    </div>
  )
}

export default App
