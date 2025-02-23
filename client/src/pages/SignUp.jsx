import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
              Market Mastery<br/>
              <span className='text-teal-500'>Starts Here</span>
            </h2>
            <p className='text-gray-600 dark:text-gray-400 text-lg font-medium'>
              Unlock institutional-grade analytics<br/>
              and predictive insights
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className='flex-1'>
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-gray-950 p-8 border dark:border-gray-700'>
            <h2 className='text-2xl font-bold dark:text-gray-100 mb-8'>Create Account</h2>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
              <div>
                <Label className='text-gray-700 dark:text-gray-300 font-medium mb-2' value='Username' />
                <TextInput
                  type='text'
                  placeholder='trader123'
                  id='username'
                  className='dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500'
                  shadow={false}
                  onChange={handleChange}
                />
              </div>
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
                    <span className='pl-3'>Creating Account...</span>
                  </>
                ) : (
                  'Start Analyzing'
                )}
              </Button>

              <div className='flex items-center my-4'>
                <div className='flex-1 border-t border-gray-200 dark:border-gray-600'></div>
                <span className='px-4 text-gray-400 dark:text-gray-500 text-sm'>Secure registration</span>
                <div className='flex-1 border-t border-gray-200 dark:border-gray-600'></div>
              </div>

              <OAuth />
            </form>

            <div className='mt-6 text-center text-sm'>
              <span className='text-gray-500 dark:text-gray-400'>Already have an account? </span>
              <Link to='/sign-in' className='text-teal-600 dark:text-teal-400 font-semibold hover:text-teal-800 dark:hover:text-teal-300'>
                Access Dashboard
              </Link>
            </div>
          </div>

          {errorMessage && (
            <Alert className='mt-4 rounded-lg dark:bg-gray-700 dark:text-red-300' color='failure'>
              <span className='font-medium'>Registration error:</span> {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}