export class GetExtensions {
    method: string = "GET";
    path: string;
  
    constructor() {
      const filename = this.constructor.name.toLowerCase();
      this.path = `/${filename.replace("get", "")}`;
    }
  
    handle(req: any, res: any, swagger: any) {
      throw new Error("Método não implementado");
    }
  }
  