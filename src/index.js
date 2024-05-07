import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { Client, Events, GatewayIntentBits, Collection } from "discord.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dotenv = () => {
	if (!process.env.TOKEN) {
		console.error("Token não encontrado.");
		process.exit(1);
	}
	if (!process.env.CLIENT_ID) {
		console.error("Client ID não encontrado.");
		process.exit(1);
	}
	if (!process.env.GUILD_ID) {
		console.error("Guild ID não encontrado.");
		process.exit(1);
	}

	return true;
};

const { TOKEN } = process.env;

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
	.readdirSync(commandsPath)
	.filter((file) => file.endsWith(".js"));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = await import(`file://${filePath}`);

	if ("data" in command && "execute" in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.error(
			`Esse comando em ${filePath} está com "data" ou "execute" ausente.`
		);
	}
}

client.once(Events.ClientReady, (c) => {
	console.log(`Pronto! Login realizado como ${c.user.tag}`);
});

client.login(TOKEN);

client.on(Events.InteractionCreate, async (interaction) => {
	if (interaction.isStringSelectMenu()) {
		const selected = interaction.values[0];
		const responses = {
			javascript:
				"Documentação Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript",
			python: "Documentação Python: https://docs.python.org/3/",
			csharp:
				"Documentação C#: https://docs.microsoft.com/en-us/dotnet/csharp/",
			nodejs: "Documentação Node.js: https://nodejs.org/en/docs/",
			react:
				"Documentação React: https://reactjs.org/docs/getting-started.html",
			vuejs: "Documentação Vue.js: https://vuejs.org/v2/guide/",
			angular: "Documentação Angular: https://angular.io/docs",
			html: "Documentação HTML: https://developer.mozilla.org/en-US/docs/Web/HTML",
			css: "Documentação CSS: https://www.w3schools.com/css/",
			sass: "Documentação Sass: https://sass-lang.com/documentation",
			less: "Documentação Less: http://lesscss.org/",
			stylus: "Documentação Stylus: https://stylus-lang.com/docs/",
			bootstrap:
				"Documentação Bootstrap: https://getbootstrap.com/docs/5.0/getting-started/introduction/",
			tailwindcss: "Documentação Tailwind CSS: https://tailwindcss.com/docs",
			materialize: "Documentação Materialize: https://materializecss.com/",
			bulma: "Documentação Bulma: https://bulma.io/documentation/",
			jquery: "Documentação JQuery: https://api.jquery.com/",
			reactnative:
				"Documentação React Native: https://reactnative.dev/docs/getting-started",
			ionic: "Documentação Ionic: https://ionicframework.com/docs/",
			flutter: "Documentação Flutter: https://flutter.dev/docs",
			dart: "Documentação Dart: https://dart.dev/guides",
			discordjs:
				"Documentação discord.js: https://discord.js.org/#/docs/main/stable/general/welcome"
		};

		const message = responses[selected] || "Documento não encontrado.";
		await interaction.reply(message);
	}

	if (interaction.isChatInputCommand()) {
		const command = client.commands.get(interaction.commandName);

		if (!command) {
			return await interaction.reply({
				content: "Comando não encontrado.",
				ephemeral: true
			});
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({
				content: "Houve um erro ao executar esse comando.",
				ephemeral: true
			});
		}
	}
});
