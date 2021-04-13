const form=document.querySelector('#task-form');
const tasklist=document.querySelector('.collection');
const clearbtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');

loadEventListener();

function loadEventListener(){
    document.addEventListener('DOMContentLoaded',getTasks)
    form.addEventListener('submit',addTask);

    tasklist.addEventListener('click',removeTask);

    clearbtn.addEventListener('click',clearTasks);

    filter.addEventListener('keyup',filterTasks);
}
//get taks from local storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(
        function(task){
            const li=document.createElement('li');
            //Add class to our e lement
            li.className='collection-item';
            //textnode
            li.appendChild(document.createTextNode(task));
            //create new link
            const link=document.createElement('a');
            link.className='delete-item secondary-content';
            link.innerHTML='<i class="fa fa-remove"></i>';

            li.appendChild(link);

            //append li to ul
            tasklist.appendChild(li);
            //console.log(li);
        }
    );
}

function addTask(e)
{
    if(taskInput.value===''){
        alert('Add a task');
    }
    const li=document.createElement('li');
    //Add class to our e lement
    li.className='collection-item';
    //textnode
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link
    const link=document.createElement('a');
    link.className='delete-item secondary-content';
    link.innerHTML='<i class="fa fa-remove"></i>';

    li.appendChild(link);

    //append li to ul
    tasklist.appendChild(li);
    //console.log(li);

    storeTaskInLocalStorage(taskInput.value);

    taskInput.value='';
    e.preventDefault();
}


function removeTask(e){
    //e.target on clicking on X gives us <i> but we want its parent that is<a>
    if(e.target.parentElement.classList.contains('delete-item')){
        //e.target.parentElement.parentElement gives us the li on clicking the X
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            //remove from ls
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.push(task);
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(
        function(task,index){
            if(taskItem.textContent===task){
                tasks.splice(index,1);//from this index remove one element that means that element itself
            }
        }
    );

    localStorage.setItem('tasks',JSON.stringify(tasks))
}
function clearTasks()
{
    //tasklist.innerHTML='';

    //This is faster-removeChild
    while(tasklist.firstElementChild){//If there is still something in the list
        tasklist.removeChild(tasklist.firstChild);
    }

    clearTasksFromLocalStorage();
}
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

function filterTasks(e){
    const text=e.target.value.toLowerCase();//since this function is called on keyup,the target would we input box and it would give diff value as the user changes it
    
    document.querySelectorAll('.collection-item').forEach(
        function(task)
        {
            const item =task.firstChild.textContent;//Node.textContent;node from nodelist
            if(item.toLowerCase().indexOf(text)!=-1){
                task.style.display='block';
            }else{
                task.style.display='none';
            }
        }
    );//QuerySelectorAll returns a nodeList on which we can use forEach.Get element by class- gives HTML collection which we have to convert to array
}