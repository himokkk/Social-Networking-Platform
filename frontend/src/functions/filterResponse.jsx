export const filterResponse = async (response, returnedFields) => {
    try {
        const jsonResponse = await response.json();

        const results = returnedFields.map(field => {
            if (Object.prototype.hasOwnProperty.call(jsonResponse, field)) {
                return jsonResponse[field];
            } else {
                console.log(`Field "${field}" not found in the response.`);
                return null;
            }
        });

        return results;
    } catch (error) {
        console.log("Error parsing JSON response: ", error);
        return null;
    }
};
