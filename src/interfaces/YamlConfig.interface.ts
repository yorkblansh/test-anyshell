type Setup = 'docker_compose'

export interface Command {
	shellCommand: string
	silent?: boolean
	async?: boolean
	setup?: Setup
}

export interface YamlConfig {
	commandList: { [commandName: string]: Command }
}
