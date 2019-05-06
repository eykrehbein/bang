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
		// if no search term is given e.g. just !a
		if (qArray.length === 1) {
			for (let cmd of commands) {
				if (cmd.cmd == qArray[0]) {
					redirect(cmd.target);
					return;
				}
			}
		} else {
			const searchString = qRes.slice(qArray[0].length + 1);
			for (let cmd of commands) {
				if (cmd.cmd == qArray[0]) {
					// if no search term was defined, redirect to the simple target location
					if (typeof cmd.target_s === 'undefined') {
						redirect(cmd.target);
						return;
					} else {
						let replacedSearchString = cmd.target_s.replace(
							/{{{q}}}/g,
							searchString
						);
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
