import { GetExtensions } from "@/core/extensions/get";

export default class Hello extends GetExtensions {
  handle = (req: any, res: any, swagger: any) => {
    res.send({ message: "Hello World! Deu certo?" });
  };
}
