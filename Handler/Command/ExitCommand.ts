import Command from '../Command';

export default class ExitCommand extends Command {
  private static instance: ExitCommand = new ExitCommand();
  public readonly name: string = 'exit';
  public readonly command: string = 'exit';
  public readonly description: string = 'Exit program';

  private constructor() {
    super();
  }

  public config() {}

  public handler(): Promise<void> {
    return new Promise<void>(() => {
      process.exit(0);
    });
  }

  public static Instance(): ExitCommand {
    return ExitCommand.instance;
  }
}
