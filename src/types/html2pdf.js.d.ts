/**
 * Minimal module declaration for html2pdf.js
 * Allows importing and using html2pdf.js in TypeScript projects.
 * StudyDock guideline: Use this for Ghana mobile-first PDF export.
 */
declare module 'html2pdf.js' {
    // The main export is a function with chainable methods
    interface Html2PdfOptions {
        margin?: number | number[]
        filename?: string
        image?: { type?: string; quality?: number }
        html2canvas?: object
        jsPDF?: object
        pagebreak?: object
    }

    interface Html2Pdf {
        set: (options: Html2PdfOptions) => Html2Pdf
        from: (element: HTMLElement | string) => Html2Pdf
        save: () => Promise<void>
        outputPdf: () => Promise<Uint8Array>
        // Add more methods as needed
    }

    function html2pdf(): Html2Pdf

    export = html2pdf
}