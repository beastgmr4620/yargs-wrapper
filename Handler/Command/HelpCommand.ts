import Command from '../Command';

/**
 * Don't touch this file!
 * This command is created to
 * make sure an error won't jump
 * into you when you type "help".
 */

export default class HelpCommand extends Command {
  private static instance: HelpCommand = new HelpCommand();
  public readonly name: string = 'help';
  public readonly command: string = 'help';
  public readonly description: string = 'Show help';

  private constructor() {
    super();
  }

  public config() {}

  public handler(): Promise<void> {
    return new Promise<void>(() => {});
  }

  public static Instance(): HelpCommand {
    return HelpCommand.instance;
  }
}
