import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 pt-24'>
    <div className='flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-8'>
      {/* Left side */}
      <div className='flex-1 text-center md:text-left space-y-8'>
        <Link to='/' className='inline-block'>
          <div className='flex items-center space-x-3'>
            <div className='p-3 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15l6-6 4.5 4.5 5.5-5.5"/>
              </svg>
            </div>
            <span className='text-3xl font-bold dark:text-white'>
              Market<span className='text-teal-500'>Pulse</span>
            </span>
          </div>
        </Link>
        <div className='space-y-4'>
          <h2 className='text-4xl font-bold dark:text-gray-100'>
            Market Intelligence<br/>
            <span className='text-teal-500'>Reimagined</span>
          </h2>
          <p className='text-gray-600 dark:text-gray-400 text-lg font-medium'>
            Precision analytics for institutional-grade<br/>
            market decision making
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className='flex-1'>
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-gray-950 p-8 border dark:border-gray-700'>
          <h2 className='text-2xl font-bold dark:text-gray-100 mb-8'>Secure Access</h2>
          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            <div>
              <Label className='text-gray-700 dark:text-gray-300 font-medium mb-2' value='Email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                className='dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500'
                shadow={false}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className='text-gray-700 dark:text-gray-300 font-medium mb-2' value='Password' />
              <TextInput
                type='password'
                placeholder='••••••••'
                id='password'
                className='dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500'
                shadow={false}
                onChange={handleChange}
              />
            </div>
            
            <Button
              className='w-full h-12 font-bold text-white bg-gradient-to-br from-teal-600 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 transition-all dark:from-teal-700 dark:to-emerald-800 dark:hover:from-teal-800 dark:hover:to-emerald-900'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Authenticating...</span>
                </>
              ) : (
                'Access Market Dashboard'
              )}
            </Button>

            <div className='flex items-center my-4'>
              <div className='flex-1 border-t border-gray-200 dark:border-gray-600'></div>
              <span className='px-4 text-gray-400 dark:text-gray-500 text-sm'>Secure connection</span>
              <div className='flex-1 border-t border-gray-200 dark:border-gray-600'></div>
            </div>

            <OAuth />
          </form>

          <div className='mt-6 text-center text-sm'>
            <span className='text-gray-500 dark:text-gray-400'>First time analyzing? </span>
            <Link to='/sign-up' className='text-teal-600 dark:text-teal-400 font-semibold hover:text-teal-800 dark:hover:text-teal-300'>
              Get Started
            </Link>
          </div>
        </div>

        {errorMessage && (
          <Alert className='mt-4 rounded-lg dark:bg-gray-700 dark:text-red-300' color='failure'>
            <span className='font-medium'>Security alert:</span> {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  </div>
);
}