import { SoonBlock } from "@/components/cards";

export default function NotFound() {
  return (
    <SoonBlock
      title={{ en: "That page is not on the map.", vi: "Trang này không có trên bản đồ." }}
      note={{ en: "Try search, or go back home.", vi: "Thử ô tìm, hoặc về trang chủ." }}
    />
  );
}
