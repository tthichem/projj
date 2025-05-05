import {  useState ,useEffect} from 'react';
import './Login.css'
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { API_BASE_URL } from '../../utils/config';
import { decoderToken } from '../../utils/auth';


const Login = ({setShowLogin,setToken}) => {
  

  const[current, setCurrent] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);



  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const url = `${API_BASE_URL}/api/auth/`;
  
  const [data,setData] = useState({
    username : "",
    password: ""
  })

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }


  const onClickPassword = ()=>{
    setShowPassword(!showPassword);
  }


  const onLogin = async(event) =>{
    event.preventDefault();
    let copyUrl = url;
    if(current === "Login"){
      copyUrl += "login"
    }
    else{
      copyUrl += "register"
    }
    try{
    const reponse = await axios.post(copyUrl,data);
    
    if (reponse.data.token) {
      const token = reponse.data.token;
      const decodedToken = decoderToken(token);
      
      if (!decodedToken || !decodedToken.role) {
        throw new Error('Invalid token format');
      }

      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", decodedToken.role);
      setShowLogin(false);
      
      const message = current === "Login" 
        ? "You are successfully logged in! Welcome back" 
        : "Account created successfully! Now you are logged in.";
      alert(message + ` (Role: ${decodedToken.role})`);
    } else {
      throw new Error('No token received');
    }
  }
  catch(error){
    alert(error.response.data.message)
  }
    
  }

  return (
    <div className='login'>
        <form onSubmit={onLogin} className="login-container">
            <div className="login-title" >
                <h2>{current}</h2>
                <RxCross2 onClick={()=>setShowLogin(false)} className='cross'/>
            </div>
            <div className="login-input">
                <input name='username' onChange={onChangeHandler} value={data.username} type="text" placeholder='Username' required/>
                <div className="pass-container">
                <input name='password' onChange={onChangeHandler} value={data.password} 
                type={showPassword ? 'text' : 'password'} 
                placeholder='Password' 
                required
                />
                <button
                type='button'
                  className='hide-show'
                  onClick={onClickPassword}
                >
                  {showPassword ? <FaEye/> : <FaEyeSlash/>}
                </button>
                </div>
            </div>
            <button  type='submit' className='submit'>{current === "Sign Up"?"Create account":"Login"}</button>
            {current === "Login"
            ?<p>Create new account? <span onClick={()=>{setCurrent("Sign Up"); setData({username: "",password:""});}}>Click here</span></p>
            :<p>Already have account? <span onClick={()=>{setCurrent("Login"); setData({username: "",password:""});}}>Login here</span></p>
          }
            
            
        </form>
    </div>
  )
}

export default Login