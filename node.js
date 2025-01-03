const fetch = require('node-fetch');

async function checkVulnerabilities(url) {
    try {
        const response = await fetch(url);
        const cookies = response.headers.get('set-cookie');
        
        if (cookies) {
            const sessionCookie = cookies.split(';').find(cookie => cookie.toLowerCase().includes('session'));
            if (sessionCookie) {
                console.log(`Session Cookie found: ${sessionCookie}`);
            }
        }
        
        // Add checks for common vulnerabilities here, e.g., 404 errors
        const body = await response.text();
        if (body.includes("404")) {
            console.log("Possible 404 Vulnerability: Page not found.");
        }
        
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

// Example usage
const url = prompt("Enter the URL to scan: ");
checkVulnerabilities(url);
