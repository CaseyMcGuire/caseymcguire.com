
export default class CsrfUtils {
  static getToken(): string {
    // https://www.baeldung.com/spring-security-csrf#2-front-end-configuration
    return document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
  }

  static getHeader(): string {
    return 'X-XSRF-TOKEN';
  }
}

/**
 * POSTs to a Spring Security endpoint (e.g. /login, /logout) and navigates the browser
 * to whatever URL the server redirects to.
 *
 * Why fetch instead of a native HTML form submit:
 * Spring Security's `csrf().spa()` uses the XOR handler for CSRF tokens resolved from
 * form parameters (BREACH mitigation). The XOR handler can't decode the raw cookie value
 * our JS has access to, so a native form submit with `_csrf=<cookie>` always fails CSRF
 * validation. Sending the token as the X-XSRF-TOKEN header instead routes through the
 * SPA handler's plain (non-XOR) path, which expects exactly the raw cookie value.
 *
 * The server still uses formLogin / logout filters unchanged — the body is
 * application/x-www-form-urlencoded, just like a native submit.
 */
export async function postWithCsrfAndRedirect(url: string, formData?: FormData): Promise<void> {
  const res = await fetch(url, {
    method: 'POST',
    body: formData ? formDataToUrlEncoded(formData) : undefined,
    headers: {
      [CsrfUtils.getHeader()]: CsrfUtils.getToken(),
    },
  });

  // Reject anything that isn't a clean 2xx after a redirect. Without this, a CSRF rejection
  // (which Spring's error pipeline can mask as a 404 forwarded to /index) would silently
  // navigate the user to wherever res.url happened to land. Failing loud lets the caller
  // route the user to a sensible recovery destination.
  if (!res.ok) {
    throw new Error(`POST ${url} failed with status ${res.status}`);
  }
  if (!res.redirected) {
    throw new Error(`POST ${url} did not redirect`);
  }

  // res.url is safe to navigate to as long as Spring Security's success handler only
  // resolves to same-origin URLs (the default SavedRequestAwareAuthenticationSuccessHandler
  // does). If you ever swap that handler for one that accepts arbitrary `?continue=` URLs,
  // validate res.url against window.location.origin first to avoid an open redirect.
  window.location.href = res.url;
}

function formDataToUrlEncoded(formData: FormData): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of formData) {
    // FormData entries can be File objects (for <input type="file">). Skip them — Spring
    // Security's formLogin only reads string parameters, and URLSearchParams can't
    // represent files anyway.
    if (typeof value === "string") {
      params.append(key, value);
    }
  }
  return params;
}