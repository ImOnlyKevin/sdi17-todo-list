document.addEventListener("DOMContentLoaded", function(event){
    // global history variable for tasks completed
    let history = []


    let button = document.getElementById('new-task-btn').addEventListener('click', () => { 
        // select the text in the box
        let task = document.querySelector('#buttonText').value
        let current_tasks = document.querySelectorAll('li')
        // current_tasks[0].innerText

        for (let index in current_tasks) {
            if (current_tasks[index].innerText == undefined){
                continue
            }
            else if (current_tasks[index].innerText.trim().toLocaleLowerCase().replace(/[^\w ]/g, '') == task.toLocaleLowerCase().replace(/[^\w ]/g, '')) {
                window.alert(`"${task}" is already in your list`)
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
            li.setAttribute("id", `checkbox${ul.childElementCount}`)
            li.innerHTML = `<input type="checkbox" id="checkbox" class="li"> <label for="task">${task}</label>`

            // append the new list element to the parent list
            ul.appendChild(li)
        }

        document.querySelectorAll('#checkbox').forEach(function(checkbox) {
            checkbox.addEventListener('change', () => {
                // enabledSettings = 
                    // Array.from(complete) // Convert checkboxes to an array to use filter and map.
                    // .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
                    // .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.
                
                // console.log(checkbox.checked)
                if (checkbox.checked == true) {
                    // console.log(checkbox.parentNode)
                    checkbox.parentNode.classList.add("removed");
                    checkbox.parentNode.addEventListener("transitionend", () => {
                        history.push(document.querySelector('.removed').innerText.trim())
                        document.querySelector('.removed').remove()

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

    let showHistory = document.querySelector('#historyCheck')
    showHistory.addEventListener('change', () => {
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