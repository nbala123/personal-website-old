window.addEventListener('DOMContentLoaded', () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    fetch('../sidebar.html')
    .then(response => {
        if (!response.ok) throw new Error('Failed to load sidebar');
        return response.text();
    })
    .then(html => {
        document.getElementById('sidebar').innerHTML = html;
        injectSVGs('svg.dynamic-svg');
        
        const darkModeToggle = document.getElementById("dark-mode-toggle");
        if (storedTheme === 'dark') {
            darkModeToggle.checked = true;
        } else {
            darkModeToggle.checked = false;
        }
        darkModeToggle.addEventListener("click", () => {
        toggleDarkMode();
    });
    })
    .catch(err => {
        console.error(err);
        document.getElementById('sidebar').innerHTML = '<p>Sidebar failed to load.</p>';
    });
});

async function injectSVGs(selector) {
    const elements = document.querySelectorAll(selector);
    for (const el of elements) {
        const svgUrl = el.dataset.svg;
        if (!svgUrl) continue;
        const res = await fetch(svgUrl);
        const svgText = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, "image/svg+xml");
        const svgSource = doc.querySelector('svg');
        if (!svgSource) continue;
        // Copy over all paths
        el.innerHTML = svgSource.innerHTML;
        // Copy over viewBox and other attributes
        if (svgSource.hasAttribute('viewBox')) el.setAttribute('viewBox', svgSource.getAttribute('viewBox'));
        // Apply your classes and attributes
        el.setAttribute('fill', 'currentColor');

    }

}


function toggleDarkMode() {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        console.log("Light mode enabled");
    } else {
        html.classList.add('dark');
        console.log("Dark mode enabled");   
    }
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    void background.offsetWidth;
}