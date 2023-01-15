import { Command } from "@sapphire/framework";
import { CodeyCommand } from "../../codeyCommand";
import { toggleWatchCommandDetails } from "../../commandDetails/admin/toggleWatch";

export class ToggleWatchCommand extends CodeyCommand {
  details = toggleWatchCommandDetails;

  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      aliases: toggleWatchCommandDetails.aliases,
      description: toggleWatchCommandDetails.description,
      detailedDescription: toggleWatchCommandDetails.detailedDescription,
    });
  }
}
