// Export functionality for Frontpage Maker
// Supports PDF, PowerPoint, Word, and Image exports

// Show loading overlay
function showLoading(message = 'Generating export...') {
    const overlay = document.getElementById('loadingOverlay');
    const loadingText = document.getElementById('loadingText');
    loadingText.textContent = message;
    overlay.style.display = 'flex';
}

// Hide loading overlay
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.style.display = 'none';
}

// Helper function to wait for images to load
function waitForImagesToLoad(element) {
    return new Promise((resolve) => {
        const images = element.querySelectorAll('img');
        if (images.length === 0) {
            resolve();
            return;
        }

        let loadedImages = 0;
        const totalImages = images.length;

        images.forEach(img => {
            if (img.complete) {
                loadedImages++;
                if (loadedImages === totalImages) {
                    resolve();
                }
            } else {
                img.onload = img.onerror = () => {
                    loadedImages++;
                    if (loadedImages === totalImages) {
                        resolve();
                    }
                };
            }
        });

        // Timeout fallback
        setTimeout(() => resolve(), 3000);
    });
}

// Create a clean clone of the element for export (without iframe wrapper)
async function createExportableElement(iframeElement) {
    // Check if we're on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    let iframeDoc, sourceElement;

    try {
        // Try multiple methods to access iframe content (mobile browsers can be tricky)
        iframeDoc = iframeElement.contentDocument ||
            iframeElement.contentWindow?.document;

        if (!iframeDoc) {
            throw new Error('Cannot access iframe document');
        }

        sourceElement = iframeDoc.querySelector('.a4-page');

        if (!sourceElement) {
            // Wait a bit more on mobile and try again
            if (isMobile) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                sourceElement = iframeDoc.querySelector('.a4-page');
            }

            if (!sourceElement) {
                throw new Error('Preview content not ready. Please wait and try again.');
            }
        }
    } catch (error) {
        console.error('Error accessing iframe:', error);
        throw new Error('Cannot access preview content. Please refresh and try again.');
    }

    // Clone the element
    const clone = sourceElement.cloneNode(true);

    // Create a temporary container
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        left: -9999px;
        top: 0;
        width: 794px;
        visibility: hidden;
        z-index: -9999;
    `;
    document.body.appendChild(container);

    // Get ALL styles from iframe (including inline styles)
    const iframeStyles = iframeDoc.querySelector('style');
    if (iframeStyles) {
        const styleElement = document.createElement('style');
        styleElement.textContent = iframeStyles.textContent;
        container.appendChild(styleElement);
    }

    // Also copy any link stylesheets
    const iframeLinks = iframeDoc.querySelectorAll('link[rel="stylesheet"]');
    iframeLinks.forEach(link => {
        const linkClone = link.cloneNode(true);
        container.appendChild(linkClone);
    });

    container.appendChild(clone);

    // Wait for images to load (longer on mobile)
    await waitForImagesToLoad(clone);

    // Additional wait for fonts and rendering (longer on mobile)
    const waitTime = isMobile ? 1500 : 500;
    await new Promise(resolve => setTimeout(resolve, waitTime));

    // Force a reflow to ensure everything is rendered
    container.offsetHeight;

    return { element: clone, container, isMobile };
}

// Cleanup temporary container
function cleanupExportElement(container) {
    if (container && container.parentNode) {
        container.parentNode.removeChild(container);
    }
}

// Export as PDF (A4 size)
async function exportPDF(iframeElement, filename = 'frontpage.pdf') {
    let exportData = null;

    try {
        showLoading('Preparing content for PDF...');

        exportData = await createExportableElement(iframeElement);

        showLoading('Generating PDF (A4)...');

        // Mobile-optimized settings
        const isMobile = exportData.isMobile;
        const scale = isMobile ? 2 : 3;  // Lower scale on mobile for better performance

        const opt = {
            margin: 0,
            filename: filename,
            image: { type: 'jpeg', quality: 0.95 },
            html2canvas: {
                scale: scale,
                useCORS: true,
                allowTaint: true,
                logging: false,
                letterRendering: true,
                backgroundColor: '#ffffff',
                width: 794,  // A4 width in pixels
                height: 1123, // A4 height in pixels
                windowWidth: 794,
                windowHeight: 1123,
                scrollX: 0,
                scrollY: 0,
                x: 0,
                y: 0,
                imageTimeout: isMobile ? 15000 : 0,  // Longer timeout on mobile
                removeContainer: true
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait',
                compress: true,
                precision: 16
            },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        await html2pdf().set(opt).from(exportData.element).save();

        hideLoading();
        console.log('PDF exported successfully');
    } catch (error) {
        hideLoading();
        console.error('PDF export failed:', error);
        alert('Failed to generate PDF. Please ensure the preview is fully loaded and try again. Error: ' + error.message);
    } finally {
        if (exportData) {
            cleanupExportElement(exportData.container);
        }
    }
}

// Export as PowerPoint
async function exportPowerPoint(iframeElement, formData, filename = 'frontpage.pptx') {
    let exportData = null;

    try {
        showLoading('Preparing content for PowerPoint...');

        exportData = await createExportableElement(iframeElement);

        showLoading('Generating PowerPoint...');

        const pptx = new PptxGenJS();

        // Define A4 layout (8.27 x 11.69 inches)
        pptx.defineLayout({ name: 'A4', width: 8.27, height: 11.69 });
        pptx.layout = 'A4';

        const slide = pptx.addSlide();

        // Convert to canvas
        const canvas = await html2canvas(exportData.element, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false,
            backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/png');

        // Add image to slide (full slide)
        slide.addImage({
            data: imgData,
            x: 0,
            y: 0,
            w: 8.27,
            h: 11.69,
            sizing: { type: 'contain', w: 8.27, h: 11.69 }
        });

        // Save PowerPoint
        await pptx.writeFile({ fileName: filename });

        hideLoading();
        console.log('PowerPoint exported successfully');
    } catch (error) {
        hideLoading();
        console.error('PowerPoint export failed:', error);
        alert('Failed to generate PowerPoint. Please ensure the preview is fully loaded and try again.');
    } finally {
        if (exportData) {
            cleanupExportElement(exportData.container);
        }
    }
}

// Export as Word Document
async function exportWord(formData, filename = 'frontpage.docx') {
    try {
        showLoading('Generating Word document...');

        // Wait a bit to ensure formData is ready
        await new Promise(resolve => setTimeout(resolve, 100));

        const { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, BorderStyle } = docx;

        // Create document sections
        const children = [];

        // Add spacing at top
        children.push(
            new Paragraph({
                text: '',
                spacing: { before: 800 }
            })
        );

        // Course Title
        if (formData.courseTitle) {
            children.push(
                new Paragraph({
                    text: formData.courseTitle.toUpperCase(),
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 400 },
                    border: {
                        bottom: {
                            color: '1e3a8a',
                            space: 1,
                            style: BorderStyle.SINGLE,
                            size: 6
                        }
                    }
                })
            );
        }

        // Student Name
        if (formData.studentName) {
            children.push(
                new Paragraph({
                    text: formData.studentName.toUpperCase(),
                    heading: HeadingLevel.HEADING_2,
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 400, after: 600 }
                })
            );
        }

        // Details section header
        children.push(
            new Paragraph({
                text: 'Details',
                heading: HeadingLevel.HEADING_3,
                spacing: { before: 400, after: 200 }
            })
        );

        // Build details array
        const details = [];
        if (formData.department) details.push({ label: 'Department', value: formData.department });
        if (formData.collegeRoll) details.push({ label: 'College Roll No', value: formData.collegeRoll });
        if (formData.universityRoll) details.push({ label: 'University Roll No', value: formData.universityRoll });
        if (formData.registrationNo) details.push({ label: 'Registration No', value: formData.registrationNo });

        // Add custom fields safely
        if (formData.customFields && formData.customFields.length > 0) {
            formData.customFields.forEach(field => {
                if (field.label && field.value) {
                    details.push({ label: field.label, value: field.value });
                }
            });
        }

        // Add detail rows
        details.forEach(detail => {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: detail.label + ': ',
                            bold: true,
                            size: 24
                        }),
                        new TextRun({
                            text: detail.value,
                            size: 24
                        })
                    ],
                    spacing: { after: 150 }
                })
            );
        });

        // Institution section
        if (formData.collegeName || formData.universityName) {
            children.push(
                new Paragraph({
                    text: '',
                    spacing: { before: 800, after: 400 },
                    border: {
                        top: {
                            color: '1e3a8a',
                            space: 1,
                            style: BorderStyle.SINGLE,
                            size: 6
                        }
                    }
                })
            );
        }

        if (formData.collegeName) {
            children.push(
                new Paragraph({
                    text: formData.collegeName.toUpperCase(),
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 200 },
                    bold: true,
                    size: 28
                })
            );
        }

        if (formData.universityName) {
            children.push(
                new Paragraph({
                    text: formData.universityName.toUpperCase(),
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 400 },
                    size: 24
                })
            );
        }

        // Create document with proper A4 dimensions
        const doc = new Document({
            sections: [{
                properties: {
                    page: {
                        width: 11906,  // A4 width in twips
                        height: 16838, // A4 height in twips
                        margin: {
                            top: 1440,
                            right: 1440,
                            bottom: 1440,
                            left: 1440
                        }
                    }
                },
                children: children
            }]
        });

        // Generate and download
        const blob = await Packer.toBlob(doc);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        hideLoading();
        console.log('Word document exported successfully');
    } catch (error) {
        hideLoading();
        console.error('Word export failed:', error);
        alert('Failed to generate Word document. Error: ' + error.message);
    }
}

// Export as Image (PNG)
async function exportImage(iframeElement, filename = 'frontpage.png') {
    let exportData = null;

    try {
        showLoading('Preparing content for image...');

        exportData = await createExportableElement(iframeElement);

        showLoading('Generating high-resolution image...');

        // Mobile-optimized settings
        const isMobile = exportData.isMobile;
        const scale = isMobile ? 2 : 3;  // Lower scale on mobile

        // A4 aspect ratio at high resolution
        const canvas = await html2canvas(exportData.element, {
            scale: scale,
            useCORS: true,
            allowTaint: true,
            logging: false,
            backgroundColor: '#ffffff',
            windowWidth: 794,  // A4 width in pixels at 96 DPI
            windowHeight: 1123, // A4 height in pixels at 96 DPI
            width: 794,
            height: 1123,
            scrollX: 0,
            scrollY: 0,
            x: 0,
            y: 0,
            imageTimeout: isMobile ? 15000 : 0,  // Longer timeout on mobile
            removeContainer: true
        });

        // Convert to blob and download
        canvas.toBlob(function (blob) {
            if (!blob) {
                alert('Failed to generate image. Please try again.');
                hideLoading();
                return;
            }

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            hideLoading();
            console.log('Image exported successfully');
        }, 'image/png', 1.0);
    } catch (error) {
        hideLoading();
        console.error('Image export failed:', error);
        alert('Failed to generate image. Please ensure the preview is fully loaded and try again. Error: ' + error.message);
    } finally {
        if (exportData) {
            cleanupExportElement(exportData.container);
        }
    }
}
