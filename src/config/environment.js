export default (function () {
    if (process.env.NODE_ENV !== 'production') {
        return {
            apiUrl: "http://localhost:8080"
        }
    } else {
        return {
            apiUrl: "https://promisepay-express.herokuapp.com"
        }
    }
})()