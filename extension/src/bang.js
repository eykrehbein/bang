/**
 * "Shortz" Google Chrome Extension.
 *
 * Eyk Rehbein
 */
const jsonCommandsUrl = chrome.runtime.getURL('src/commands/commands.json');

// the commands from the json file will be stored here
let commands = {};

/**
 * Check if the request was a google search request, and if it is, return it's search params
 * @param {*} url Full URL String of the Google Search
 */
const parseGoogleURL = url => {
	// check if the hostname is google
	if (!url.includes('google.')) {
		return null;
	}

	// Get Google search query
	try {
		const q = url.split('q=')[1].split('&')[0];
		if (q.startsWith('!')) {
			return q;
		}
	} catch {}

	return null;
};

const repl = (useCustomTLDLang, customTLDLang, gtarget) => {
	let target = gtarget;
	// if a custom tld/lang is wanted e.g. !a-de
	if (useCustomTLDLang === true) {
		// replace either {{lang}} or {{tld}}
		target = target.replace(/{{(?:lang|tld)}}/, customTLDLang);
	} else {
		// if no custom tld/lang is wanted e.g. !a
		// => just set the {{lang}} or {{tld}} to the localStore settings

		// if bang_tld localStorage setting exists
		if (localStorage.getItem('bang_tld') !== null) {
			target = target.replace(/{{tld}}/, localStorage.getItem('bang_tld'));
		} else {
			// bang_tld localStorage doesn't exist => set it to com
			target = target.replace(/{{tld}}/, 'com');
			localStorage.setItem('bang_tld', 'com');
		}

		// if bang_lang localStorage setting exists
		if (localStorage.getItem('bang_lang') !== null) {
			target = target.replace(/{{lang}}/, localStorage.getItem('bang_lang'));
		} else {
			// bang_lang localStorage doesn't exist => set it to en
			target = target.replace(/{{lang}}/, 'en');
			localStorage.setItem('bang_lang', 'en');
		}
	}

	return target;
};

/**
 * Redirect the tab to a new location
 * @param {string} newLocation URL
 */
const redirect = newLocation => {
	chrome.tabs.update({ url: newLocation });
};

const bang = url => {
	// parse the google search query (if it even is a google search)
	const qRes = parseGoogleURL(url);

	// if the request is a google search request and the query started with a ! symbol
	if (qRes !== null) {
		// split by spaces
		const qArray = qRes.split('+');

		// check if a custom TLD or Lang is wanted. Example: !a-de will redirect you to amazon.de instead of amazon.com
		let useCustomTLDLang = false;
		let customTLDLang = '';
		if (qArray[0].includes('-')) {
			useCustomTLDLang = true;
			customTLDLang = qArray[0].split('-')[1];
		}

		// if no search term is given e.g. just !a
		if (qArray.length === 1) {
			for (let cmd of commands) {
				if (cmd.cmd == qArray[0] || cmd.cmd.split('-')[0]) {
					// replace tld placeholder
					let target = cmd.target;
					// if a custom tld/lang is wanted e.g. !a-de
					target = repl(useCustomTLDLang, customTLDLang, target);

					redirect(target);
					return;
				}
			}
		} else {
			const searchString = qRes.slice(qArray[0].length + 1);
			for (let cmd of commands) {
				if (cmd.cmd == qArray[0] || qArray[0].split('-')[0] == cmd.cmd) {
					// if a search query was typed by the user but the given cmd has no search specific URL in the config, redirect to the simple target with no search.
					if (typeof cmd.target_s === 'undefined') {
						// replace tld placeholder
						let target = cmd.target;

						target = repl(useCustomTLDLang, customTLDLang, target);

						redirect(target);
						return;
					} else {
						console.log('fired');

						// replace tld placeholder
						let target = cmd.target_s;
						console.log(target);
						target = repl(useCustomTLDLang, customTLDLang, target);
						console.log(target);
						let replacedSearchString = target.replace(/{{{q}}}/g, searchString);
						redirect(replacedSearchString);
					}
				}
			}
		}
	}
	return;
};

// fetch all commands from commands/commands.json
fetch(jsonCommandsUrl)
	.then(response => response.json()) //
	.then(json => {
		commands = json.cmds;

		// Create a listener for all navigation changes
		chrome.webNavigation.onBeforeNavigate.addListener(details => {
			chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
				// call bang function with the domain
				bang(tabs[0].url);
			});
		});
	});
