Copydocument.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Set initial theme
    if (!html.getAttribute('data-theme')) {
        html.setAttribute('data-theme', 'light');
    }
    
    themeToggle.addEventListener('click', () => {
        console.log('Button clicked!'); // Debug log
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        console.log('Switching to:', newTheme); // Debug log
        html.setAttribute('data-theme', newTheme);
        themeToggle.textContent = `Toggle ${currentTheme === 'light' ? 'Light' : 'Dark'} Mode`;
    });
});
