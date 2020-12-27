import { Argv } from 'yargs';

export default abstract class Command {
  public abstract readonly name: string;
  public abstract readonly command: string;
  public abstract readonly description: string;
  public abstract config(argv?: Argv): void;
  public abstract handler(args: unknown[]): Promise<void>;
}
