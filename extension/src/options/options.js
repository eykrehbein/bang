// default settings object
let settings = {
	tld: localStorage.getItem('bang_tld') || 'com',
	lang: localStorage.getItem('bang_lang') || 'en'
};
document.querySelector('.activeTLD').textContent = settings.tld;
document.querySelector('.activeLang').textContent = settings.lang;
// new proxy for reactive ui
let settingsProxy = new Proxy(settings, {
	set: (_, prop, value) => {
		// update localStorage and ui

		if (prop === 'tld') {
			localStorage.setItem('bang_tld', value);
			document.querySelector('.activeTLD').textContent = value;
		} else if (prop === 'lang') {
			localStorage.setItem('bang_lang', value);
			document.querySelector('.activeLang').textContent = value;
		}
		return true;
	}
});

document.querySelector('form').addEventListener('submit', e => {
	e.preventDefault();
	let tld = document.querySelector('.tld').value;
	let lang = document.querySelector('.lang').value;

	if (tld.startsWith('.')) {
		tld = tld.slice(1, tld.length);
	}
	if (lang.startsWith('.')) {
		lang = lang.slice(1, tld.length);
	}

	if (tld !== '') {
		settingsProxy.tld = tld;
	}
	if (lang !== '') {
		settingsProxy.lang = lang;
	}
});
