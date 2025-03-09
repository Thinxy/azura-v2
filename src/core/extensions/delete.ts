export class DeleteExtensions {
  method: string = "DELETE";
  path: string;

  constructor() {
    const filename = this.constructor.name.toLowerCase();
    this.path = `/${filename.replace("delete", "")}`;
  }

  handle(req: any, res: any, swagger: any) {
    throw new Error("Método não implementado");
  }
}
