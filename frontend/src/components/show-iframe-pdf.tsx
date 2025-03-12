const PATH_PDF = import.meta.env.VITE_API_URL + "/curriculums/";

export function ShowIframePdf({ id }: { id: string }) {
  const url = PATH_PDF + id + "/pdf";
  return <iframe src={url} className="w-full h-full rounded-md" />;
}

