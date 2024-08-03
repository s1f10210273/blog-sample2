import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import * as crypto from "crypto";

type RequestBody = {
  id: string | null | undefined;
  api: string;
};

export async function POST(request: Request): Promise<Response> {
  const bodyText = await request.text();
  const { id, api: endpoint } = JSON.parse(bodyText) as RequestBody;
  const bodyBuffer = Buffer.from(bodyText, "utf-8");

  const secret = process.env.MICROCMS_WEBHOOK_SIGNATURE_SECRET;
  const signature = request.headers.get("X-MICROCMS-Signature");

  if (!bodyText || !secret || !signature) {
    console.error("Missing required information.");
    return NextResponse.json({ status: 400, message: "Bad Request" });
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(bodyBuffer)
    .digest("hex");

  const isValid = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );

  if (!isValid) {
    console.error("Invalid signature.");
    return NextResponse.json({ status: 400, message: "Invalid Signature" });
  }

  revalidateTag("articles");
  return NextResponse.json({ message: "Success" });
}
