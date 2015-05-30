function addItem(key, value) {
	// додати одну статтю в локал сторедж
    localStorage.setItem(key, value);
}

function getAllItems(callback) {
	var arr = [],
        // дістати всі статті з локал сторедж. тут розберіться з колбеками
    i = 0,
    key;
for (; key = window.localStorage.key(i); i++) {
    arr.push(window.localStorage.getItem(key));
}
    callback(arr);
}


function deleteItem(key) {
	// видалити кинкретну статтю з локал сторедж
    localStorage.removeItem(key);
}