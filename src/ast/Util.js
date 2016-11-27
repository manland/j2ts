module.exports.nameClassWithoutPackage = (name) => {
    const nameWithoutPackage = name.split('.');
    return nameWithoutPackage[nameWithoutPackage.length - 1];
};