
export default class CsrfUtils {
  static getToken(): string {
    // https://www.baeldung.com/spring-security-csrf#2-front-end-configuration
    return document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
  }
}