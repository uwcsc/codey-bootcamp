import { container } from "@sapphire/framework";
import { Message } from "discord.js";
import {
  CodeyCommandDetails,
  CodeyCommandOptionType,
  SapphireMessageExecuteType,
  SapphireMessageResponse,
} from "../../codeyCommand";

import { BootcampSettings } from "../../components/bootcamp";

/*
  Arguments:
  - addTime: the time to extend the duration of the call by.
*/
const setFeedbackExecuteCommand: SapphireMessageExecuteType = async (
  _client,
  messageFromUser,
  args
): Promise<SapphireMessageResponse> => {
  const { feedback } = args;

  BootcampSettings.set("feedback_dm", feedback);
  
  const messageString = ```
    Feedback successfully set! The feedback direct message for mentees will now look like this:

    ${feedback}
  ```
  return messageString;
};

export const setFeedbackCommandDetails: CodeyCommandDetails = {
  name: "set-feedback",
  aliases: [],
  description: "Sets the feedback message for mentees. Use [user] as a placeholder for the mentee's username.",
  detailedDescription: "",

  isCommandResponseEphemeral: false,
  executeCommand: setFeedbackExecuteCommand,
  options: [
    {
      name: "feedback",
      description: "The new feedback dm message.",
      required: true,
      type: CodeyCommandOptionType.STRING,
    }
  ],
  subcommandDetails: {},
};
