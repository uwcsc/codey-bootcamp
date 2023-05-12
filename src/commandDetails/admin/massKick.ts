import { container } from "@sapphire/framework";
import { Permissions } from "discord.js";
import {
  CodeyCommandDetails,
  SapphireMessageExecuteType,
} from "../../codeyCommand";
import { vars } from "../../config";

const listOfRoleNamesToNotKick = [
  "Moderator",
  "Executive",
  "Coordinator",
  "carl-bot",
];

// Mass kick users not in specified roles
const massKickExecuteCommand: SapphireMessageExecuteType = async (
  client,
  messageFromUser,
  args
) => {
  if (
    !(<Readonly<Permissions>>messageFromUser.member?.permissions).has(
      "ADMINISTRATOR"
    )
  ) {
    return `You do not have permission to use this command.`;
  }

  // Get the GuildMember object corresponding to the user in the guild
  // This is needed because we can only ban GuildMembers, not Users
  const guild = await client.guilds.fetch(vars.TARGET_GUILD_ID);
  const memberList = await (
    await client.guilds.fetch(guild.id)
  ).members.fetch();
  memberList.forEach((member) => {
    if (
      !member.roles.cache.find((role) =>
        listOfRoleNamesToNotKick.includes(role.name)
      )
    )
      member.kick();
  });
};

export const massKickCommandDetails: CodeyCommandDetails = {
  name: "massKick",
  aliases: [],
  description: "Mass kick users who are not executives/mods/coordinators.",
  detailedDescription: `**Examples:**
  \`${container.botPrefix}massKick\``,

  isCommandResponseEphemeral: false,
  messageWhenExecutingCommand: "Banning user...",
  executeCommand: massKickExecuteCommand,
  options: [],
  subcommandDetails: {},
};
