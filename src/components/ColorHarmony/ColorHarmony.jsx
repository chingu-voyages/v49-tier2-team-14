
import  { useState, useEffect } from 'react';
import Color from 'color';
import './colorHarmony.css';


const ColorHarmony = ({ setHarmonyColors, harmonyColors }) => {
    const [selectedcolorHarmony, setSelectedColorHarmony] = useState('');
   
    // useEffect(() => {
    //     handleColorsChange(selectedcolorHarmony)
    // }, [baseColor, selectedcolorHarmony]);
    

   // this function to handle the changes in the color harmony
    const handleColorHarmonyChange = (event) => {
        const harmony = event.target.value;
        setSelectedColorHarmony(harmony);
    //    handleColorsChange(harmony);

    }
      
   // This function to update the colors based on the harmoney type
    // const handleColorsChange = (harmonyType) => {
    //       // Example base color (you can change this)
    //     const harmonies = getColorHarmony(baseColor, harmonyType);
    //     setHarmonyColors(harmonies);
    // } 
    // const getColorHarmony = (baseColor, harmonyType) => {
    //     //placeholder for the function to get the colorHarmony
    //     const base = Color(baseColor);
    //     const harmonies = {
    //         complementary: [baseColor, base.rotate(180).hex()],
    //         monochromatic: [baseColor, base.rotate(30).hex(), base.rotate(60).hex()],
    //         analogous: [baseColor, base.rotate(30).hex(), base.rotate(-30).hex()],
    //         spiltcomplements: [baseColor, base.rotate(150).hex(), base.rotate(-150).hex()],
    //         triadic: [baseColor, base.rotate(120).hex(), base.rotate(-120).hex()],
    //         tetradic: [baseColor, base.rotate(90).hex(), base.rotate(180).hex(), base.rotate(270).hex()],
    
    //     };
    //     return harmonies[harmonyType] || [];
 
    // };
     
  return (
    
        <div className='colorharmony'>
           <p className='colorharmony-para'>color harmony..</p>
             <select  className="colorharmony-dropdownmenu" value={selectedcolorHarmony} onChange={handleColorHarmonyChange}>
                <option value="complementary"> Complementary </option>
                <option value="monochromatic"> Monochromatic </option>
                <option value="analogous"> Analogous </option>
                <option value="spiltcomplements"> Spilt Complements </option>
                <option value="triadic">Triadic </option>
                <option value="tetradic"> Tetradic</option>
                </select>
           
            {/* <div id=" colorharmony-colorDisplay">
                {harmonyColors.map((color, index) => (
                    <div key ={index} className='color-sample' style={{backgroundColor:color}}></div>
                ))}
        </div> */}
        
        </div>
    );
};

export default ColorHarmony;     

