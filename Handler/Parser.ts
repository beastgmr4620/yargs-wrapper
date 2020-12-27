import Observable from '../Utils/Observable';
import yargs, { Argv } from 'yargs';
import CommandManager from './CommandManager';

export default class Parser {
  private static instance: Parser = new Parser();
  private readonly parser: Argv;
  private readonly commandState: Observable<boolean>;
  private readonly resolver: Observable<
    [(value: void | PromiseLike<void>) => void, (reason?: any) => void]
  >;

  private constructor() {
    this.commandState = new Observable<boolean>(true);
    this.resolver = new Observable([null, null]);
    this.parser = yargs;

    this.parser.scriptName('').usage('').strict();

    this.interceptProcessExitCommand();
    CommandManager.Instance().forge(this.parser);

    this.parser
      .onFinishCommand(() => {
        this.commandState.setState(true);
        this.resolve();
      })
      .fail((msg: string, err: Error) => {
        if (msg === null && err === null) return this.resolve();
        this.reject(err);
      });
  }

  private resolve() {
    if (this.resolver.getState()[0]) {
      this.resolver.getState()[0]();
      this.resolver.setState([null, null]);
    }
  }

  private reject(err: Error) {
    if (this.resolver.getState()[1]) {
      this.resolver.getState()[1](err);
      this.resolver.setState([null, null]);
    }
  }

  private interceptProcessExitCommand() {
    const trueExit = process.exit;
    process.exit = (code): never => {
      const trace = new Error();

      if (trace.stack.includes('Yargs.self.exit')) {
        this.commandState.setState(true);
        this.resolve();
        // @ts-ignore
        return;
      }
      return trueExit(code);
    };
  }

  public parse(command: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.resolver.setState([resolve, reject]);

      const args = this.parser.parse(command);
      const parsedCommand = args._[0] as string;
      const isHelp = args.help as boolean;

      if (
        !isHelp &&
        (!parsedCommand ||
          !CommandManager.Instance().getCommands().includes(parsedCommand))
      ) {
        this.commandState.setState(true);
        return reject(new Error('Undefined command'));
      }
    });
  }

  public static Instance(): Parser {
    return Parser.instance;
  }
}
