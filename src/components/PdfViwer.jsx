import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;



export default function PdfViwer() {
    const [fileURL, setFileURL] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            const blobUrl = URL.createObjectURL(selectedFile);
            setFileURL(blobUrl);
            setPageNumber(1);
        } else {
            alert('Please select a valid PDF file.');
        }
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div style={{ textAlign: 'center', padding: '1rem' }}>
            <h2>Upload and View PDF</h2>

            <input type="file" accept="application/pdf" onChange={onFileChange} />

            {fileURL && (
                <div style={{ marginTop: '1rem' }}>
                    <Document
                        file={fileURL}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={(err) => console.error("Load error:", err.message)}
                        loading="Loading PDF..."
                    >
                        <Page pageNumber={pageNumber} />
                    </Document>

                    <div style={{ marginTop: '1rem' }}>
                        <button
                            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
                            disabled={pageNumber <= 1}
                        >
                            Previous
                        </button>

                        <span style={{ margin: '0 10px' }}>
                            Page {pageNumber} of {numPages}
                        </span>

                        <button
                            onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
                            disabled={pageNumber >= numPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
