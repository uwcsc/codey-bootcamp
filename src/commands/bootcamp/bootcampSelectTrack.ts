import { Command } from "@sapphire/framework";
import { CodeyCommand } from "../../codeyCommand";
import { selectTrackCommandDetails } from "../../commandDetails/mentor/selectTrack";

export class SelectTrackMessageCommand extends CodeyCommand {
  details = selectTrackCommandDetails;

  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      aliases: selectTrackCommandDetails.aliases,
      description: selectTrackCommandDetails.description,
      detailedDescription: selectTrackCommandDetails.detailedDescription,
    });
  }
}
