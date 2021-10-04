const { useHistory, useLocation } = require("react-router-dom");
const { useAuth } = require("../auth.services");
const { useState } = require('react')

export default function LoginPage() {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();
  
    // TODO: Only allow admin to redirect back to '/admin/' pages
    // For now, we treat all users as admins and allow them to redirect to '/admin' for faster prototyping and testing
    let { from } = location.state || { from: { pathname: "/admin" } };
    let login = (usernameOrEmail, password) => {
      auth.signin(usernameOrEmail, password, () => {
          history.replace(from);
        }).then(data => {
          if (data.error) {
            // TODO: Print some error message to the login page
          }
        });
    };

    const handleSubmit = (event) => {
      login(usernameOrEmail, password)
      event.preventDefault();
    }

    const [usernameOrEmail, setUsernameOrEmail] = useState(null)
    const [password, setPassword] = useState(null)
  
    return (
      <div className='bg-gradient-to-b from-gray-900 via-gray-800 to-gray-500 flex h-screen'>
        <div className='w-4/12 m-auto bg-white rounded-xl px-5 pt-5 pb-16 mt-32'>
          <div className='mt-5'>
            <h1 className='text-5xl text-blue-600 text-center font-bold leading-snug'>Digital Corporate Secretary</h1>
          </div>
          <form onSubmit={handleSubmit} className='mt-10 pt-5 pb-10 px-5 bg-gray-100 rounded'>
            <label className='text-lg block font-bold'>Username or email address</label>
            <div className='relative mt-5'>
              <input type='text' name='login' placeholder='Username or Email' 
                      className='h-12 px-4 rounded w-full shadow focus:outline-none focus:ring focus:border-blue-300' 
                      onChange={(e) => setUsernameOrEmail(e.target.value)}/>
              <span className='absolute top-4 right-5 h-5 w-5'>
                <svg viewBox="0 0 512 512" className='fill-current text-gray-400'>
                  <path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 
                        0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 
                        46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 
                        199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 
                        60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z">
                  </path>
                </svg>
              </span>
            </div>
            <div className='mt-5'>
              <label className='text-lg font-bold'>Password</label>
              <a href='/password_reset' className='float-right text-blue-500 hover:underline'>Forgot password?</a>
            </div>
            <div className='relative mt-5'>
              <input type='password' name='password' placeholder='********************' 
                      className='h-12 px-4 rounded w-full shadow focus:outline-none focus:ring focus:border-blue-300' 
                      onChange={(e) => setPassword(e.target.value)}/>
              <span className='absolute top-4 right-5 h-4 w-4'>
                <svg viewBox='0 0 448 512' className='fill-current text-gray-400'>
                  <path d="M400 192h-32v-46.6C368 65.8 304 .2 224.4 0 144.8-.2 80 64.5 80 144v48H48c-26.5 
                        0-48 21.5-48 48v224c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V240c0-26.5-21.5-48-48-48zm-272-48c0-52.9 
                        43.1-96 96-96s96 43.1 96 96v48H128v-48zm272 320H48V240h352v224z">
                  </path>
                </svg>
              </span>
            </div>
            <input type='submit' value='Submit' className='mt-10 bg-green-400 text-white w-full h-12 rounded hover:bg-green-600 hover:cursor-pointer' />
          </form>
        </div>
      </div>
    );
  }