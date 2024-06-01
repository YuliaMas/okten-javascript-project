const id = new URLSearchParams(window.location.search).get('id');
function createText(key, value, div){
    const p = document.createElement('p');
    const spanKey = document.createElement('span');
    spanKey.classList.add('headers');
    spanKey.innerText = key.toString() + ": ";
    const spanValue = document.createElement('span');
    spanValue.innerText = value.toString();
    p.append(spanKey, spanValue);
    div.appendChild(p);
}
fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(res => res.json())
    .then(post  => {
        const divPost = document.getElementById('user-post');
        const div = document.createElement('div');
        Object.entries(post).forEach(([key, value])=> {
                createText(key, value, div);
                divPost.appendChild(div);
        },true);
        const divComments = document.getElementById('comments');
        fetch(` https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then(res => res.json())
            .then(comments  => {
                for (const obj of comments) {
                    const div = document.createElement('div');
                    Object.entries(obj).forEach(( [key, value] )=> {
                        createText(key, value, div);
                    });
                    divComments.appendChild(div);
                }
            })
    });