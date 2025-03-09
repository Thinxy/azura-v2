export class PostExtensions {
    method: string = "POST";
    path: string;
  
    constructor() {
      const filename = this.constructor.name.toLowerCase();
      this.path = `/${filename.replace("post", "")}`;
    }
  
    handle(req: any, res: any, swagger: any) {
      throw new Error("Método não implementado");
    }
  }
  