#!/usr/bin/env node
import React, { useState } from 'react'
import chalk from 'chalk'
import SelectInput from 'ink-select-input'
import { Text, useFocus, useInput } from 'ink'
import shell from 'shelljs'
import _ from 'lodash'
import Spinner from 'ink-spinner'
import figures from 'figures'
import { useBeforeRender } from './hooks/useBeforeRender.js'
import { useYamlConfig } from './hooks/useYamlConfig.js'
import { commandExecutor } from './utils/commandExecutor.js'

export const App = () => {
	useBeforeRender(() => {
		shell.exec('clear')
	}, [])

	const [isDone, setIsDone] = useState(false)
	const [percent, setPercent] = useState(0)

	const { yamlConfig, isError, isLoading } = useYamlConfig()
	const commandNames = yamlConfig
		? Object.keys(yamlConfig.commandList)
		: undefined

	const [isSelectInputFocused, setSelectInputFocus] = useState(true)

	useInput((input, key) => {
		if (isSelectInputFocused) {
			if (key.downArrow || key.upArrow) {
				setPercent(0)
			}
		}
	})

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
					isFocused={isSelectInputFocused ? true : false}
					onSelect={(item) => {
						setSelectInputFocus(false)
						commandExecutor(item.value!, (cbProps) => {
							cbProps.dockerComposeExitCode === 0
								? setSelectInputFocus(true)
								: setSelectInputFocus(false)

							if (cbProps.dockerComposeExitCode) {
								setIsDone(cbProps.dockerComposeExitCode === 0 ? true : false)
								console.log('HERE MUST BE INPUT FoCUS TRUEEE!!!!')
								setSelectInputFocus(true)
							}

							if (cbProps.dockerComposePercent)
								setPercent(cbProps.dockerComposePercent)
						})
					}}
					items={commandNames?.map((commandName) => ({
						label: commandName,
						key: commandName,
						value: yamlConfig?.commandList[commandName],
					}))}
					indicatorComponent={({ isSelected }) =>
						isSelected ? (
							<Text color="#ffff86">
								{percent === 100 ? 'done' : null} {figures.pointer}
							</Text>
						) : null
					}
					itemComponent={({ isSelected, label }) =>
						isSelected ? (
							<Text color="#ff5eea">
								{' '}
								{label} {percent === 100 || percent === 0 ? null : percent}
								{/* {percent !== 0 ? percent : percent === 100 ? null : percent} */}
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
				isFocused={isSelectInputFocused ? false : true}
			/>
		</>
	)
}
