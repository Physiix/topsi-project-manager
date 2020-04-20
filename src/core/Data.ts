export class Project {
  public id: number = -1;
  public selectedMilestoneId: number = 0;

  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly categories: Category[],
    public customPath: string = ""
  ) {}
}

export class Category {
  constructor(public tag: string, public title: string, public folded: boolean) {}
}

export class Task {
  constructor(public readonly id: string, public content: string, public done: boolean) {}
}

export class Note {
  public id: number = -1;
  public order: number = 0;
  public tasks: Task[] = [];

  constructor(
    public readonly projectId: number,
    public readonly title: string,
    public readonly description: string,
    public category: string,
    public readonly color: string,
    public readonly textColor: string,
    public readonly milestoneId: number,
    public readonly tags: string[] = []
  ) {}
}

export class Milestone {
  constructor(public readonly id: number, public readonly title: string) {}
}
