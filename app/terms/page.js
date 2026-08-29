import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Terms and Conditions — Ringtoons" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions" updated="August 2026">
      <p>
        By using Ringtoons (&quot;the site&quot;), you agree to the following
        terms. If you do not agree, please do not use the site.
      </p>

      <h2>Use of the site</h2>
      <p>
        Ringtones on this site are provided for personal, non-commercial use
        only. You may download and use them as a ringtone or notification
        sound on your own device. Reselling, redistributing, or rehosting
        files from this site without permission is not allowed.
      </p>

      <h2>Content ownership</h2>
      <p>
        Ringtones are uploaded by site administrators. We do our best to
        only host content we have the right to share. If you believe any
        content infringes your copyright, see our{" "}
        <a href="/dmca">Copyright / DMCA Policy</a> for how to request its
        removal.
      </p>

      <h2>No warranty</h2>
      <p>
        The site and its content are provided &quot;as is&quot;, without any
        warranty of any kind. We do not guarantee that the site will always
        be available, error-free, or uninterrupted.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        We are not liable for any damages arising from your use of, or
        inability to use, this site or any file downloaded from it.
      </p>

      <h2>Advertising</h2>
      <p>
        This site may display third-party advertising, including through
        Google AdSense. See our <a href="/privacy">Privacy Policy</a> for
        details on how advertising cookies are used.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may revise these terms at any time. Continued use of the site
        after changes are posted means you accept the updated terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Visit our <a href="/contact">Contact</a>{" "}
        page.
      </p>
    </LegalPage>
  );
}
