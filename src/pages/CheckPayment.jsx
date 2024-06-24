import { useLocation } from "react-router-dom";
import CheckOutPage from "./CheckOutPage";
import { useEffect, useState } from "react";

function CheckPayment() {
  const location = useLocation();
  const data1 = location?.state?.currentdata
  const [subdata,setSubData]= useState('')



useEffect(()=>{
  const uid =localStorage.getItem("uid")
  const data = { id:data1?._id ,price :data1?.price,uid}
  setSubData(data)
},[])

// console.log("datajjjjj",data);

  return (
    <>
      <CheckOutPage data={subdata} />
    </>
  );
}

export default CheckPayment;
