import { GuildMember, Permissions, TextChannel, VoiceChannel } from "discord.js";
import {
  CodeyCommandDetails,
  SapphireMessageExecuteType,
  SapphireMessageResponse,
} from "../../codeyCommand";
import { BootcampSettings } from "../../components/bootcamp";

const toggleWatchExecuteCommand: SapphireMessageExecuteType = async (
  _client,
  messageFromUser,
  _args
): Promise<SapphireMessageResponse> => {
  if (
    !(<Readonly<Permissions>>messageFromUser.member?.permissions).has(
      "ADMINISTRATOR"
    )
  ) {
    return `You do not have permission to use this command.`;
  }
  
  const updateWaiting = await BootcampSettings.get("update_waiting_times");
    if (updateWaiting) {
      BootcampSettings.set("update_waiting_times", !updateWaiting);
      return "The waiting room info will **stop** updating!";
    } else {
      BootcampSettings.set("update_waiting_times", true);
      return "The waiting room info will **start** updating!";
    }
};

export const toggleWatchCommandDetails: CodeyCommandDetails = {
  name: "toggle-watch",
  aliases: ["display-line"],
  description: "Toggles the bot to update the waiting room info.",
  detailedDescription: "",

  isCommandResponseEphemeral: false,
  executeCommand: toggleWatchExecuteCommand,
  options: [],
  subcommandDetails: {},
};
