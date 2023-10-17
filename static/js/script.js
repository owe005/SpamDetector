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