import  { useState, useEffect } from 'react';
import { FaChevronDown } from "react-icons/fa";
import './colorHarmony.css';

const ColorHarmony = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedColorHarmony, setSelectedColorHarmony] = useState('');

  const optionsForHarmony = [
    { label: 'Complementary', value: 'complementary' },
    { label: 'Monochromatic', value: 'monochromatic' },
    { label: 'Analogous', value: 'analogous' },
    { label: 'Split Complements', value: 'splitcomplements' },
    { label: 'Triadic', value: 'triadic' },
    { label: 'Tetradic', value: 'tetradic' },
  ];

  const handleColorHarmonyChange = (option) => {
    setSelectedColorHarmony(option);
    setShowOptions(false);
  };
  

  useEffect(() => {
    setSelectedColorHarmony('');
  }, []);

  return (
    <div className="colorharmony">
      <div className="colorharmony-dropdownmenu ">
        <div className={`colorharmony-title ${showOptions ? 'active-title' : "colorharmony-title"}`}>
         <h3 >{selectedColorHarmony ? optionsForHarmony.find(opt => opt.value === selectedColorHarmony).label : 'Color Harmony'}</h3> 
          <span className={`dropdown__icon ${showOptions ? 'active' : 'dropdown_icon'}`}
           onClick={() => setShowOptions(!showOptions)}>
         <FaChevronDown />
        </span> 
      </div>
        {showOptions && (
          <div className="dropdown__options ">
            {optionsForHarmony.map((option) => (
              <p
                key={option.value}
                onClick={() => handleColorHarmonyChange(option.value)}
                className="dropdown__option" >
                {option.label}
              </p>
            ))}
          </div>
        )}
   </div>
   </div>
 
          );
};

export default ColorHarmony;
