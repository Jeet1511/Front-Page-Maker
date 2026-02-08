// Frontpage Maker - Main Application Logic

// Application State
let currentTemplate = 1;
let currentZoom = 1.0;
let uploadedLogo = null;
let customFieldCounter = 0;

// Form Data Object
const formData = {
    logo: null,
    courseTitle: '',
    studentName: '',
    department: '',
    collegeName: '',
    universityName: '',
    customFields: []  // This now includes all additional details (removable roll numbers + custom fields)
};

// DOM Elements
const previewContent = document.getElementById('previewContent');
const templateCards = document.querySelectorAll('.template-card');
const logoUpload = document.getElementById('logoUpload');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const removeImageBtn = document.getElementById('removeImage');
const uploadText = document.getElementById('uploadText');
const additionalDetailsContainer = document.getElementById('additionalDetailsContainer');
const addDetailBtn = document.getElementById('addDetailBtn');
const customFieldsContainer = document.getElementById('customFieldsContainer');
const addFieldBtn = document.getElementById('addFieldBtn');
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');
const zoomLevel = document.getElementById('zoomLevel');

// Export buttons
const exportPDFBtn = document.getElementById('exportPDF');
const exportPPTBtn = document.getElementById('exportPPT');
const exportWordBtn = document.getElementById('exportWord');
const exportImageBtn = document.getElementById('exportImage');

// ===== Initialize Application =====
function init() {
    attachFormListeners();
    attachTemplateListeners();
    attachImageUploadListeners();
    attachAdditionalDetailsListeners();
    attachCustomFieldListeners();
    attachZoomListeners();
    attachExportListeners();
    updatePreview();
}

// ===== Form Input Listeners =====
function attachFormListeners() {
    const inputs = {
        courseTitle: document.getElementById('courseTitle'),
        studentName: document.getElementById('studentName'),
        department: document.getElementById('department'),
        collegeName: document.getElementById('collegeName'),
        universityName: document.getElementById('universityName')
    };

    Object.keys(inputs).forEach(key => {
        if (inputs[key]) {
            inputs[key].addEventListener('input', (e) => {
                formData[key] = e.target.value;
                updatePreview();
            });
        }
    });
}

// ===== Template Selection =====
function attachTemplateListeners() {
    templateCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            templateCards.forEach(c => c.classList.remove('active'));

            // Add active class to clicked card
            card.classList.add('active');

            // Update current template
            currentTemplate = parseInt(card.dataset.template);

            // Update preview
            updatePreview();
        });
    });
}

// ===== Image Upload Handling =====
function attachImageUploadListeners() {
    logoUpload.addEventListener('change', handleImageUpload);
    removeImageBtn.addEventListener('click', removeImage);
}

function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedLogo = e.target.result;
        formData.logo = uploadedLogo;

        // Show preview
        previewImg.src = uploadedLogo;
        imagePreview.style.display = 'block';
        uploadText.textContent = 'Change Image';

        // Update main preview
        updatePreview();
    };
    reader.readAsDataURL(file);
}

function removeImage() {
    uploadedLogo = null;
    formData.logo = null;
    imagePreview.style.display = 'none';
    logoUpload.value = '';
    uploadText.textContent = 'Choose Image';
    updatePreview();
}

// ===== Additional Details (Removable Roll Numbers) =====
function attachAdditionalDetailsListeners() {
    // Attach listeners to pre-existing detail fields
    const existingFields = additionalDetailsContainer.querySelectorAll('.custom-field');
    existingFields.forEach(field => {
        const labelInput = field.querySelector('.custom-field-label');
        const valueInput = field.querySelector('.custom-field-value');
        const removeBtn = field.querySelector('.remove-field-btn');

        labelInput.addEventListener('input', updateAllFields);
        valueInput.addEventListener('input', updateAllFields);
        removeBtn.addEventListener('click', () => removeAdditionalDetail(field.dataset.fieldId));
    });

    // Add button for new details
    addDetailBtn.addEventListener('click', addAdditionalDetail);
}

