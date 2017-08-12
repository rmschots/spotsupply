import { Response } from '@angular/http';

export class Model {
  protected convertRestResponse(response: Response): any {
    if (!!response.text()) {
      return response.json();
    }
    return null;
  }

  protected compareJSON = (obj1: any, obj2: any) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
}
