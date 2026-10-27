 const checkboxes = document.querySelectorAll(
        'input[type="checkbox"]'
    );

    const progress = document.getElementById('progress');
    const progressFill = document.getElementById('progress-fill');

    //Restore previously saved checkboxes
    const savedProgress = JSON.parse(
           localStorage.getItem('mikeDailyChecks') || '[]'
    );

    checkboxes.forEach(function(checkbox, index) {
        checkbox.checked = savedProgress[index] === true;
    });
    
    // Update the display and save progress
    function updateProgress() {
        const completed = document.querySelectorAll(
            'input[type="checkbox"]:checked'
        ).length;

        const percentage = Math.round(
            (completed / checkboxes.length) * 100
        );

        progress.textContent =
            completed + ' of ' + checkboxes.length + ' goals completed';

        progressFill.style.width = percentage + '%';
        progressFill.textContent = percentage + '%';
        
        // Save the current checkbox states
        const currentProgress = Array.from(checkboxes).map(
            function(checkbox) {
                return checkbox.checked;
            }
        );

        localStorage.setItem(
            'mikeDailyChecks',
            JSON.stringify(currentProgress)
        );
    }

    // Listen for checkbox changes
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', updateProgress);
    });

    // Display the correct progress immediately
    updateProgress();

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('./service-worker.js')
                .then(function() {
                    console.log('Offline support is ready!');
                })
                .catch(function(error) {
                    console.error('Service worker registration failed:', error);
                });
        });
    }