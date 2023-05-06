import React, { useState, useEffect } from 'react'
import './SignUp.css'

// Axios
import axios from 'axios';

// UseNavigate
import { useNavigate } from 'react-router-dom';

// TextField
import TextField from '@mui/material/TextField';
// Box
import Box from '@mui/material/Box';
// Menu Item
import MenuItem from '@mui/material/MenuItem';
// Select
import Select from '@mui/material/Select';
// Form Control
import FormControl from '@mui/material/FormControl';
// Input Adorment
import InputAdornment from '@mui/material/InputAdornment';

// Person Icon
import PersonIcon from '@mui/icons-material/Person';
// Remember Me Icon
import RememberMeIcon from '@mui/icons-material/RememberMe';
// Email Icon
import EmailIcon from '@mui/icons-material/Email';
// Password Icon
import PasswordIcon from '@mui/icons-material/Password';
// Visibility Icon
import VisibilityIcon from '@mui/icons-material/Visibility';
// Visibility Off Icon
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// Country Flag Circle Icon
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
// Phone Icon
import PhoneIcon from '@mui/icons-material/Phone';
// Icon Button
import IconButton from '@mui/material/IconButton';
// Snack Bar
import Snackbar from '@mui/material/Snackbar';
// Alert
import MuiAlert from '@mui/material/Alert';

