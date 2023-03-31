import { Command, Setup } from '../interfaces/YamlConfig.interface.js'
import { DockerComposeExecutorCallbackProps } from '../interfaces/ExecutorCallbackProps.interface.js'
import shelljs from 'shelljs'
import { dockerComposeHandler } from './StdHandlers/dockerComposeHandler.js'
import { StdHandler } from '../interfaces/StdHandler.interface.js'

export const commandExecutor = (
	{ shellCommand, setup }: Command,
	cb: (ecbProps: DockerComposeExecutorCallbackProps) => void,
) => {
	const childProcess = shelljs.exec(shellCommand, { async: true, silent: true })
	const handlersMap: { [everyName in Setup]: StdHandler } = {
		docker_compose: dockerComposeHandler,
		default: () => {},
	}

	if (setup) {
		handlersMap[setup](childProcess, cb)
	} else {
		handlersMap['default'](childProcess, cb)
	}
}
