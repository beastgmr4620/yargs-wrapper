import { Argv } from 'yargs';
import Command from './Command';
import lodash from 'lodash';

import ExitCommand from './Command/ExitCommand';
import ClearCommand from './Command/ClearCommand';
import HelpCommand from './Command/HelpCommand';

export default class CommandManager {
  private static instance: CommandManager = new CommandManager();
  private readonly commandStore: { [command: string]: Command };

  private constructor() {
    this.commandStore = {};
  }

  private forgeCommand(parser: Argv, command: Command): void {
    this.commandStore[command.name] = command;
    parser.command(
      command.command,
      command.description,
      command.config.bind(command),
      command.handler.bind(command),
    );
  }

  public getCommands(): string[] {
    return lodash.keys(this.commandStore);
  }

  public forge(parser: Argv) {
    this.forgeCommand(parser, ExitCommand.Instance());
    this.forgeCommand(parser, ClearCommand.Instance());
    this.forgeCommand(parser, HelpCommand.Instance());
  }

  public static Instance(): CommandManager {
    return CommandManager.instance;
  }
}
