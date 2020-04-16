class Project {
  public id: number = -1;
  public selectedMilestoneId: number = 0;
  public customPath: string = "";

  constructor(
    private readonly title: string,
    public readonly description: string,
    private readonly categories: Category[]
  ) {}
}

class Category {
  constructor(public readonly tag: string, public readonly title: string, public folded: boolean) {}
}

class Note {
  public id: number = -1;
  public order: number = 0;
  public tasks: string[] = [];

  constructor(
    public readonly projectId: number,
    public readonly title: string,
    public readonly description: string,
    public readonly category: string,
    public readonly color: string,
    public readonly milestoneId: number,
    public readonly tags: string[] = []
  ) {}
}

class Milestone {
  constructor(public readonly id: number, public readonly title: string) {}
}
