#!/usr/bin/env node
import React, { useState } from 'react'
import chalk from 'chalk'
import SelectInput from 'ink-select-input'
import { Text } from 'ink'
import shell from 'shelljs'
import _ from 'lodash'
import Spinner from 'ink-spinner'
import figures from 'figures'
import { useBeforeRender } from './hooks/useBeforeRender.js'
import { useCommandList } from './hooks/useCommands.js'
import { Command } from './interfaces/commandList.interface.js'
import { ChildProcess } from 'child_process'
import { ExecutorCallbackProps } from './interfaces/executor.callback.props.interface.js'

const commandExecutor = (
	{ shellCommand, setup }: Command,
	cb: (ecbProps: ExecutorCallbackProps) => void,
) => {
	const shellProcess = shell.exec(shellCommand, { async: true, silent: true })

	if (setup) {
		if (setup === 'docker_compose') {
			console.log('docker_compose !!!')
			shellProcess.on('close', (code, signal) => {
				// console.log({ hereisthecode: code })
				cb({ dockerComposeExitCode: code })
			})
			shellProcess.stdout?.on('data', (chunk) => {
				cb({ stdoChunk: chunk })
			})
		}
	}
}

export const App = () => {
	useBeforeRender(() => {
		shell.exec('clear')
	}, [])

	const [isDone, setIsDone] = useState(false)
	const [chunk, setCunk] = useState<any>({})

	const { parsedYaml, isError, isLoading } = useCommandList()

	return (
		<>
			<Text>
				{chalk.hex('#ff0055').italic.bgWhiteBright(' cliper ')} Приложение для
				запуска скриптов
			</Text>
			<Text> </Text>
			<Text>
				{chalk.bgBlue(' INFO ')} Стрелками вверх и вниз выберите приложение для
				запуска
			</Text>
			{isLoading ? (
				<Text>
					Чтение конфига:{' '}
					{chalk.hex('#ff0055').italic.bgWhiteBright(' .anyshell.yaml ')}
				</Text>
			) : isError ? (
				<Text>
					Не найден конфиг-файл:{' '}
					{chalk.hex('#ff0055').italic.bgWhiteBright(' .anyshell.yaml ')}
				</Text>
			) : (
				<SelectInput
					onSelect={(item) =>
						commandExecutor(item.value, (cbProps) => {
							if (cbProps.dockerComposeExitCode)
								setIsDone(cbProps.dockerComposeExitCode === 0 ? true : false)
							if (cbProps.stdoChunk) console.log(cbProps.stdoChunk)
						})
					}
					items={Object.keys(parsedYaml.commandList).map((commandName) => ({
						label: commandName,
						key: commandName,
						value: parsedYaml.commandList[commandName],
					}))}
					indicatorComponent={({ isSelected }) =>
						isSelected ? (
							<Text color="#ffff86">
								{isDone ? 'done' : null} {figures.pointer}
							</Text>
						) : null
					}
					itemComponent={({ isSelected, label }) =>
						isSelected ? (
							<Text color="#ff5eea"> {label}</Text>
						) : (
							<Text color="#aaeef3">
								{' ' + ' '}
								{label}
							</Text>
						)
					}
					initialIndex={2}
				/>
			)}
		</>
	)
}
