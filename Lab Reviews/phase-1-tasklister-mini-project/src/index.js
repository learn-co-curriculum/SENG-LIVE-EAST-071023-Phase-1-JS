// As a user, I should be able to click some form of a submit button.
const newTaskForm = document.getElementById( 'create-task-form' )
const taskPriorityDropdown = document.getElementById( 'task-priority' )

let priority = 'medium'
taskPriorityDropdown.onchange = ( event ) => {
  priority = event.target.value
  console.log( priority )
}

newTaskForm.onsubmit = ( e ) => {
  e.preventDefault()
  // As a user, I expect to see the task string that I provided appear in the DOM after the submit button has been activated.

  const li = document.createElement( 'li' )
  li.textContent = newTaskForm[ 'new-task-description' ].value

  if ( priority === 'medium' )
    li.style.color = 'yellow'
  else if ( priority === 'high' )
    li.style.color = 'red'
  else if ( priority === 'low' )
    li.style.color = 'green'
  
  const delBtn = document.createElement( 'button' )
  // A delete function that will remove tasks from your list
  delBtn.onclick = () => li.remove()
  delBtn.textContent = '❌'

  li.appendChild( delBtn )
  
  const taskUl = document.getElementById( 'tasks' )

  taskUl.appendChild( li )

  // resets input field to being blank
  // newTaskForm.reset()
  newTaskForm[ 'new-task-description' ].value = ''

  newTaskForm[ 'new-task-description' ].placeholder = '(>^_^)> <(^_^<)'

}

// newTaskForm.addEventListener( 'submit', ()=> {
//   e.preventDefault()
//   console.log( "I hit the button!" )
// })



// *** Stretch Goals!!! ***

// A priority value selected from a dropdown that is used to determine the color of the text in the list (e.g. red for high priority, yellow for medium, green for low)
const mediumPriority = document.createElement( 'option' )
mediumPriority.textContent = 'Medium'
mediumPriority.style.color = 'yellow'
mediumPriority.value = 'medium'

taskPriorityDropdown.appendChild( mediumPriority )

const highPriority = document.createElement( 'option' )
highPriority.textContent = 'High'
highPriority.style.color = 'red'
highPriority.value = 'high'

taskPriorityDropdown.appendChild( highPriority )

const lowPriority = document.createElement( 'option' )
lowPriority.textContent = 'Low'
lowPriority.style.color = 'green'
lowPriority.value = 'low'

taskPriorityDropdown.appendChild( lowPriority )






// As an additional challenge, implement a sorting functionality that displays the tasks in ascending or descending order based on priority
// An additional input field (e.g. user, duration, date due)
// Ability to edit tasks
// Something of your choice! The main objective is to add a feature that allows the user's input to affect the DOM