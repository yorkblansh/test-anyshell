#!/usr/bin/env node
import React, { useState } from 'react';
import chalk from 'chalk';
import SelectInput from 'ink-select-input';
import { Text } from 'ink';
import shell from 'shelljs';
import * as A from 'fp-ts/lib/Array.js';
import figures from 'figures';
import { pipe } from 'fp-ts/lib/function.js';
import { useBeforeRender } from './hooks/useBeforeRender.js';
export const App = () => {
    useBeforeRender(() => {
        shell.exec('clear');
    }, []);
    const [gitInfo, setGitInfo] = useState('');
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
            const code = shell.exec('git show', { silent: true });
            setGitInfo(code.toString());
        },
        testShell2: () => {
            const code = shell.exec('git show', { silent: true });
            setGitInfo(code.toString());
        },
        testShell3: () => {
            const code = shell.exec('git show', { silent: true });
            setGitInfo(code.toString());
        },
    };
    const items = pipe(Object.keys(commands), A.map((commandName) => ({ label: commandName, value: commandName })));
    return (React.createElement(React.Fragment, null,
        React.createElement(Text, null,
            chalk.hex('#ff0055').italic.bgWhiteBright(' cliper '),
            " \u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u0441\u043A\u0440\u0438\u043F\u0442\u043E\u0432"),
        React.createElement(Text, null, " "),
        React.createElement(Text, null,
            chalk.bgBlue(' INFO '),
            " \u0421\u0442\u0440\u0435\u043B\u043A\u0430\u043C\u0438 \u0432\u0432\u0435\u0440\u0445 \u0438 \u0432\u043D\u0438\u0437 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0437\u0430\u043F\u0443\u0441\u043A\u0430"),
        React.createElement(SelectInput, { onSelect: (item) => commands[item.value](), items: items, indicatorComponent: ({ isSelected }) => isSelected ? React.createElement(Text, { color: "#ffff86" }, figures.pointer) : null, itemComponent: ({ isSelected, label }) => isSelected ? (React.createElement(Text, { color: "#ff5eea" },
                " ",
                label)) : (React.createElement(Text, { color: "#aaeef3" },
                ' ' + ' ',
                label)), initialIndex: 2 }),
        React.createElement(Text, { color: "red", backgroundColor: "whiteBright" }, gitInfo === '' ? 'пока что тут пусто, но должна быть инфа' : gitInfo)));
};
