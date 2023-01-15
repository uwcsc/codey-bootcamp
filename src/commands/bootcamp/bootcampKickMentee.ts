import { Command } from "@sapphire/framework";
import { CodeyCommand } from "../../codeyCommand";
import { kickMenteeCommandDetails } from "../../commandDetails/mentor/kickMentee";

export class ExtendTimerCommand extends CodeyCommand {
  details = kickMenteeCommandDetails;

  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      aliases: kickMenteeCommandDetails.aliases,
      description: kickMenteeCommandDetails.description,
      detailedDescription: kickMenteeCommandDetails.detailedDescription,
    });
  }
}
