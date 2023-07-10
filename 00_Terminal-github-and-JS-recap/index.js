// Start here!


// 💡 JS data types:
/*
string
number
boolean
array
object
null
undefined
*/

// ✅ Show each of the data types and use typeof()



// 💡 Storing values in variables

// ✅ Create a variable with let and store different data types in it

const number = 20
let name = 'Princeton'



// ❓ Why is using the var keyword bad? 🤔




// ✅ Create a variable with const and try to change the value


    // ❓ What happened? What did you get back and what did it say? 🤔

// 💡 Conditionals - if / else if / else

// ✅ Create a conditional statement

let time = 'before lunch'
if ( time === 'before lunch' )
    console.log( 'hungry!!!' )
else if ( time === 'after lunch' )
    console.log( 'Full!' )
else
    console.log( 'Working hard!' )

time === '' ? 'Empty' : time

    // ✅ Create a conditional statement that shows the difference between truthy and falsy values
    
    // debugger
    ' ' ? 'Truthy' : 'Falsey'
    '' ? 'Truthy' : 'Falsey'

// 💡 Arrays and array iteration

// ✅ Create an array of numbers

const numbers = [ 1, 2, 3, 4, 5 ]



// ✅ Iterate through the array using a for loop

for ( let n = 0; n <= numbers.length; n ++ )
    console.log( numbers[n] )

// ✅ Iterate through the array using a forEach loop

numbers.forEach( number => console.log( number ) )



// ✅ Iterate through the array and multiply by two to each number with map

numbers.map( number => number * 2 )


// ❓ When do I use forEach vs map? 🤔


// ✅ Iterate through the array and filter only the numbers greater than 3
    
numbers.filter( number => number >= 3 )

// 💡 Working with Objects

// ✅ Create a person object with the keys 'name' and 'role' and assign them values

let person = {
    name: 'Princeton',
    role: 'Instructor'
}


// ✅ Access the key/value pairs of the object using both dot notation and bracket notation


person.name
person['name']


// ✅ Change the values of the keys in the object

person.role = 'Teacher'

