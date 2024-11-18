import { Suspense } from "react";
import { notFound } from "next/navigation";
import NewsDetail from "@/components/site/NewsDetail";
import {
  getNewsDetail,
  getAstrologyNewsDetail,
  getBreakingNewsDetail,
  NewsDetailDto,
} from "@/lib/api";
import Loading from "./loading";

interface PageProps {
  params: Promise<{ newsId: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { newsId } = await params;
  let initialNewsDetail: NewsDetailDto | null = null;
  let newsType: "regular" | "astrology" | "breaking" = "regular";

  try {
    // Try to fetch regular news first
    initialNewsDetail = await getNewsDetail(newsId);

    if (!initialNewsDetail) {
      // If not found, try astrology news
      initialNewsDetail = await getAstrologyNewsDetail(newsId);
      if (initialNewsDetail) {
        newsType = "astrology";
      }
    }

    if (!initialNewsDetail) {
      // If still not found, try breaking news
      initialNewsDetail = await getBreakingNewsDetail(newsId);
      if (initialNewsDetail) {
        newsType = "breaking";
      }
    }
  } catch (error) {
    console.error("Error fetching news detail:", error);
  }

  if (!initialNewsDetail) {
    notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <NewsDetail
        initialData={initialNewsDetail}
        categoryId={initialNewsDetail.categoryId}
      />
    </Suspense>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { newsId } = await params;
  let newsDetail =
    (await getNewsDetail(newsId)) ||
    (await getAstrologyNewsDetail(newsId)) ||
    (await getBreakingNewsDetail(newsId));

  if (!newsDetail) {
    return { title: "Haber bulunamadı" };
  }

  return {
    title: newsDetail.title,
    description: newsDetail.shortDescription,
  };
}
