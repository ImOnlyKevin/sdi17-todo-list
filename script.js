document.addEventListener("DOMContentLoaded", function(event){
    // global history variable for tasks completed
    let history = []


    let button = document.getElementById('new-task-btn').addEventListener('click', () => { 
        // Select the text in the box
        let task = document.querySelector('#buttonText').value

        // Return an array of all list elements
        let current_tasks = document.querySelectorAll('li')

        // Check every list element and make sure that it is not a duplicate
        for (let index in current_tasks) {
            if (current_tasks[index].innerText == undefined){
                continue
            }
            else if (current_tasks[index].innerText.trim().toLocaleLowerCase().replace(/[^\w ]/g, '') == task.toLocaleLowerCase().replace(/[^\w ]/g, '')) {
                window.alert(`"${task}" is already in your list`)
                return
            }
        }

        // If a blank task was submitted, raise alert. Else add task to list
        if (task == '') {
            window.alert('Please input a task')
        }
        else {
            // select the unordered list
            let ul = document.querySelector('#list')

            // create a new list element
            let li = document.createElement("li");
            li.setAttribute("class", "checkbox")
            li.setAttribute("id", `checkbox${ul.childElementCount}`)
            li.innerHTML = `<input type="checkbox" id="checkbox" class="li"> <label for="task">${task}</label>`

            // append the new list element to the parent list
            ul.appendChild(li)
        }

        // Handle completing tasks
        document.querySelectorAll('#checkbox').forEach(function(checkbox) {
            // On checkbox select
            checkbox.addEventListener('change', () => {

                // If the checkbox is selected
                if (checkbox.checked == true) {
                    // Add the "removed" class to enable CSS transition for smooth deletion
                    checkbox.parentNode.classList.add("removed");

                    // Once the transition from "removed" ends, continue with deleting the li element
                    checkbox.parentNode.addEventListener("transitionend", () => {
                        // Push to history for history log
                        history.push(document.querySelector('.removed').innerText.trim())
                        document.querySelector('.removed').remove() // Remove the element that was tagged to remove

                        // if any more checkbox li elements exist, re-assign their ID to their child index
                        if (document.querySelectorAll('.checkbox')){
                            let reassign = document.querySelectorAll('.checkbox')
                            if (reassign.length > 1) {
                                for (let index in reassign) {
                                    reassign[index].setAttribute('id', `checkbox${index}`)
                                }
                            }
                            else if (reassign.length == 1) {
                                reassign[0].setAttribute('id', `checkbox0`)
                            }
                        }
                        
                    })
                }
            })
      });
        
    }) 

    // Handles history display
    let showHistory = document.querySelector('#historyCheck')
    // On checkbox change, display/hide history
    showHistory.addEventListener('change', () => {
        // If checkbox is checked, create and display history
        if (showHistory.checked) {
            for (let index in history) {
                const new_el = document.createElement('p')
                const text = document.createTextNode(`${Number(index)+1}: ${history[index]}`);
                new_el.append(text)
                new_el.setAttribute('id', 'historyEntry')
                new_el.setAttribute('class', 'historyEntry')

                document.querySelector('.history').appendChild(new_el)

            }
        }
        // If checkbox is not checked, check for history entries and delete them
        else {
            if (document.querySelectorAll('#historyEntry')) {
                let remove_history = document.querySelectorAll('#historyEntry')
                for (let index in remove_history) {
                    remove_history[index].remove()
                }
            }
        }
    })

});