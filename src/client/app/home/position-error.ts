export class PositionError {
  static PERMISSION_DENIED: number = 1;
  static POSITION_UNAVAILABLE: number = 2;
  static TIMEOUT: number = 3;
  code: number;
  message: string;
  type: string;
}
