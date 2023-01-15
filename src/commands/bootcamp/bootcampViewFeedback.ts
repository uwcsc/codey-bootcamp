import { Command } from "@sapphire/framework";
import { CodeyCommand } from "../../codeyCommand";
import { viewFeedbackCommandDetails } from "../../commandDetails/admin/viewFeedback";

export class ViewFeedbackMessageCommand extends CodeyCommand {
  details = viewFeedbackCommandDetails;

  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      aliases: viewFeedbackCommandDetails.aliases,
      description: viewFeedbackCommandDetails.description,
      detailedDescription: viewFeedbackCommandDetails.detailedDescription,
    });
  }
}
