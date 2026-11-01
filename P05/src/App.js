import React from "react";

class RegistrationForm extends React.Component {
    state = {
        name: "",
        email: "",
        password: "",
        errors: {}
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        let errors = {};
        const { name, email, password } = this.state;

        if (name.length < 3)
            errors.name = "Name must be at least 3 letters";

        if (!/^\S+@\S+\.\S+$/.test(email))
            errors.email = "Invalid email";

        if (password.length < 8)
            errors.password = "Password must be at least 8 characters";

        this.setState({ errors });

        if (Object.keys(errors).length === 0)
            alert("Registration Successful!");
    };

    render() {
        const { name, email, password, errors } = this.state;

        return (
            <div>
                <h1>Registration Form</h1>

                <form onSubmit={this.handleSubmit}>
                  
                    <input name="name" placeholder="Name"
                        value={name} onChange={this.handleChange} />
                    <p>{errors.name}</p>

                    <input name="email" placeholder="Email"
                        value={email} onChange={this.handleChange} />
                    <p>{errors.email}</p>

                    <input name="password" type="password"
                        placeholder="Password" value={password}
                        onChange={this.handleChange} />
                    <p>{errors.password}</p>

                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}

export default RegistrationForm;