import React, { useState } from 'react';
import '../../Styles/Global.css'
import { Divider } from 'antd';
import { FiSun, FiMoon } from "react-icons/fi";
import logo from '../../assets/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { GoogleLogin} from '@react-oauth/google';
import { useAuth } from '../../utils/Authcontext';
function Login() {

const api = import.meta.env.VITE_API_URL;


  const { login } = useAuth();
  const clientId = '817763532692-mepg5s5h15m5vevuj9369nqtkqgc266f.apps.googleusercontent.com';
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const [userata, setUserData] = useState();
 

  const handleSubmit = async (event) => {
   
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(api, {
        username: inputs.username,
        userpassword: inputs.password
      },{
        headers:{
                 withCredentials:true,
                 'Authorization': localStorage.getItem("authToken")
                }
});
    
      if (response.data.message === 'success' && response.data.position === 1) {
       
       var fakeToken = response.data.accessToken;
      login(fakeToken);
      navigate('/student/dashboard');
      } 
      else if (response.data.message === 'success' && response.data.position === 2) {
        var fakeToken = response.data.accessToken;
        login(fakeToken);
      
        navigate('/faculty/My-Events');
      
      } 
      else if (response.data.message === 'success' && response.data.position === 3) {
        var fakeToken = response.data.accessToken;
        login(fakeToken);
      
        navigate('/admin/dashboard');
   
      } 
      else {
        alert('Invalid username');
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };
  const handleSubmit2 = async (userData) => {
 
    if (!userData) {
      console.error("Error: userData is null or undefined.");
      return;
    }
  
    try {
   
      axios.defaults.withCredentials = true;
      const response = await axios.post(api+"email", {
        email: userData.email,
      },{
        headers:{
                 withCredentials:true,
                 'Authorization': localStorage.getItem("authToken")

                }
});
      
   
      if (response.data.message === 'success' && response.data.position === 1) {
        var fakeToken = response.data.accessToken;
        login(fakeToken);
        navigate('/StudnetDashboard');
      } 
      else {
        alert('Invalid username');  
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // State for tracking dark mode

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


const handleKeyDown = (event) => {
  if (event.key === 'Enter') {

    handleSubmit();
  }
};
  return (
    // <GoogleOAuthProvider clientId={clientId}>
 
      <div className={`imageandform ${darkMode ? 'dark-mode' : ''}`}>
        <div className='loginform' onKeyDown={handleKeyDown}>
          <div className='signin'>Sign In</div>
          <div style={{ color: '#A3AED0' }}>Enter your email and password to sign in!</div>
          <div className='loginfield'>Email*</div>
          <div style={{ width:'91%',height:'7%' , paddingBottom:'2%'}}>
            <input type="text" placeholder='mail@simmmple.com' required className='logininput' name='username'
              value={inputs.username || ""}
              onChange={handleChange} />
          </div>

          <div className='loginfield'>Password*</div>
          <div className='password-container'>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder='Min. 8 characters'
              className='logininput'
              name='password'
              required
              value={inputs.password || ""}
              onChange={handleChange}
            />
            <span className='toggle-password' onClick={togglePasswordVisibility}>
              <i className={` fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}} style={{ color: '#A3AED0' }`}></i>
            </span>
          </div>

          <div className='keeploggedin'>
            <div style={{display:"flex"}}>
            <div><input type="checkbox" className='checkbox' /></div>
            <div className='keepmelogged'>Keep me logged in</div>
            </div>  
            <div className='forgot'>Forgot Password?</div>
          </div>

          <div style={{width:"92%",height:'7%',padding:"5% 0% 0% 0%"}}><button className='signinbutton' onClick={handleSubmit}>Sign In</button></div>

          <div style={{ display: 'flex', padding: '20px 0px',width:'100%'}}>
            <div className='notregisteredyeat'>Not registered yet? </div>
            <div className='createaccountlog'>Create an Account</div>
          </div>

          <div style={{ width:'92%' }}>
            <Divider style={{ borderTopWidth: '3px', fontWeight: '700', borderColor: '#A3AED0' }}>or</Divider>
          </div>

          <div style={{ width:'92%',padding:'30px 0px', justifyContent:'center',display:'flex'}}>
          <GoogleLogin 
           className="googlebutton"
           onSuccess={credentialResponse => {
             const details = jwtDecode(credentialResponse.credential);
             const userData = {
               picture: details.picture,
               name: details.name,
               email: details.email
             };
             setUserData(userData);
        
             handleSubmit2(userData)
           }}
           onError={() => {
             console.log('Login Failed');
           }}/>
          </div>
        </div>

        <div className='bg'>
          <div className='background'>

          <div style={{ display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center',width:'100%',height:'90%' }}>
            <img src={logo} alt="" className='logo' />
              <div className='learnmorelogin'>
                <div style={{ color: '#ffffff' }}>Learn more</div>
                <div><a className='linked-bit' href="https://www.bitsathy.ac.in/" target="_blank" rel="noopener noreferrer">bitsathy.ac.in</a></div>
              </div>
              <div className='mediaquierygogo'><GoogleLogin 
           className="googlebutton"
           onSuccess={credentialResponse => {
             const details = jwtDecode(credentialResponse.credential);
             const userData = {
               picture: details.picture,
               name: details.name,
               email: details.email
             };
             setUserData(userData);
        
             handleSubmit2(userData)
           }}
           onError={() => {
             console.log('Login Failed');
           }}/></div>
          </div>

            <div className='loginmodecontainer'>
              <button className='loginmode' onClick={toggleDarkMode}>{darkMode ? <FiMoon /> : <FiSun />}</button>
            </div> 
          </div>
        </div>
      </div>
  );
}

export default Login;