interface TCopySourceStrategy {
  /*
   * Regex to match the source path
   * */
  regex: RegExp;

  /**
   *
   * @param source - path from which to copy
   */
  getData(source: string): string;
}
