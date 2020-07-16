const BaseMixin = {
    methods: {
        /**
         * @param Any response
         * @return Boolean
         * https://stackoverflow.com/a/51872764/11171240
         * typeof errorObject === 'object'
         * myError instanceof Error === true
         * The above won't work if the error was thrown in a different window/frame/iframe
         * than where the check is happening. In that case, the instanceof Error check will return false,
         * even for an Error object.
         */
        isFailed (clientResponse) {
            //"TypeError: Cannot read property 'constructor' of undefined"
            if ('object' !== typeof clientResponse) {
                return true
            }

            return (Error === clientResponse.constructor)
        },
        /**
         * @param Any value
         * @return Boolean
         * https://stackoverflow.com/a/175787/11171240
         * +undefined, +'true', +[true], +[433, 4324] = NaN
         * +null, +false = 0
         * +true = 1
         * +433, +'433', +[433] = 433
         */
        isPositiveNumeric (value) {
            if (!['string', 'number'].includes(typeof value)) {
                return false
            }
            // To convert a string containing a number into a number:
            let num = +value
            // +num returns the numeric value of the string,
            // or NaN if the string isn't purely numeric characters
            if (NaN != num && 0 < num) {
                return true
            }

            return false
        },
    }
}

export default BaseMixin