import {
  CategoryChannel,
  GuildMember,
  Permissions,
  VoiceChannel,
} from "discord.js";
import {
  CodeyCommandDetails,
  CodeyCommandOptionType,
  SapphireMessageExecuteType,
  SapphireMessageResponse,
} from "../../codeyCommand";
import { lowestInt } from "../../utils/bootcamp";
import { BootcampSettings } from "../../components/bootcamp";

const selectTrackExecuteCommand: SapphireMessageExecuteType = async (
  _client,
  messageFromUser,
  args
): Promise<SapphireMessageResponse> => {
  let category = args["category"] as string;
  const mentor = (<GuildMember>messageFromUser.member)?.voice;

  if (!mentor?.channel) {
    return "Join a voice call to choose a track";
  }

  const guild = messageFromUser.guild!;
  const mentorRole = await BootcampSettings.get("mentor_role");
  const trackCategory = <CategoryChannel>(
    guild.channels.cache.find(
      (channel) =>
        channel.name ===
        category?.replace(/ +/g, "-").toLocaleLowerCase() + "-queue"
    )?.parent
  );
  const callChannels = trackCategory?.children
    ?.filter((channel) => channel.type === "GUILD_VOICE")
    .map((channel) => <VoiceChannel>channel);
  if (trackCategory) {
    const foundCall = callChannels.find(
      (channel) =>
        channel.members.filter((member) =>
          member.roles.cache.map((role) => role.id).includes(mentorRole)
        ).size === 0
    );
    if (foundCall) {
      mentor?.setChannel(foundCall);
    } else {
      const callNum = lowestInt(
        callChannels.map((c) => Number(c.name.split(" ")[1]))
      );

      const mentorMember = <GuildMember>mentor.member;
      guild.channels
        .create("Call " + callNum, {
          type: "GUILD_VOICE",
          userLimit: 2,
          position: callNum * 2 + 10,
          parent: trackCategory,
        })
        .then((newCall) => {
          mentor?.setChannel(newCall);
          guild.channels
            .create("call-" + callNum + "-vc", {
              parent: trackCategory,
              position: callNum * 2 + 10,
              permissionOverwrites: [
                {
                  id: guild.roles.everyone,
                  deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                  id: mentorMember,
                  allow: [Permissions.FLAGS.VIEW_CHANNEL],
                },
              ],
            })
            .catch(console.error);
        })
        .catch(console.error);
    }

    return "You joined the " + category + " track.";
  } else {
    return "That category does not exist. Check the waiting rooms for the current categories.";
  }
};

export const selectTrackCommandDetails: CodeyCommandDetails = {
  name: "select",
  aliases: ["track"],
  description: "Create a new 1 on 1 call with a category.",
  detailedDescription: "",

  isCommandResponseEphemeral: false,
  executeCommand: selectTrackExecuteCommand,
  options: [
    {
      name: "category",
      description: "The category to create the call with.",
      type: CodeyCommandOptionType.STRING,
      required: true,
    },
  ],
  subcommandDetails: {},
};
