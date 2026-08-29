import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Copyright / DMCA Policy — Ringtoons" };

const CONTACT_EMAIL = "ringtunessite@gmail.com";

export default function DmcaPage() {
  return (
    <LegalPage title="Copyright / DMCA Policy" updated="August 2026">
      <p>
        Ringtoons respects the intellectual property rights of others and
        expects its users to do the same. We respond to clear notices of
        alleged copyright infringement.
      </p>

      <h2>Filing a takedown request</h2>
      <p>
        If you believe content on this site infringes your copyright, please
        email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with the
        following information:
      </p>
      <ul>
        <li>A description of the copyrighted work you believe is infringed</li>
        <li>The exact URL(s) on this site where the content appears</li>
        <li>Your contact information (name and email)</li>
        <li>
          A statement that you have a good-faith belief the use is not
          authorized by the copyright owner, its agent, or the law
        </li>
        <li>
          A statement, under penalty of perjury, that the above information
          is accurate and that you are the copyright owner or authorized to
          act on their behalf
        </li>
      </ul>

      <h2>What happens next</h2>
      <p>
        Once we receive a complete request, we will review it and, where
        appropriate, remove or disable access to the reported content
        promptly.
      </p>

      <h2>Counter-notice</h2>
      <p>
        If you believe content was removed in error, you may contact us at
        the same address to request its reinstatement, with an explanation.
      </p>
    </LegalPage>
  );
}
