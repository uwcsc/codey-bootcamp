import { GuildMember, TextChannel, VoiceChannel } from "discord.js";
import {
  CodeyCommandDetails,
  SapphireMessageExecuteType,
  SapphireMessageResponse,
} from "../../codeyCommand";
import { BootcampSettings } from "../../components/bootcamp";

const nextMenteeExecuteCommand: SapphireMessageExecuteType = async (
  _client,
  messageFromUser,
  _args
): Promise<SapphireMessageResponse> => {
  const mentor = (<GuildMember>messageFromUser.member)?.voice;
  const callChannel = mentor?.channel;
  const guild = messageFromUser.guild!;
  const track = callChannel?.parent?.name;

  let front;

  const queueVoice = <VoiceChannel>(
    guild.channels.cache.find(
      (channel) => channel.name === track && channel.type === "GUILD_VOICE"
    )
  );
  const queueChannel = <TextChannel>(
    callChannel?.parent?.children.find(
      (channel) =>
        channel.name ===
        track?.replace(/ +/g, "-").toLocaleLowerCase() + "-queue"
    )
  );
  const queueMembers = queueVoice?.members;

  if (queueVoice && queueChannel) {
    if (callChannel?.full) {
      return "You should only have one Mentee at a time.";
    }
    if (queueMembers.size < 1) {
      return "There are no Mentees waiting for this track.";
    }

    const queueMessages = await queueChannel.messages.fetch({
      limit: queueVoice.members.size * 2 + 5,
    });
    const sortedQueueMessages = queueMessages.sorted(
      (mesgA, mesgB) => mesgA.createdTimestamp - mesgB.createdTimestamp
    );

    for (const [_str, message] of sortedQueueMessages) {
      front = queueMembers.get(message.content);
      if (front) {
        const mentorCall = <VoiceChannel>mentor?.channel;
        front.voice.setChannel(mentorCall);

        messageFromUser.channel?.send(
          "Please welcome " + front.displayName + "!"
        );

        const chatChannel = <TextChannel>(
          mentorCall?.parent?.children.find(
            (channel) =>
              channel.name ===
              mentorCall?.name.replace(/ +/g, "-").toLocaleLowerCase() + "-vc"
          )
        );

        const critiqueTime =
          (await BootcampSettings?.get("critique_time")) || 30;
        chatChannel.send(
          "You have **" + critiqueTime + "** minutes remaining."
        );
        break;
      }
    }
    const critiqueTime = (await BootcampSettings?.get("critique_time")) || 30;
    return;
    "Your **" + critiqueTime + "** minute call has started!";
  } else {
    return "You must be in a Mentor/Mentee call room.";
  }
};

export const nextMenteeCommandDetails: CodeyCommandDetails = {
  name: "next",
  aliases: ["mentee"],
  description: "Moves the next mentee in line to your call.",
  detailedDescription: "",

  isCommandResponseEphemeral: false,
  executeCommand: nextMenteeExecuteCommand,
  options: [],
  subcommandDetails: {},
};
