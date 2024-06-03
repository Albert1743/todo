let form = document.forms.namedItem('todo');
let input = document.querySelector('input');
let container = document.querySelector('.container');
let todos = [];



reload(todos, container);
form.onsubmit = (e) => {
    e.preventDefault();
    const fm = new FormData(form);

    const task = {
        id: crypto.randomUUID(),
        task: fm.get('title'),
        time: new Date().toTimeString().split(' ')[0],
        isDone: false
    };

    todos.push(task);
    reload(todos, container);
};

function reload(arr, place) {
    place.innerHTML = "";

    for (let item of arr) {
        const divItem = document.createElement('div');
        const divTopSide = document.createElement('div');
        const spanTitle = document.createElement('span');
        const buttonClose = document.createElement('button');
        const spanTime = document.createElement('span');


        divItem.classList.add('item');
        divItem.dataset.id = item.id;
        divTopSide.classList.add('top-side');
        spanTitle.textContent = item.task;
        buttonClose.textContent = 'x';
        spanTime.classList.add('time');
        spanTime.textContent = item.time;


        divTopSide.append(spanTitle);
        divTopSide.append(buttonClose);
        divItem.append(divTopSide);
        divItem.append(spanTime);
        place.append(divItem);


        if (item.isDone) {
            spanTitle.style.textDecoration = 'line-through';
        }
    }
}


container.addEventListener('click', (e) => {
    const item = e.target.closest('.item')
    if (!item) return

    const itemId = item.dataset.id
    const todo = todos.find(todo => todo.id === itemId)

    if (e.target.tagName === 'BUTTON') {
        todos = todos.filter(todo => todo.id !== itemId)
    } else if (e.target.tagName === 'SPAN' && !e.target.classList.contains('time')) {
        todo.isDone = !todo.isDone
    }

    reload(todos, container)
});
