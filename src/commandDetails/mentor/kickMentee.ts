import { GuildMember, TextChannel, VoiceChannel } from "discord.js";
import {
  CodeyCommandDetails,
  SapphireMessageExecuteType,
  SapphireMessageResponse,
} from "../../codeyCommand";

const kickMenteeExecuteCommand: SapphireMessageExecuteType = async (
  _client,
  messageFromUser,
  _args
): Promise<SapphireMessageResponse> => {
  const mentor = <GuildMember>messageFromUser.member!;
  const callChannel = mentor?.voice?.channel;
  const guild = messageFromUser.guild!;
  const track = callChannel?.parent?.name;

  const queueVoice = <VoiceChannel>(
    guild.channels.cache.find(
      (channel) => channel.name === track && channel.type === "GUILD_VOICE"
    )
  );
  const queueChannel = <TextChannel>(
    callChannel?.parent?.children.find(
      (channel: { name: string; }) =>
        channel.name ===
        track?.replace(/ +/g, "-").toLocaleLowerCase() + "-queue"
    )
  );
  const callMembers = callChannel?.members;

  if (queueVoice && queueChannel && callMembers) {
    if (callMembers?.size < 2) {
      return "You are already alone in this call.";
    }
    callMembers
      ?.filter((member: { id: any; }) => member.id != mentor?.id)
      .forEach((member: { voice: { setChannel: (arg0: null) => void; }; }) => {
        member.voice.setChannel(null);
      });
    return "Your call is now cleared.";
  }
  return "You must be in a Mentor/Mentee call room.";
};

export const kickMenteeCommandDetails: CodeyCommandDetails = {
  name: "kick",
  aliases: ["remove", "boot"],
  description: "Kick mentees out of your 1 on 1 call.",
  detailedDescription: "",

  isCommandResponseEphemeral: false,
  executeCommand: kickMenteeExecuteCommand,
  options: [],
  subcommandDetails: {},
};
