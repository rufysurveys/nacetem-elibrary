/**
 * Helper utility to convert base64 Data URLs or Files to native Blob URLs (blob:http://...)
 * Blob URLs bypass browser iframe data-URI security blocks and ensure 100% exact original file viewing.
 */

export function dataUrlToBlob(dataUrl) {
  if (!dataUrl) return null;

  // If already a http/https/blob URL, return as is
  if (dataUrl.startsWith('blob:') || dataUrl.startsWith('http://') || dataUrl.startsWith('https://')) {
    return dataUrl;
  }

  try {
    const parts = dataUrl.split(',');
    const mimeMatch = parts[0].match(/:(.*?);/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'application/pdf';
    const base64Data = parts[1];

    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    return URL.createObjectURL(blob);
  } catch (err) {
    console.error('Error converting data URL to Blob URL:', err);
    return dataUrl;
  }
}

/**
 * Downloads a Blob or Data URL with the exact original filename
 */
export function downloadOriginalBinaryFile(fileDataUrlOrBlob, fileName) {
  if (!fileDataUrlOrBlob) return;

  const targetUrl = dataUrlToBlob(fileDataUrlOrBlob);
  const link = document.createElement('a');
  link.href = targetUrl;
  link.download = fileName || 'Original_Document.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();
}
