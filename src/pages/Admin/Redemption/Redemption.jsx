import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { IoMoon } from 'react-icons/io5'
import { MdLightMode, MdNotificationsNone } from 'react-icons/md'
import axios from 'axios'
import { useState } from 'react'
import { useMemo } from 'react'
import { useEffect } from 'react'
import RedemptionTable from './RedemptionTable'

function Redemption({darkMode,toggleDarkMode}) {
    const [year,setyear]=useState('')
    const [dept,setdept]=useState('')
    const [rr,setrr]=useState('')
    const handleyearchange=(e)=>{
        setyear(e.target.value);
    }
    const handledeptchange=(e)=>{
        setdept(e.target.value);
    }
    const handlerrchange=(e)=>{
        setrr(e.target.value);
    }
    const columns = useMemo(
        () => [
          { Header: "SNO", accessor: "sno" },
          { Header: "REG NO", accessor: "id" },
          // { Header: "mathematics points", accessor: "mathematics points" },
          { Header: "mathematics mark", accessor: "mathematics mark" },
          // { Header: "physics points", accessor: "physics points" },
          { Header: "physics mark", accessor: "physics mark" },
          // { Header: "chemistry points", accessor: "chemistry points" },
         
          { Header: "chemistry mark", accessor: "chemistry mark" },
          // { Header: "electronics points", accessor: "electronics points" },
          { Header: "electronics mark", accessor: "electronics mark" },
          // { Header: "computing points", accessor: "computing points" },
          { Header: "computing mark", accessor: "computing mark" },
         
        ],
        []
      );
      const [data, setData] = useState([]);
      const handlesumbit=()=>{
  
        const fetchData = async () => {
            try {
              axios.defaults.withCredentials = true;
              const response = await axios.post(
                import.meta.env.VITE_API_URL + "internal_rp",{
                    rr:rr,
                    year:year=="First"?1:year=="Second"?2:year=="Third"?3:4,
                    dept:dept
                  },
                {
                  headers: {
                    withCredentials: true,
                    Authorization: localStorage.getItem("authToken"),
                  }
                }
              );
              const reversedData = response.data.message
                .reverse()
                .map((row, index) => ({ ...row, sno: index + 1 }));
              setData(reversedData);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
       
          };
          fetchData()
      }
     
  return (
    <div className={`con ${darkMode ? 'dark-mode' : ''}`}>
      <div className="header11">
        <div style={{ display: 'flex', width: '100%', alignItems: 'center', height: '100%' }}>
          <div className="Dash-em">Redemption</div>
        </div>
        <div className="theme">
          <div className="noti" > 
            <MdNotificationsNone />
          </div>
          <div className="light" onClick={toggleDarkMode}>
            {darkMode ? <IoMoon /> : <MdLightMode />}
          </div>
        </div>
      </div>
      <div className="allbody">
        <div className='col-body'>
            <div style={{height:'15%',width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{height:'60%',display:'flex',flexDirection:'column',justifyContent:'space-between',width:'22%'}}>
                <div className='label-rep'>Academic Year <span className="required">*</span></div>    
                <div className="search-bar-em1-rep1-ad">
            <select className="ba-em----s" onChange={handleyearchange}>
              <option style={{ color: '#2B3674', fontWeight: '600' }} value="" selected disabled hidden>Choose Academic year</option>
              <option style={{  fontWeight: '600' }} value="First">First Year</option>
              <option style={{  fontWeight: '600' }} value="Second">Second Event</option>
              <option style={{ fontWeight: '600' }} value="Third">Third Year</option>
              <option style={{  fontWeight: '600' }} value="Fourth">Fourth Event</option>
            </select>
        </div>
            </div>

            {/* <div style={{height:'60%',display:'flex',flexDirection:'column',justifyContent:'space-between',width:'22%'}}>
                <div className='label-rep'>Department <span className="required">*</span></div>    
                <div className="search-bar-em1-rep1-ad">
            <select className="ba-em----s" onChange={handleyearchange}>
              <option style={{ color: '#2B3674', fontWeight: '600' }} value="" selected disabled hidden>Choose Department</option>
              <option style={{  fontWeight: '600' }} value="First">CSE</option>
              <option style={{  fontWeight: '600' }} value="Second">IT</option>
              <option style={{ fontWeight: '600' }} value="Third">MECH</option>
              <option style={{  fontWeight: '600' }} value="Fourth">EEE</option>
              <option style={{  fontWeight: '600' }} value="Second">ECE</option>
              <option style={{ fontWeight: '600' }} value="Third">FD</option>
              <option style={{  fontWeight: '600' }} value="Fourth">BM</option>
              <option style={{  fontWeight: '600' }} value="Second">CIVIL</option>
              <option style={{ fontWeight: '600' }} value="Third">CSD</option>
              <option style={{  fontWeight: '600' }} value="Fourth">EI</option>
              <option style={{  fontWeight: '600' }} value="Second">ISC</option>
              <option style={{ fontWeight: '600' }} value="Third">MTRS</option>
              <option style={{  fontWeight: '600' }} value="Fourth">AG</option>
              <option style={{  fontWeight: '600' }} value="Fourth">AIDS</option>
              <option style={{  fontWeight: '600' }} value="Second">AIML</option>
              <option style={{ fontWeight: '600' }} value="Third">BT</option>
              <option style={{ fontWeight: '600' }} value="Third">TT</option>
              <option style={{  fontWeight: '600' }} value="Fourth">FT</option>
            </select>
        </div>
            </div> */}


                <div style={{height:'60%',display:'flex',flexDirection:'column',justifyContent:'space-between',width:'22%'}}>
                <div className='redepttit' >Department <span className="required">*</span></div>                
                <input  className='inp-fal-rep' value={dept} onChange={
                    handledeptchange} ></input>
                </div>
                <div style={{height:'60%',display:'flex',flexDirection:'column',justifyContent:'space-between',width:'22%'}}>
                <div className='label-rep' >Redemption Ratio <span className="required">*</span></div>                
                <input 
                // placeholder='Enter the Redemption Ratio' 
                type='number' className='inp-fal-rep' value={rr} onChange={
                    handlerrchange}></input>
                </div>
                
                <div style={{height:'60%',display:'flex',justifyContent:'center',alignItems:'end',width:'22%'}}>
                    <button className='asdfghjkl' onClick={handlesumbit}>
                        Submit
                    </button>
                </div>
            </div>   


            <div style={{height:'80%',width:'100%'}}>
                    {/* table */}
                    <RedemptionTable columns={columns} data={data}></RedemptionTable>
            </div>

        </div>
      </div>
    </div>
  )
}

export default Redemption