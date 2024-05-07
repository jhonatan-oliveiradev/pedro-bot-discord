import {
	SlashCommandBuilder,
	ActionRowBuilder,
	StringSelectMenuBuilder
} from "discord.js";

const row = new ActionRowBuilder().addComponents(
	new StringSelectMenuBuilder()
		.setCustomId("select")
		.setPlaceholder("Nenhuma linguagem selecionada")
		.addOptions(
			{
				label: "javascript",
				description: "Veja a documentação de Javascript",
				value: "javascript"
			},
			{
				label: "python",
				description: "Veja a documentação de Python",
				value: "python"
			},
			{
				label: "C#",
				description: "Veja a documentação de C#",
				value: "csharp"
			},
			{
				label: "Node.js",
				description: "Veja a documentação de Node.js",
				value: "nodejs"
			},
			{
				label: "React",
				description: "Veja a documentação de React",
				value: "react"
			},
			{
				label: "Vue.js",
				description: "Veja a documentação de Vue.js",
				value: "vuejs"
			},
			{
				label: "Angular",
				description: "Veja a documentação de Angular",
				value: "angular"
			},
			{
				label: "HTML",
				description: "Veja a documentação de HTML",
				value: "html"
			},
			{
				label: "CSS",
				description: "Veja a documentação de CSS",
				value: "css"
			},
			{
				label: "Sass",
				description: "Veja a documentação de Sass",
				value: "sass"
			},
			{
				label: "Less",
				description: "Veja a documentação de Less",
				value: "less"
			},
			{
				label: "Stylus",
				description: "Veja a documentação de Stylus",
				value: "stylus"
			},
			{
				label: "Bootstrap",
				description: "Veja a documentação de Bootstrap",
				value: "bootstrap"
			},
			{
				label: "Tailwind CSS",
				description: "Veja a documentação de Tailwind CSS",
				value: "tailwindcss"
			},
			{
				label: "Materialize",
				description: "Veja a documentação de Materialize",
				value: "materialize"
			},
			{
				label: "Bulma",
				description: "Veja a documentação de Bulma",
				value: "bulma"
			},
			{
				label: "JQuery",
				description: "Veja a documentação de JQuery",
				value: "jquery"
			},
			{
				label: "React Native",
				description: "Veja a documentação de React Native",
				value: "reactnative"
			},
			{
				label: "Ionic",
				description: "Veja a documentação de Ionic",
				value: "ionic"
			},
			{
				label: "Flutter",
				description: "Veja a documentação de Flutter",
				value: "flutter"
			},
			{
				label: "Dart",
				description: "Veja a documentação de Dart",
				value: "dart"
			},
			{
				label: "discord.js",
				description: "Veja a documentação de Discord.js",
				value: "discordjs"
			}
		)
);

export const data = new SlashCommandBuilder()
	.setName("docs")
	.setDescription("Acesse a documentação da tecnologia que quiser!");

export const execute = async (interaction) => {
	console.log("Comando /docs invocado, enviando resposta...");
	try {
		await interaction.reply({
			content: "Selecione a linguagem que você deseja ver a documentação:",
			components: [row]
		});
		console.log("Resposta enviada com sucesso.");
	} catch (error) {
		console.error("Erro ao enviar a resposta:", error);
	}
};
