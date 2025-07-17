import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Button, Collapse, Container, Fade, IconButton, InputAdornment, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import animation from '../../../assets/animations/loginAnimation.gif';
import { groceryContext } from '../../Layout/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
// import { useNavigate } from 'react-router-dom';
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [logInError, setLogInError] = useState('');
    const [user, setUser]= useState({
        email:"",
        password:"",
        role:""
    })

    // Scrolling Bug Fixed
    window.scroll({ top: 0 });

    const navigate = useNavigate();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } }

    const { userLoggedInState } = useContext(groceryContext);
    // Login handler

//   const handleInput =(e)=>{
//      const name = e.target.name;
//      const value = e.target.value;
//      setUser({
//         ...user,
//         [name]:value,
//      })
//      console.log(user);
//   }
const handleInput = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
        ...prevUser,
        [name]: value,
    }));
};
// console.log(user);

//   const navigate = useNavigate();
    const onSubmit = async (e) => {
        // const defaultUser = {
        //     email: 'user@gmail.com',
        //     password: 'Use1234'
        // }
        // e.preventDefault();

        try {
            const [isUserLoggedIn, setIsUserLoggedIn] = userLoggedInState;
             const response = await fetch(`http://localhost:3000/api/auth/login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(user)
             })
            //  console.log(response)
             if(response.ok)
             {  
                const data = await response.json();
               localStorage.setItem('userId', data.userId);
               

  if (user.email !== data.email)
                  {
                setLogInError("Invalid email")
            } 
            else if (user.password !== data.password) 
            {
                setLogInError('Invalid password')
                console.log('Invalid Password')
            } 
            
                console.log(data.role)
                setUser({ email:"", password:"" });
                setLogInError('')
                sessionStorage.setItem('grocery_userLoggedIn', JSON.stringify(true))
                setIsUserLoggedIn(true)
                // navigate('/')
                if(data.role ==="retailer")
                {
                    navigate('/retailerdashboard'); 
                    console.log('retailer')
                }
                else if (data.role=== "admin")
                {
                    navigate('/dashboard')
                    console.log('admin')

                }
                else
                {
                    navigate('/')
                }
        
        }
                     
                // navigate('/');
            //     setLogInError('')
            //         sessionStorage.setItem('grocery_userLoggedIn', JSON.stringify(true))
            //         setIsUserLoggedIn(true)
            //         navigate(from)
            //  }
            //  else{
            //     alert("unsucfully")
            //  }
            // if (user.email !== response.email) {
            //     setLogInError("Invalid email")
            // } else if (defaultUser.password !== data.password) {
            //     setLogInError('Invalid password')
            //     console.log('Invalid Password')
            // } else {
            //     setLogInError('')
            //     sessionStorage.setItem('grocery_userLoggedIn', JSON.stringify(true))
            //     setIsUserLoggedIn(true)
            //     navigate(from)
            // }
        } 
        catch (error) {
            setLogInError('An error occurred. Please try again later.');
            console.log("Error from login page", error)
        }
    };

    return (
        <section className='h-screen px-2 items-center flex justify-center sm:px-6 lg:px-8'>
            <Fade in={true}>
                <Container>
                    <div className='grid md:grid-cols-2'>
                        {/* Animation */}
                        <div className='col hidden md:flex items-center justify-center'>
                            <img
                                className='lg:max-h-80 max-h-[17rem]'
                                src={animation}
                                alt="login" />
                        </div>
                        {/* Form */}
                        <div className='flex md:justify-start justify-center'>
                            <div className='flex items-center max-w-[26rem] p-4 h-80'>
                                <div className='lg:space-y-10 md:space-y-8 space-y-10'>
                                    {/* Form Title */}
                                    <h3 className='text-center font-semibold text-gray-800 lg:text-3xl md:text-2xl text-3xl'>
                                        Log In
                                    </h3>
                                    <form onSubmit={handleSubmit(onSubmit)}
                                        className='text-center lg:space-y-7 md:space-y-6 space-y-7' action="login" method="post">
                                        {/* Email */}
                                        <TextField
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Invalid email address'
                                                }
                                            })}
                                            // defaultValue={'user@gmail.com'}
                                            label='Email'
                                            size='small'
                                            error={errors.email ? true : false}
                                            helperText={errors.email ? errors.email.message : ''}
                                            fullWidth
                                            color='success'
                                            name="email"
                                            value={user.email}
                                            onChange={handleInput}
                                            variant='outlined'
                                        />

                                        {/* Password */}
                                        <TextField
                                            label="Password"
                                            type={showPassword ? 'text' : 'password'}
                                            fullWidth
                                            size="small"
                                            name="password"
                                            value={user.password}
                                            onChange={handleInput}
                                            error={errors.password ? true : false}
                                            helperText={errors.password ? errors.password.message : ''}
                                            color="success"
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            size='small'
                                                            onClick={() => setShowPassword(!showPassword)}>
                                                            {showPassword ?
                                                                <VisibilityOff fontSize='inherit' />
                                                                : <Visibility fontSize='inherit' />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />

                                        {/* Display the alert only if there is a login error */}
                                        {logInError &&
                                            <></>
                                        }
                                        {/* Submit-btn */}
                                        <Button
                                            sx={{ textTransform: 'capitalize' }}
                                            type='submit'
                                            color='success'
                                           variant='contained'>
                                         
                                            Log in
                                        </Button>
                                    </form>
                                    {/* <SignUp /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Fade>
        </section>
    );
};

export default Login;


