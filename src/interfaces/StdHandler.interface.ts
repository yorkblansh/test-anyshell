import { ChildProcess } from 'child_process'
import { ExecutorCallbackProps } from './ExecutorCallbackProps.interface.js'

export type StdHandler = (
	childProcess: ChildProcess,
	cb: (ecbProps: ExecutorCallbackProps) => void,
) => void
