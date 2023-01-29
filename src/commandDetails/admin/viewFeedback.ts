import { User } from "discord.js";
import {
  CodeyCommandDetails,
  CodeyCommandOptionType,
  SapphireMessageExecuteType,
  SapphireMessageResponse,
} from "../../codeyCommand";

import { makeFeedbackMessage } from "../../components/bootcamp";
import { sendMessage } from "../../utils/dm";

const viewFeedbackExecuteCommand: SapphireMessageExecuteType = async (
  _client,
  messageFromUser,
  _args
): Promise<SapphireMessageResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const user = <User>messageFromUser.member?.user!;
  const message = makeFeedbackMessage(user);
  await sendMessage(user, message);

  return "DMed you with the mentee feedback message!";
};

export const viewFeedbackCommandDetails: CodeyCommandDetails = {
  name: "view-feedback",
  aliases: [],
  description: "View the feedback DM sent to mentees",
  detailedDescription: "",

  isCommandResponseEphemeral: false,
  executeCommand: viewFeedbackExecuteCommand,
  options: [],
  subcommandDetails: {},
};
