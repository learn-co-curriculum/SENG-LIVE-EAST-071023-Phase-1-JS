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

    typeof( '' )
    typeof( 0 )
    typeof( true )
    typeof( {} )
    typeof( [] )
    typeof( null )
    typeof( undefined )


// 💡 Storing values in variables

// ✅ Create a variable with let and store different data types in it

    let someCoolLet = ''
    const someCoolConst = ''


// ❓ Why is using the var keyword bad? 🤔

    var someCoolVar = '❌'


// ✅ Create a variable with const and try to change the value

    const tryToChangeConst = "I am Immutable!!!"
    // tryToChangeConst = "I'm totally mutable..."

    // ❓ What happened? What did you get back and what did it say? 🤔

// 💡 Conditionals - if / else if / else

// ✅ Create a conditional statement

    let weather = 'sunny'

    if ( weather === 'rain' ) {
        console.log( 'Bring an umbrella' )
    } else if ( weather === 'sunny' ) {
        console.log("Let's all go to the beach!")
    } else if ( weather === 'cloudy' ) {
        console.log("Stay inside and play video games!")
    } else {
        console.log( "Sleep in bed all day...")
    }


    // ✅ Create a conditional statement that shows the difference between truthy and falsy values
    
    // debugger
    let someValue = ''

    if ( someValue ) {
        console.log( "This is truthy!!!" )
    } else {
        console.log( "This is falsy!!!" )
    }


// 💡 Arrays and array iteration

// ✅ Create an array of numbers

    let numbers = [ 1, 2, 3, 4, 5 ]


// ✅ Iterate through the array using a for loop

    for ( let n = 0; n < numbers.length; n++ )
        console.log( numbers[n] )


// ✅ Iterate through the array using a forEach loop

    numbers.forEach( number => console.log( number ) )


// ✅ Iterate through the array and add two to each number with map

    let numbersPlusTwo = numbers.map( number => number + 2 )

// ❓ When do I use forEach vs map? 🤔


// ✅ Iterate through the array and filter only the numbers greater than 10
    
    let higherNumbers = [1,2,7,832108, 10,  15, -30]
    let filteredNumbers = higherNumbers.filter( number => number > 10 )


// 💡 Working with Objects

// ✅ Create a person object with the keys 'name' and 'role' and assign them values

    let person = { 
        name: 'TheCat',
        from: 'Area 51',
        role: 'Hero'
    }


// ✅ Access the key/value pairs of the object using both dot notation and bracket notation

    person.name
    person['name']

    let key = 'name'

    person[ key ]


// ✅ Change the values of the keys in the object

    person['name'] = 'Puss in Boots'
    person.from = 'Far Far Away'

