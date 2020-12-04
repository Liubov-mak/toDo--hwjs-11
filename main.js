'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

const todoData = [   // хранить список дел    
    /*  {
        value: 'Сварить кофе',    // сюда поместить значения рендера и сохранить в локалсторидж и перенести из локаосторидж сюда данные

        completed: false
    },
    {
        value: 'Помыть посуду',
        completed: true
    }  */   
];

const render = function() {   // функция рендора списка дел (добавлять)
    todoList.textContent = '';   // очищает спиок вначале, чтобы не дублировался при рендере
    todoCompleted.textContent = '';  // очищает спиок вначале, чтобы не дублировался при рендере    

    todoData.forEach(function(item) {  // перебирает хранилище методом форич        
        const li = document.createElement('li'); // создаем новое место для дела
        li.classList.add('todo-item'); // добавляем класс как у остальных саисков стилей

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + // создаем верстку нового места как у остальных дел
            '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li); // добавляем в список новое место для дела
        } 
        
        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        });     
        
        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function() {          
            li.remove();             
        }); 
        

        
        /* localStorage.li = headerInput.value; */
    });
};

todoControl.addEventListener('submit', function(event) {   // submit вместо click (потому что отправляется валуе на сервер)
    event.preventDefault();  // отменяет стандартное поведение submit      
    
    const newToDo = {                // добавляем новое дело
        value: headerInput.value,
        completed: false
    };  

    if(headerInput.value === '') { // не принимать пустое значение
        return false;        
    }
    
    todoData.push(newToDo);  // добавить в хранилище дел (Push - добавляет инфу) 
    render(); // вызываем функцию рендер, чтобы обновить список дел  
    headerInput.value = ''; // очищает поле ввода
});



render();