import select from 'select-dom';
import * as pageDetect from 'github-url-detection';

import features from '.';
import GitHubURL from '../github-helpers/github-url';

let search = '';

function init(): void {
	const searchInput = select<HTMLInputElement>('[data-hotkey="s,/"]')!;

	if (searchInput.value === search) {
		const {route, filePath} = new GitHubURL(location.href);

		searchInput.value = `path:${route === 'tree' ? filePath : filePath.slice(0, filePath.lastIndexOf('/'))} `;
	}
}

void features.add({
	id: __filebasename,
	description: 'Adds current path to the search box.',
	screenshot: 'https://user-images.githubusercontent.com/44045911/94982458-1cf00c00-056d-11eb-852a-4326042354b2.gif'
}, {
	repeatOnBackButton: true,
	include: [
		pageDetect.isRepoTree,
		// Root level files
		() => pageDetect.isSingleFile() && location.pathname.split('/').length !== 6
	],
	exclude: [
		pageDetect.isRepoRoot
	],
	init
});
