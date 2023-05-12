import { Command } from "@sapphire/framework";
import { CodeyCommand } from "../../codeyCommand";
import { massKickCommandDetails } from "../../commandDetails/admin/massKick";

export class AdminMassKickCommand extends CodeyCommand {
  details = massKickCommandDetails;

  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      aliases: massKickCommandDetails.aliases,
      description: massKickCommandDetails.description,
      detailedDescription: massKickCommandDetails.detailedDescription,
    });
  }
}
