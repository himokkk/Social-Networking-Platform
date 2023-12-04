export const checkInResponse = async (response, searchedString) => {
    var jsonResponse = Promise.resolve(response.json())
        jsonResponse
        .then(response => {
            let detail = JSON.stringify(response.detail)
            if (detail.includes(searchedString)) {
                return true
            }
            else {
                return false
            }
        })
        .catch(error => {
            console.error('Error fetching or processing data:', error);
            return false
        });
};
