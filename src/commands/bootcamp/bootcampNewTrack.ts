import { Command } from "@sapphire/framework";
import { CodeyCommand } from "../../codeyCommand";
import { newTrackCommandDetails } from "../../commandDetails/bootcamp/newTrack";

export class NewTrackMessageCommand extends CodeyCommand {
  details = newTrackCommandDetails;

  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      aliases: newTrackCommandDetails.aliases,
      description: newTrackCommandDetails.description,
      detailedDescription: newTrackCommandDetails.detailedDescription,
    });
  }
}
