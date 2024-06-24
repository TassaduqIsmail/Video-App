import React, { useState } from "react";

function Statersetyourrate() {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const handleTextChange = (event) => {
    const { value } = event.target;
    setSliderValue(parseFloat(value));
  };
  return (
    <div className="w-full h-full ">
      <center>
        <img src="whitelogo.png" className=" mt-40" alt="" />

        <p className="text-white text-2xl mt-20 font-bold">Set your rate</p>
   
        <div style={{ flexDirection: 'row', alignItems: 'center',display:'flex',justifyContent:"space-around",marginTop:20,marginBottom:10 }}>
        <span style={styles.sliderValueText}>0 €</span>
        <input
          type="range"
          min={0}
          max={100}
          value={sliderValue}
          onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
          style={{
            width: '80%',
            height: '5px',
            cursor: 'pointer',
            // appearance: 'none',
            // backgroundColor: '#d3d3d3',
            borderRadius: '10px',
            outline: 'none',
            // margin: '0 10px',
          }}
        />
        <span style={styles.sliderValueText}>100 €</span>
      </div>

      <div style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 2, paddingHorizontal: "5%", borderRadius: 10, borderColor: "#4753EA",width:"60%" }}>
        <span style={styles.sliderValueText}>€</span>
        <input
          type="number"
          maxLength={5}
          
          style={{
            width: '60px',
            height: '30px',
            padding: '5px',
            border: 'none',
            borderRadius: '5px',
            outline: 'none',
            marginRight: '5px',
            backgroundColor: "black",color:"#FFF"
          }}
          value={sliderValue ? sliderValue.toFixed(2).toString() : ''}
          onChange={handleTextChange}
        />
        <span style={styles.sliderValueText}>/month</span>
      </div>
      </center>
           <div className="p-5 mt-10">
         
          <a href='shareprofile'
            type="submit"
            className="mt-20 h-14 mb-5 text-white font-bold py-2 px-32 rounded-full"
            style={{
              backgroundImage: "linear-gradient(to bottom, #3640c2, black)",
            }}
          >
            Finish
          </a>
        </div>
    </div>
  );
}
const styles = {
  sliderValueText: {
    fontFamily: 'Poppins-Regular',
    color: '#FFF',
    fontSize: 16,
  },
};


export default Statersetyourrate;
