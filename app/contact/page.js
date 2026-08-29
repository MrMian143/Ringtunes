import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Contact — Ringtoons" };

// TODO: replace with your real support address before going live.
const CONTACT_EMAIL = "ringtunessite@gmail.com";

export default function ContactPage() {
  return (
    <LegalPage title="Contact Us">
      <p>
        Got a question, a bug to report, a takedown request, or just want to
        say hi? Reach us at:
      </p>

      <p className="font-display text-lg">
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>

      <h2>Response time</h2>
      <p>
        We try to reply within a few business days. For copyright takedown
        requests specifically, please see our{" "}
        <a href="/dmca">Copyright / DMCA Policy</a> for what to include so we
        can act on it quickly.
      </p>
    </LegalPage>
  );
}
