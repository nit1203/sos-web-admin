export const isLoggedIn = () => {
    const auth = JSON.parse(window.localStorage.getItem('_auth'))

    if (auth && (auth.username === 'admin' && auth.token)) {
        return {
            auth: true
        }
    } else {
        return {
            auth: false,
            message: 'Unauthorised'
        }
    }

}


export const login = (username, password) => {
    if (!username || !password) {
        return {
            auth: false,
            message: 'Please Enter your username and password'
        }
    }

    if (username === 'admin' && password === 'admin@123') {
        window.localStorage.setItem('_auth', JSON.stringify({
            username: username,
            token: `${username}${Date.now()}`
        }))
        return {
            auth: true
        }
    } else {
        return {
            auth: false,
            message: 'Invalid Credentials'
        }
    }
}

