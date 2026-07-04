const generateBtn = document.getElementById("generateBtn");
const resultSection = document.getElementById("result");

generateBtn.addEventListener("click", generatePlan);

async function generatePlan() {
    const diet = document.getElementById("diet").value;
    const budget = Number(document.getElementById("budget").value);
    const people = Number(document.getElementById("people").value);

    if (!budget || budget <= 0) {
        alert("Please enter a valid budget.");
        return;
    }

    if (!people || people <= 0) {
        alert("Please enter a valid number of people.");
        return;
    }

    try {
        const response = await fetch("meals.json");
        const meals = await response.json();

        const plan = meals[diet];

        if (!plan) {
            alert("No meal plan found.");
            return;
        }

        document.getElementById("breakfast").textContent = plan.breakfast;
        document.getElementById("lunch").textContent = plan.lunch;
        document.getElementById("dinner").textContent = plan.dinner;

        renderList("groceryList", plan.grocery);
        renderList("substitutions", plan.substitutions);
        renderOrderedList("todoList", plan.todo);

        const estimatedCost = plan.estimatedCost * people;

        const budgetStatus = document.getElementById("budgetStatus");

        if (budget >= estimatedCost) {
            budgetStatus.innerHTML = `
                ✅ Within Budget <br>
                Estimated Cost: ₹${estimatedCost}
            `;
            budgetStatus.style.color = "#16a34a";
        } else {
            budgetStatus.innerHTML = `
                ❌ Over Budget <br>
                Estimated Cost: ₹${estimatedCost}
            `;
            budgetStatus.style.color = "#dc2626";
        }

        resultSection.classList.remove("hidden");

        resultSection.scrollIntoView({
            behavior: "smooth"
        });

    } catch (error) {
        console.error(error);
        alert("Unable to load meal data.");
    }
}

function renderList(id, items) {
    const list = document.getElementById(id);

    list.innerHTML = "";

    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });
}

function renderOrderedList(id, items) {
    const list = document.getElementById(id);

    list.innerHTML = "";

    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });
}
