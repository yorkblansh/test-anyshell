import fs from 'fs/promises'

export const getCommands = async () => {
	try {
		const file = await fs.readFile('./.anyshell.yaml')
	} catch (err) {
		console.error({ anyshellYamlFileError: err })
	}
}
