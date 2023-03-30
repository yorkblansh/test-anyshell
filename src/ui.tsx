#!/usr/bin/env node
import React, { useState } from 'react'
import chalk from 'chalk'
import SelectInput from 'ink-select-input'
import { Text, useFocus } from 'ink'
import shell from 'shelljs'
import _ from 'lodash'
import Spinner from 'ink-spinner'
import figures from 'figures'
import { useBeforeRender } from './hooks/useBeforeRender.js'
import { useYamlConfig } from './hooks/useYamlConfig.js'
import { commandExecutor } from './commandExecutor.js'

export const App = () => {
	useBeforeRender(() => {
		shell.exec('clear')
	}, [])

	// const { isFocused, focus } = useFocus()
	const [isSelectInputFocused, setSelectInputFocus] = useState(true)
	const [isDone, setIsDone] = useState(false)
	const [percent, setPercent] = useState(0)

	const { yamlConfig, isError, isLoading } = useYamlConfig()
	const commandNames = yamlConfig
		? Object.keys(yamlConfig.commandList)
		: undefined

	console.log({ isSelectInputFocused })

	return (
		<>
			<Text>
				{chalk.hex('#ff0055').italic.bgWhiteBright(' cliper ')} Приложение для
				запуска скриптов
			</Text>
			<Text> </Text>
			<Text>
				{chalk.bgBlue(' INFO ')} Стрелками update tst вверх и вниз выберите
				приложение для запуска
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
					// isFocused={false}
					onSelect={(item) =>
						commandExecutor(item.value!, (cbProps) => {
							setSelectInputFocus(false)
							if (cbProps.dockerComposeExitCode) {
								setIsDone(cbProps.dockerComposeExitCode === 0 ? true : false)
								setSelectInputFocus(true)
							}

							if (cbProps.dockerComposePercent)
								setPercent(cbProps.dockerComposePercent)
						})
					}
					items={commandNames?.map((commandName) => ({
						label: commandName,
						key: commandName,
						value: yamlConfig?.commandList[commandName],
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
							<Text color="#ff5eea">
								{' '}
								{label} {percent !== 0 ? percent : null}
							</Text>
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
			<SelectInput
				indicatorComponent={() => null}
				items={[{ label: '', value: '' }]}
				isFocused={false}
			/>
		</>
	)
}
