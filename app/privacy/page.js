import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Privacy Policy — Ringtoons" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="August 2026">
      <p>
        This Privacy Policy explains what information Ringtoons
        (&quot;we&quot;, &quot;us&quot;) collects when you use this website,
        and how that information is used.
      </p>

      <h2>Information we collect</h2>
      <p>
        Browsing and downloading ringtones on Ringtoons does not require an
        account, and we do not ask visitors for any personal information
        (name, email, phone number) to listen to or download a ringtone.
      </p>
      <p>
        Our hosting provider automatically logs standard technical data for
        every visit (such as IP address, browser type, and pages requested)
        for security and performance purposes. This is common practice for
        any website and is not linked to your identity.
      </p>

      <h2>Cookies and advertising</h2>
      <p>
        We may use Google AdSense to display ads on this site. Google, as a
        third-party vendor, uses cookies (such as the DoubleClick DART
        cookie) to serve ads based on your visits to this and other sites on
        the internet. Google&apos;s use of advertising cookies enables it
        and its partners to serve ads based on your visit to this site
        and/or other sites.
      </p>
      <p>
        You may opt out of personalized advertising by visiting{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google Ads Settings
        </a>
        . For more on how Google uses data, see{" "}
        <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
          Google&apos;s advertising policy
        </a>
        .
      </p>

      <h2>Admin area</h2>
      <p>
        The site has a password-protected admin area used only by us to
        publish ringtones. It sets a login cookie for that purpose only and
        does not track regular visitors.
      </p>

      <h2>Third-party links</h2>
      <p>
        Our site may contain links to other websites. We are not responsible
        for the privacy practices of those sites and encourage you to read
        their own privacy policies.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        This site is not directed at children under 13, and we do not
        knowingly collect personal information from children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be
        posted on this page with an updated revision date.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Visit our <a href="/contact">Contact</a>{" "}
        page.
      </p>
    </LegalPage>
  );
}
