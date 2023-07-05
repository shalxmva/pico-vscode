import type { Memento, WorkspaceConfiguration } from "vscode";
import { workspace } from "vscode";

export enum SettingsKey {
  picoSDK = "sdk",
  picoSDKPath = "sdkPath",
  toolchainPath = "toolchainPath",
  cmakePath = "cmakePath",
  python3Path = "python3Path",
  ninjaPath = "ninjaPath",
  cmakeAutoConfigure = "cmakeAutoConfigure",
}

export type Setting = string | boolean | string[] | null | undefined;

export interface PackageJSON {
  name: string;
  publisher: string;
}

export default class Settings {
  private config: WorkspaceConfiguration;
  public context: Memento;
  private pkg: PackageJSON;

  constructor(context: Memento, packageJSON: PackageJSON) {
    this.context = context;
    this.pkg = packageJSON;

    this.config = workspace.getConfiguration(packageJSON.name);
  }

  public get(key: SettingsKey): Setting {
    return this.config.get(key);
  }

  public getString(key: SettingsKey): string | undefined {
    const value = this.get(key);

    return typeof value === "string" ? value : undefined;
  }

  public getBoolean(key: SettingsKey): boolean | undefined {
    const value = this.get(key);

    return typeof value === "boolean" ? value : undefined;
  }

  public getArray(key: SettingsKey): string[] | undefined {
    const value = this.get(key);

    return Array.isArray(value) ? value : undefined;
  }

  public update<T>(key: SettingsKey, value: T): Thenable<void> {
    return this.config.update(key, value, true);
  }

  // helpers
  public getExtensionName(): string {
    return this.pkg.name;
  }

  public getExtensionId(): string {
    return [this.pkg.publisher, this.pkg.name].join(".");
  }
}
