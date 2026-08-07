import React from 'react'
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Utils/firebase';
import { useSelector, useDispatch } from 'react-redux';
import {onAuthStateChanged} from 'firebase/auth';
import { addUser, removeUser } from '../Utils/userSlice';
import {Logo} from '../Utils/constant'

const Header = () => {
  const user = useSelector((store)=>store.user);
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
}).catch((error) => {
    navigate("/error")
});
  }

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
  if (user) {
    const {uid, email, displayName, photoURL} = user;
    dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
    navigate("/browse")
  } else {
    dispatch(removeUser());
    navigate("/")
  }
});
  },[])

  return (
    
      <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={Logo} alt="Netflix Logo"/>
      
    {user&& (<div className="flex items-center">
          <img src={user?.photoURl} alt="User Profile"/>
          <button className="text-white font-bold m-4" onClick={handleSignOut}>Sign Out </button>
   </div>)}

    </div>
    
  )
}

export default Header