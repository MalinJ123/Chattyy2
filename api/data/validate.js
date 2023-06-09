 function isValidProduct(p) {
    if ((typeof p ) !== 'object' ){
        return false;
    }else if (p === null){
        return false;
    }

    let nameIsValid = (typeof p.name) === 'string'
    nameIsValid = nameIsValid && p.name !== ''
    
    let priceIsValid = Number(p.price)  

    if ( isNaN(priceIsValid)){
        return false
    }
    

    let imageIsValid = (typeof p.image) === 'string'
    imageIsValid = imageIsValid && p.image !== ''

    let tagIsValid = (typeof p.tags) === 'string'
    tagIsValid = tagIsValid && p.tags !== ''

    return true
 }


 function isValidId(x) {
	// Giltigt id får inte vara NaN och ska vara >= 0
	let maybeId = Number(x)
	if( isNaN(maybeId) ) {
		return false
	}
	return maybeId >= 0
}

function isValidUser(x) {
    if ((typeof x ) !== 'object' ){
        return false;
    }else if (x === null){
        return false;
    }
    let usernameIsValid = (typeof x.username) === 'string'
    usernameIsValid = usernameIsValid && x.usernname !== ''
    return true
}


 export {isValidProduct, isValidId , isValidUser}