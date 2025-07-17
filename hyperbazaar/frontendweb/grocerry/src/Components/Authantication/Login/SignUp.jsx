import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import "./form.css";
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const SignUp = () => {
      const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    address:'',
    password: '',
  });
  const handleuser=()=>{

  }
  const handleChange = (e) => {
    // const { name, value } = e.target;
    const name = e.target.name;
    const value = e.target.value;
    // console.log(value);
    setUser({
      ...user,
      [name]: value,
    });
    console.log(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/auth/signup`,{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
        console.log("User registered:", response)
        if(response.ok)
        {
          alert('Register Succussfully Done!')
          setUser({
            username: '',
            email: '',
            phone: '',
            address:'',
            password: '',
          })
        }
        else
        {
          alert("Connection failed")
        }

    } catch (error) {
      console.log(error)
    }
    // Add your registration logic here (e.g., API call, etc.)
    // console.log('Register Form submitted:', user);
  };

  return (
   
//    <section className='h-screen px-2 items-center flex justify-center sm:px-6 lg:px-8'>
//  <div className="registration-container flex-column">   
//     <div className="form-heading text-center">
//        <h2> Registration Form</h2>
//      </div>
//     <Form onSubmit={handleSubmit} className="form"  >
//       <Form.Group controlId="formUsername">
//         <Form.Label className='label'>Username:</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter username"
//           name="username"
//           className='input'
//           value={user.username}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Form.Group controlId="formEmail">
//         <Form.Label className='label'>Email:</Form.Label>
//         <Form.Control
//           type="email"
//           placeholder="Ente r email"
//           name="email"
//           className='input'
//           value={user.email}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Form.Group controlId="formPhone">
//         <Form.Label className='label'>Phone:</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter phone number"
//           name="phone"
//           className='input'
//           value={user.phone}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Form.Group controlId="formAddress">
//         <Form.Label className='label'>Address:</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter Address"
//           name="address"
//           className='input'
//           value={user.address}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Form.Group controlId="formPassword">
//         <Form.Label className='label'>Password:</Form.Label>
//         <Form.Control
//           type={showPassword ? 'text' : 'password'}
//           placeholder="Enter password"
//           name="password"
//           className='input'
//           value={user.password}
//           onChange={handleChange}
//           InputProps={{
//             endAdornment: (
//                 <InputAdornment position="end">
//                     <IconButton
//                         size='small'
//                         onClick={() => setShowPassword(!showPassword)}>
//                         {showPassword ?
//                             <VisibilityOff fontSize='inherit' />
//                             : <Visibility fontSize='inherit' />}
//                     </IconButton>
//                 </InputAdornment>
//             ),
//         }}
//         />
//       </Form.Group>
// {/* 
//       <TextField
//                                             defaultValue={'User1234'}
//                                             {...register('password', {
//                                                 required: 'Password is required',
//                                                 pattern: {
//                                                     value: /^(?=.*[A-Z])[a-zA-Z0-9]{6,}$/,
//                                                     message: 'Minimum 6 characters with one uppercase letter',
//                                                 },
//                                             })}
//                                             label="Password"
//                                             type={showPassword ? 'text' : 'password'}
//                                             fullWidth
//                                             size="small"
//                                             error={errors.password ? true : false}
//                                             helperText={errors.password ? errors.password.message : ''}
//                                             color="success"
//                                             variant="outlined"
//                                             InputProps={{
//                                                 endAdornment: (
//                                                     <InputAdornment position="end">
//                                                         <IconButton
//                                                             size='small'
//                                                             onClick={() => setShowPassword(!showPassword)}>
//                                                             {showPassword ?
//                                                                 <VisibilityOff fontSize='inherit' />
//                                                                 : <Visibility fontSize='inherit' />}
//                                                         </IconButton>
//                                                     </InputAdornment>
//                                                 ),
//                                             }}
//                                         /> */}

//       <Button  type="submit" style={{background:"green"}}  onClick={handleSubmit}>
//         Register
//       </Button>
//     </Form>
//     </div>
//     </section>

<div className="hero min-h-screen bg-base-200 flex justify-center items-center">
<div className="hero-content text-center">
    <div className="max-w-md py-10 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Register Your Account</h1>
        <p className="text-gray-700">Choose your account type:</p>
        <Link to="/signup" className="btn btn-primary bg-green-500 border-green-500 hover:bg-green-700 text-white m-2 text-lg font-semibold">Retailer</Link>
        <Link to="/User" className="btn btn-primary bg-green-500 border-green-500 hover:bg-green-700 text-white m-2 text-lg font-semibold">User</Link>
    </div>
</div>
</div>

  );
};

export default SignUp;
