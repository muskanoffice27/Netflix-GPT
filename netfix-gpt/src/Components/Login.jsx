import Header from "./Header"
import { useState,useRef } from "react";
import {CheckValidData} from "../Utils/CheckValidData"
import {createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Utils/firebase";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { addUser } from "../Utils/userSlice";


const Login = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate(); 
  const email=useRef(null);
  const password=useRef(null);
  const name=useRef(null);

  const [isSignInForm, setIsSignInForm]=useState(true);
  const [errMessage, setErrMessage]=useState(null);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }

  const handleButtonClick = () => {
       
    const message=CheckValidData(email.current.value, password.current.value);
    setErrMessage(message);
    if(message) return;

    if(!isSignInForm){
      createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
       .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxPQsL69zH5WmtuSlujGuR0VOuyPNPJaLviv8fnjCyyA&s=10"
          }) 
            .then(() => {
              const {uid, email, displayName, photoURL} = auth.currentUser;
                  dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
              navigate("/browse")
          }).catch((error) => {
        // An error occurred
         // ...
   });
  })
      .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       setErrMessage(errorMessage);
  });
    }else{
       signInWithEmailAndPassword(auth,email.current.value,password.current.value)
        .then((userCredential) => {
       const user = userCredential.user;
       console.log(user);
       navigate("/browse")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
   setErrMessage(errorMessage);
  });

    }
  }

  return (
    <div>
      
      <Header/>
      <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/ffa9d590-69c5-406f-bff9-e2ced3baa6ad/web/IN-en-20260713-TRIFECTA-perspective_75c0557e-9bbb-4149-9913-b87d4d7a30b7_large.jpg"
      alt="Netflix Background"/>
      </div>
     
      <form onSubmit={(e)=> e.preventDefault()} className="absolute bg-black w-3/12 p-12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        
        {!isSignInForm && <input ref={name} type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700 rounded-lg"/>}
        
        <input ref={email} type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-700 rounded-lg"/>
       
        <input ref={password} type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-700 rounded-lg"/>
        
        <p className="text-red-500 font-bold">{errMessage}</p>
        <button  className="bg-red-600 p-4 my-5 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>  
        
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already a User! Sign In Now"}</p>
      </form>
      

    </div>
  )
}

export default Login