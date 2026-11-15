
/* =========================================
   NCERT STUDY HUB
   COMPLETE JAVASCRIPT
   CLASSES 6 TO 10
========================================= */


/* 1. GET HTML ELEMENTS */

const classCards = document.querySelectorAll(".class-card");

const studySection = document.getElementById("study-section");

const selectedClassHeading =
    document.getElementById("selected-class");

const subject = document.getElementById("subject");

const chapter = document.getElementById("chapter");

const notesBtn = document.getElementById("notes-btn");

const qaBtn = document.getElementById("qa-btn");

const studyContent = document.getElementById("study-content");


/* 2. SELECTED CLASS */

let selectedClass = null;


/* 3. SUBJECTS FOR EACH CLASS */

const classSubjects = {

    6: [
        "English",
        "Mathematics",
        "Hindi",
        "Science",
        "Social Science",
        "Sanskrit"
    ],

    7: [
        "English",
        "Mathematics",
        "Hindi",
        "Science",
        "Social Science",
        "Sanskrit"
    ],

    8: [
        "English",
        "Mathematics",
        "Hindi",
        "Science",
        "Social Science",
        "Sanskrit"
    ],

    9: [
        "English",
        "Mathematics",
        "Hindi",
        "Science",
        "Social Science",
        "Sanskrit"
    ],

    10: [
        "English",
        "Mathematics",
        "Hindi",
        "Science",
        "Social Science",
        "Sanskrit"
    ]

};


/* 4. CHAPTER COUNTS */

const classChapterCounts = {

    6: {
        english: 5,
        mathematics: 10,
        hindi: 13,
        science: 12,
        "social-science": 14,
        sanskrit: 16
    },

    7: {
        english: 5,
        mathematics: 15,
        hindi: 10,
        science: 12,
        "social-science": 20,
        sanskrit: 12
    },

    8: {
        english: 5,
        mathematics: 14,
        hindi: 10,
        science: 13,
        "social-science": 15,
        sanskrit: 16
    },

    9: {
        english: 8,
        mathematics: 14,
        hindi: 12,
        science: 13,
        "social-science": 15,
        sanskrit: 11
    }

    // Class 10 chapter counts will be added later.

};


/* 5. SUBJECT FOLDER NAME */

function getSubjectFolder(subjectName) {

    return subjectName
        .toLowerCase()
        .replace(/\s+/g, "-");

}


/* 6. CLASS SELECTION */

classCards.forEach(function (card) {

    card.addEventListener("click", function () {

        selectedClass = Number(card.dataset.class);

        if (selectedClass < 6 || selectedClass > 10) {
            return;
        }

        studySection.style.display = "block";

        selectedClassHeading.textContent =
            "Class " + selectedClass + " Study Materials";

        loadSubjects();

        studyContent.innerHTML = "";

        studySection.scrollIntoView({
            behavior: "smooth"
        });

    });

});


/* 7. LOAD SUBJECTS */

function loadSubjects() {

    subject.innerHTML =
        '<option value="">Select Subject</option>';

    chapter.innerHTML =
        '<option value="">Select Chapter</option>';

    chapter.disabled = true;

    const subjects = classSubjects[selectedClass];

    subjects.forEach(function (subjectName) {

        const option = document.createElement("option");

        option.value = getSubjectFolder(subjectName);

        option.textContent = subjectName;

        subject.appendChild(option);

    });

}


/* 8. LOAD CHAPTERS */

subject.addEventListener("change", function () {

    chapter.innerHTML =
        '<option value="">Select Chapter</option>';

    studyContent.innerHTML = "";

    if (subject.value === "") {

        chapter.disabled = true;

        return;

    }


    // CLASS 10 - CHAPTERS NOT AVAILABLE YET

    if (selectedClass === 10) {

        chapter.innerHTML =
            '<option value="">Chapters will be added soon</option>';

        chapter.disabled = true;

        return;

    }


    chapter.disabled = false;

    const subjectName = subject.value;

    const totalChapters =
        classChapterCounts[selectedClass][subjectName];


    for (let i = 1; i <= totalChapters; i++) {

        const option = document.createElement("option");

        option.value = i;

        option.textContent = "Chapter " + i;

        chapter.appendChild(option);

    }

});


/* 9. CHECK SELECTION */

function checkSelection() {

    if (!selectedClass) {

        alert("Please select a class first.");

        return false;

    }

    if (subject.value === "") {

        alert("Please select a subject.");

        return false;

    }

    if (chapter.value === "") {

        alert("Please select a chapter.");

        return false;

    }

    return true;

}


/* 10. DISPLAY PDF */

async function showPDF(type) {

    if (!checkSelection()) {

        return;

    }


    const classNumber = selectedClass;

    const subjectFolder = subject.value;

    const chapterNumber = chapter.value;


    const pdfPath =
        `pdfs/class-${classNumber}/${type}/${subjectFolder}/chapter-${chapterNumber}.pdf`;


    const materialName =
        type === "notes"
            ? "Chapter Notes"
            : "Questions & Answers";


    // SHOW LOADING MESSAGE

    studyContent.innerHTML = `
        <div class="pdf-message">
            <h3>Loading Study Material...</h3>
            <p>Please wait.</p>
        </div>
    `;


    try {

        const response = await fetch(pdfPath, {
            method: "HEAD"
        });


        // PDF NOT FOUND

        if (!response.ok) {

            studyContent.innerHTML = `

                <div class="pdf-message">

                    <h3>📚 Study Material Coming Soon!</h3>

                    <p>
                        ${materialName} for Class ${classNumber},
                        Chapter ${chapterNumber}, have not been
                        uploaded yet.
                    </p>

                    <p>
                        Please check again later.
                    </p>

                </div>

            `;

            return;

        }


        // PDF FOUND

        studyContent.innerHTML = `

            <h3>
                Class ${classNumber} |
                ${subject.options[subject.selectedIndex].text} |
                Chapter ${chapterNumber} |
                ${materialName}
            </h3>


            <iframe
                src="${pdfPath}"
                width="100%"
                height="650px"
                title="NCERT Study Material">
            </iframe>


            <p>
                <a
                    href="${pdfPath}"
                    target="_blank"
                    rel="noopener noreferrer">

                    Open PDF in a new tab

                </a>
            </p>

        `;


    } catch (error) {

        // NETWORK OR SERVER ERROR

        studyContent.innerHTML = `

            <div class="pdf-message">

                <h3>Unable to load the study material</h3>

                <p>
                    Please check that Live Server is running
                    and try again.
                </p>

            </div>

        `;

        console.error("PDF loading error:", error);

    }

}


/* 11. NOTES BUTTON */

notesBtn.addEventListener("click", function () {

    showPDF("notes");

});


/* 12. QUESTIONS AND ANSWERS BUTTON */

qaBtn.addEventListener("click", function () {

    showPDF("questions-answers");

});


/* =========================================
   NCERT STUDY HUB - JAVASCRIPT COMPLETE
========================================= */
