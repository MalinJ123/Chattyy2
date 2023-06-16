
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


 export { isValidId , isValidUser}