import Command from '../Command';

export default class ClearCommand extends Command {
  private static instance: ClearCommand = new ClearCommand();
  public readonly name: string = 'clear';
  public readonly command: string = 'clear';
  public readonly description: string = 'Clear console';

  private constructor() {
    super();
  }

  public config() {}

  public handler(): Promise<void> {
    return new Promise((resolve) => {
      console.clear();
      resolve();
    });
  }

  public static Instance(): ClearCommand {
    return ClearCommand.instance;
  }
}
