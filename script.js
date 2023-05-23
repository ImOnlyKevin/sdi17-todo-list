document.addEventListener("DOMContentLoaded", function(event){
    // your code here
    // let form = document.querySelector('.form').addEventListener('submit', (e) => { e.preventDefault() })



    let button = document.getElementById('new-task-btn').addEventListener('click', () => { 
        // select the text in the box
        let task = document.querySelector('#buttonText').value
        let current_tasks = document.querySelectorAll('li')
        // current_tasks[0].innerText

        for (index in current_tasks) {
            if (current_tasks[0].innerText.trim() == task) {
                window.alert(`"${task}" is already in the list.`)
                return
            }
        }

        if (task == '') {
            window.alert('Please input a task')
        }
        else {
            // select the unordered list
            let ul = document.querySelector('#list')

            // create a new list element
            let li = document.createElement("li");
            li.setAttribute("class", "checkbox")
            li.innerHTML = `<input type="checkbox" id="checkbox" value="true"> <label for="task">${task}</label>`

            // append the new list element to the parent list
            ul.appendChild(li)
        }
        return
    })
});