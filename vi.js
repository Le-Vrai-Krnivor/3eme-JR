const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        const whiteBeltBtn = document.getElementById('white-belt');
        const yellowBeltBtn = document.getElementById('yellow-belt');
        const orangeBeltBtn = document.getElementById('orange-belt');
        const greenBeltBtn = document.getElementById('green-belt');
        const blueBeltBtn = document.getElementById('blue-belt');
        const questionnaire = document.getElementById('questionnaire');
        const questionnaireTitle = document.getElementById('questionnaire-title');
        const questionContainer = document.getElementById('question-container');
        const nextBtn = document.getElementById('next-btn');
        const resultDiv = document.getElementById('result');
        const summaryDiv = document.getElementById('summary');

        themeToggle.addEventListener('click', () => {
            if (body.getAttribute('data-theme') === 'dark') {
                body.removeAttribute('data-theme');
                themeToggle.textContent = 'Mode sombre';
            } else {
                body.setAttribute('data-theme', 'dark');
                themeToggle.textContent = 'Mode clair';
            }
        });

        const whiteBeltQuestions = [
            { verb: "parier", answer: "bet bet bet" },
            { verb: "Diffuser/émettre", answer: "broadcast broadcast broadcast" },
            { verb: "coûter", answer: "cost cost cost" },
            { verb: "couper", answer: "cut cut cut" },
            { verb: "frapper/atteindre", answer: "hit hit hit" },
            { verb: "blesser", answer: "hurt hurt hurt" },
            { verb: "permettre/louer", answer: "let let let" },
            { verb: "mettre", answer: "put put put" },
            { verb: "fixer", answer: "set set set" },
            { verb: "fermer", answer: "shut shut shut" },
            { verb: "répandre", answer: "spread spread spread" }
        ];

        const yellowBeltQuestions = [
            { verb: "être", answer: "be was/were been" },
            { verb: "mordre", answer: "bite bit bitten" },
            { verb: "souffler", answer: "blow blew blown" },
            { verb: "faire", answer: "do did done" },
            { verb: "dessiner", answer: "draw drew drawn" },
            { verb: "aller", answer: "go went gone" },
            { verb: "être allongé", answer: "lie lay lain" },
            { verb: "voir", answer: "see saw seen" },
            { verb: "montrer", answer: "show showed shown" },
            { verb: "porter/supporter", answer: "bear bore born" },
            { verb: "jurer", answer: "swear swore sworn" },
            { verb: "(se) déchirer", answer: "tear tore torn" },
            { verb: "porter (des vêtements)", answer: "wear wore worn" }
        ];

        const orangeBeltQuestions = [
            { verb: "commencer", answer: "begin began begun" },
            { verb: "boire", answer: "drink drank drunk" },
            { verb: "sonner", answer: "ring rang rung"},
            { verb: "chanter", answer: "sing sang sung" },
            { verb: "couler", answer: "sink sank sunk" },
            { verb: "Bondir/jaillir", answer: "spring sprang sprung" },
            { verb: "puer", answer: "stink stank stunk" },
            { verb: "nager", answer: "swim swam swum" },
            { verb: "devenir", answer: "become became become" },
            { verb: "venir", answer: "come came come" },
            { verb: "surmonter", answer: "overcome overcame overcome" },
            { verb: "courir", answer: "run ran run" }
        ];

        const greenBeltQuestions = [
 
            { verb: "voler", answer: "fly flew flown" },
            { verb: "grandir", answer: "grow grew grown" },
            { verb: "savoir/connaitre", answer: "know knew known" },
            { verb: "jeter", answer: "throw threw thrown" },
            { verb: "apporter", answer: "bring brought brought" },
            { verb: "acheter", answer: "buy bought bought" },
            { verb: "attraper", answer: "catch caught caught" },
            { verb: "penser", answer: "think thought thought" }
        ];

        const blueBeltQuestions = [
            { verb: "parier", answer: "bet bet bet" },
            { verb: "Diffuser/émettre", answer: "broadcast broadcast broadcast" },
            { verb: "coûter", answer: "cost cost cost" },
            { verb: "couper", answer: "cut cut cut" },
            { verb: "frapper/atteindre", answer: "hit hit hit" },
            { verb: "blesser", answer: "hurt hurt hurt" },
            { verb: "permettre/louer", answer: "let let let" },
            { verb: "mettre", answer: "put put put" },
            { verb: "fixer", answer: "set set set" },
            { verb: "fermer", answer: "shut shut shut" },
            { verb: "répandre", answer: "spread spread spread" }
        ];


        let currentQuestions = [];
        let currentQuestion = 0;
        let userAnswers = [];

        function displayQuestion() {
            const question = currentQuestions[currentQuestion];
            questionContainer.innerHTML = `
                <div class="question">
                    <label>Donnez le verbe infinitif, le prétérit, le participe passé de "${question.verb}" séparés chacun d'un espace:</label>
                    <input type="text" id="answer-input" required>
                </div>
            `;
        }

        function nextQuestion() {
            const answerInput = document.getElementById('answer-input');
            userAnswers.push(answerInput.value.toLowerCase().trim());
            
            currentQuestion++;
            if (currentQuestion < currentQuestions.length) {
                displayQuestion();
            } else {
                showResults();
            }
        }

        function showResults() {
            nextBtn.style.display = 'none';
            questionContainer.style.display = 'none';

            let score = 0;
            let summaryHTML = '<h3>Récapitulatif :</h3>';

            for (let i = 0; i < currentQuestions.length; i++) {
                const userAnswer = userAnswers[i].replace(/\s+/g, ' ').trim();
                const correctAnswer = currentQuestions[i].answer.replace(/\s+/g, ' ').trim();
                const isCorrect = userAnswer === correctAnswer;
                if (isCorrect) score++;

                summaryHTML += `
                    <p>
                        <strong>${currentQuestions[i].verb} :</strong> 
                        <span class="${isCorrect ? 'correct' : 'incorrect'}">
                            ${userAnswers[i]} ${isCorrect ? '✓' : '✗'}
                        </span>
                        ${!isCorrect ? ` (Correct : ${currentQuestions[i].answer})` : ''}
                    </p>
                `;
            }

            const percentage = (score / currentQuestions.length) * 100;
            resultDiv.innerHTML = `<h3>Votre score : ${score}/${currentQuestions.length} (${percentage.toFixed(2)}%)</h3>`;
            summaryDiv.innerHTML = summaryHTML;
        }

        function startQuestionnaire(questions, title) {
            questionnaire.style.display = 'block';
            questionnaireTitle.textContent = title;
            currentQuestions = questions;
            currentQuestion = 0;
            userAnswers = [];
            nextBtn.style.display = 'block';
            questionContainer.style.display = 'block';
            resultDiv.innerHTML = '';
            summaryDiv.innerHTML = '';
            displayQuestion();
        }

        whiteBeltBtn.addEventListener('click', () => {
            startQuestionnaire(whiteBeltQuestions, 'Questionnaire Ceinture Blanche');
        });

        yellowBeltBtn.addEventListener('click', () => {
            startQuestionnaire(yellowBeltQuestions, 'Questionnaire Ceinture Jaune');
        });

        orangeBeltBtn.addEventListener('click', () => {
            startQuestionnaire(orangeBeltQuestions, 'Questionnaire Ceinture Orange');
        });

        greenBeltBtn.addEventListener('click', () => {
            startQuestionnaire(greenBeltQuestions, 'Questionnaire Ceinture Verte');
        });

        blueBeltBtn.addEventListerner('click', () => {
            startQuestionnaire(blueBeltQuestions, 'Questionnaire Ceinture Bleue');
        });
        nextBtn.addEventListener('click', nextQuestion);

        // Initialize
        questionnaire.style.display = 'none';