/**
 * A zipson writer takes a piece of zipson compression output as a string
 */
export abstract class ZipsonWriter {
  abstract write(data: string): void;
  abstract end(): void;
}

/**
 * Writes zipson compression outupt in full to a string
 */
export class ZipsonStringWriter extends ZipsonWriter {
  public value: string = '';

  write(data: string) {
    this.value += data;
  }

  end() {}
}