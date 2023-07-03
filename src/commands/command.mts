import { commands, type Disposable } from "vscode";

const extensionId = "raspberry-pi-pico";

export abstract class Command {
  private readonly commandId: string;

  protected constructor(commandId: string) {
    this.commandId = commandId;
  }

  register(): Disposable {
    return commands.registerCommand(
      extensionId + "." + this.commandId,
      this.execute.bind(this)
    );
  }

  abstract execute(): Promise<void> | void;
}

export abstract class CommandWithResult<T> {
  private readonly commandId: string;

  protected constructor(commandId: string) {
    this.commandId = commandId;
  }

  register(): Disposable {
    return commands.registerCommand(
      extensionId + "." + this.commandId,
      this.execute.bind(this)
    );
  }

  abstract execute(): Promise<T> | T;
}