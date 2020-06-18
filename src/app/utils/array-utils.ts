export class ArrayUtils {
  public static deleteArrayElement<T>(array: T[], value: T): boolean {
    const deleteIndex = array.indexOf(value);

    if (deleteIndex > -1) {
      array.splice(deleteIndex, 1);
      return true;
    } else {
      return false;
    }
  }

  public static updateArrayElement<T>(array: T[], value: T): void {
    const updateIndex = array.indexOf(value);
    if (updateIndex > -1) {
      array[updateIndex] = value;
    }
  }

  public static moveArrayElement<T>(array: T[], fromIndex: number, toIndex: number): void {
    array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
  }

}
