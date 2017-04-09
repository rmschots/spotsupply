export class Model {
  protected convertRestResponse(response: any): any {
    return response.json();
  }
}
