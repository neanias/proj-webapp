export default abstract class AShape {
  public abstract dimensions: Map<string, string>;
  protected emptyString = "";

  public abstract transforms(transform: string): string;
}
