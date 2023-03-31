import { ChildProcess } from 'child_process'
import { DockerComposeExecutorCallbackProps } from './ExecutorCallbackProps.interface.js'

export type StdHandler<T> = (
	childProcess: ChildProcess,
	cb: (executorCallbackProps: T) => void,
) => void
