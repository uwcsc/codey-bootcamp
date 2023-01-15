import { Command } from "@sapphire/framework";
import { CodeyCommand } from "../../codeyCommand";
import { setFeedbackCommandDetails } from "../../commandDetails/bootcamp/setFeedbackMessage";

export class SetFeedbackMessageCommand extends CodeyCommand {
  details = setFeedbackCommandDetails;

  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      aliases: setFeedbackCommandDetails.aliases,
      description: setFeedbackCommandDetails.description,
      detailedDescription: setFeedbackCommandDetails.detailedDescription,
    });
  }
}
