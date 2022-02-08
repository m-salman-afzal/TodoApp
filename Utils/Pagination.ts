class Pagination {
  private perPage: number = 3;
  private page: number = 1;
  constructor(perPage: number, page: number) {
    this.perPage = perPage;
    this.page = page;
  }

  skip(): number {
    this.perPage = this.perPage * 1 || 1;
    this.page = this.page * 1 || 1;
    return (this.page - 1) * this.perPage;
  }
}

export { Pagination };
