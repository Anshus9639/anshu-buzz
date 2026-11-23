import { NextResponse, type NextRequest } from "next/server";
import { getPostBySlug } from "@/lib/blog";

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.replace(/^\/blog\//, "");
  const exists = getPostBySlug(slug) !== null;
  if (exists) return NextResponse.next();
  return NextResponse.rewrite(new URL("/404", request.url));
}

export const config = {
  matcher: "/blog/:slug",
};
