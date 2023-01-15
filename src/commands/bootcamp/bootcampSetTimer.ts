import { Command } from "@sapphire/framework";
import { CodeyCommand } from "../../codeyCommand";
import { setTimerCommandDetails } from "../../commandDetails/admin/setTimer";

export class SetTimerMessageCommand extends CodeyCommand {
  details = setTimerCommandDetails;

  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      aliases: setTimerCommandDetails.aliases,
      description: setTimerCommandDetails.description,
      detailedDescription: setTimerCommandDetails.detailedDescription,
    });
  }
}
