const temporary_plugin_until_new_snowpack_svelte_release = './hack-snowpack-plugin.js'

// Consult https://www.snowpack.dev to learn about these options
module.exports = {
	install: ['svelte'],
	plugins: [
		[temporary_plugin_until_new_snowpack_svelte_release, {
			hydratable: true
		}]
	],
	devOptions: {
		open: 'none'
	},
	mount: {
		'.svelte/main': '/_app/main',
		'src/routes': '/_app/routes',
		'src/components': '/_app/components/'
	},
	alias: {
		$components: './src/components'
	}
};