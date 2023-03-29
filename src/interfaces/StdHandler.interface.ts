import { ChildProcess } from 'child_process'
import { ExecutorCallbackProps } from './executor.callback.props.interface.js'

export type StdHandler = (
	childProcess: ChildProcess,
	cb: (ecbProps: ExecutorCallbackProps) => void,
) => void
