window.addEventListener('DOMContentLoaded', () => {
    const background = document.getElementById('background');

    setTimeout(() => {
        fetch('../background.html')
    .then(response => {
        if (!response.ok) throw new Error('Failed to load background');
        return response.text();
    })
    .then(html => {
        background.innerHTML = html;
        
        void background.offsetWidth;
    })
    .catch(err => {
        console.error(err);
        background.innerHTML = '<p>Background failed to load.</p>';
    });
    }, 0);

});