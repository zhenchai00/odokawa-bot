require("dotenv").config();
const { cheer, calmPeople, waitingForGemini } = require("./replies");
const { math } = require("./math");
const { getYesNo } = require("./yesno");
const {
    runGeminiProText,
    splitResponse,
    runGeminiVision,
} = require("./gemini");
const path = require("path");
const fs = require("fs");
const https = require("https");

const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");
const bot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});
bot.login(process.env.TOKEN);
bot.on("ready", (b) => {
    console.log("Bot is ready!");
    console.log(`${b.user.username} is Online!`);
});

bot.on("messageCreate", async (msg) => {
    if (msg.author.bot) return;

    if (msg.mentions.has(bot.user.id)) {
        msg.reply(waitingForGemini());
        try {
            let prompt = msg.content.replace(/<@!?\d+/g, "").trim();
            let localPath = null;
            let mimeType = null;

            if (msg.attachments.size > 0) {
                let attachment = msg.attachments.first();
                let url = attachment.url;
                mimeType = attachment.contentType;
                let fileName = attachment.name;

                localPath = path.join(__dirname, "..", "images", fileName);
                let file = fs.createWriteStream(localPath);
                https.get(url, (response) => {
                    response.pipe(file);
                    file.on("finish", async () => {
                        file.close(async () => {
                            try {
                                const response = await runGeminiVision(
                                    prompt,
                                    localPath,
                                    mimeType
                                );

                                if (response.length > 2000) {
                                    let chunks = splitResponse(response);
                                    chunks.forEach((chunk) => {
                                        msg.reply(chunk);
                                    });
                                } else {
                                    msg.reply(response);
                                }
                            } catch (error) {
                                console.log(error);
                                msg.reply(
                                    "sorry, I have trouble processing the image"
                                );
                            }
                        });
                    });
                });
            } else {
                let response = await runGeminiProText(prompt);
                if (response.length > 2000) {
                    let chunks = splitResponse(response);
                    chunks.forEach((chunk) => {
                        msg.reply(chunk);
                    });
                } else {
                    msg.reply(response);
                }
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    let angrySentences = [
        "I CAN'T BELIEVE YOU DID THAT!",
        "STOP IGNORING ME!",
        "THIS IS UNACCEPTABLE!",
        "What the hell were you thinking?",
        "You're such a jerk!",
        "This is bullshit!",
        "This is unacceptable! Unacceptable!",
        "I'm so angry right now!",
        "I'm so mad I could scream!",
        "You never listen! Never!",
        "You're wrong.",
        "You're a liar!",
        "You're such a disappointment!",
        "Fix it now",
        "I'm done",
    ];
    if (
        msg.content.includes("fuck") ||
        msg.content.includes("angry") ||
        msg.content.includes("😡") ||
        msg.content.includes("😤") ||
        msg.content.includes("👿")
    ) {
        msg.reply(calmPeople());
    }
});

bot.on("interactionCreate", (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
        interaction.reply("Pong!");
    }

    if (interaction.commandName === "math") {
        let operation = interaction.options.get("operation").value;
        let num1 = interaction.options.get("num1").value;
        let num2 = interaction.options.get("num2").value;
        let result = math(operation, num1, num2);
        interaction.reply(`The result is ${result}`);
    }

    if (interaction.commandName === "yesno") {
        let user = interaction.user.globalName;
        let question = interaction.options.get("question").value;
        getYesNo()
            .then((data) => {
                const embed = new EmbedBuilder()
                    .setTitle(`${user} asked: ${question}`)
                    .setDescription(data.answer)
                    .setImage(data.image);
                interaction.reply({ embeds: [embed] });
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }
});
