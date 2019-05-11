// animate typing title
const animateTyping = () => {
	document.querySelector('.c').textContent = 'typing';
	const options = {
		strings: [
			'!w Seattle',
			'!a red shoes',
			'!ghtrends',
			'!so javascript',
			'!gmail label: Work',
			'!gfonts Open Sans',
			'!gteg Hallo Welt!',
			'!awsc',
			'!images Tree',
			'!gcal Meeting with Joe'
		],
		typeSpeed: 70,
		loop: true,
		smartBackspace: false,
		shuffle: true,
		backDelay: 3000,
		showCursor: false
	};
	new Typed('.typed', options);
};

// The Shortcut Component
const shortcut = Vue.component('Shortcut', {
	props: ['sc', 'name', 'target', 'target_search'],
	template: `
	<div class="shortcut_item">
		<div class="sc">{{sc}}</div>
		<div class="name" :title="name">{{name}}</div>
	</div>
	`
});

// Initialize Vue Instance
new Vue({
	el: '.app',
	data: {
		shortcuts: [],
		searchInput: '',
		searchResults: []
	},
	mounted() {
		// fetch all commands
		fetch('./commands/commands.json')
			.then(response => response.json())
			.then(json => {
				this.shortcuts = json.cmds;
				this.shortcuts.sort((a, b) => {
					if (a.name < b.name === true) {
						return -1;
					}
					if (a.name > b.name === true) {
						return 1;
					}
					return 0;
				});
			});
		// typed animations
		setTimeout(() => {
			animateTyping();
		}, 3000);
	},
	methods: {
		chromeInstall() {
			window.open(
				'https://chrome.google.com/webstore/detail/bndfgjabddmooomlkgjihefcjlcmplop',
				'_blank'
			);
		},
		fuzzySearchCommand(searchVal) {
			const options = {
				keys: ['name', 'cmd'],
				shouldSort: true,
				threshold: 0.2
			};
			let fuse = new Fuse(this.shortcuts, options);
			this.searchResults = fuse.search(searchVal);
		}
	},
	computed: {
		browser() {
			if (
				!!window.chrome &&
				(!!window.chrome.webstore || !!window.chrome.runtime)
			) {
				return 'chrome';
			}
			if (
				(!!window.opr && !!opr.addons) ||
				!!window.opera ||
				navigator.userAgent.indexOf(' OPR/') >= 0
			) {
				return 'opera';
			}
			if (typeof InstallTrigger !== 'undefined') {
				return 'firefox';
			}
			return null;
		}
	},
	watch: {
		searchInput(val) {
			this.fuzzySearchCommand(val);
		}
	}
});
