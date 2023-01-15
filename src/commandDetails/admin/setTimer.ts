import { CategoryChannel, GuildMember, Permissions, VoiceChannel } from "discord.js";
import {
  CodeyCommandDetails,
  CodeyCommandOptionType,
  SapphireMessageExecuteType,
  SapphireMessageResponse,
} from "../../codeyCommand";
import { lowestInt } from "../../commands/bootcamp/utils";
import { BootcampSettings } from "../../components/bootcamp";

const setTimerExecuteCommand: SapphireMessageExecuteType = async (
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

  const newTime = args["time"] as number;
  if (newTime && 5 <= newTime && newTime <= 100) {
    BootcampSettings.set("critique_time", newTime);
    return "All calls are now set to **" + newTime + "** minutes.";
  } else {
    return "Please set a time between 5 and 100 minutes.";
  }
};

export const setTimerCommandDetails: CodeyCommandDetails = {
  name: "set-timer",
  aliases: ["new-timer"],
  description: "Set the length of the 1 on 1 calls.",
  detailedDescription: "",

  isCommandResponseEphemeral: false,
  executeCommand: setTimerExecuteCommand,
  options: [
    {
      name: "time",
      description: "The length of the 1 on 1 calls, in minutes.",
      type: CodeyCommandOptionType.INTEGER,
      required: true,
    },
  ],
  subcommandDetails: {},
};
