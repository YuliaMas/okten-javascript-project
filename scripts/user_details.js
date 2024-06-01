const id = new URLSearchParams(window.location.search).get('id');

// recursion
function getPageAboutUser (user, div){
    const ul = document.createElement('ul');
    Object.entries(user).forEach(([key, value]) =>{
        const li = document.createElement('li');
        if( typeof value === "object"){
            li.innerHTML = `<strong>${key.toUpperCase()}</strong>`
            ul.appendChild(li);
            getPageAboutUser(value, ul );
        }else {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${key.toUpperCase()}</strong>: ${value}`
            ul.appendChild(li);
        }
    });
    div.appendChild(ul);
}

// function getPageAboutUser(user) {
//     const div = document.getElementById('info-user');
//     const ul = document.createElement('ul');
//     for (const [key, value] of Object.entries(user)) {
//         const li = document.createElement('li');
//         if(typeof value === "object"){
//             const ul2 = document.createElement('ul');
//             for (const [key1,value1] of Object.entries(value)) {
//                 const li2 = document.createElement('li');
//                 if(typeof value1 === "object"){
//                     const ul3 = document.createElement('ul');
//                     for (const [key2, value2] of Object.entries(value1)) {
//                         const li3 = document.createElement('li');
//                         li3.innerHTML = `<strong>${key2.toUpperCase()}</strong>: ${value2}`
//                         ul3.appendChild(li3);
//                     }
//                     li2.innerHTML = `<strong>${key1.toUpperCase()}</strong>`;
//                     li2.appendChild(ul3);
//                 } else {
//                     li2.innerHTML = `<strong>${key1.toUpperCase()}</strong>:  ${value1}`
//                 }
//                 ul2.appendChild(li2);
//             }
//             li.innerHTML = `<strong>${key.toUpperCase()}</strong>`;
//             li.appendChild(ul2);
//         } else {
//             li.innerHTML = `<strong>${key.toUpperCase()}</strong>:  ${value}`
//         }
//         ul.appendChild(li);
//     }
//     div.appendChild(ul);
// }

fetch('https://jsonplaceholder.typicode.com/users/')
    .then(res => res.json())
    .then(user => {
        const div = document.getElementById('info-user');
        getPageAboutUser(user[id-1], div);
});

fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts?limit=posts.length`)
    .then(res => res.json())
    .then(posts => {
        const div = document.getElementById('wrapper-info-user');
        const btn = document.createElement('button');
        btn.innerText = 'Post of Current User';
        btn.classList.add('btnPost');
        div.appendChild(btn);
        const divPosts = document.getElementById('posts');
        let counter = 0;
        btn.addEventListener('click', (e)=>{
            e.preventDefault();
            counter++;
            divPosts.classList.toggle('posts');
            if(counter <= 1) {
                posts.forEach(post => {
                    const divTitlePost = document.createElement('div');
                    const h3 = document.createElement('h3');
                    h3.innerText = post.title;
                    const btnPost = document.createElement('button');
                    btnPost.innerText = 'Get Post Info' + " " + post.id ;
                    btnPost.addEventListener('click', (e) => {
                        e.preventDefault();
                        const idPost = post.id;
                        const url = './post-details.html?id=' + idPost;
                        window.open(url);
                    })
                    divTitlePost.append(h3, btnPost);
                    divPosts.appendChild(divTitlePost);
                });
            } else return null;
        })
    });
