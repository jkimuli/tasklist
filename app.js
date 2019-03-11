// define UI variables

const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const searchInput = document.querySelector('#search-input');
const clearBtn = document.querySelector('#clear-tasks');
const taskList = document.querySelector('.list');

//load all event listeners

loadEventListeners();

function loadEventListeners(){
    // event listener for task add

    form.addEventListener('submit',addTask);
    clearBtn.addEventListener('click',clearTasks);
    searchInput.addEventListener('keyup',searchTask);
    taskList.addEventListener('click',processTask);
    document.addEventListener('DOMContentLoaded',loadTasksFromLocalStorage);
}

function addTask(e){

    // check if new task has been typed into form
    if(taskInput.value ===''){
        alert('Please enter a task!');
    }else{

    //create li element
    const li = document.createElement('li');
    li.className='list-item';
    li.appendChild(document.createTextNode(taskInput.value));

    //create the link that provides a delete action to the list item

    const link = document.createElement('a');
    link.href="#";
    link.className = 'task-item secondary-content';
    link.innerHTML += '<i class="fas fa-times"></i>';
    link.innerHTML += '<i class="fas fa-edit"></i>';

    li.appendChild(link);
    
    // add the li element to the task list

    taskList.appendChild(li);

    saveTaskToLocalStorage(li.textContent);

    //clear task input field

    taskInput.value='';
    }

    e.preventDefault();
    
}

function clearTasks(e){

    // clear the ul list

    taskList.innerHTML='';
    e.preventDefault();

    // clear from localStorage

    localStorage.removeItem('tasks');

}

function searchTask(e){

    if(e.keyCode===13){
        console.log('Enter pressed');
        /*search through the taskList and return only li elements containing entered text*/

        const lis = document.querySelectorAll('.list-item');
        lis.forEach(function(li,index){
            if(li.textContent.indexOf(searchInput.value)!==-1){
                // li contains searched text
                if(index!==lis.length){
                  li.classList +=' bottom-outline';
                }
                li.style.display="block";              
                
            }
            else{
                li.style.display="none";
            }

        })
        searchInput.value='';
    }
    
    e.preventDefault();  

}

function processTask(e){
    if(e.target.classList.contains('fa-times')){
        removeTask(e);
    }
    else if(e.target.classList.contains('fa-edit')){
        editTask(e);
    }
}

function removeTask(e){
    let answer = confirm("Are you sure you want to delete?");
    if(answer===true){
        const li = e.target.parentElement.parentElement;
        taskList.removeChild(li);
    }
    // remove from localStorage
    
    removeFromLocalStorage(e.target.parentElement.parentElement.textContent);
}

function editTask(e){
    console.log('edit task');
}

function saveTaskToLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));// get existing items
    }

    tasks.push(taskItem);

    //save to local storage

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function loadTasksFromLocalStorage(){
    // check if there are existing 

    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));// get existing items
    }

    // bind existing tasks in localstorage to li elements and append to taskList

    tasks.forEach(function(task){

        //create li element
        const li = document.createElement('li');
        li.className='list-item';
        li.appendChild(document.createTextNode(task));

        //create the link that provides a delete action to the list item

        const link = document.createElement('a');
        link.href="#";
        link.className = 'task-item secondary-content';
        link.innerHTML += '<i class="fas fa-times"></i>';
        link.innerHTML += '<i class="fas fa-edit"></i>';

        li.appendChild(link);
        taskList.append(li);

    });
}

function removeFromLocalStorage(taskItem){
    
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));// get existing items
    }

    tasks.forEach(function(task,index){
        if(taskItem===task){
            tasks.splice(index,1); // remove element from array
        }
    });

    // reset localStorage

    localStorage.setItem('tasks',JSON.stringify(tasks));

}