function addAdditionalDetail() {
    customFieldCounter++;
    const fieldId = 'additionalDetail' + customFieldCounter;

    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'custom-field';
    fieldDiv.dataset.fieldId = fieldId;

    fieldDiv.innerHTML = `
        <input type="text" placeholder="Field Label" class="custom-field-label" data-field-id="${fieldId}">
        <input type="text" placeholder="Field Value" class="custom-field-value" data-field-id="${fieldId}">
        <button type="button" class="remove-field-btn" data-field-id="${fieldId}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;

    additionalDetailsContainer.appendChild(fieldDiv);

    // Attach listeners
    const labelInput = fieldDiv.querySelector('.custom-field-label');
    const valueInput = fieldDiv.querySelector('.custom-field-value');
    const removeBtn = fieldDiv.querySelector('.remove-field-btn');

    labelInput.addEventListener('input', updateAllFields);
    valueInput.addEventListener('input', updateAllFields);
    removeBtn.addEventListener('click', () => removeAdditionalDetail(fieldId));
}

function removeAdditionalDetail(fieldId) {
    const field = additionalDetailsContainer.querySelector(`[data-field-id="${fieldId}"]`);
    if (field) {
        field.remove();
        updateAllFields();
    }
}

// ===== Custom Fields =====
function attachCustomFieldListeners() {
    addFieldBtn.addEventListener('click', addCustomField);
}

function addCustomField() {
    customFieldCounter++;
    const fieldId = 'customField' + customFieldCounter;

    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'custom-field';
    fieldDiv.dataset.fieldId = fieldId;

    fieldDiv.innerHTML = `
        <input type="text" placeholder="Field Label" class="custom-field-label" data-field-id="${fieldId}">
        <input type="text" placeholder="Field Value" class="custom-field-value" data-field-id="${fieldId}">
        <button type="button" class="remove-field-btn" data-field-id="${fieldId}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;

    customFieldsContainer.appendChild(fieldDiv);

    // Attach listeners
    const labelInput = fieldDiv.querySelector('.custom-field-label');
    const valueInput = fieldDiv.querySelector('.custom-field-value');
    const removeBtn = fieldDiv.querySelector('.remove-field-btn');

    labelInput.addEventListener('input', updateAllFields);
    valueInput.addEventListener('input', updateAllFields);
    removeBtn.addEventListener('click', () => removeCustomField(fieldId));
}

function updateAllFields() {
    formData.customFields = [];

    // Get all fields from Additional Details section
    const additionalFields = additionalDetailsContainer.querySelectorAll('.custom-field');
    additionalFields.forEach(field => {
        const label = field.querySelector('.custom-field-label').value.trim();
        const value = field.querySelector('.custom-field-value').value.trim();

        if (label && value) {
            formData.customFields.push({ label, value });
        }
    });

    // Get all fields from Custom Fields section
    const customFields = customFieldsContainer.querySelectorAll('.custom-field');
    customFields.forEach(field => {
        const label = field.querySelector('.custom-field-label').value.trim();
        const value = field.querySelector('.custom-field-value').value.trim();

        if (label && value) {
            formData.customFields.push({ label, value });
        }
    });

    updatePreview();
}

// Keep this for legacy compatibility
function updateCustomFields() {
    updateAllFields();
}

function removeCustomField(fieldId) {
    const field = customFieldsContainer.querySelector(`[data-field-id="${fieldId}"]`);
    if (field) {
        field.remove();
        updateAllFields();
    }
}

// ===== Zoom Controls =====
function attachZoomListeners() {
    zoomInBtn.addEventListener('click', () => {
        currentZoom = Math.min(currentZoom + 0.1, 2.0);
        updateZoom();
    });

    zoomOutBtn.addEventListener('click', () => {
        currentZoom = Math.max(currentZoom - 0.1, 0.5);
        updateZoom();
    });
}

function updateZoom() {
    previewContent.style.transform = `scale(${currentZoom})`;
    zoomLevel.textContent = Math.round(currentZoom * 100) + '%';
}

// ===== Preview Update =====
function updatePreview() {
    const renderedHTML = renderTemplate(currentTemplate, formData);

    // Create an iframe to render the template
    const iframe = document.createElement('iframe');
    iframe.style.width = '210mm';
    iframe.style.height = '297mm';
    iframe.style.border = 'none';
    iframe.style.display = 'block';

    previewContent.innerHTML = '';
    previewContent.appendChild(iframe);

    // Write content to iframe
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(renderedHTML);
    iframeDoc.close();
}

// ===== Export Handlers =====
function attachExportListeners() {
    exportPDFBtn.addEventListener('click', handlePDFExport);
    exportPPTBtn.addEventListener('click', handlePPTExport);
    exportWordBtn.addEventListener('click', handleWordExport);
    exportImageBtn.addEventListener('click', handleImageExport);
}

function getExportIframe() {
    // Get the iframe element (for export functions to extract content)
    return previewContent.querySelector('iframe');
}

async function handlePDFExport() {
    const iframe = getExportIframe();
    if (!iframe) {
        alert('Preview not ready. Please wait a moment and try again.');
        return;
    }

    const filename = generateFilename('pdf');
    await exportPDF(iframe, filename);
}

async function handlePPTExport() {
    const iframe = getExportIframe();
    if (!iframe) {
        alert('Preview not ready. Please wait a moment and try again.');
        return;
    }

    const filename = generateFilename('pptx');
    await exportPowerPoint(iframe, formData, filename);
}

async function handleWordExport() {
    const filename = generateFilename('docx');
    await exportWord(formData, filename);
}

async function handleImageExport() {
    const iframe = getExportIframe();
    if (!iframe) {
        alert('Preview not ready. Please wait a moment and try again.');
        return;
    }

    const filename = generateFilename('png');
    await exportImage(iframe, filename);
}

function generateFilename(extension) {
    const studentName = formData.studentName || 'frontpage';
    const safeName = studentName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    return `${safeName}_frontpage.${extension}`;
}

// ===== Initialize on DOM Ready =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
