export class Model {
  protected convertRestResponse(response: any): any {
    if (!!response.text()) {
      return response.json();
    }
    return null;
  }
}
