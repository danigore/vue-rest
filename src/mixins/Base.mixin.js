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
        }
    }
}

export default BaseMixin