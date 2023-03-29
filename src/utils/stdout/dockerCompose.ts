import { ChildProcess } from 'child_process'
import { ExecutorCallbackProps } from '../../interfaces/executor.callback.props.interface.js'
import { StdHandler } from '../../interfaces/StdHandler.interface.js'

interface ContainerBuildStepInfo {
	globalStep: string
	imageName: string
	currentImageSteps?: {
		currentStep: string
		totalSteps: string
	}
}

export const dockerComposeProcessHandler: StdHandler = (
	childProcess: ChildProcess,
	cb: (ecbProps: ExecutorCallbackProps) => void,
) => {
	const containersInfo = new Map<string, unknown>()

	console.log('docker_compose !!!')
	childProcess.on('close', (code, signal) => {
		console.log({ exitCode: code, isDone: code === 0 ? true : false })
		// cb({ dockerComposeExitCode: code })
	})
	childProcess.stdout?.on('data', (chunk) => {
		const stepList = containersBuildStepList(chunk)
		console.dir({ stepList }, { depth: null, colors: true })
		// if (stepList) stepList.map((step) => {})
	})
}

const containersBuildStepList = (data: string) => {
	// example of regexp below: [ `#12 [image-name 4/6]` ]
	const matchList = data.match(/#\d{1,} \[\S+ \d{1,}\/\d{1,}\]/gm)
	return matchList
		?.map((match) => match.replace(/\[/g, '').replace(/\]/g, ''))
		.map((match) => {
			const matchElements = match.split(' ')

			if (matchElements.length === 3) {
				return matchElements.map(
					(): ContainerBuildStepInfo => ({
						globalStep: matchElements[0],
						imageName: matchElements[1],
						currentImageSteps: matchElements[2]
							.trim()
							.split('/')
							.map((v, i, stepValues) => {
								if (stepValues.length === 2)
									return {
										currentStep: stepValues[0],
										totalSteps: stepValues[1],
									}
							})[0],
					}),
				)
			}
		})
		.flat()
		.filter((v) => v !== undefined)
}
