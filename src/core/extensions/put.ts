export class PutExtensions {
    method: string = "PUT";
    path: string;
  
    constructor() {
      const filename = this.constructor.name.toLowerCase();
      this.path = `/${filename.replace("put", "")}`;
    }
  
    handle(req: any, res: any, swagger: any) {
      throw new Error("Método não implementado");
    }
  }
  