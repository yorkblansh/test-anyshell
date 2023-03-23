#!/usr/bin/env node
import React, { useEffect, useLayoutEffect, useState } from 'react'
import chalk from 'chalk'
import SelectInput from 'ink-select-input'
import { Text } from 'ink'
import shell from 'shelljs'
import * as A from 'fp-ts/lib/Array.js'
import _ from 'lodash'
import Spinner from 'ink-spinner'
import figures from 'figures'
import { pipe } from 'fp-ts/lib/function.js'
import { useBeforeRender } from './hooks/useBeforeRender.js'
import { getCommands } from './getCommands.js'

export const App = async () => {
	useBeforeRender(() => {
		shell.exec('clear')
	}, [])
	// console.log({
	await getCommands()
	// })

	const [gitInfo, setGitInfo] = useState('')

	const commands = {
		// testShell: () => {
		// 	const code = shell.exec(
		// 		'docker compose -f ./forms/docker/configs/docker-compose.yaml -f ./forms/docker/configs/mount-app.yaml --env-file ./forms/configs/.env.dev up --build -d',
		// 		{
		// 			silent: true,
		// 			async: true,
		// 		},
		// 	)
		// 	code.on('message', (m, sh) => {
		// 		console.log({ m, sh })
		// 	})
		// 	code.on('exit', (code, s) => {
		// 		console.log(code)
		// 	})

		// 	// code.stdout?.pipe(() => {}, { end: true })
		// 	// code.stdout?.addListener('readable',(c:any)=>{
		// 	// console.log({rdble_chunk:c})

		// 	// })

		// 	code.stdout?.addListener('data', (chunk) => {
		// 		console.log({ chunk, pid: code.pid })
		// 	})

		// 	// setGitInfo(code.toString())
		// },
		testShell1: () => {
			const code = shell.exec('git show', { silent: true })
			setGitInfo(code.toString())
		},
		testShell2: () => {
			const code = shell.exec('git show', { silent: true })
			setGitInfo(code.toString())
		},
		testShell3: () => {
			const code = shell.exec('git show', { silent: true })
			setGitInfo(code.toString())
		},
	}

	const items = pipe(
		Object.keys(commands) as (keyof typeof commands)[],
		A.map((commandName) => ({ label: commandName, value: commandName })),
	)

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
			<SelectInput
				onSelect={(item) => commands[item.value]()}
				items={items}
				indicatorComponent={({ isSelected }) =>
					isSelected ? <Text color="#ffff86">{figures.pointer}</Text> : null
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

			<Text color="red" backgroundColor="whiteBright">
				{gitInfo === '' ? 'пока что тут пусто, но должна быть инфа' : gitInfo}
			</Text>
		</>
	)
}
