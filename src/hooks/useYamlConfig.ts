import { useEffect, useState } from 'react'
import fs from 'fs/promises'
import YAML from 'yaml'
import { YamlConfig } from '../interfaces/YamlConfig.interface.js'
import { ReadFileError } from '../interfaces/readfile.error.interface.js'

export const useYamlConfig = () => {
	const [data, setData] = useState<
		(YamlConfig & { error: ReadFileError }) | null
	>(null)

	const isLoading: boolean = data === null
	const isError: boolean = data !== null && data.error !== undefined

	useEffect(() => {
		fs.readFile('./.anyshell.yaml')
			.then((buffer) => YAML.parse(buffer.toString('utf8')))
			.then(setData)
	}, [])

	return {
		yamlConfig: data as YamlConfig,
		isLoading,
		isError,
		errorCode: isError && data ? data.error.code : undefined,
	}
}
