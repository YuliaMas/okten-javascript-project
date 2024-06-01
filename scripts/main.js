fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then((users) => {
        const div = document.getElementById('wrapper');
        for (const {id, name} of users) {
            const block = document.createElement('div');
            block.classList.add('block');
            const h2 = document.createElement('h2');
            h2.innerText = `id: ${id}
                            name: ${name}`;
            const btn = document.createElement('button');
            btn.classList.add('getInfo');
            btn.innerText = 'Get info';
            block.append(h2, btn);
            div.appendChild(block);
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const url ='./user-details.html?id=' + id;
                window.open(url);
            })
        }
    })