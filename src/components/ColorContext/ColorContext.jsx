
// import  { useState } from "react";
// import "./colorcontext.css";


// const ColorContext = () => {

// const[context, setContext] = useState(''); 
   
//     const handleSubmit = (e) => {
//     e.preventDefault();
//     setContext('');
// };
    
    
// //     return (
// //          <div className="colorcontext">
// //             <p className="colorcontext-para">Select context</p>
// //         <input className="colorcontext-input" type="text" placeholder="Interior,Fashion,web design..... " />
    
// //         </div>
// // )
// return(
//      <div className="colorcontext">
//     <form onSubmit={handleSubmit}>
//        <p className="colorcontext-para">Select context</p>
//         <textarea className="colorcontext-input" placeholder="Interior,Fashion,web design..... "
//           value={context}
//           onChange={(e) => setContext(e.target.value)}
//           required
         
//             />
//        <button type="submit"></button>
//     </form>
//  </div>
//         );
// };

// export default ColorContext;
import  { useState, useRef } from 'react';
import './colorcontext.css';

const ColorContext = () => {
  const [context, setContext] = useState('');
  const textareaRef = useRef(null);

     const handleChange = (e) => {
         const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
  
        setContext(e.target.value);}
    return (
    <div className="colorcontext">
    <p className="colorcontext-para">Select context</p>
        <textarea
          ref={textareaRef}
          className="colorcontext-input"
          placeholder="Type your purpose to get the best color combination."
          value={context}
          onChange={handleChange}
          required
        />
    </div>
  );
};

export default ColorContext;
