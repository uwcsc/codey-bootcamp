import { CategoryChannel, Permissions, User } from "discord.js";
import {
  CodeyCommandDetails,
  CodeyCommandOptionType,
  SapphireMessageExecuteType,
  SapphireMessageResponse,
} from "../../codeyCommand";
import { toTitleCase } from "../../utils/bootcamp";

const newTrackExecuteCommand: SapphireMessageExecuteType = async (
  _client,
  messageFromUser,
  args
): Promise<SapphireMessageResponse> => {
  if (
    !(<Readonly<Permissions>>messageFromUser.member?.permissions).has(
      "ADMINISTRATOR"
    )
  ) {
    return `You do not have permission to use this command.`;
  }

  let { category } = args;

  category = toTitleCase(<string>category);
  const guild = messageFromUser.guild!;

  const waitingRooms = <CategoryChannel>(
    guild.channels.cache.find(
      (channel) =>
        channel.name.startsWith("Waiting Room") &&
        channel.type === "GUILD_CATEGORY"
    )
  );

  if (!waitingRooms) {
    guild.channels.create("Waiting Room", {
      type: "GUILD_CATEGORY",
    });
    return "This server does not have a waiting room.";
  }

  const trackCategory = <CategoryChannel>(
    guild.channels.cache.find(
      (channel) =>
        channel.name === category && channel.type === "GUILD_CATEGORY"
    )
  );

  if (trackCategory) {
    return "This channel category already exists.";
  } else {
    guild.channels
      .create(category, {
        type: "GUILD_VOICE",
        parent: waitingRooms,
      })
      .catch(console.error);

    guild.channels
      .create(category, {
        type: "GUILD_CATEGORY",
      })
      .then((newCategory) => {
        guild.channels
          .create(
            (<string>category)?.replace(/ +/g, "-").toLocaleLowerCase() +
              "-queue",
            {
              parent: newCategory,
              permissionOverwrites: [
                {
                  id: guild.roles.everyone,
                  deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
              ],
            }
          )
          .catch(console.error);
      })
      .catch(console.error);

    return `New category created: ${category}!`;
  }
};

export const newTrackCommandDetails: CodeyCommandDetails = {
  name: "new-track",
  aliases: ["add-track"],
  description: "Add a new track.",
  detailedDescription: "",

  isCommandResponseEphemeral: false,
  executeCommand: newTrackExecuteCommand,
  options: [
    {
      name: "category",
      description: "The new category for the track to be added.",
      type: CodeyCommandOptionType.STRING,
      required: true,
    },
  ],
  subcommandDetails: {},
};
