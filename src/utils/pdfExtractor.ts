import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Set worker source for PDF.js using the bundled worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// Clean extracted text by removing hyphenation and normalizing whitespace
export const cleanText = (text: string): string => {
  // Remove hyphenation at line breaks
  let cleaned = text.replace(/-\n/g, '');
  // Normalize line breaks to spaces
  cleaned = cleaned.replace(/\n/g, ' ');
  // Remove extra whitespace
  cleaned = cleaned.replace(/\s+/g, ' ');
  return cleaned.trim();
};

export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }
    
    return cleanText(fullText);
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
};