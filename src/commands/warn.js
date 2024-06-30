// eslint-disable-next-line no-unused-vars
import { SlashCommandBuilder, CommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { v4 as uuidv4 } from "uuid";
import { Infraction } from "../structures/schemas.js";
import { error, warning, success, infraction_dm, infraction_log } from "../structures/embeds.js";
import { settings } from "../config.js";

const name = "warn";
const data = new SlashCommandBuilder()
  .setName(name)
  .setDescription("Warns a user")
  .addUserOption((option) => option.setName("target").setDescription("The user you want to warn").setRequired(true))
  .addStringOption((option) =>
    option.setName("warning").setDescription("The warning you are giving to the user").setRequired(true).setMaxLength(settings.maxReasonLength)
  );

/**
 * @param {CommandInteraction} interaction
 */
async function execute(interaction) {
  await interaction.deferReply();

  // Permission check
  const role = interaction.guild.roles.cache.get(settings.roles.permissions.warn);
  if (interaction.member.roles.highest.position < role.position) {
    return interaction.editReply({ embeds: [error(`Only members with the <@&${role.id}> role or higher can use that!`)] });
  }

  const warningUser = interaction.options.getUser("target");
  const warningReason = interaction.options.getString("warning");

  // Step 1: executing warn
  interaction.editReply({ embeds: [success(`<@${warningUser.id}> has been warned: *${warningReason}*`)] });

  const infractionData = {
    type: "warning",
    targetUser_id: warningUser.id,
    moderatorUser_id: interaction.user.id,
    reason: warningReason,
    date: Math.floor(Date.now() / 1000),
    id: uuidv4(),
  };
  await new Infraction(infractionData).save();

  // Step 2: logging warn
  const logChannel = interaction.guild.channels.cache.get(settings.channels.logging.warn);
  logChannel.send({ embeds: [infraction_log(infractionData)] });

  // Step 3: sending warned user a DM
  const appealButton = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel("Appeal").setURL(settings.appealServerInvite).setStyle(ButtonStyle.Link));
  try {
    await warningUser.send({
      content: "You have received a warning",
      embeds: [infraction_dm(infractionData)],
      components: [appealButton],
    });
  } catch (err) {
    interaction.followUp({ embeds: [warning("Unable to DM user, they have still received their warning")], ephemeral: true });
  }
}

export { name, data, execute };
