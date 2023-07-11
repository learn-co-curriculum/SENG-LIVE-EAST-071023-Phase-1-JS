// Code your solution in this file!
const returnFirstTwoDrivers = ( drivers ) => [ drivers[0], drivers[1] ]

const returnLastTwoDrivers = ( drivers ) => {
    let length = drivers.length
    return [ drivers[length - 2], drivers[ length - 1 ] ]

    // let lastDrivers = []
    // lastDrivers.push( drivers.pop() )
    // lastDrivers.unshift( drivers.pop() )
    // return lastDrivers
}

const selectingDrivers = [ returnFirstTwoDrivers, returnLastTwoDrivers ]
// selectingDrivers[0]()

const createFareMultiplier = ( integer ) => {
    return function ( fare ) {
        return integer * fare
    }
}

const fareDoubler = createFareMultiplier( 2 )
const fareTripler = createFareMultiplier( 3 )

const selectDifferentDrivers = ( drivers, someDriverFunction ) => someDriverFunction( drivers )