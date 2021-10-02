async function signupFormHandler(event) {
    event.preventDefault();

    const user_name = document.querySelector('#username').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    if (user_name && email && password) {
        console.log(user_name, email, password)
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                user_name,
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        // check the response status
        if (response.ok) {
            console.log('success');
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

document
.querySelector('.signup-container')
.addEventListener('submit', signupFormHandler)