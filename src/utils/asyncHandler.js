

const asyncHandler = (requestHandler) => {
     return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((error) => next(error))
    }
}


export { asyncHandler }



// const asyncHAndler = (fn) => {}
// const asyncHAndler = (fn) => {(fn) => { }}
// const asyncHAndler = (fn) => {async () => { }}    higher order function :- that takes a function as an argument and
// returns a new function that is asynchronous. The returned function can be used to wrap any asynchronous code,
// allowing you to handle errors and manage the flow of asynchronous operations more easily.

// try and catch

// const asyncHandler = (fn) => {
//     async (req, res, next) => {
//         try {
//             await fn(req, res, next)
//         }
//         catch (error) {
//             res.status(error.code || 500)
//                 .json({
//                     success: false,
//                     message: error.message || "Internal server error"
//                 })
//         }
//     }
// }