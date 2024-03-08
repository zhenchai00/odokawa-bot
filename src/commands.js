require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
const { required } = require('nodemon/lib/config');

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!'
    },
    {
        name: 'math',
        description: 'Math Operations',
        options: [
            {
                name: 'operation',
                description: 'type of math operation',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: '[+] add',
                        value: 'add'
                    },
                    {
                        name: '[-] subtract',
                        value: 'subtract'
                    },
                    {
                        name: '[*] multiply',
                        value: 'multiply'
                    },
                    {
                        name: '[/] divide',
                        value: 'divide'
                    }
                ]
            },
            {
                name: 'num1',
                description: 'First Number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'num2',
                description: 'Second Number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            }
        ]
    },
    {
        name: 'yesno',
        description: 'Ask a Yes or No Question',
        options: [
            {
                name: 'question',
                description: 'Your Question',
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]

    }
]

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

console.log("test");
(async () => {
    try {
        console.log('Registering Slash Commands...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.BOT_ID, process.env.SERVER_ID),
            { body: commands},
        );
        console.log('Successfully registered Slash Commands!');
    } catch (error) {
        console.error(`Error: ${error}`);
    }
})();