const SignUp = () => {
    // UseNavigate
    const navigate = useNavigate();

    // UseState for Country
    const [countries, setCountries] = useState([]);

    // UseEffect for Get All the Countries from Database
    useEffect(() => {
        axios.get("http://localhost:8000/api/codes/allcountrycode").then((res) => {
            // Set the Countries
            setCountries(res.data);
        }).catch((err) => {
            // Show Error
            console.log(err);
        })
    }, [])

    // Password Show,Hide UseState
    const [hidePass, setHidePass] = useState({
        type: "password",
        flag: true
    });

    // Confirm Password Show,Hide UseState
    const [hideconPass, setHideConPass] = useState({
        type: "password",
        flag: true
    });

    // Password See & Hide Func
    const passwordFunc = () => {
        hidePass.flag ? setHidePass({
            type: "text",
            flag: false
        }) : setHidePass({
            type: "password",
            flag: true
        })
    }

    // Confirm Password See & Hide Func
    const conpasswordFunc = () => {
        hideconPass.flag ? setHideConPass({
            type: "text",
            flag: false
        }) : setHideConPass({
            type: "password",
            flag: true
        })
    }

    // User UseState
    const [user
        , setUser] = useState({
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            password: "",
            confirmpassword: "",
            country: "",
            code: "",
            phone: ""
        })

    // Input Alert UseState
    const [alert, setAlert] = useState({
        firstnameAlert: "",
        lastnameAlert: "",
        usernameAlert: "",
        mailAlert: "",
        passAlert: "",
        conpassAlert: "",
        countryAlert: "",
        phoneAlert: ""
    })

    // Handle User Change Func
    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user
            ,
            [name]: value,
        })
    }

    // Country Local Value UseState
    const [localValue, setLocalValue] = useState("");

    // Handle Country Change Func
    const handleCountryChange = (e) => {
        const { value } = e.target;
        setLocalValue(value);

        // Set the Country and Code Value
        const b = value.indexOf("(");
        const con = value.substring(0, b);
        const cod = value.substring(b);
        setUser({
            ...user
            ,
            country: con,
            code: cod
        })
    };

    // Snackbar Alert UseState
    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "error"
    });

    // Close SnackBar Alert Func
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnack({
            ...snack,
            open: false,
        });
    };

    // Handle Form Submit Func
    const handleSignUp = (event) => {
        // Stop Reloading the Page when Submiting the Form
        event.preventDefault();

        // Check if the form is fill or not
        if (user
            .firstname !== "" && alert.firstnameAlert === "" && user
                .lastname !== "" && alert.lastnameAlert === "" && user
                    .username !== "" && alert.usernameAlert === "" && user
                        .email !== "" && alert.mailAlert === "" && user
                            .password !== "" && alert.passAlert === "" && user
                                .confirmpassword !== "" && alert.conpassAlert === "" && user
                                    .phone !== "" && alert.phoneAlert === "" && user
                                        .code !== "" && user
                                            .country !== "") {

            // Send to the Backend of User Form data
            axios.post("http://localhost:8000/api/users/register", user
            ).then((req) => {
                // If Success then Set User Null
                setUser({
                    firstname: "",
                    lastname: "",
                    username: "",
                    email: "",
                    password: "",
                    confirmpassword: "",
                    country: "",
                    code: "",
                    phone: ""
                })

                // If Success then Set Country Value Null
                setLocalValue("");

                // Success Result
                setSnack({
                    open: true,
                    message: "** You are successfully registered 😎",
                    severity: "success"
                });

            }).catch((err) => {

                // If Error then show the error message
                if (err.response.data === "User Already Registered !!") {
                    setSnack({
                        open: true,
                        message: "You are already registered !!",
                        severity: "info"
                    });
                } else {
                    setSnack({
                        open: true,
                        message: "Server Error !!",
                        severity: "error"
                    });
                }
            })
        }
        // Else show fill the form
        else {
            setSnack({
                open: true,
                message: "Please fill the form !!",
                severity: "warning"
            });
        }
    }

    return (
        <>
            {/* Main SignUp Container */}
            <div className="signupContainer">
                {/* SignUp Form Div*/}
                <div className="signupRight">
                    {/* Heading */}
                    <h2>SIGN UP</h2>
                    {/* SignUp Form */}
                    <form onSubmit={handleSignUp}>
                        {/* First Name Box */}
                        <Box className="signUpbox">
                            {/* Person Icon */}
                            <PersonIcon sx={{ color: 'black', mr: 1, my: 0.5, backgroundColor: 'aliceblue', padding: '5px', borderRadius: '50%', fontSize: '2rem', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;' }} />
                            {/* Text Field */}
                            <TextField label="First Name" color='warning' type='text' name='firstname' value={user.firstname ? user.firstname.trim("") : user.firstname} onChange={handleUserChange} className='signUpInput' variant='filled' InputProps={{
                                style: {
                                    color: "white",
                                    fontWeight: "500",
                                    letterSpacing: "0.5px"
                                }
                            }} onBlur={() => {
                                if (user.firstname === "" || /^\s*$/.test(user.firstname)) {

                                    setAlert({
                                        ...alert,
                                        firstnameAlert: "Please enter firstname !!"
                                    });
                                } else {
                                    setAlert({
                                        ...alert,
                                        firstnameAlert: ""
                                    });
                                }
                            }} />
                        </Box>
                        {/* Show FirstName Alert */}
                        <p>{alert.firstnameAlert}</p>

                        {/* Last Name Box */}
                        <Box className="signUpbox">
                            {/* Person Icon */}
                            <PersonIcon sx={{ color: 'black', mr: 1, my: 0.5, backgroundColor: 'aliceblue', padding: '5px', borderRadius: '50%', fontSize: '2rem', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;' }} />
                            {/* Text Field */}
                            <TextField label="Last Name" color='warning' type='text' name='lastname' value={user.lastname ? user.lastname.trim("") : user.lastname} onChange={handleUserChange} className='signUpInput' variant='filled' InputProps={{
                                style: {
                                    color: "white",
                                    fontWeight: "500",
                                    letterSpacing: "0.5px"
                                }
                            }} onBlur={() => {
                                if (user.lastname === "" || /^\s*$/.test(user.lastname)) {
                                    setAlert({
                                        ...alert,
                                        lastnameAlert: "Please enter lastname !!"
                                    });
                                } else {
                                    setAlert({
                                        ...alert,
                                        lastnameAlert: ""
                                    });
                                }
                            }} />
                        </Box>
                        {/* Show LastName Alert */}
                        <p>{alert.lastnameAlert}</p>

                        {/* User Name Box */}
                        <Box className="signUpbox">
                            {/* Remember Me Icon */}
                            <RememberMeIcon sx={{ color: 'black', mr: 1, my: 0.5, backgroundColor: 'aliceblue', padding: '5px', borderRadius: '50%', fontSize: '2rem', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;' }} />
                            {/* Text Field */}
                            <TextField label="User Name" color='warning' type='text' name='username' value={user.username ? user.username.trim("") : user.username} onChange={handleUserChange} className='signUpInput' variant='filled' InputProps={{
                                style: {
                                    color: "white",
                                    fontWeight: "500",
                                    letterSpacing: "0.5px"
                                }
                            }} onBlur={() => {
                                if (!/^((?=.*[a-z])(?=.*[0-9])[a-z0-9]{6,})$/.test(user
                                    .username)) {
                                    setAlert({
                                        ...alert,
                                        usernameAlert: "at least 6 characters and contains lowercase letter & numbers"
                                    });
                                } else {
                                    setAlert({
                                        ...alert,
                                        usernameAlert: ""
                                    });
                                }
                            }} />
                        </Box>
                        {/* Show UserName Alert */}
                        <p style={{ marginLeft: '55px' }}>{alert.usernameAlert}</p>

                        {/* Email Id Box */}
                        <Box className="signUpbox">
                            {/* Email Icon */}
                            <EmailIcon sx={{ color: 'black', mr: 1, my: 0.5, backgroundColor: 'aliceblue', padding: '5px', borderRadius: '50%', fontSize: '2rem', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;' }} />
                            {/* Text Field */}
                            <TextField label="Email Id" color='warning' type='text' name='email' value={user.email ? user.email.trim("") : user.email} onChange={handleUserChange} className='signUpInput' variant='filled' InputProps={{
                                style: {
                                    color: "white",
                                    fontWeight: "500",
                                    letterSpacing: "0.5px"
                                }
                            }} onBlur={() => {
                                if (!/^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(user
                                    .email)) {
                                    setAlert({
                                        ...alert,
                                        mailAlert: "Invalid email address !!"
                                    });
                                } else {
                                    setAlert({
                                        ...alert,
                                        mailAlert: ""
                                    });
                                }
                            }} />
                        </Box>
                        {/* Show Email Alert */}
                        <p>{alert.mailAlert}</p>

                        {/* Password Box */}
                        <Box className="signUpbox">
                            {/* Passowrd Icon */}
                            <PasswordIcon sx={{ color: 'black', mr: 1, my: 0.5, backgroundColor: 'aliceblue', padding: '5px', borderRadius: '50%', fontSize: '2rem', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;' }} />
                            {/* Text Field */}
                            <TextField label="Password" color='warning' type={hidePass.type} name='password' value={user.password ? user.password.trim("") : user.password} onChange={handleUserChange} className='signUpInput' InputProps={{
                                style: {
                                    color: "white",
                                    fontWeight: "500",
                                    letterSpacing: "0.5px"
                                },
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={passwordFunc}
                                        style={{ cursor: 'pointer' }}
                                        edge="end"
                                    >
                                        {hidePass.flag ? <VisibilityOffIcon sx={{ color: 'white', fontSize: '1.5rem' }} /> : <VisibilityIcon sx={{ color: 'white', fontSize: '1.5rem' }} />}
                                    </IconButton>
                                </InputAdornment>
                            }} variant='filled' onBlur={() => {
                                if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-=,./<>?;:'"[\]{}|~`])(?=.{8,})/
                                    .test(user
                                        .password)) {
                                    setAlert({
                                        ...alert,
                                        passAlert: "at least 8 characters and contain at least one lowercase letter, one uppercase letter, one number, and one special character"
                                    });
                                } else {
                                    setAlert({
                                        ...alert,
                                        passAlert: ""
                                    });
                                }
                            }} />
                        </Box>
                        {/* Show Password Alert */}
                        <p style={{ marginLeft: '55px' }}>{alert.passAlert}</p>

                        {/* Confirm Password Box */}
                        <Box className="signUpbox">
                            {/* Passowrd Icon */}
                            <PasswordIcon sx={{ color: 'black', mr: 1, my: 0.5, backgroundColor: 'aliceblue', padding: '5px', borderRadius: '50%', fontSize: '2rem', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;' }} />
                            {/* Text Field */}
                            <TextField label="Confirm Password" color='warning' type={hideconPass.type} name='confirmpassword' value={user.confirmpassword ? user.confirmpassword.trim("") : user.confirmpassword} onChange={handleUserChange} className='signUpInput' InputProps={{
                                style: {
                                    color: "white",
                                    fontWeight: "500",
                                    letterSpacing: "0.5px"
                                },
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={conpasswordFunc}
                                        style={{ cursor: 'pointer' }}
                                        edge="end"
                                    >
                                        {hideconPass.flag ? <VisibilityOffIcon sx={{ color: 'white', fontSize: '1.5rem' }} /> : <VisibilityIcon sx={{ color: 'white', fontSize: '1.5rem' }} />}
                                    </IconButton>
                                </InputAdornment>
                            }} variant='filled' onBlur={() => {
                                if (user
                                    .password !== user
                                        .confirmpassword) {
                                    setAlert({
                                        ...alert,
                                        conpassAlert: "Password not match !!"
                                    });
                                } else {
                                    setAlert({
                                        ...alert,
                                        conpassAlert: ""
                                    });
                                }
                            }} />
                        </Box>
                        {/* Show Confirm Password Alert */}
                        <p>{alert.conpassAlert}</p>

                        {/* Country Box */}
                        <Box className="signUpbox">
                            {/* Flag Circle Icon */}
                            <FlagCircleIcon sx={{ color: 'black', mr: 1, my: 0.5, backgroundColor: 'aliceblue', padding: '5px', borderRadius: '50%', fontSize: '2rem', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;' }} />
                            {/* Select Form */}
                            <FormControl className='signUpInput'>
                                {/* Select */}
                                <Select
                                    id="demo-simple-select"
                                    name="localValue"
                                    value={localValue || "Choose Your Country"}
                                    onChange={handleCountryChange} variant='filled'
                                    color='warning'
                                    sx={{
                                        color: "white",
                                        fontWeight: "500",
                                        letterSpacing: "0.5px",
                                    }}
                                    className='sel'
                                    onBlur={() => {
                                        if (localValue === "") {
                                            setAlert({
                                                ...alert,
                                                countryAlert: "please select country !!"
                                            });
                                        } else {
                                            setAlert({
                                                ...alert,
                                                countryAlert: ""
                                            });
                                        }
                                    }}
                                >
                                    {/* Menu Item */}
                                    <MenuItem disabled selected value="Choose Your Country">Choose Your Country</MenuItem>
                                    {countries?.map((option, index) => {
                                        return (
                                            <MenuItem key={index} value={option.label + "(+" + option.phone + ")"} sx={{
                                                height: "48px", // set the height to 48px
                                                display: "flex",
                                                alignItems: "center", // vertically center the content
                                                width: 'fitContent'
                                            }}
                                            >
                                                {/* Country Flag Image Icon */}
                                                <img
                                                    loading="lazy"
                                                    style={{ width: '25px', marginRight: '10px' }}
                                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                    alt=""
                                                />{option.label} ({option.code}) +{option.phone}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                        {/* Show Country Alert */}
                        <p>{alert.countryAlert}</p>

                        {/* Phone Box */}
                        <Box className="signUpbox">
                            {/* Phone Icon */}
                            <PhoneIcon sx={{ color: 'black', mr: 1, my: 0.5, backgroundColor: 'aliceblue', padding: '5px', borderRadius: '50%', fontSize: '2rem', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;' }} />
                            {/* Text Field */}
                            <TextField label="Phone No." color='warning' type='tel' name='phone' value={user.phone ? user.phone.trim("") : user.phone} onChange={handleUserChange} className='signUpInput' variant='filled' InputProps={{
                                style: {
                                    color: "white",
                                    fontWeight: "500",
                                    letterSpacing: "0.5px"
                                }
                            }} onBlur={() => {
                                if (!/^([+]?[0-9]{1,4}[ -]?)?([0-9]{10})$/.test(user
                                    .phone)) {
                                    setAlert({
                                        ...alert,
                                        phoneAlert: "Invalid phone no."
                                    });
                                } else {
                                    setAlert({
                                        ...alert,
                                        phoneAlert: ""
                                    });
                                }
                            }} />
                        </Box>
                        {/* Show Phone Alert */}
                        <p>{alert.phoneAlert}</p>

                        {/* Sign Up Submit Button */}
                        <button type="submit" className="signupup">Sign Up</button>

                        <p style={{ textAlign: 'center', margin: '5px 0', color: 'aliceblue' }}>OR</p>
                        <p style={{ textAlign: 'center', margin: '5px 0', color: 'aliceblue' }}>Already have an account?</p>

                        {/* Sign In Button */}
                        <button className="signupin" onClick={() => { navigate("/signin") }}>Sign In</button>
                    </form>

                    {/* Snack Bar Alert */}
                    <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}>
                        {/* Mui Alert */}
                        <MuiAlert onClose={handleClose} severity={snack.severity} sx={{ width: '100%' }}>
                            <strong>{snack.message}</strong>
                        </MuiAlert>
                    </Snackbar>
                </div>
            </div>
        </>
    )
}

export default SignUp
