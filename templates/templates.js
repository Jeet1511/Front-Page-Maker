// Template Registry
const templates = {
    1: {
        name: 'Modern Blue',
        render: function (data) {
            return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Front Page - ${data.studentName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        @page {
            size: A4;
            margin: 0;
        }

        body {
            font-family: 'Georgia', 'Times New Roman', serif;
            background-color: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .a4-page {
            width: 210mm;
            height: 297mm;
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            padding: 40mm 20mm;
            position: relative;
            overflow: hidden;
        }

        .a4-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 8mm;
            background: linear-gradient(90deg, #1e3a8a 0%, #3b82f6 50%, #1e3a8a 100%);
        }

        .a4-page::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 8mm;
            background: linear-gradient(90deg, #1e3a8a 0%, #3b82f6 50%, #1e3a8a 100%);
        }

        .logo-container {
            text-align: center;
            margin-bottom: 15mm;
        }

        .logo-container img {
            width: 80mm;
            height: auto;
            max-height: 80mm;
            object-fit: contain;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
        }

        .content {
            text-align: center;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;
            max-width: 150mm;
        }

        .title-section {
            margin-bottom: 20mm;
            padding: 15mm 10mm;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
            border: 2px solid #e5e7eb;
        }

        .course-title {
            font-size: 28pt;
            font-weight: bold;
            color: #1e3a8a;
            margin-bottom: 8mm;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        .info-table {
            width: 100%;
            margin-top: 10mm;
            border-collapse: collapse;
        }

        .info-row {
            margin-bottom: 5mm;
        }

        .info-label {
            font-size: 12pt;
            color: #374151;
            font-weight: 600;
            text-align: left;
            padding: 4mm 0;
            border-bottom: 1px solid #e5e7eb;
        }

        .info-value {
            font-size: 12pt;
            color: #1f2937;
            text-align: right;
            padding: 4mm 0;
            font-weight: 500;
            border-bottom: 1px solid #e5e7eb;
        }

        .student-name {
            font-size: 22pt;
            font-weight: bold;
            color: #1e3a8a;
            margin-bottom: 12mm;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .institution-section {
            margin-top: 15mm;
            padding-top: 10mm;
            border-top: 2px solid #1e3a8a;
        }

        .college-name {
            font-size: 16pt;
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 3mm;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .university-name {
            font-size: 14pt;
            font-weight: 600;
            color: #3b82f6;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
    </style>
</head>
<body>
    <div class="a4-page">
        <div class="logo-container">
            ${data.logo ? `<img src="${data.logo}" alt="Institution Logo">` : ''}
        </div>

        <div class="content">
            <div class="title-section">
                <div class="course-title">${data.courseTitle || 'Course Title'}</div>
                <div class="student-name">${data.studentName || 'Student Name'}</div>
                
                <table class="info-table">
                    ${data.department ? `<tr class="info-row">
                        <td class="info-label">Department</td>
                        <td class="info-value">${data.department}</td>
                    </tr>` : ''}
                    ${data.collegeRoll ? `<tr class="info-row">
                        <td class="info-label">College Roll No</td>
                        <td class="info-value">${data.collegeRoll}</td>
                    </tr>` : ''}
                    ${data.universityRoll ? `<tr class="info-row">
                        <td class="info-label">University Roll No</td>
                        <td class="info-value">${data.universityRoll}</td>
                    </tr>` : ''}
                    ${data.registrationNo ? `<tr class="info-row">
                        <td class="info-label">Registration No</td>
                        <td class="info-value">${data.registrationNo}</td>
                    </tr>` : ''}
                    ${data.customFields.map(field => `<tr class="info-row">
                        <td class="info-label">${field.label}</td>
                        <td class="info-value">${field.value}</td>
                    </tr>`).join('')}
                </table>
            </div>

            <div class="institution-section">
                <div class="college-name">${data.collegeName || 'College Name'}</div>
                <div class="university-name">${data.universityName || 'University Name'}</div>
            </div>
        </div>
    </div>
</body>
</html>`;
        }
    },

    2: {
        name: 'Classic',
        render: function (data) {
            return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Front Page - ${data.studentName}</title>
    <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Lato:wght@400;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        @page {
            size: A4;
            margin: 0;
        }

        body {
            font-family: 'Lato', sans-serif;
            background-color: #f8f9fa;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .a4-page {
            width: 210mm;
            height: 297mm;
            background: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 30mm 25mm;
            position: relative;
        }

        .top-border {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4mm;
            background: #1e3a8a;
        }

        .bottom-border {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 4mm;
            background: #1e3a8a;
        }

        .logo-container {
            text-align: center;
            margin-bottom: 20mm;
            padding-bottom: 15mm;
            border-bottom: 2px solid #e5e7eb;
        }

        .logo-container img {
            width: 70mm;
            height: auto;
            max-height: 70mm;
            object-fit: contain;
        }

        .content {
            text-align: center;
            width: 100%;
            max-width: 160mm;
        }

        .course-title {
            font-family: 'Libre Baskerville', serif;
            font-size: 32pt;
            font-weight: 700;
            color: #1e3a8a;
            margin-bottom: 8mm;
            letter-spacing: 3px;
            text-transform: uppercase;
        }

        .student-name {
            font-family: 'Libre Baskerville', serif;
            font-size: 24pt;
            font-weight: 700;
            color: #d97706;
            margin-bottom: 15mm;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .info-section {
            margin: 15mm 0;
        }

        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15mm;
        }

        .info-row {
            border-bottom: 1px solid #e5e7eb;
        }

        .info-row:last-child {
            border-bottom: none;
        }

        .info-label {
            font-size: 11pt;
            color: #6b7280;
            font-weight: 600;
            text-align: left;
            padding: 4mm 0;
        }

        .info-value {
            font-size: 11pt;
            color: #1f2937;
            text-align: right;
            padding: 4mm 0;
            font-weight: 400;
        }

        .institution-section {
            margin-top: 20mm;
            padding-top: 15mm;
            border-top: 2px solid #e5e7eb;
        }

        .college-name {
            font-family: 'Libre Baskerville', serif;
            font-size: 16pt;
            font-weight: 700;
            color: #1e3a8a;
            margin-bottom: 3mm;
            text-transform: uppercase;
            letter-spacing: 1.5px;
        }

        .university-name {
            font-size: 13pt;
            font-weight: 600;
            color: #4b5563;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
    </style>
</head>
<body>
    <div class="a4-page">
        <div class="top-border"></div>
        <div class="bottom-border"></div>

        <div class="logo-container">
            ${data.logo ? `<img src="${data.logo}" alt="Institution Logo">` : ''}
        </div>

        <div class="content">
            <div class="course-title">${data.courseTitle || 'Course Title'}</div>
            <div class="student-name">${data.studentName || 'Student Name'}</div>

            <div class="info-section">
                <table class="info-table">
                    ${data.department ? `<tr class="info-row">
                        <td class="info-label">Department</td>
                        <td class="info-value">${data.department}</td>
                    </tr>` : ''}
                    ${data.collegeRoll ? `<tr class="info-row">
                        <td class="info-label">College Roll No</td>
                        <td class="info-value">${data.collegeRoll}</td>
                    </tr>` : ''}
                    ${data.universityRoll ? `<tr class="info-row">
                        <td class="info-label">University Roll No</td>
                        <td class="info-value">${data.universityRoll}</td>
                    </tr>` : ''}
                    ${data.registrationNo ? `<tr class="info-row">
                        <td class="info-label">Registration No</td>
                        <td class="info-value">${data.registrationNo}</td>
                    </tr>` : ''}
                    ${data.customFields.map(field => `<tr class="info-row">
                        <td class="info-label">${field.label}</td>
                        <td class="info-value">${field.value}</td>
                    </tr>`).join('')}
                </table>
            </div>

            <div class="institution-section">
                <div class="college-name">${data.collegeName || 'College Name'}</div>
                <div class="university-name">${data.universityName || 'University Name'}</div>
            </div>
        </div>
    </div>
</body>
</html>`;
        }
    },

    3: {
        name: 'Formal',
        render: function (data) {
            return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Front Page - ${data.studentName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        @page {
            size: A4;
            margin: 0;
        }

        body {
            font-family: 'Times New Roman', Times, serif;
            background-color: #e5e5e5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .a4-page {
            width: 210mm;
            height: 297mm;
            background: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 25mm;
            position: relative;
        }

        .outer-border {
            position: absolute;
            top: 15mm;
            left: 15mm;
            right: 15mm;
            bottom: 15mm;
            border: 3px double #000;
            pointer-events: none;
        }

        .inner-border {
            position: absolute;
            top: 18mm;
            left: 18mm;
            right: 18mm;
            bottom: 18mm;
            border: 1px solid #000;
            pointer-events: none;
        }

        .content-wrapper {
            text-align: center;
            max-width: 150mm;
            z-index: 1;
        }

        .logo-section {
            margin-bottom: 25mm;
        }

        .logo-section img {
            width: 60mm;
            height: auto;
            max-height: 60mm;
            object-fit: contain;
        }

        .divider-line {
            width: 80mm;
            height: 2px;
            background: #000;
            margin: 15mm auto;
        }

        .course-name {
            font-size: 18pt;
            font-weight: bold;
            color: #000;
            margin-bottom: 20mm;
            letter-spacing: 6px;
            text-transform: uppercase;
        }

        .submitted-by {
            font-size: 12pt;
            font-weight: normal;
            color: #000;
            margin-bottom: 8mm;
            font-style: italic;
        }

        .student-name {
            font-size: 20pt;
            font-weight: bold;
            color: #000;
            margin-bottom: 20mm;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .details-section {
            text-align: left;
            margin: 15mm auto;
            max-width: 130mm;
        }

        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5mm;
            padding-bottom: 3mm;
            border-bottom: 1px dotted #999;
        }

        .detail-row:last-child {
            border-bottom: none;
        }

        .detail-label {
            font-size: 11pt;
            color: #000;
            font-weight: bold;
        }

        .detail-value {
            font-size: 11pt;
            color: #000;
            font-weight: normal;
        }

        .institution-block {
            margin-top: 25mm;
            text-align: center;
        }

        .college-name {
            font-size: 14pt;
            font-weight: bold;
            color: #000;
            margin-bottom: 4mm;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .university-name {
            font-size: 12pt;
            font-weight: bold;
            color: #000;
            text-transform: uppercase;
            letter-spacing: 1.5px;
        }
    </style>
</head>
<body>
    <div class="a4-page">
        <div class="outer-border"></div>
        <div class="inner-border"></div>

        <div class="content-wrapper">
            <div class="logo-section">
                ${data.logo ? `<img src="${data.logo}" alt="Institution Logo">` : ''}
            </div>

            <div class="course-name">${data.courseTitle || 'Course Title'}</div>

            <div class="divider-line"></div>

            <div class="submitted-by">Submitted by</div>
            <div class="student-name">${data.studentName || 'Student Name'}</div>

            <div class="details-section">
                ${data.department ? `<div class="detail-row">
                    <span class="detail-label">Department</span>
                    <span class="detail-value">${data.department}</span>
                </div>` : ''}
                ${data.collegeRoll ? `<div class="detail-row">
                    <span class="detail-label">College Roll No.</span>
                    <span class="detail-value">${data.collegeRoll}</span>
                </div>` : ''}
                ${data.universityRoll ? `<div class="detail-row">
                    <span class="detail-label">University Roll No.</span>
                    <span class="detail-value">${data.universityRoll}</span>
                </div>` : ''}
                ${data.registrationNo ? `<div class="detail-row">
                    <span class="detail-label">Registration No.</span>
                    <span class="detail-value">${data.registrationNo}</span>
                </div>` : ''}
                ${data.customFields.map(field => `<div class="detail-row">
                    <span class="detail-label">${field.label}</span>
                    <span class="detail-value">${field.value}</span>
                </div>`).join('')}
            </div>

            <div class="divider-line"></div>

            <div class="institution-block">
                <div class="college-name">${data.collegeName || 'College Name'}</div>
                <div class="university-name">${data.universityName || 'University Name'}</div>
            </div>
        </div>
    </div>
</body>
</html>`;
        }
    },

    4: {
        name: 'Professional',
        render: function (data) {
            return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Front Page - ${data.studentName}</title>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        @page {
            size: A4;
            margin: 0;
        }

        body {
            font-family: 'Times New Roman', Times, serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .a4-page {
            width: 210mm;
            height: 297mm;
            background: white;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 25mm;
            position: relative;
        }

        .outer-border {
            position: absolute;
            top: 12mm;
            left: 12mm;
            right: 12mm;
            bottom: 12mm;
            border: 2.5px solid #1e293b;
            pointer-events: none;
            border-radius: 4px;
        }

        .inner-border {
            position: absolute;
            top: 16mm;
            left: 16mm;
            right: 16mm;
            bottom: 16mm;
            border: 1px solid #cbd5e1;
            pointer-events: none;
            border-radius: 2px;
        }

        .corner-accent {
            position: absolute;
            width: 12mm;
            height: 12mm;
            border: 2px solid #3b82f6;
        }

        .corner-accent.top-left {
            top: 14mm;
            left: 14mm;
            border-right: none;
            border-bottom: none;
        }

        .corner-accent.top-right {
            top: 14mm;
            right: 14mm;
            border-left: none;
            border-bottom: none;
        }

        .corner-accent.bottom-left {
            bottom: 14mm;
            left: 14mm;
            border-right: none;
            border-top: none;
        }

        .corner-accent.bottom-right {
            bottom: 14mm;
            right: 14mm;
            border-left: none;
            border-top: none;
        }

        .content-wrapper {
            text-align: center;
            max-width: 150mm;
            z-index: 1;
        }

        .logo-section {
            margin-bottom: 20mm;
            position: relative;
        }

        .logo-section img {
            width: 55mm;
            height: auto;
            max-height: 55mm;
            object-fit: contain;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        .course-name {
            font-size: 18pt;
            font-weight: bold;
            color: #1e293b;
            letter-spacing: 6px;
            margin-bottom: 15mm;
            text-transform: uppercase;
        }

        .divider-line {
            width: 70mm;
            height: 1px;
            background: linear-gradient(90deg, transparent, #cbd5e1, transparent);
            margin: 12mm auto;
        }

        .submitted-by {
            font-size: 11pt;
            font-weight: normal;
            font-style: italic;
            color: #64748b;
            margin-bottom: 6mm;
        }

        .student-name {
            font-size: 22pt;
            font-weight: bold;
            background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .details-section {
            text-align: left;
            margin: 12mm auto;
            max-width: 135mm;
            background: #f8fafc;
            padding: 6mm;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
        }

        .detail-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 4mm;
            padding: 3mm;
            background: white;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
        }

        .detail-row:last-child {
            margin-bottom: 0;
        }

        .detail-label {
            font-size: 10pt;
            color: #475569;
            font-weight: 600;
        }

        .detail-value {
            font-size: 10pt;
            color: #1e293b;
            font-weight: 500;
        }

        .institution-block {
            margin-top: 18mm;
            text-align: center;
            padding: 6mm;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 8px;
            border: 1px solid #cbd5e1;
        }

        .college-name {
            font-size: 14pt;
            font-weight: bold;
            color: #1e293b;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 3mm;
        }

        .university-name {
            font-size: 11pt;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
    </style>
</head>
<body>
    <div class="a4-page">
        <div class="outer-border"></div>
        <div class="inner-border"></div>

        <div class="corner-accent top-left"></div>
        <div class="corner-accent top-right"></div>
        <div class="corner-accent bottom-left"></div>
        <div class="corner-accent bottom-right"></div>

        <div class="content-wrapper">
            <div class="logo-section">
                ${data.logo ? `<img src="${data.logo}" alt="Institution Logo">` : ''}
            </div>

            <div class="course-name">${data.courseTitle || 'Course Title'}</div>

            <div class="divider-line"></div>

            <div class="submitted-by">Submitted by</div>

            <div class="student-name">${data.studentName || 'Student Name'}</div>

            <div class="details-section">
                ${data.department ? `<div class="detail-row">
                    <span class="detail-label">Department</span>
                    <span class="detail-value">${data.department}</span>
                </div>` : ''}
                ${data.collegeRoll ? `<div class="detail-row">
                    <span class="detail-label">College Roll No.</span>
                    <span class="detail-value">${data.collegeRoll}</span>
                </div>` : ''}
                ${data.universityRoll ? `<div class="detail-row">
                    <span class="detail-label">University Roll No.</span>
                    <span class="detail-value">${data.universityRoll}</span>
                </div>` : ''}
                ${data.registrationNo ? `<div class="detail-row">
                    <span class="detail-label">Registration No.</span>
                    <span class="detail-value">${data.registrationNo}</span>
                </div>` : ''}
                ${data.customFields.map(field => `<div class="detail-row">
                    <span class="detail-label">${field.label}</span>
                    <span class="detail-value">${field.value}</span>
                </div>`).join('')}
            </div>

            <div class="divider-line"></div>

            <div class="institution-block">
                <div class="college-name">${data.collegeName || 'College Name'}</div>
                <div class="university-name">${data.universityName || 'University Name'}</div>
            </div>
        </div>
    </div>
</body>
</html>`;
        }
    },

    5: {
        name: 'Minimalist',
        render: function (data) {
            return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Front Page - ${data.studentName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        @page {
            size: A4;
            margin: 0;
        }

        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .a4-page {
            width: 210mm;
            height: 297mm;
            background: #ffffff;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40mm 30mm;
            position: relative;
        }

        .a4-page::before, .a4-page::after {
            content: '';
            position: absolute;
            background: #000;
        }

        .a4-page::before {
            top: 20mm;
            left: 20mm;
            right: 20mm;
            height: 0.5mm;
        }

        .a4-page::after {
            bottom: 20mm;
            left: 20mm;
            right: 20mm;
            height: 0.5mm;
        }

        .logo-container {
            margin-bottom: 40px;
        }

        .logo {
            width: 80px;
            height: 80px;
            border: 2px solid #000;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
        }

        .logo img {
            max-width: 60px;
            max-height: 60px;
            object-fit: contain;
        }

        .course-title {
            font-size: 28px;
            font-weight: 300;
            letter-spacing: 8px;
            text-transform: uppercase;
            margin-bottom: 60px;
            text-align: center;
            color: #000;
        }

        .divider {
            width: 60px;
            height: 1px;
            background: #000;
            margin: 40px auto;
        }

        .student-name {
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 15px;
            text-align: center;
            color: #000;
            letter-spacing: 2px;
        }

        .department {
            font-size: 16px;
            font-weight: 400;
            margin-bottom: 80px;
            text-align: center;
            color: #666;
            letter-spacing: 1px;
        }

        .custom-fields {
            margin-bottom: 60px;
            text-align: center;
        }

        .custom-field {
            font-size: 14px;
            margin: 8px 0;
            color: #333;
            font-weight: 300;
        }

        .custom-field-label {
            font-weight: 500;
            margin-right: 10px;
        }

        .institution-info {
            text-align: center;
        }

        .college-name {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 8px;
            color: #000;
            letter-spacing: 1px;
        }

        .university-name {
            font-size: 14px;
            font-weight: 400;
            color: #666;
            letter-spacing: 0.5px;
        }
    </style>
</head>
<body>
    <div class="a4-page">
        ${data.logo ? `
        <div class="logo-container">
            <div class="logo">
                <img src="${data.logo}" alt="Logo">
            </div>
        </div>
        ` : ''}

        <div class="course-title">${data.courseTitle || 'COURSE TITLE'}</div>

        <div class="divider"></div>

        <div class="student-name">${data.studentName || 'Student Name'}</div>
        <div class="department">${data.department || 'Department'}</div>

        ${data.customFields && data.customFields.length > 0 ? `
        <div class="custom-fields">
            ${data.customFields.map(field => `
                <div class="custom-field">
                    <span class="custom-field-label">${field.label}:</span>
                    <span class="custom-field-value">${field.value}</span>
                </div>
            `).join('')}
        </div>
        ` : ''}

        <div class="institution-info">
            <div class="college-name">${data.collegeName || 'College Name'}</div>
            <div class="university-name">${data.universityName || 'University Name'}</div>
        </div>
    </div>
</body>
</html>`;
        }
    },

    6: {
        name: 'Corporate',
        render: function (data) {
            return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Front Page - ${data.studentName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        @page {
            size: A4;
            margin: 0;
        }

        body {
            font-family: 'Arial', sans-serif;
            background-color: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .a4-page {
            width: 210mm;
            height: 297mm;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40mm 30mm;
            position: relative;
            overflow: hidden;
        }

        .a4-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 8mm;
            background: linear-gradient(90deg, #c9a227 0%, #f4d03f 50%, #c9a227 100%);
        }

        .a4-page::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 8mm;
            background: linear-gradient(90deg, #c9a227 0%, #f4d03f 50%, #c9a227 100%);
        }

        .accent-line {
            position: absolute;
            right: 20mm;
            top: 25mm;
            bottom: 25mm;
            width: 2px;
            background: linear-gradient(180deg, #c9a227 0%, #f4d03f 50%, #c9a227 100%);
        }

        .logo-container {
            margin-bottom: 40px;
        }

        .logo {
            width: 90px;
            height: 90px;
            background: rgba(255, 255, 255, 0.1);
            border: 3px solid #f4d03f;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            box-shadow: 0 0 30px rgba(244, 208, 63, 0.3);
        }

        .logo img {
            max-width: 65px;
            max-height: 65px;
            object-fit: contain;
        }

        .course-title {
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 4px;
            text-transform: uppercase;
            margin-bottom: 50px;
            text-align: center;
            color: #f4d03f;
            text-shadow: 0 2px 10px rgba(244, 208, 63, 0.3);
        }

        .student-section {
            background: rgba(255, 255, 255, 0.05);
            border-left: 4px solid #f4d03f;
            padding: 30px 40px;
            margin-bottom: 50px;
            width: 100%;
            max-width: 500px;
        }

        .student-name {
            font-size: 38px;
            font-weight: 700;
            margin-bottom: 12px;
            color: #ffffff;
            letter-spacing: 2px;
        }

        .department {
            font-size: 18px;
            font-weight: 400;
            color: #c9a227;
            letter-spacing: 1px;
        }

        .custom-fields {
            margin-bottom: 50px;
            width: 100%;
            max-width: 500px;
        }

        .custom-field {
            display: flex;
            justify-content: space-between;
            padding: 12px 20px;
            margin: 8px 0;
            background: rgba(255, 255, 255, 0.05);
            border-left: 2px solid #c9a227;
            font-size: 14px;
            color: #ffffff;
        }

        .custom-field-label {
            font-weight: 600;
            color: #f4d03f;
        }

        .institution-info {
            text-align: center;
            padding: 25px;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 8px;
            width: 100%;
            max-width: 500px;
        }

        .college-name {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 10px;
            color: #ffffff;
            letter-spacing: 1px;
        }

        .university-name {
            font-size: 16px;
            font-weight: 400;
            color: #c9a227;
            letter-spacing: 0.5px;
        }
    </style>
</head>
<body>
    <div class="a4-page">
        <div class="accent-line"></div>
        
        ${data.logo ? `
        <div class="logo-container">
            <div class="logo">
                <img src="${data.logo}" alt="Logo">
            </div>
        </div>
        ` : ''}

        <div class="course-title">${data.courseTitle || 'COURSE TITLE'}</div>

        <div class="student-section">
            <div class="student-name">${data.studentName || 'Student Name'}</div>
            <div class="department">${data.department || 'Department'}</div>
        </div>

        ${data.customFields && data.customFields.length > 0 ? `
        <div class="custom-fields">
            ${data.customFields.map(field => `
                <div class="custom-field">
                    <span class="custom-field-label">${field.label}</span>
                    <span class="custom-field-value">${field.value}</span>
                </div>
            `).join('')}
        </div>
        ` : ''}

        <div class="institution-info">
            <div class="college-name">${data.collegeName || 'College Name'}</div>
            <div class="university-name">${data.universityName || 'University Name'}</div>
        </div>
    </div>
</body>
</html>`;
        }
    },

    7: {
        name: 'Elegant',
        render: function (data) {
            return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Front Page - ${data.studentName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        @page {
            size: A4;
            margin: 0;
        }

        body {
            font-family: 'Palatino', 'Book Antiqua', serif;
            background-color: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .a4-page {
            width: 210mm;
            height: 297mm;
            background: linear-gradient(135deg, #faf8f3 0%, #f5f0e8 100%);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40mm 30mm;
            position: relative;
        }

        .a4-page::before, .a4-page::after,
        .a4-page .corner-tl, .a4-page .corner-tr,
        .a4-page .corner-bl, .a4-page .corner-br {
            content: '';
            position: absolute;
            width: 40px;
            height: 40px;
            border: 2px solid #8b7355;
        }

        .corner-tl { top: 20mm; left: 20mm; border-right: none; border-bottom: none; }
        .corner-tr { top: 20mm; right: 20mm; border-left: none; border-bottom: none; }
        .corner-bl { bottom: 20mm; left: 20mm; border-right: none; border-top: none; }
        .corner-br { bottom: 20mm; right: 20mm; border-left: none; border-top: none; }

        .ornament {
            text-align: center;
            font-size: 30px;
            color: #8b7355;
            margin: 30px 0;
        }

        .logo-container {
            margin-bottom: 30px;
        }

        .logo {
            width: 85px;
            height: 85px;
            border: 3px double #8b7355;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            background: #ffffff;
        }

        .logo img {
            max-width: 60px;
            max-height: 60px;
            object-fit: contain;
        }

        .course-title {
            font-size: 34px;
            font-weight: 400;
            font-style: italic;
            margin-bottom: 40px;
            text-align: center;
            color: #4a4039;
            letter-spacing: 3px;
        }

        .divider {
            width: 150px;
            height: 1px;
            background: linear-gradient(90deg, transparent, #8b7355, transparent);
            margin: 30px auto;
        }

        .student-name {
            font-size: 42px;
            font-weight: 600;
            margin-bottom: 15px;
            text-align: center;
            color: #2d2620;
            letter-spacing: 2px;
        }

        .department {
            font-size: 18px;
            font-weight: 400;
            font-style: italic;
            margin-bottom: 50px;
            text-align: center;
            color: #6b5d52;
        }

        .custom-fields {
            margin-bottom: 50px;
            text-align: center;
            padding: 20px 40px;
            background: rgba(139, 115, 85, 0.05);
            border-top: 1px solid #8b7355;
            border-bottom: 1px solid #8b7355;
        }

        .custom-field {
            font-size: 15px;
            margin: 10px 0;
            color: #4a4039;
        }

        .custom-field-label {
            font-weight: 600;
            margin-right: 12px;
            color: #2d2620;
        }

        .institution-info {
            text-align: center;
        }

        .college-name {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 10px;
            color: #2d2620;
            letter-spacing: 2px;
        }

        .university-name {
            font-size: 16px;
            font-weight: 400;
            font-style: italic;
            color: #6b5d52;
        }
    </style>
</head>
<body>
    <div class="a4-page">
        <div class="corner-tl"></div>
        <div class="corner-tr"></div>
        <div class="corner-bl"></div>
        <div class="corner-br"></div>

        <div class="ornament">❖</div>

        ${data.logo ? `
        <div class="logo-container">
            <div class="logo">
                <img src="${data.logo}" alt="Logo">
            </div>
        </div>
        ` : ''}

        <div class="course-title">${data.courseTitle || 'Course Title'}</div>

        <div class="divider"></div>

        <div class="student-name">${data.studentName || 'Student Name'}</div>
        <div class="department">${data.department || 'Department'}</div>

        ${data.customFields && data.customFields.length > 0 ? `
        <div class="custom-fields">
            ${data.customFields.map(field => `
                <div class="custom-field">
                    <span class="custom-field-label">${field.label}:</span>
                    <span class="custom-field-value">${field.value}</span>
                </div>
            `).join('')}
        </div>
        ` : ''}

        <div class="divider"></div>

        <div class="institution-info">
            <div class="college-name">${data.collegeName || 'College Name'}</div>
            <div class="university-name">${data.universityName || 'University Name'}</div>
        </div>

        <div class="ornament">❖</div>
    </div>
</body>
</html>`;
        }
    },

    8: {
        name: 'Creative',
        render: function (data) {
            return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Front Page - ${data.studentName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        @page {
            size: A4;
            margin: 0;
        }

        body {
            font-family: 'Segoe UI', Tahoma, sans-serif;
            background-color: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .a4-page {
            width: 210mm;
            height: 297mm;
            background: #ffffff;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40mm 30mm;
            position: relative;
            overflow: hidden;
        }

        .a4-page::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #667eea 75%, #764ba2 100%);
            opacity: 0.08;
            transform: rotate(-45deg);
        }

        .gradient-bar {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 15mm;
            background: linear-gradient(180deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        }

        .content-wrapper {
            position: relative;
            z-index: 1;
            width: 100%;
        }

        .logo-container {
            margin-bottom: 35px;
            text-align: center;
        }

        .logo {
            width: 90px;
            height: 90px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
            transform: rotate(-5deg);
        }

        .logo img {
            max-width: 60px;
            max-height: 60px;
            object-fit: contain;
            transform: rotate(5deg);
        }

        .course-title {
            font-size: 36px;
            font-weight: 800;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 45px;
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .student-card {
            background: #ffffff;
            border-radius: 15px;
            padding: 35px;
            margin-bottom: 40px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            border-left: 5px solid #667eea;
        }

        .student-name {
            font-size: 40px;
            font-weight: 700;
            margin-bottom: 12px;
            color: #2d3748;
            letter-spacing: 1px;
        }

        .department {
            font-size: 18px;
            font-weight: 500;
            color: #667eea;
            letter-spacing: 1px;
        }

        .custom-fields {
            margin-bottom: 40px;
        }

        .custom-field {
            display: flex;
            justify-content: space-between;
            padding: 12px 20px;
            margin: 10px 0;
            background: linear-gradient(90deg, rgba(102, 126, 234, 0.05) 0%, rgba(240, 147, 251, 0.05) 100%);
            border-radius: 8px;
            font-size: 15px;
            color: #2d3748;
            border-left: 3px solid #764ba2;
        }

        .custom-field-label {
            font-weight: 600;
            color: #667eea;
        }

        .institution-info {
            text-align: center;
            padding: 25px;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(240, 147, 251, 0.1) 100%);
            border-radius: 12px;
        }

        .college-name {
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 10px;
            color: #2d3748;
            letter-spacing: 1px;
        }

        .university-name {
            font-size: 16px;
            font-weight: 500;
            color: #764ba2;
        }

        .decoration-circle {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            opacity: 0.1;
        }

        .circle-1 { top: 50mm; right: 25mm; width: 80px; height: 80px; }
        .circle-2 { bottom: 60mm; right: 35mm; width: 50px; height: 50px; }
        .circle-3 { top: 80mm; right: 15mm; width: 30px; height: 30px; }
    </style>
</head>
<body>
    <div class="a4-page">
        <div class="gradient-bar"></div>
        <div class="decoration-circle circle-1"></div>
        <div class="decoration-circle circle-2"></div>
        <div class="decoration-circle circle-3"></div>

        <div class="content-wrapper">
            ${data.logo ? `
            <div class="logo-container">
                <div class="logo">
                    <img src="${data.logo}" alt="Logo">
                </div>
            </div>
            ` : ''}

            <div class="course-title">${data.courseTitle || 'COURSE TITLE'}</div>

            <div class="student-card">
                <div class="student-name">${data.studentName || 'Student Name'}</div>
                <div class="department">${data.department || 'Department'}</div>
            </div>

            ${data.customFields && data.customFields.length > 0 ? `
            <div class="custom-fields">
                ${data.customFields.map(field => `
                    <div class="custom-field">
                        <span class="custom-field-label">${field.label}</span>
                        <span class="custom-field-value">${field.value}</span>
                    </div>
                `).join('')}
            </div>
            ` : ''}

            <div class="institution-info">
                <div class="college-name">${data.collegeName || 'College Name'}</div>
                <div class="university-name">${data.universityName || 'University Name'}</div>
            </div>
        </div>
    </div>
</body>
</html>`;
        }
    }
};


// Get template by ID
function getTemplate(id) {
    return templates[id];
}

// Render template with data
function renderTemplate(templateId, data) {
    const template = templates[templateId];
    if (!template) {
        console.error('Template not found:', templateId);
        return '';
    }
    return template.render(data);
}
