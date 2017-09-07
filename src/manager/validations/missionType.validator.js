function nameValidator(name){
    return name ? name : "";
}

function descriptionValidator(description){
    return description ? description : "";
}

function typeValidator(type){
    return !isNaN(type) ? type : 0;
}

module.exports = {
    nameValidator,
    descriptionValidator,
    typeValidator
};