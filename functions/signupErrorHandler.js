const signupErrorHandler = (err) => {
    const error = {
        username: '',
        password: ''
    }    
    if(err.code === 11000){
        if(err.keyValue.username){
            error.username = "This username is already registered!"
        }
        console.log(error);
        return error;
    }

    Object.values(err.errors).forEach(({properties}) => {
        error[properties.path] = properties.message;
    });
    console.log(error);
    return error;
}

module.exports = signupErrorHandler;