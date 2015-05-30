var update;

function updateEvent (msg) {
	var li = document.createElement('li');
	var textnode = document.createTextNode(msg);
	li.appendChild(textnode); 
	update.appendChild(li);
}

(function(){
	if(window.applicationCache){
		update = document.getElementById("updateStatus");

		window.applicationCache.onchecking = function (e) {
			updateEvent('Checking Cache');
		}

		window.applicationCache.oncached = function (e) {
			updateEvent('Cached');
		}

		window.applicationCache.onnoupdate = function (e) {
			updateEvent('No Update');
		}

		window.applicationCache.onobsolete = function (e) {
			updateEvent('Obsolete');
		}

		window.applicationCache.ondownloading = function (e) {
			updateEvent('Downloading');
		}

		window.applicationCache.onerror = function (e) {
			updateEvent('Error');
		}
		
		updateEvent('Window Load');

	}
})();