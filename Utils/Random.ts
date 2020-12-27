export default class Random {
  public static defaultCharset: string =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  public static randomString(
    length: number,
    charset: string = Random.defaultCharset,
  ): string {
    let result: string[] = [];

    for (let i = 0; i < length; ++i)
      result.push(charset[~~(Math.random() * charset.length)]);

    return result.join('');
  }
}
