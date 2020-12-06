
export default class CsrfUtils {
  static getToken(): string {
    return (document.getElementById("csrf-token") as HTMLMetaElement).content
  }

  static getHeader(): string {
    return (document.getElementById("csrf-header") as HTMLMetaElement).content;
  }
}