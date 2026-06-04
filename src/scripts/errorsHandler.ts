export const errorsHandler = {
   handleError: (error) => {
        if (error.response.status === 401) {
            return 401
        } else if (error.response.status === 403) {
            return 403
        } else if (error.response.status === 400) {
            return 400
        } else if (error.response.status === 404) {
            return 404
        } else {
            return 500
        }
    }
}