document.addEventListener('DOMContentLoaded', () => {
    const steps = [
        {
            title: 'Initial Goal',
            question: 'What do you want to do?',
            placeholder: 'Enter your goal here...',
            helper: 'Start with your basic goal idea',
            examples: [
                "I want to lose weight",
                "I want to remodel my basement",
                "I want to learn Spanish"
            ]
        },
        {
            title: 'Specific',
            question: 'What exactly do you want to accomplish?',
            placeholder: 'Be precise about what you want to achieve...',
            helper: 'Include who, what, where, when, why, and how'
        },
        {
            title: 'Measurable',
            question: 'How will you track progress and measure success?',
            placeholder: 'Define concrete criteria...',
            helper: 'Use numbers, quantities, or clear indicators'
        },
        {
            title: 'Achievable',
            question: 'Is this realistic? What resources do you need?',
            placeholder: 'List what you need to accomplish this...',
            helper: 'Consider your capabilities and constraints'
        },
        {
            title: 'Relevant',
            question: 'Why is this goal important to you?',
            placeholder: 'Explain why this matters...',
            helper: 'Align with your broader objectives'
        },
        {
            title: 'Time-bound',
            question: 'When do you want to achieve this by?',
            placeholder: 'Set your deadline...',
            helper: 'Include specific dates or timeframes'
        }
    ];

    let currentStep = 0;
    const formData = {};

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        themeToggle.textContent = `Toggle ${currentTheme === 'light' ? 'Light' : 'Dark'} Mode`;
    });

    // Initialize progress steps
    const progressSteps = document.getElementById('progress-steps');
    steps.forEach((step, index) => {
        const stepElement = document.createElement('div');
        stepElement.className = 'step';
        stepElement.innerHTML = `
            <div class="step-circle ${index === 0 ? 'active' : ''}">${index + 1}</div>
            <div class="step-title">${step.title}</div>
        `;
        progressSteps.appendChild(stepElement);
    });

    // Function to update form content
    function updateForm() {
        const formContainer = document.getElementById('form-container');
        const currentStepData = steps[currentStep];

        formContainer.innerHTML = `
            <h2>${currentStepData.question}</h2>
            <div class="input-group">
                <input 
                    type="text" 
                    id="current-input"
                    placeholder="${currentStepData.placeholder}"
                    value="${formData[currentStep] || ''}"
                >
                <p class="helper-text">${currentStepData.helper}</p>
            </div>
            ${currentStep === 0 ? `
                <div class="example-goals">
                    ${currentStepData.examples.map(example => `
                        <button class="example-goal">${example}</button>
                    `).join('')}
                </div>
            ` : ''}
            <div class="button-group">
                ${currentStep > 0 ? `
                    <button id="back-button">Back</button>
                ` : '<div></div>'}
                <button id="next-button" ${!formData[currentStep] ? 'disabled' : ''}>
                    ${currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                </button>
            </div>
        `;

        // Add event listeners
        const input = document.getElementById('current-input');
        input.addEventListener('input', (e) => {
            formData[currentStep] = e.target.value;
            document.getElementById('next-button').disabled = !e.target.value;
        });

        if (currentStep === 0) {
            document.querySelectorAll('.example-goal').forEach(button => {
                button.addEventListener('click', () => {
                    input.value = button.textContent;
                    formData[currentStep] = button.textContent;
                    document.getElementById('next-button').disabled = false;
                });
            });
        }

        const nextButton = document.getElementById('next-button');
        nextButton.addEventListener('click', () => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                updateForm();
                updateProgress();
            } else {
                showSummary();
            }
        });

        if (currentStep > 0) {
            const backButton = document.getElementById('back-button');
            backButton.addEventListener('click', () => {
                currentStep--;
                updateForm();
                updateProgress();
            });
        }
    }

    function updateProgress() {
        document.querySelectorAll('.step-circle').forEach((circle, index) => {
            circle.classList.toggle('active', index <= currentStep);
        });
    }

    function showSummary() {
        document.getElementById('form-container').style.display = 'none';
        const summaryContainer = document.getElementById('summary-container');
        const summaryContent = document.getElementById('summary-content');
        
        summaryContent.innerHTML = steps.map((step, index) => `
            <div class="summary-item">
                <h3>${step.title}</h3>
                <p>${formData[index]}</p>
            </div>
        `).join('');

        summaryContainer.style.display = 'block';

        document.getElementById('edit-button').addEventListener('click', () => {
            summaryContainer.style.display = 'none';
            document.getElementById('form-container').style.display = 'block';
            currentStep = 0;
            updateForm();
            updateProgress();
        });

        document.getElementById('print-button').addEventListener('click', () => {
            window.print();
        });
    }

    // Initialize the form
    updateForm();
});
