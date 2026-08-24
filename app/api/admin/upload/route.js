import { handleUpload } from "@vercel/blob/client";
import { isAuthed } from "@/lib/auth";

const MAX_SIZE = 15 * 1024 * 1024; // 15MB, same limit the UI has always advertised

export async function POST(request) {
  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // Only a logged-in admin may request an upload token.
        if (!isAuthed()) {
          throw new Error("Unauthorized");
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
        // upload() resolves — see /api/admin/save. Nothing to persist here,
        // this just confirms the upload landed in Blob storage.
        console.log("Blob upload completed:", blob.url);
      },
    });

    return Response.json(jsonResponse);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload token fail ho gaya.";
    const status = message === "Unauthorized" ? 401 : 400;
    return Response.json({ error: message }, { status });
  }
}
