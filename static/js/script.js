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

        // Provide feedback with a loading spinner or message
        const loadingMessage = document.createElement('p');
        loadingMessage.textContent = 'Analyzing... Please wait.';
        const container = document.querySelector('.container');
        container.appendChild(loadingMessage);

        const formData = new FormData(event.target);
        fetch(endpoint, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            displayAnalysis(data.analysis);
            container.removeChild(loadingMessage); // Remove loading message after analysis
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

// Dark mode toggle functionality
const darkModeToggle = document.createElement('button');
darkModeToggle.textContent = 'Toggle Dark Mode';
darkModeToggle.style.position = 'fixed';
darkModeToggle.style.top = '10px';
darkModeToggle.style.right = '10px';
darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});
document.body.appendChild(darkModeToggle);

function handleDrop(event) {
    event.preventDefault();
    
    const dropZone = event.currentTarget;
    dropZone.classList.remove('active-drag');

    const fileInput = document.getElementById('imageUpload');
    const dataTransfer = event.dataTransfer;
    const files = dataTransfer.files;

    if (files.length) {
        fileInput.files = files;
        document.getElementById('fileNameDisplay').textContent = 'Selected File: ' + files[0].name;
    }
}

function handleDragOver(event) {
    event.preventDefault();
    
    const dropZone = event.currentTarget;
    dropZone.classList.add('active-drag');
}

function handleDragLeave(event) {
    const dropZone = event.currentTarget;
    dropZone.classList.remove('active-drag');
}