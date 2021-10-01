async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username').nodeValue.trim();
    const email = document.querySelector('#signup-email').nodeValue.trim();
    const password = document.querySelector('#signup-password').nodeValue.trim();

    if (user_name && email && password) {
        const response = await fetch('/api/user', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        // check the response status
        if (response.ok) {
            console.log('success');
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document
.querySelector('.signup-container')
.addEventListener('submit', signupFormHandler)