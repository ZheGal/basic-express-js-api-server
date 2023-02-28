export class MainService {
  getMessage() {
    return "Hello world!";
  }

  main() {
    return this.getMessage();
  }

  mainJson() {
    const message = this.getMessage();
    return {
      message,
    };
  }
}
