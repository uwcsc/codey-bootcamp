import { Command } from "@sapphire/framework";
import { CodeyCommand } from "../../codeyCommand";
import { nextMenteeCommandDetails } from "../../commandDetails/mentor/nextMentee";

export class NextMenteeMessageCommand extends CodeyCommand {
  details = nextMenteeCommandDetails;

  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      aliases: nextMenteeCommandDetails.aliases,
      description: nextMenteeCommandDetails.description,
      detailedDescription: nextMenteeCommandDetails.detailedDescription,
    });
  }
}
