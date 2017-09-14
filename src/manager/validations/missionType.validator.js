function nameValidator(name){
    if(typeof name === 'string'){
        return true;
    } else {
        throw TypeError("name is not valid");
    }
}

function descriptionValidator(description){
    if(typeof description === 'string'){
        return true;
    } else {
        throw TypeError("description is not valid");
    }
}

function typeValidator(type) {
    if(isNaN(type)) {
        throw TypeError("type is not valid");        
    } else {
        return true;
    }
}

module.exports = {
    nameValidator,
    descriptionValidator,
    typeValidator
};