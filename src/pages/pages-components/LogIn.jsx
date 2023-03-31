import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../db/firebase';
import { setUser } from '../../features/userSlice';
import { useDispatch } from 'react-redux';


const LogIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
      //Firebase function that allows users sign-in via Firebase
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
       dispatch(setUser({ id: user.uid, email: user.email })); //Substitute the console.log with this
     //Substitute the console.log with this
      navigate('/dashboard')
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <main className="w-full flex flex-col items-center justify-center mt-[60px]">
      <div className='w-[80%] p-[20px] shadow'>

      <p>Log in to your dashboard</p>
      <form
        className="w-full flex flex-col items-center justify-center mt-[20px]"
        onSubmit={handleSubmit}
      >
        <input
          id="email"
          type="email"
          placeholder='Email'
          className="w-2/3 mb-3  
                    border bg-[rgb(250,_228,_232)]
                    outline-[0] border-[none] 
                    rounded-[8px] w-[100%] h-[54px] 
                    text-[#808080] text-[18px] 
                    font-[200] p-[13px] 
                    leading-[24px]"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          type="password"
          placeholder='Password'
          className="w-2/3 mb-3  
                    border bg-[rgb(250,_228,_232)]
                    outline-[0] border-[none] 
                    rounded-[8px] w-[100%] h-[54px] 
                    text-[#808080] text-[18px] 
                    font-[200] p-[13px] 
                    leading-[24px]"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit"
          className="w-[200px] h-[45px] rounded bg-[rgb(255,_101,_132)] text-white">
          SIGN IN
        </button>
      </form>
      </div>
    </main>
  );
};

export default LogIn;