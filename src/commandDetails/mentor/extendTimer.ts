import { container } from "@sapphire/framework";
import { Message } from "discord.js";
import {
  CodeyCommandDetails,
  CodeyCommandOptionType,
  SapphireMessageExecuteType,
  SapphireMessageResponse,
} from "../../codeyCommand";

const timeLowerBoundMinutes = 1;
const timeUpperBoundMinutes = 30;

/*
  Arguments:
  - addTime: the time to extend the duration of the call by.
*/
const extendTimerExecuteCommand: SapphireMessageExecuteType = async (
  _client,
  messageFromUser,
  args
): Promise<SapphireMessageResponse> => {
  const addTime = <number>args["time"] || 7;

  if (
    addTime &&
    timeLowerBoundMinutes <= addTime &&
    addTime <= timeUpperBoundMinutes
  ) {
    const chatChannel = messageFromUser.channel;

    const fetched = await chatChannel?.messages
      .fetch({ limit: 100 })
      .catch(console.log);

    let timer: Message<boolean> | undefined = undefined;

    if (fetched) {
      timer = fetched.find((msg: Message) =>
        msg.content.endsWith(" remaining.")
      );
      const extendsUsed = fetched.filter((msg: Message) =>
        msg.content.endsWith("Time added!")
      );

      if (
        !extendsUsed.every(
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          (mesg) => !mesg.mentions.users.get(messageFromUser.member?.user.id!)
        )
      ) {
        return "You already extended the time.";
      }
    }
    if (timer) {
      let minLeft = 1;
      const newTimer = timer.content.replace(
        /(\d+)+/g,
        (_match, num: string): string => {
          minLeft = parseInt(num) + addTime;
          return minLeft.toString();
        }
      );
      timer.edit(newTimer);
      return `${addTime} minutes added to your call!`;
    } else {
      return "You must use this command in the text channel corresponding to your 1 on 1 call.";
    }
  } else {
    return `Please set a time between ${timeLowerBoundMinutes} and ${timeUpperBoundMinutes} seconds.`;
  }
};

export const extendTimerCommandDetails: CodeyCommandDetails = {
  name: "extend",
  aliases: ["add-time"],
  description: "Adds time to the length of the 1 on 1 critique call.",
  detailedDescription: `**Examples:**
  \`${container.botPrefix}extend\``,

  isCommandResponseEphemeral: false,
  executeCommand: extendTimerExecuteCommand,
  options: [
    {
      name: "time",
      description:
        "The amount of minutes to extend the time by. Default is 7 minutes.",
      required: true,
      type: CodeyCommandOptionType.INTEGER,
    },
  ],
  subcommandDetails: {},
};
