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

    uploadImage(file);
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    fileNameDisplay.textContent = 'Selected File: ' + file.name;

});

function uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })

    .then(response => response.json())
    .then(data => {
        console.log(data);
    })

    .catch(error => {
        console.error(error);
    });

}

// Preventing default form submission for text form
document.getElementById('textForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch('/analyze-text', {
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

// Preventing default form submission for image form
document.getElementById('imageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch('/analyze-image', {
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

function displayAnalysis(analysis) {
    // Format the analysis string for better readability using HTML line breaks
    analysis = analysis.replace('Legitimacy:', '<br><br>Legitimacy:')
                        .replace('Reasoning:', '<br><br>Reasoning:')
                        .replace('Confidence:', '<br><br>Confidence:');

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
