import LegalPage from "@/components/LegalPage";

export const metadata = { title: "About — Ringtoons" };

export default function AboutPage() {
  return (
    <LegalPage title="About Ringtoons">
      <p>
        Ringtoons is a simple, free ringtone directory. We organize ringtones
        into categories so you can preview a tone right in your browser
        before saving it to your device — no account, no app install, no
        paywall.
      </p>

      <h2>What we do</h2>
      <p>
        We host a curated collection of short audio clips (ringtones,
        notification tones, and similar sound bites) that visitors can
        stream and download for personal use on their own phones.
      </p>

      <h2>What we don&apos;t do</h2>
      <p>
        We don&apos;t require sign-up to listen or download, we don&apos;t
        sell your data, and we don&apos;t bundle downloads with any
        third-party installers.
      </p>

      <h2>Questions</h2>
      <p>
        If you have a question, a suggestion, or a copyright concern, see our{" "}
        <a href="/contact">Contact</a> page.
      </p>
    </LegalPage>
  );
}
