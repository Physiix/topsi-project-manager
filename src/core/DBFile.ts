import fs from "fs";

export class DBFile {
  constructor(public readonly path: string) {
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, "{}");
    }
  }

  public write(content: any) {
    fs.writeFile(this.path, content, err => {
      if (err != null) {
        throw err;
      }
    });
  }

  public async append(content: any) {
    const data = this.read() + content;
    this.write(data);
  }

  public read(): string {
    return fs.readFileSync(this.path, "utf-8");
  }
}
