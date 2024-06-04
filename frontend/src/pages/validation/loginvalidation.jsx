const loginvalidation = (values) => {
    let errors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[a-zA-Z0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;

    if (!values.username.trim()) {
        errors.username = 'Username required';
    }else if (!emailRegex.test(values.username)) {
        errors.username = 'Email address is invalid';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    }else if (!passwordRegex.test(values.password)) {
        errors.password = 'Password needs to have at least 8 characters, one letter and one number';
    }

    return errors;
}
export default loginvalidation;