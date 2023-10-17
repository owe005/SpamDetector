
document.getElementById('inputType').addEventListener('change', function(event) {
    const selectedType = event.target.value;
    if (selectedType === 'text') {
        document.getElementById('textForm').style.display = 'block';
        document.getElementById('imageForm').style.display = 'none';
    } else {
        document.getElementById('textForm').style.display = 'none';
        document.getElementById('imageForm').style.display = 'block';
    }
});

document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        event.target.value = '';
        return;
    }

    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxFileSize) {
        alert('File size exceeds 5MB');
        event.target.value = '';
        return;
    }

    const fileNameDisplay = document.getElementById('fileNameDisplay');
    fileNameDisplay.textContent = 'Selected File: ' + file.name;

});

// Handling form submissions using Fetch API
function handleFormSubmit(formId, endpoint) {
    document.getElementById(formId).addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        fetch(endpoint, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            displayAnalysis(data.analysis);
        })
        .catch(error => {
            console.error(error);
        });
    });
}

handleFormSubmit('textForm', '/analyze-text');
handleFormSubmit('imageForm', '/analyze-image');

function displayAnalysis(analysis) {
    analysis = analysis.replace('Legitimacy:', '<br><br>Legitimacy:')
                       .replace('Reasoning:', '<br><br>Reasoning:');

    const resultDiv = document.querySelector('.result');
    if (!resultDiv) {
        const newResultDiv = document.createElement('div');
        newResultDiv.classList.add('result');
        newResultDiv.innerHTML = '<p>' + analysis + '</p>';
        document.querySelector('.container').appendChild(newResultDiv);
    } else {
        resultDiv.innerHTML = '<p>' + analysis + '</p>';
    }
}
