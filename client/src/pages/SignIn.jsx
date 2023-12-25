import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // we are saving values from our form using state
  const handleChange =(e) =>{
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      })
  };

  // on submit, we need a function call to handle submit
  // as we are using await in our fetch below, we use async
  const handleSubmit = async(e)=> {
    // we prevent default ,because the default is refresh page
    e.preventDefault();
    // below we will add a try statement to see if we can catch any errors on frontend
    try{
      // our setLoading to true is being replaced with our very own Redux reducer
      // setLoading(true);
      dispatch(signInStart());
      // below we take our formData, we stringify it, then post it to our signup function in our auth controller,
      // which then posts it to our MongoDB
      const res = await fetch('/api/auth/signin',
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
      // our setLoading to true is being replaced with our very own Redux reducer
      dispatch(signInFailure(data.message));
        return;
      }
      // our setLoading to true is being replaced with our very own Redux reducer
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error){
    dispatch(signInFailure(error.message));
    }
  };
  console.log(formData);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className= "flex flex-col gap-4"> 
        <input type="text" placeholder='email' className='border p-3 rounded-lg' id='email'onChange={handleChange}/>
        <input type="text" placeholder='password' className='border p-3 rounded-lg' id='password'onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'Sign In'}</button>
          <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/signup'}>
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  )
}
