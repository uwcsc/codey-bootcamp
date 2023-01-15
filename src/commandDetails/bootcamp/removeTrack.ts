import { CategoryChannel, VoiceChannel } from "discord.js";
import {
  CodeyCommandDetails,
  CodeyCommandOptionType,
  SapphireMessageExecuteType,
  SapphireMessageResponse,
} from "../../codeyCommand";
import { toTitleCase } from "../../commands/bootcamp/utils";

const removeTrackExecuteCommand: SapphireMessageExecuteType = async (
  _client,
  messageFromUser,
  args
): Promise<SapphireMessageResponse> => {
  let category = args["category"] as string;

  category = toTitleCase(category);
  const guild = messageFromUser.guild!;
  const trackCategory = <CategoryChannel>(
    guild.channels.cache.find(
      (channel) => channel.name === category && channel.type === "GUILD_CATEGORY"
    )
  );
  const trackWait = <VoiceChannel>(
    guild.channels.cache.find(
      (channel) => channel.name === category && channel.type === "GUILD_VOICE"
    )
  );
  const waitingRooms = <CategoryChannel>(
    guild.channels.cache.find(
      (channel) =>
        channel.name.startsWith("Waiting Room") && channel.type === "GUILD_CATEGORY"
    )
  );

  if (!waitingRooms) {
    return "This server does not have a waiting room.";
  }

  if (trackCategory && trackWait) {
    Promise.all(
      trackCategory.children.map((trackRoom) => trackRoom.delete())
    ).then(() => {
      trackCategory.delete();
      trackWait.delete();
    });

    return `Deleted '${category}' track.`;
  } 
  else {
    return `There is no '${category}' track.`;
  }
};

export const removeTrackCommandDetails: CodeyCommandDetails = {
  name: "remove-track",
  aliases: ["delete-track"],
  description: "Remove a track category in the server.",
  detailedDescription: "",

  isCommandResponseEphemeral: false,
  executeCommand: removeTrackExecuteCommand,
  options: [
    {
      name: "category",
      description: "The track to remove.",
      type: CodeyCommandOptionType.STRING,
      required: true,
    },
  ],
  subcommandDetails: {},
};
