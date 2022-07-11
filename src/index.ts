import type { PluginOption } from 'vite'

export interface APP {
  pages: string[]
  [key: string]: any
}

export interface PACKAGE {
  ttPlugins: {
    dependencies: {
      [key: string]: any
    }
    [key: string]: any
  }
  [key: string]: any
}

export interface TYPE_OPTIONS {
  package: PACKAGE
  app: APP
}

export default function UniappToGroup (options: TYPE_OPTIONS): PluginOption {
	let packages: PACKAGE = {
		ttPlugins: {
			dependencies: {}
		}
	}
	let app: APP = {
  	pages: []
	}
	if (options.package) {
		packages = options.package
	}
	if (options.app) {
		app = options.app
	}

	return {
		name: 'vite-plugin-uniapp-to-group',
		enforce: 'post',
		generateBundle (code: any, bundle: any) {
			let packageFlag = true
			for (const name of Object.keys(bundle)) {
				if (!Object.keys(app).length && !Object.keys(packages).length) {
					break
				}
				if (name === 'app.json') {
					const appJson = JSON.parse(bundle[name].source)
					// if (app.pages) {
					// 	appJson.pages = unique(appJson.pages.concat(app.pages))
					// }
					for (const key in app) {
						if (appJson[key]) {
							if (
								Object.prototype.toString.call(appJson[key]) === '[object Object]' &&
                Object.prototype.toString.call(app[key]) === '[object Object]'
							) {
								appJson[key] = {
									...appJson[key],
									...app[key]
								}
							}
							if (
								Array.isArray(appJson[key]) &&
                Array.isArray(app[key])
							) {
								appJson[key] = appJson.pages.concat(app[key])
							}
						} else {
							appJson[key] = app[key]
						}
					}

					bundle[name].source = JSON.stringify(appJson)
				}
				if (name === 'package.json') {
					packageFlag = false
					let packageJson = JSON.parse(bundle[name].source)
					packageJson = Object.assign(packageJson, packages)
					bundle[name].source = JSON.stringify(packageJson)
				}
			}
			if (Object.keys(packages).length && packageFlag) {
				bundle['package.json'] = {
					source: JSON.stringify(packages),
					fileName: 'package.json',
					type: 'asset',
					name: undefined
				}
			}
		}
	}
}
