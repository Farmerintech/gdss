import axios from "axios";
import JSZip from "jszip";
import toast from "react-hot-toast";

export async function downloadImage(url, filename = "memory.jpg") {
  const response = await axios.get(url, { responseType: "blob" });
  const objectUrl = URL.createObjectURL(response.data);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(objectUrl);
}

export async function copyImageLink(url) {
  await navigator.clipboard.writeText(url);
}

export async function downloadPhotosZip(photos) {
  const zip = new JSZip();
  const limitedPhotos = photos.slice(0, 30);

  await Promise.all(
    limitedPhotos.map(async (photo, index) => {
      const response = await axios.get(photo.url, { responseType: "blob" });
      zip.file(`memory-${index + 1}.jpg`, response.data);
    })
  );

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "memories-gallery.zip";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  toast.success("ZIP download started");
}
