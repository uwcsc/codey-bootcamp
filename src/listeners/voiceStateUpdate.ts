import { Listener } from "@sapphire/framework";
import { VoiceState } from "discord.js";
import { controlMentorMenteeCalls } from "../components/bootcamp";
import { vars } from "../config";

const BOOTCAMP_GUILD_ID: string = vars.BOOTCAMP_GUILD_ID || ".";

export class VoiceStateUpdateListener extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      event: "voiceStateUpdate",
    });
  }

  public run(oldMember: VoiceState, newMember: VoiceState) {
    if (oldMember.guild.id === BOOTCAMP_GUILD_ID) {
      controlMentorMenteeCalls(oldMember, newMember);
    }
  }
}
