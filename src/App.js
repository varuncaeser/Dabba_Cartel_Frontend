import React, { useState } from 'react';

// --- Reusable UI Components ---

const FormInput = ({ name, type, placeholder, value, onChange, required = true }) => (
    <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6347] focus:border-transparent transition duration-200"
    />
);

const PrimaryButton = ({ children, type = 'submit' }) => (
    <button
        type={type}
        className="w-full mt-6 py-3 px-4 rounded-md text-lg font-semibold text-white bg-[#FF6347] hover:bg-[#E5533D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6347] transition duration-300 ease-in-out transform hover:-translate-y-0.5"
    >
        {children}
    </button>
);

const AuthLink = ({ text, linkText, onClick }) => (
    <p className="text-center text-sm text-gray-600 mt-8">
        {text}{' '}
        <a href="#" onClick={onClick} className="font-medium text-[#FF6347] hover:text-[#E5533D]">
            {linkText}
        </a>
    </p>
);


// --- Main Form Components ---

const LoginForm = ({ onSwitchForm }) => {
    const [formData, setFormData] = useState({
        identifier: '', // This will hold either email or mobile number
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Determine if the identifier is an email or a mobile number
        const isEmail = formData.identifier.includes('@');
        
        const loginPayload = {
            email: isEmail ? formData.identifier : null,
            mobileNumber: !isEmail ? formData.identifier : null,
            password: formData.password,
        };

        console.log("--- Login Payload ---");
        console.log(JSON.stringify(loginPayload, null, 2));
        var response = fetch('http://117.215.171.160:8080/auth/customer/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginPayload)
        }).then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            alert("LOGIN successful!");
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Signup failed. Please try again.");
        });
        // In a real app, you would send this payload to your API
        // alert("Login payload logged to console. Press F12 to view.");
    };

    return (
        <div className="w-full">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
                <p className="text-gray-500 mt-2">Log in to continue your culinary journey.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <FormInput name="identifier" type="text" placeholder="Email or Mobile Number" value={formData.identifier} onChange={handleChange} />
                    <FormInput name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                </div>
                <PrimaryButton>Log In</PrimaryButton>
            </form>
            <AuthLink text="Don't have an account?" linkText="Sign up" onClick={(e) => { e.preventDefault(); onSwitchForm('signup'); }} />
        </div>
    );
};

const SignupForm = ({ onSwitchForm }) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        countryCode: '+91',
        mobileNumber: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Construct the payload based on the required JSON structure
        const signupPayload = {
            email: formData.email,
            password: formData.password,
            firstname: formData.firstname,
            lastname: formData.lastname,
            countryCode: formData.countryCode,
            mobileNumber: formData.mobileNumber,
        };

        console.log("--- Signup Payload ---");
        console.log(JSON.stringify(signupPayload, null, 2));
        var response = fetch('http://117.215.171.160:8080/auth/customer/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupPayload)
        }).then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            alert("Signup successful!");
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Signup failed. Please try again.");
        });
        // In a real app, you would send this payload to your API
        // alert("Signup payload logged to console. Press F12 to view.");
    };

    return (
        <div className="w-full">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Create Your Account</h2>
                <p className="text-gray-500 mt-2">Join us to get the best home-cooked meals.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <FormInput name="firstname" type="text" placeholder="First Name" value={formData.firstname} onChange={handleChange} />
                        <FormInput name="lastname" type="text" placeholder="Last Name" value={formData.lastname} onChange={handleChange} />
                    </div>
                    <FormInput name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
                    <div className="flex gap-2">
                        <select 
                            name="countryCode" 
                            value={formData.countryCode} 
                            onChange={handleChange}
                            className="px-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FF6347] focus:border-transparent transition duration-200 bg-gray-50"
                        >
                            <option>+91</option>
                            <option>+1</option>
                            <option>+44</option>
                        </select>
                        <FormInput name="mobileNumber" type="tel" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} />
                    </div>
                    <FormInput name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                </div>
                <PrimaryButton>Sign Up</PrimaryButton>
            </form>
            <AuthLink text="Already have an account?" linkText="Log in" onClick={(e) => { e.preventDefault(); onSwitchForm('login'); }} />
        </div>
    );
};


// --- Main App Component ---
export default function App() {
    const [authMode, setAuthMode] = useState('signup'); // Start with signup form for demo

    const renderForm = () => {
        switch (authMode) {
            case 'login':
                return <LoginForm onSwitchForm={setAuthMode} />;
            case 'signup':
            default:
                return <SignupForm onSwitchForm={setAuthMode} />;
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen font-sans p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <div className="text-center mb-4">
                    <h1 className="text-4xl font-bold text-[#FF6347]">DabbaCartel</h1>
                </div>
                {renderForm()}
            </div>
        </div>
    );
}
