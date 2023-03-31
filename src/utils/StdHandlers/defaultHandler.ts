import { StdHandler } from '../../interfaces/StdHandler.interface.js'

export const defaultHandler: StdHandler = (childProcess, cb) => {
	childProcess.on('close', (code, signal) => {
		if (code !== null) cb({ dockerComposeExitCode: code })
	})
}
