import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("playlist")
	.setDescription("Toca uma playlist de músicas para estudar!");

export const execute = async (interaction) => {
	await interaction.reply(
		"https://open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS?si=7dc650cab0a946f9"
	);
};
