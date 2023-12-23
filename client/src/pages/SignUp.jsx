import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      setLoading(true);
      // below we take our formData, we stringify it, then post it to our signup function in our auth controller,
      // which then posts it to our MongoDB
      const res = await fetch('/api/auth/signup',
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/signin');
    } catch (error){
      setLoading(false);
      setError(error.message);
    }
  };
  console.log(formData);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className= "flex flex-col gap-4"> 
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username'onChange={handleChange}/>
        <input type="text" placeholder='email' className='border p-3 rounded-lg' id='email'onChange={handleChange}/>
        <input type="text" placeholder='password' className='border p-3 rounded-lg' id='password'onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'Sign Up'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/signin'}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  )
}
