// Check for null and/or undefined params.
module.exports = function NorU(param) {
    if (param !== null && param !== undefined) {
        return true;
    }
    return false;
}