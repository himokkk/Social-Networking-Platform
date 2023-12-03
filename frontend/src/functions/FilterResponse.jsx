export const FilterResponse = async (response, returnedField) => {
    try {
        const jsonResponse = await response.json();

        if (Object.prototype.hasOwnProperty.call(jsonResponse, returnedField)) {
            return jsonResponse[returnedField];
        }
        else {
            console.log(`Field "${returnedField}" not found in the response.`);
            return null;
        }
    }
    catch (error) {
        console.log('Error parsing JSON response:', error);
        return null;
    }
};
