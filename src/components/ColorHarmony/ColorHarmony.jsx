
import React, { useState, useEffect } from 'react';
import './harmony.css';
import Color from 'color';

const ColorHarmony = () => {
    const [selectedcolorHarmony, setSelectedColorHarmony] = useState('complementary');
    const [colors, setColors] = useState([]);
    const baseColor = '#f8e71c';//once the user selects the color, this will be updated
    
  useEffect(() => {
    handleColorsChange(selectedcolorHarmony)
     },[]);


     // this function to handle the changes in the color harmony
    const handleColorHarmonyChange = (event) => {
        const harmony = event.target.value;
        setSelectedColorHarmony(harmony);
       handleColorsChange(harmony);

    }
      
   // This function to update the colors based on the harmoney type
    const handleColorsChange = (harmonyType) => {
          // Example base color (you can change this)
        const harmonies = getColorHarmony(baseColor, harmonyType);
        setColors(harmonies);
    } 
 const getColorHarmony = (baseColor, harmonyType) => { 
    //placeholder for the function to get the colorHarmony
      const base = Color(baseColor);
     const harmonies = {
        complementary: [baseColor, base.rotate(180).hex()],
        monochromatic: [baseColor, base.rotate(30).hex(), base.rotate(60).hex()],
        analogous: [baseColor, base.rotate(30).hex(), base.rotate(-30).hex()],
        spiltcomplements:[baseColor, base.rotate(150).hex(), base.rotate(-150).hex()],
        triadic: [baseColor, base.rotate(120).hex(), base.rotate(-120).hex()],
        tetradic: [baseColor, base.rotate(90).hex(), base.rotate(180).hex(), base.rotate(270).hex()],
    
     };
     return harmonies[harmonyType] || [];
 
 }
    
    return (
        <div className='colorharmony'>
           <label>Select your color harmony</label>
             <select  className='colorharmony-dropdownmenu' value={selectedcolorHarmony} onChange={handleColorHarmonyChange}>
                <option value="complementary"> Complementary </option>
                <option value="monochromatic"> Monochromatic </option>
                <option value="analogous"> Analogous </option>
                <option value="spiltcomplements"> Spilt Complements </option>
                <option value="triadic">Triadic </option>
                <option value="tetradic"> Tetradic</option>
                </select>
           
            <div id=" colorharmony-colorDisplay">
                {colors.map((color, index) => (
                    <div key ={index} className='color-sample' style={{backgroundColor:color}}></div>
                ))}
        </div>
        
        </div>
    );
};

export default ColorHarmony;     