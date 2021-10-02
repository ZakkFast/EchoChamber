async function newFormHandler(event) {
    event.preventDefault();

    const post_title = document.querySelector('input[name="post_title"]').value;
    // const user_name = document.querySelector('input[name="user_name"]').value;
    const post_content = document.querySelector('textarea[name="textarea2"]').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            post_title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.create-post').addEventListener('submit', newFormHandler);