import fs from "fs";

export class DBFile {
  constructor(public readonly path: string) {
    console.log(path);
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, "{}");
    }
  }

  public write(content: any) {
    fs.writeFile(this.path, content, err => {
      throw err;
    });
  }

  public async append(content: any) {
    const data = this.read + content;
    this.write(data);
  }

  public read(): string {
    return fs.readFileSync(this.path, "utf-8");
  }
}
