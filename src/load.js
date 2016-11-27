const glob = require("glob");

/**
 * From input: string to array of filepath
 * @param input string of filename or pattern
 * @returns {Promise} an array of filename
 */
module.exports = (input) => {
    return new Promise((resolve, error) => {

        glob(input, function (err, files) {
            if(err !== null) return error(err);

            resolve(files);
        });

    });
};
