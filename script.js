//delete button ma render and save node kem lakhyu a khabar na padi. ->aane google karo.

const list = document.querySelector('.list')
const btn = document.getElementById('addBtn')
const inpt = document.getElementById('input')
const  saved = localStorage.getItem('todos')
todos =saved?JSON.parse(saved):[];  //array is created here.

function savenode(){
    localStorage.setItem('todos',JSON.stringify(todos));
}


function createNode(todo,index){
const li = document.createElement('li');

//text of the todo
const textspan = document.createElement('span');
textspan.textContent = todo.text;
    
textspan.addEventListener('dblclick',()=>{      //For editing the text of the todo with dbl-click.
       const newText = prompt('Edit todo',task.text);
       if(newText !== null){
        task.text = newText.trim();
        textspan.textContent = task.text;
        savenode();
       }
    })

//checkbox
const cbox = document.createElement('input');
cbox.type = 'checkbox';
cbox.checked =todo.completed;

cbox.addEventListener('change',()=> {
    todo.completed = cbox.checked;

    if(cbox.checked){
        textspan.style.textDecoration = 'line-through';
    } else {
        textspan.style.textDecoration = 'none';
    }

    savenode();
})


//Delete button
//function of delBtn: we are using the index passed on this function, using that we are splice the todo we want to delete using delBtn,and again render the whole list and save the array to the local storage
const del = document.createElement('button');
del.textContent = 'Delete'

del.addEventListener('click',()=>{
    todos.splice(index,1);
    savenode();
    render();   
})
li.appendChild(cbox);
li.appendChild(textspan);
li.appendChild(del);
// list.appendChild(li); we already doing this in render function
savenode();

return li;  // the node we created
}



function render(){  //showing every node in todos array every time we add a new task.
    list.innerHTML = '';

    todos.forEach((todo,index) => {
        const node = createNode(todo,index);
        list.appendChild(node);
    });
}

function addTodo(){ //this function is initializing the todo object and call the render func to display all the todos

    if(inpt.value.trim() === ''){
        alert("please Enter the task");
        return;
    }
    let inptext = inpt.value;
   const todo = {
        text:inptext,
        completed: false
    }
    todos.push(todo);
    
    inpt.value = '';
    render();   //listing all saved todos from the local strorage.
}
render();   //initial render when opening the web


btn.addEventListener('click',addTodo)   // call to addtodo function

inpt.addEventListener('keydown',(e)=>{
    if(e.key === 'Enter'){
        addTodo();
    }
})
