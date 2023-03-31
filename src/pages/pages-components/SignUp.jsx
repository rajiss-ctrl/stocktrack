import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/userSlice';
import { auth } from '../../db/firebase';

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('')
console.log(error)
  const validatePassword = () => {
  let isValid = true
  if (password !== '' && confirmPassword !== ''){
    if (password !== confirmPassword) {
      isValid = false
      setError('Passwords does not match')
    }
  }
  return isValid
}
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Clicked');
    setError('')
    if(validatePassword()){
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      dispatch(setUser({ id: user.uid, email: user.email })); //Substitute the console.log with this
      // ...
      navigate('/dashboard')
    })
    .catch((error) => {
      console.error(error);
    
      // ..
    });
  }
  setEmail('')
  setPassword('')
  setConfirmPassword('')
  };

  return (
    <main className="w-full  flex flex-col items-center justify-center mt-[60px] ">
      <div className='w-[80%] p-[20px] shadow'>
      <p>Register here</p>
      <form
        className="w-full flex flex-col items-center justify-center mt-[20px]"
        onSubmit={handleSubmit}>
        <input
          id="email"
          type="email"
          className="w-2/3 mb-3  
                    border bg-[rgb(250,_228,_232)]
                    outline-[0] border-[none] 
                    rounded-[8px] w-[100%] h-[54px] 
                    text-[#808080] text-[18px] 
                    font-[200] p-[13px] 
                    leading-[24px]"
          placeholder='Business Email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          type="password"
          className="w-2/3 mb-3  
                    border bg-[rgb(250,_228,_232)]
                    outline-[0] border-[none] 
                    rounded-[8px] w-[100%] h-[54px] 
                    text-[#808080] text-[18px] 
                    font-[200] p-[13px] 
                    leading-[24px]"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          id="password"
          type="password"
          className="w-2/3 mb-3  
                    border bg-[rgb(250,_228,_232)]
                    outline-[0] border-[none] 
                    rounded-[8px] w-[100%] h-[54px] 
                    text-[#808080] text-[18px] 
                    font-[200] p-[13px] 
                    leading-[24px]"
          placeholder='Confirm password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {/*password error */}
          <div className='text-[red] my-[5px]'>{error ? <span>{error}</span> : ''}</div>
        <button
          type="submit"
          className="w-[200px] h-[45px] rounded bg-[rgb(255,_101,_132)] text-white"
        >
           REGISTER
        </button>
      </form>
      </div>
    </main>
  );
};

export default SignUp;