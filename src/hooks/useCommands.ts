import { useEffect, useState } from 'react'
import fs from 'fs/promises'
import YAML from 'yaml'
import { CommandList } from '../interfaces/commandList.interface.js'
import { ReadFileError } from '../interfaces/readfile.error.interface.js'

export const useCommandList = () => {
	const [data, setData] = useState<
		(CommandList & { error: ReadFileError }) | null
	>(null)
	const isLoading: boolean = data === null
	const isError: boolean = data !== null && data.error !== undefined

	useEffect(() => {
		fs.readFile('./.anyshell.yaml')
			.then((buffer) => YAML.parse(buffer.toString('utf8')))
			.then(setData)
	}, [])

	return {
		parsedYaml: data as CommandList,
		isLoading,
		isError,
		errorCode: isError && data ? data.error.code : undefined,
	}
}
