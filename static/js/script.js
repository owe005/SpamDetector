
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

function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    document.querySelector('.drop-zone').classList.add('dragging');
}

function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    document.querySelector('.drop-zone').classList.remove('dragging');
}

function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    document.querySelector('.drop-zone').classList.remove('dragging');

    // Check if the data being dropped is a file
    if (event.dataTransfer.items && event.dataTransfer.items[0].kind === 'file') {
        const file = event.dataTransfer.items[0].getAsFile();
        document.getElementById('imageUpload').files = event.dataTransfer.files;
        uploadImage(file);  // Use the existing uploadImage function
    }
}
