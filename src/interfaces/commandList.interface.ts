type Setup = 'docker_compose'

export interface Command {
	shellCommand: string
	silent?: boolean
	async?: boolean
	setup?: Setup
}

export interface CommandList {
	commandList: { [commandName: string]: Command }
}
