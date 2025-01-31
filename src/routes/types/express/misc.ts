interface IRetJson {
  status: string;
  message: string;
  data?: { [key: string]: any };
}

export class ApiJsonData {
  private data: IRetJson['data'];
  private status;
  private message;

  constructor(
    status: IRetJson['status'],
    message: IRetJson['message'],
    data?: IRetJson['data']
  ) {
    this.data = data;
    this.status = status;
    this.message = message;
  }

  valueOf(): IRetJson {
    return {
      data: this.data,
      status: this.status,
      message: this.message,
    };
  }
}
