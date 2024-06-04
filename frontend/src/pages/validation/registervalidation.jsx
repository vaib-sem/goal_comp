const registerValidation = (values) => {

    let errors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[a-zA-Z0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;
    console.log(values.username[0])
    if (!values.username.trim()) {

        errors.username = 'Username required';
    } else if (!emailRegex.test(values.username)) {
        errors.username = 'Email address is invalid';
    }
    if(!values.password) {
        errors.password = 'Password is required';
    } else if (!passwordRegex.test(values.password)) {
        console.log(values.password)
        errors.password = 'Password needs to have at least 8 characters, one letter and one number';
    }
    if (![values.password2]) {
        errors.password2 = 'Password is required';
    } else if (values.password2 !== values.password) {
        errors.password2 = 'Passwords do not match';
    }
    if(!values.firstName) {
        errors.firstName = 'firstName is required';
    }
    if(!values.lastName) {
        errors.lastName = 'lastName is required';
    }
    console.log(errors)
    return errors;
}
export default registerValidation;