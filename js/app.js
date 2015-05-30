var box = {}; // об"єкт з данними про статтю
var title = document.querySelector('input[name="title"]');
var desc = document.querySelector('textarea[name="description"]');
var log = document.getElementById('log'); // присвоїти змінну списку, де буде відображатись стан надсилання повідомлення

var send = document.getElementById('save'); // 

send.onclick = function (e) {
	box.title = title.value; // заголовок
	box.desc = desc.value; // сама стаття
	box.id = new Date().getUTCMilliseconds(); // id  задається у вигляді дати, щоб була унікальною
	storeMessage(box); // зберегти статтю у віддалену базу або локально, залежно від наявності інтернету
	return false; // потрібно вказати, щоб сторінка не рефрешилась
};

function isOnline() {
	return navigator.onLine; // перевіляє чи є доступ до інтернету
}

function reportOnlineStatus() {
	if (isOnline()) {
        document.getElementById("onlineStatus").innerHTML = "Online";
		// має повідомити юзеру, що він працює онлайн
	} else {
        document.getElementById("onlineStatus").innerHTML = "Offline";
		// має повідомити юзеру, що він працює оффлайн
	}
}

function storeMessage(box) {

	if (isOnline()) {
		//storeMessageRemote(box);
        storeMessageLocal(box);        
	} else {
		storeMessageRemote(box);
        //storeMessageLocal(box);
	}
}

function storeMessageLocal(data) {

	addItem(data.id, JSON.stringify(data)); // сберегти статтю в локал сторедж (db.js)
	clearUI();
	logEvent('Message saved locally: "' + data.title + '"');
}

function storeMessageRemote(data) {
	clearUI();
	sendMessageToServer(data);
}

//TODO: Implement after learning Node.js
function sendMessageToServer(data) {
	clearUI();
	logEvent('Message sent to server: "' + data.title + '"');
}

//TODO: Implement after learning Node.js
function sendAllMessagesToServer() {
	var messages = [];
	getAllItems(function (result) {
		messages = result;  // дістати всі статті з локал сторедж  (db.js)
	});

	for (var i = 0; i < messages.length; i++) {
		logEvent('Message sent to server: "' + messages[i].title + '"');
		deleteItem(messages[i].id); // видалити відправлені статті з локал сторедж  (db.js)
	}
}

function clearUI () {
	// видалити текст з полів вводу
    document.querySelector('textarea[name="description"]').value="";
    document.querySelector('input[name="title"]').value="";
}

function logEvent (msg) {
	// додавати LI елемент у список, де відображається стан надсилання повідомлення
    var logelem = document.createElement('li');
	var logtextnode = document.createTextNode(msg);
	logelem.appendChild(logtextnode); 
	document.getElementById("log").appendChild(logelem);
    
}

(function() {
	if(window.applicationCache) {

		window.addEventListener('online', function(e){
			reportOnlineStatus();
			sendAllMessagesToServer();
		}, true);

		window.addEventListener('offline', function(e){
			reportOnlineStatus();
		}, true);

		reportOnlineStatus();
	}
})();