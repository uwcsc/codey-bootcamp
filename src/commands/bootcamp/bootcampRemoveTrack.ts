import { Command } from "@sapphire/framework";
import { CodeyCommand } from "../../codeyCommand";
import { removeTrackCommandDetails } from "../../commandDetails/admin/removeTrack";

export class RemoveTrackMessageCommand extends CodeyCommand {
  details = removeTrackCommandDetails;

  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      aliases: removeTrackCommandDetails.aliases,
      description: removeTrackCommandDetails.description,
      detailedDescription: removeTrackCommandDetails.detailedDescription,
    });
  }
}
