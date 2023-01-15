import { Command } from "@sapphire/framework";
import { CodeyCommand } from "../../codeyCommand";
import { extendTimerCommandDetails } from "../../commandDetails/mentor/extendTimer";

export class ExtendTimerCommand extends CodeyCommand {
  details = extendTimerCommandDetails;

  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      aliases: extendTimerCommandDetails.aliases,
      description: extendTimerCommandDetails.description,
      detailedDescription: extendTimerCommandDetails.detailedDescription,
    });
  }
}
