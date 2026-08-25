import { handleUpload } from "@vercel/blob/client";
import { isAuthedFromRequest } from "@/lib/auth";

const MAX_SIZE = 15 * 1024 * 1024; // 15MB, same limit the UI has always advertised

export async function POST(request) {
  // @vercel/blob needs BLOB_READ_WRITE_TOKEN to sign client upload tokens.
  // If the Blob store isn't connected to this environment, fail loudly with
  // a clear JSON error instead of letting handleUpload throw something
  // opaque that only shows up as "Failed to retrieve the client token" in
  // the browser.
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error(
      "upload/route: BLOB_READ_WRITE_TOKEN is not set in this environment."
    );
    return Response.json(
      {
        error:
          "Server misconfiguration: BLOB_READ_WRITE_TOKEN is missing. In Vercel -> Storage, make sure the Blob store is connected to the Production environment, then redeploy.",
      },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch (err) {
    console.error("upload/route: request body was not valid JSON", err);
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // Only a logged-in admin may request an upload token. Read the
        // cookie straight from the request instead of next/headers, since
        // this callback runs inside handleUpload's own async flow.
        if (!isAuthedFromRequest(request)) {
          throw new Error("Unauthorized: admin login required.");
        }

        return {
          allowedContentTypes: [
            "audio/mpeg",
            "audio/mp3",
            "audio/mp4",
            "audio/x-m4a",
            "audio/ogg",
            "audio/wav",
            "audio/webm",
          ],
          addRandomSuffix: true,
          maximumSizeInBytes: MAX_SIZE,
        };
      },
      onUploadCompleted: async ({ blob }) => {
        // Metadata (title/category) is saved by the client right after
        // upload() resolves -- see /api/admin/save. Nothing to persist here,
        // this just confirms the upload landed in Blob storage.
        console.log("Blob upload completed:", blob.url);
      },
    });

    return Response.json(jsonResponse);
  } catch (err) {
    // Always surface the real reason in the server logs, and always return
    // valid JSON (never let this fall through as an HTML error page, which
    // is what makes the Blob client show its generic "Failed to retrieve
    // the client token" message).
    console.error("upload/route: token generation failed:", err);
    const message = err instanceof Error ? err.message : "Upload token fail ho gaya.";
    const status = message.startsWith("Unauthorized") ? 401 : 500;
    return Response.json({ error: message }, { status });
  }
}
