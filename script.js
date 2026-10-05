// ======================================================
// MOMENTUM
// COMPLETE FRONTEND APP
// ======================================================

const USERS_KEY = "momentum_users";
const CURRENT_USER_KEY = "momentum_current_user";


// ======================================================
// STORAGE
// ======================================================

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch (error) {
        console.error("Users storage error:", error);
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser() {
    try {
        return JSON.parse(
            localStorage.getItem(CURRENT_USER_KEY)
        );
    } catch (error) {
        console.error("Current user error:", error);
        return null;
    }
}

function saveCurrentUser(user) {
    localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(user)
    );
}


// ======================================================
// USER DATA
// ======================================================

function getUserData() {

    const user = getCurrentUser();

    if (!user) return null;

    const key = `momentum_data_${user.id}`;

    try {

        const saved =
            JSON.parse(localStorage.getItem(key));

        if (saved) return saved;

    } catch (error) {

        console.error("User data error:", error);

    }

    const data = {

        habits: [],

        activities: [],

        friends: [],

        completedDates: {},

        createdAt: new Date().toISOString()

    };

    saveUserData(data);

    return data;
}


function saveUserData(data) {

    const user = getCurrentUser();

    if (!user) return;

    localStorage.setItem(
        `momentum_data_${user.id}`,
        JSON.stringify(data)
    );
}


// ======================================================
// LOGIN
// ======================================================

function showLogin() {

    document.body.innerHTML = `

        <div class="auth-screen">

            <div class="auth-card">

                <div class="auth-logo">
                    MOMENTUM
                </div>

                <div class="auth-tagline">
                    Build habits. Build yourself.
                </div>

                <h1>Welcome back</h1>

                <p class="auth-subtitle">
                    Log in to continue your journey.
                </p>

                <form id="loginForm">

                    <label>Email</label>

                    <input
                        id="loginEmail"
                        type="email"
                        placeholder="you@example.com"
                        required
                    >

                    <label>Password</label>

                    <input
                        id="loginPassword"
                        type="password"
                        placeholder="Enter your password"
                        required
                    >

                    <p
                        id="loginError"
                        class="auth-error"
                    ></p>

                    <button
                        class="auth-button"
                        type="submit"
                    >
                        Login
                    </button>

                </form>

                <div class="auth-divider">
                    OR
                </div>

                <button
                    class="google-button"
                    id="googleLogin"
                >
                    <span>G</span>
                    Continue with Google
                </button>

                <button
                    class="auth-secondary"
                    id="showSignup"
                >
                    Don't have an account? Sign up
                </button>

            </div>

        </div>
    `;

    document
        .getElementById("loginForm")
        .addEventListener("submit", handleLogin);

    document
        .getElementById("showSignup")
        .addEventListener("click", showSignup);

    document
        .getElementById("googleLogin")
        .addEventListener("click", () => {

            alert(
                "Google authentication will be connected when we add the backend."
            );

        });
}


// ======================================================
// SIGNUP
// ======================================================

function showSignup() {

    document.body.innerHTML = `

        <div class="auth-screen">

            <div class="auth-card">

                <div class="auth-logo">
                    MOMENTUM
                </div>

                <div class="auth-tagline">
                    Build habits. Build yourself.
                </div>

                <h1>Create account</h1>

                <p class="auth-subtitle">
                    Start your personal journey.
                </p>

                <form id="signupForm">

                    <label>Name</label>

                    <input
                        id="signupName"
                        type="text"
                        placeholder="Your name"
                        required
                    >

                    <label>Email</label>

                    <input
                        id="signupEmail"
                        type="email"
                        placeholder="you@example.com"
                        required
                    >

                    <label>Password</label>

                    <input
                        id="signupPassword"
                        type="password"
                        minlength="6"
                        placeholder="Create a password"
                        required
                    >

                    <p
                        id="signupError"
                        class="auth-error"
                    ></p>

                    <button
                        class="auth-button"
                        type="submit"
                    >
                        Create account
                    </button>

                </form>

                <button
                    class="auth-secondary"
                    id="backToLogin"
                >
                    Already have an account? Login
                </button>

            </div>

        </div>
    `;

    document
        .getElementById("signupForm")
        .addEventListener("submit", handleSignup);

    document
        .getElementById("backToLogin")
        .addEventListener("click", showLogin);
}


function handleLogin(event) {

    event.preventDefault();

    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();

    const password =
        document
            .getElementById("loginPassword")
            .value;

    const users = getUsers();

    const user = users.find(
        u =>
            u.email === email &&
            u.password === password
    );

    if (!user) {

        document
            .getElementById("loginError")
            .textContent =
            "Incorrect email or password.";

        return;
    }

    saveCurrentUser(user);

    showApp();
}


function handleSignup(event) {

    event.preventDefault();

    const name =
        document
            .getElementById("signupName")
            .value
            .trim();

    const email =
        document
            .getElementById("signupEmail")
            .value
            .trim()
            .toLowerCase();

    const password =
        document
            .getElementById("signupPassword")
            .value;

    const error =
        document.getElementById("signupError");

    const users = getUsers();

    if (
        users.some(
            user => user.email === email
        )
    ) {

        error.textContent =
            "An account with this email already exists.";

        return;
    }

    const newUser = {

        id: Date.now(),

        name,

        email,

        password,

        createdAt:
            new Date().toISOString()

    };

    users.push(newUser);

    saveUsers(users);

    saveCurrentUser(newUser);

    getUserData();

    showApp();
}


// ======================================================
// MAIN APP
// ======================================================

function showApp() {

    const user = getCurrentUser();

    if (!user) {

        showLogin();

        return;
    }

    document.body.innerHTML = `

        <div class="app">

            <aside class="sidebar">

                <div>

                    <div class="logo">
                        MOMENTUM
                    </div>

                    <div class="logo-subtitle">
                        Build habits. Build yourself.
                    </div>

                    <nav class="nav">

                        <button
                            class="nav-item active"
                            data-page="dashboard"
                        >
                            <span class="nav-icon">🏠</span>
                            Dashboard
                        </button>

                        <button
                            class="nav-item"
                            data-page="habits"
                        >
                            <span class="nav-icon">✓</span>
                            Habits
                        </button>

                        <button
                            class="nav-item"
                            data-page="activities"
                        >
                            <span class="nav-icon">🏃</span>
                            Activities
                        </button>

                        <button
                            class="nav-item"
                            data-page="streaks"
                        >
                            <span class="nav-icon">🔥</span>
                            Streaks
                        </button>

                        <button
                            class="nav-item"
                            data-page="badges"
                        >
                            <span class="nav-icon">🏆</span>
                            Badges
                        </button>

                        <button
                            class="nav-item"
                            data-page="friends"
                        >
                            <span class="nav-icon">👥</span>
                            Friends
                        </button>

                        <button
                            class="nav-item"
                            data-page="profile"
                        >
                            <span class="nav-icon">👤</span>
                            Profile
                        </button>

                    </nav>

                </div>

                <div class="sidebar-bottom">

                    <button
                        class="theme-toggle"
                        id="themeToggle"
                    >
                        🌙 Dark mode
                    </button>

                    <button
                        class="logout-button"
                        id="logoutButton"
                    >
                        ↪ Logout
                    </button>

                </div>

            </aside>


            <main class="main" id="mainContent">

            </main>

        </div>
    `;


    setupNavigation();

    setupTheme();

    document
        .getElementById("logoutButton")
        .addEventListener("click", logout);

    showPage("dashboard");
}


// ======================================================
// NAVIGATION
// ======================================================

function setupNavigation() {

    document
        .querySelectorAll(".nav-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const page =
                        button.dataset.page;

                    showPage(page);

                }
            );

        });
}


function showPage(page) {

    document
        .querySelectorAll(".nav-item")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.page === page
            );

        });


    const main =
        document.getElementById("mainContent");


    if (page === "dashboard") {

        renderDashboard(main);

    }

    else if (page === "habits") {

        renderHabitsPage(main);

    }

    else if (page === "activities") {

        renderActivitiesPage(main);

    }

    else if (page === "streaks") {

        renderStreaksPage(main);

    }

    else if (page === "badges") {

        renderBadgesPage(main);

    }

    else if (page === "friends") {

        renderFriendsPage(main);

    }

    else if (page === "profile") {

        renderProfilePage(main);

    }

}


// ======================================================
// DASHBOARD
// ======================================================

function renderDashboard(main) {

    const user = getCurrentUser();
    const data = getUserData();

    const totalHabits = data.habits.length;

    const completedHabits =
        data.habits.filter(
            habit => isHabitComplete(habit)
        ).length;

    const progress =
        totalHabits > 0
            ? Math.round(
                (completedHabits / totalHabits) * 100
            )
            : 0;

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    const todayActivities =
        data.activities.filter(
            activity => activity.date === today
        );

    const streak =
        calculateStreak(data);


    main.innerHTML = `

        <div class="topbar">

            <div>
                <h1 class="page-title">
                    Good to see you, ${escapeHTML(user.name)} 👋
                </h1>

                <p class="page-subtitle">
                    Here's your progress for today.
                </p>
            </div>

            ${userPill(user)}

        </div>


        <div class="welcome-card">

            <div>

                <div class="eyebrow">
                    TODAY
                </div>

                <h2>
                    ${progress === 100
                        ? "Everything is done. Great work."
                        : "Keep your momentum going."}
                </h2>

                <p class="muted">
                    ${completedHabits} of ${totalHabits}
                    habits completed today.
                </p>

            </div>

            <button
                class="primary-button"
                onclick="showPage('habits')"
            >
                ${progress === 100
                    ? "View habits"
                    : "Complete habits"}
            </button>

        </div>


        <div class="dashboard-section momentum-overview">

    <div class="card-heading">

        <div>
            <h2>Momentum overview</h2>
            <p class="muted">
                A quick look at how you're progressing.
            </p>
        </div>

        <span class="overview-badge">
            ${progress}% today
        </span>

    </div>

    <div class="overview-progress">

        <div class="overview-progress-track">

            <div
                class="overview-progress-fill"
                style="width:${progress}%"
            ></div>

        </div>

        <div class="overview-labels">
            <span>
                ${completedHabits} completed
            </span>

            <span>
                ${totalHabits} total
            </span>
        </div>

    </div>

    <div class="overview-message">

        ${
            totalHabits === 0
                ? "Start by adding your first habit."
                : progress === 100
                    ? "All habits completed. Momentum maintained. 🔥"
                    : `${totalHabits - completedHabits} habit${
                        totalHabits - completedHabits === 1 ? "" : "s"
                    } left for today.`
        }

    </div>

</div>

            <div class="stat-card">

                <span>
                    Current streak
                </span>

                <strong>
                    🔥 ${streak} days
                </strong>

            </div>


            <div class="stat-card">

                <span>
                    Today's activities
                </span>

                <strong>
                    ${todayActivities.length}
                </strong>

            </div>


            <div class="stat-card">

                <span>
                    Friends
                </span>

                <strong>
                    ${data.friends.length}
                </strong>

            </div>

        </div>


        <div class="dashboard-section">

            <div class="card-heading">

                <div>
                    <h2>
                        Today's habits
                    </h2>

                    <p class="muted">
                        ${totalHabits === 0
                            ? "You haven't added any habits yet."
                            : "Your daily checklist."}
                    </p>
                </div>

                <button
                    class="secondary-button"
                    onclick="showPage('habits')"
                >
                    View all
                </button>

            </div>


            ${
                totalHabits === 0

                ? emptyState(
                    "✓",
                    "No habits yet",
                    "Add your first habit to start tracking your progress."
                )

                : data.habits.slice(0, 4).map(
                    habit => `

                        <div class="friend-row">

                            <div class="avatar">
                                ${
                                    isHabitComplete(habit)
                                        ? "✓"
                                        : "○"
                                }
                            </div>

                            <div class="friend-info">

                                <strong>
                                    ${escapeHTML(habit.name)}
                                </strong>

                                <span>
                                    ${
                                        habit.checkpoints.filter(
                                            checkpoint =>
                                                checkpoint.done
                                        ).length
                                    }
                                    /
                                    ${habit.checkpoints.length}
                                    checkpoints
                                </span>

                            </div>

                            <span>
                                ${
                                    isHabitComplete(habit)
                                        ? "Completed"
                                        : "In progress"
                                }
                            </span>

                        </div>

                    `
                ).join("")
            }

        </div>


        <div class="dashboard-section">

            <div class="card-heading">

                <div>
                    <h2>
                        Today's activities
                    </h2>

                    <p class="muted">
                        Your activity records for today.
                    </p>
                </div>

                <button
                    class="secondary-button"
                    onclick="showPage('activities')"
                >
                    Activities
                </button>

            </div>


            ${
                todayActivities.length

                ? todayActivities.map(
                    activity => `

                        <div class="friend-row">

                            <div class="avatar">
                                ${
                                    activityTypes.find(
                                        type =>
                                            type.name ===
                                            activity.type
                                    )?.icon || "⚡"
                                }
                            </div>

                            <div class="friend-info">

                                <strong>
                                    ${escapeHTML(activity.type)}
                                </strong>

                                <span>
                                    ${activity.value}
                                    ${
                                        activityTypes.find(
                                            type =>
                                                type.name ===
                                                activity.type
                                        )?.unit || ""
                                    }
                                </span>

                            </div>

                        </div>

                    `
                ).join("")

                : `
                    <p class="muted">
                        No activities recorded today.
                    </p>
                `
            }

        </div>

    `;
}
function renderHabitsPage(main) {

    const data = getUserData();

    main.innerHTML = `

        <div class="topbar">

            <div>

                <h1 class="page-title">
                    Habits
                </h1>

                <p class="page-subtitle">
                    Build your daily routine.
                </p>

            </div>

            <button
                class="primary-button"
                id="addHabitButton"
            >
                + Add habit
            </button>

        </div>


        <div
            id="habitList"
            class="habit-list"
        >

            ${
                data.habits.length
                ? data.habits.map(
                    habitCard
                ).join("")
                : emptyState(
                    "✓",
                    "No habits yet",
                    "Add your first habit and start building your streak."
                )
            }

        </div>

    `;


    document
        .getElementById("addHabitButton")
        .addEventListener(
            "click",
            openHabitModal
        );


    document
        .querySelectorAll(".habit-check")
        .forEach(check => {

            check.addEventListener(
                "change",
                handleCheckpoint
            );

        });


    document
        .querySelectorAll(".delete-habit")
        .forEach(button => {

            button.addEventListener(
                "click",
                deleteHabit
            );

        });
}


function habitCard(habit) {

    const done =
        habit.checkpoints.filter(
            checkpoint => checkpoint.done
        ).length;

    const total =
        habit.checkpoints.length;

    const percentage =
        total
            ? Math.round((done / total) * 100)
            : 0;


    return `

        <div class="habit-card">

            <div class="habit-top">

                <div>

                    <h3>
                        ${escapeHTML(habit.name)}
                    </h3>

                    <p>
                        ${habit.category || "Personal"}
                    </p>

                </div>

                <strong class="habit-percentage">
                    ${percentage}%
                </strong>

            </div>


            <div class="habit-progress-track">

                <div
                    class="habit-progress-bar"
                    style="
                        width:${percentage}%;
                        background:var(--lilac);
                    "
                ></div>

            </div>


            <div class="checkpoint-count">

                ${done} / ${total}
                checkpoints complete

            </div>


            <div class="checkpoints">

                ${
                    habit.checkpoints.map(
                        (checkpoint, index) => `

                            <label>

                                <input
                                    class="habit-check"
                                    type="checkbox"

                                    data-habit-id="${habit.id}"

                                    data-checkpoint="${index}"

                                    ${
                                        checkpoint.done
                                        ? "checked"
                                        : ""
                                    }
                                >

                                ${escapeHTML(
                                    checkpoint.name
                                )}

                            </label>

                        `
                    ).join("")
                }

            </div>


            <button
                class="delete-habit"
                data-id="${habit.id}"
            >
                Delete habit
            </button>

        </div>

    `;
}


// ======================================================
// HABIT MODAL
// ======================================================

function openHabitModal() {

    const modal = document.createElement("div");

    modal.className = "modal";
    modal.id = "habitModal";

    modal.innerHTML = `

        <div class="modal-content">

            <div class="modal-header">

                <div>
                    <h2>Add habit</h2>

                    <p class="muted">
                        Choose a habit and create measurable checkpoints.
                    </p>
                </div>

                <button
                    class="close-button"
                    id="closeHabitModal"
                    type="button"
                >
                    ×
                </button>

            </div>


            <label>
                Habit
            </label>

            <select id="habitPreset">

                <option value="">
                    Select a habit
                </option>

                <option>Running</option>
                <option>Cycling</option>
                <option>Swimming</option>
                <option>Walking</option>
                <option>Workout</option>
                <option>Stretching</option>
                <option>Drink Water</option>
                <option>Sleep</option>
                <option>Healthy Diet</option>
                <option>Study</option>
                <option>Reading</option>
                <option>Screen Time</option>

                <option value="other">
                    Other
                </option>

            </select>


            <div id="otherHabitBox"></div>


            <label>
                Checkpoints
            </label>


            <div id="checkpointInputs">

                ${createCheckpointRow()}

            </div>


            <button
                class="add-checkpoint"
                id="addCheckpoint"
                type="button"
            >
                + Add checkpoint
            </button>


            <button
                class="primary-button"
                id="saveHabit"
                type="button"
                style="width:100%; margin-top:20px;"
            >
                Save habit
            </button>

        </div>

    `;


    document.body.appendChild(modal);


    document
        .getElementById("closeHabitModal")
        .addEventListener(
            "click",
            () => modal.remove()
        );


    document
        .getElementById("habitPreset")
        .addEventListener(
            "change",
            handleOtherHabit
        );


    document
        .getElementById("addCheckpoint")
        .addEventListener(
            "click",
            addCheckpointField
        );


    document
        .getElementById("saveHabit")
        .addEventListener(
            "click",
            saveHabit
        );
}
function createCheckpointRow() {

    return `

        <div class="checkpoint-input-row">

            <input
                type="text"
                placeholder="Checkpoint name"
                class="checkpoint-field"
            >


            <label class="track-option">

                <input
                    type="checkbox"
                    class="track-activity"
                >

                Track as activity

            </label>


            <select class="measurement-type">

                <option value="none">
                    No measurement
                </option>

                <option value="distance">
                    Distance
                </option>

                <option value="duration">
                    Duration
                </option>

                <option value="quantity">
                    Quantity
                </option>

            </select>


            <div class="measurement-value">

                <input
                    type="number"
                    class="target-value"
                    min="0"
                    step="0.1"
                    placeholder="Target"
                >

            </div>

        </div>

    `;
}
function handleOtherHabit(event) {

    const box =
        document.getElementById(
            "otherHabitBox"
        );


    if (event.target.value === "other") {

        box.innerHTML = `

            <label>
                Your habit
            </label>

            <input
                id="customHabit"
                type="text"
                placeholder="Enter your habit"
            >

        `;

    } else {

        box.innerHTML = "";

    }
}
function addCheckpointField() {

    const container =
        document.getElementById("checkpointInputs");

    const row =
        document.createElement("div");

    row.className =
        "checkpoint-input-row";

    row.innerHTML =
        createCheckpointRow();


    const removeButton =
        document.createElement("button");

    removeButton.type = "button";

    removeButton.className =
        "remove-checkpoint";

    removeButton.textContent = "×";


    removeButton.addEventListener(
        "click",
        () => row.remove()
    );


    row.appendChild(removeButton);

    container.appendChild(row);
}

function saveHabit() {

    const preset =
        document.getElementById("habitPreset").value;

    let name = preset;


    if (preset === "other") {

        const custom =
            document.getElementById("customHabit");

        name =
            custom
                ? custom.value.trim()
                : "";
    }


    if (!name) {

        alert("Please choose or enter a habit.");

        return;
    }


    const rows =
        document.querySelectorAll(
            ".checkpoint-input-row"
        );


    const checkpoints = [];


    rows.forEach(row => {

        const nameInput =
            row.querySelector(".checkpoint-field");

        const trackInput =
            row.querySelector(".track-activity");

        const measurement =
            row.querySelector(".measurement-type");

        const target =
            row.querySelector(".target-value");


        const checkpointName =
            nameInput
                ? nameInput.value.trim()
                : "";


        if (!checkpointName) return;


        const measurementType =
            measurement
                ? measurement.value
                : "none";


        const targetValue =
            target && target.value
                ? Number(target.value)
                : null;


        checkpoints.push({

            name: checkpointName,

            done: false,

            trackActivity:
                trackInput
                    ? trackInput.checked
                    : false,

            measurementType,

            targetValue

        });

    });


    if (!checkpoints.length) {

        alert(
            "Please add at least one checkpoint."
        );

        return;
    }


    const data =
        getUserData();


    data.habits.push({

        id: Date.now(),

        name,

        category:
            preset === "other"
                ? "Personal"
                : preset,

        checkpoints,

        createdAt:
            new Date().toISOString()

    });


    saveUserData(data);


    document
        .getElementById("habitModal")
        .remove();


    showPage("habits");
}
function handleCheckpoint(event) {

    const habitId =
        Number(event.target.dataset.habitId);

    const checkpointIndex =
        Number(event.target.dataset.checkpoint);

    const data = getUserData();

    const habit =
        data.habits.find(
            h => h.id === habitId
        );

    if (!habit) return;

    const checkpoint =
        habit.checkpoints[checkpointIndex];

    if (!checkpoint) return;

    checkpoint.done =
        event.target.checked;


    updateTodayCompletion(data);

    saveUserData(data);

    showPage("habits");
}
function deleteHabit(event) {

    const id =
        Number(event.target.dataset.id);


    const data = getUserData();


    data.habits =
        data.habits.filter(
            habit => habit.id !== id
        );


    saveUserData(data);

    showPage("habits");
}


function isHabitComplete(habit) {

    return (
        habit.checkpoints.length > 0 &&
        habit.checkpoints.every(
            checkpoint => checkpoint.done
        )
    );
}


// ======================================================
// ACTIVITIES
// ======================================================

const activityTypes = [

    {
        name: "Running",
        icon: "🏃",
        unit: "km"
    },

    {
        name: "Cycling",
        icon: "🚴",
        unit: "km"
    },

    {
        name: "Swimming",
        icon: "🏊",
        unit: "minutes"
    },

    {
        name: "Walking",
        icon: "🚶",
        unit: "km"
    },

    {
        name: "Workout",
        icon: "🏋️",
        unit: "minutes"
    },

    {
        name: "Water",
        icon: "💧",
        unit: "glasses"
    },

    {
        name: "Sleep",
        icon: "😴",
        unit: "hours"
    },

    {
        name: "Study",
        icon: "📚",
        unit: "hours"
    },

    {
        name: "Diet",
        icon: "🥗",
        unit: "meals"
    }

];

function showActivityDetails(activityName) {

    const details =
        document.getElementById("activityDetails");

    if (!details) return;

    const data = getUserData();

    const type =
        activityTypes.find(
            activity => activity.name === activityName
        );

    if (!type) return;

    const records =
        data.activities.filter(
            activity =>
                activity.type === activityName
        );


    details.innerHTML = `

        <div class="card">

            <div class="card-heading">

                <div>
                    <h2>${activityName}</h2>

                    <p class="muted">
                        Your ${activityName.toLowerCase()} records
                    </p>
                </div>

                <button
                    class="primary-button"
                    id="addActivity"
                    type="button"
                >
                    + Add record
                </button>

            </div>


            ${
                records.length === 0

                ? `

                    <div class="empty-state">

                        <div class="empty-state-icon">
                            ${type.icon}
                        </div>

                        <h3>
                            No record yet
                        </h3>

                        <p>
                            Your records will appear here.
                        </p>

                    </div>

                `

                : `

                    <div class="activity-records">

                        ${
                            records
                                .slice()
                                .reverse()
                                .map(record => {

                                    if (
                                        record.distance !== undefined
                                    ) {

                                        return `

                                            <div class="activity-record">

                                                <div>

                                                    <strong>
                                                        ${record.distance} km
                                                    </strong>

                                                    <p>
                                                        Duration:
                                                        ${record.duration} min
                                                    </p>

                                                    ${
                                                        record.averageSpeed !== undefined
                                                        ? `
                                                            <p>
                                                                Average speed:
                                                                ${record.averageSpeed} km/h
                                                            </p>
                                                        `
                                                        : ""
                                                    }

                                                    <p class="muted">
                                                        ${record.date}
                                                    </p>

                                                </div>

                                            </div>

                                        `;

                                    }


                                    return `

                                        <div class="activity-record">

                                            <div>

                                                <strong>
                                                    ${record.value}
                                                    ${type.unit}
                                                </strong>

                                                <p class="muted">
                                                    ${record.date}
                                                </p>

                                            </div>

                                        </div>

                                    `;

                                })
                                .join("")
                        }

                    </div>

                `
            }

        </div>

    `;


    const addButton =
        document.getElementById("addActivity");


    if (addButton) {

        addButton.addEventListener(
            "click",
            () => addActivity(activityName)
        );

    }
}
function addActivity(activityName) {

    const details =
        document.getElementById("activityDetails");

    const type =
        activityTypes.find(
            activity => activity.name === activityName
        );

    if (!details || !type) return;


    const distanceActivities = [
        "Running",
        "Cycling",
        "Swimming",
        "Walking"
    ];

    const durationActivities = [
        "Running",
        "Cycling",
        "Swimming",
        "Walking",
        "Workout"
    ];


    const needsDistance =
        distanceActivities.includes(activityName);

    const needsDuration =
        durationActivities.includes(activityName);


    let fields = "";


    if (needsDistance) {

        fields += `

            <label>
                Distance (km)
            </label>

            <input
                id="activityDistance"
                type="number"
                min="0"
                step="0.1"
                placeholder="e.g. 3.5"
            >

        `;
    }


    if (needsDuration) {

        fields += `

            <label>
                Duration (minutes)
            </label>

            <input
                id="activityDuration"
                type="number"
                min="0"
                step="1"
                placeholder="e.g. 30"
            >

        `;
    }


    if (!needsDistance && !needsDuration) {

        fields += `

            <label>
                ${type.unit}
            </label>

            <input
                id="activityValue"
                type="number"
                min="0"
                step="0.1"
                placeholder="Enter ${type.unit}"
            >

        `;
    }


    fields += `

        <label>
            Date
        </label>

        <input
            id="activityDate"
            type="date"
            value="${
                new Date()
                    .toISOString()
                    .split("T")[0]
            }"
        >

    `;


    details.innerHTML = `

        <div class="card">

            <div class="card-heading">

                <div>

                    <h2>
                        Add ${activityName} record
                    </h2>

                    <p class="muted">
                        Record your activity.
                    </p>

                </div>

                <button
                    type="button"
                    class="secondary-button"
                    id="cancelActivity"
                >
                    Cancel
                </button>

            </div>


            <div class="activity-form">

                ${fields}


                <button
                    type="button"
                    class="primary-button"
                    id="saveActivity"
                >
                    Save record
                </button>

            </div>

        </div>

    `;


    document
        .getElementById("cancelActivity")
        .onclick = function () {

            showActivityDetails(activityName);

        };


    document
        .getElementById("saveActivity")
        .onclick = function () {

            const date =
                document
                    .getElementById("activityDate")
                    .value;


            if (!date) {

                alert("Please select a date.");

                return;
            }


            const data =
                getUserData();


            let record = {

                id: Date.now(),

                type: activityName,

                date: date

            };


            if (needsDistance) {

                const distance =
                    Number(
                        document
                            .getElementById("activityDistance")
                            .value
                    );


                if (!distance || distance <= 0) {

                    alert(
                        "Please enter a valid distance."
                    );

                    return;
                }


                record.distance = distance;
            }


            if (needsDuration) {

                const duration =
                    Number(
                        document
                            .getElementById("activityDuration")
                            .value
                    );


                if (!duration || duration <= 0) {

                    alert(
                        "Please enter a valid duration."
                    );

                    return;
                }


                record.duration = duration;
            }


            if (
                needsDistance &&
                needsDuration
            ) {

                record.averageSpeed =
                    Number(
                        (
                            record.distance /
                            (record.duration / 60)
                        ).toFixed(2)
                    );

            }


            if (
                !needsDistance &&
                !needsDuration
            ) {

                const value =
                    Number(
                        document
                            .getElementById("activityValue")
                            .value
                    );


                if (!value || value <= 0) {

                    alert(
                        "Please enter a valid value."
                    );

                    return;
                }


                record.value = value;
            }


            data.activities.push(record);

            saveUserData(data);

            showActivityDetails(activityName);

        };
}
function calculateStreak(data) {

    if (!data.completedDates) {
        return 0;
    }

    let streak = 0;

    const today = new Date();

    for (let i = 0; i < 365; i++) {

        const date = new Date(today);

        date.setDate(
            today.getDate() - i
        );

        const dateKey =
            date.toISOString().split("T")[0];

        if (data.completedDates[dateKey] === true) {

            streak++;

        } else {

            break;

        }
    }

    return streak;
}
function updateTodayCompletion(data) {

    const allComplete =
        data.habits.length > 0 &&
        data.habits.every(
            habit => isHabitComplete(habit)
        );


    if (!data.completedDates) {

        data.completedDates = {};

    }


    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    data.completedDates[today] =
        allComplete;


    saveUserData(data);
}
function renderActivitiesPage(main) {

    const data = getUserData();

    main.innerHTML = `

        <div class="topbar">

            <div>

                <h1 class="page-title">
                    Activities
                </h1>

                <p class="page-subtitle">
                    Track the activities that keep you moving.
                </p>

            </div>

        </div>


        <div class="activity-type-grid">

            ${
                activityTypes.map(type => `

                    <button
                        class="activity-type-card"
                        data-activity="${type.name}"
                    >

                        <div class="activity-icon">
                            ${type.icon}
                        </div>

                        <strong>
                            ${type.name}
                        </strong>

                        <span>
                            ${
                                data.activities.filter(
                                    activity =>
                                        activity.type === type.name
                                ).length
                            }
                            records
                        </span>

                    </button>

                `).join("")
            }

        </div>


        <div
            id="activityDetails"
            class="activity-details"
        >

            <div class="card">

                <div class="empty-state">

                    <div class="empty-state-icon">
                        ⚡
                    </div>

                    <h3>
                        Choose an activity
                    </h3>

                    <p>
                        Select an activity above to view or add records.
                    </p>

                </div>

            </div>

        </div>

    `;


    document
        .querySelectorAll(".activity-type-card")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const activityName =
                        button.dataset.activity;

                    showActivityDetails(activityName);

                }
            );

        });

}

function renderStreaksPage(main) {

    const data = getUserData();


    updateTodayCompletion(data);


    const streak =
        calculateStreak(data);


    main.innerHTML = `

        <div class="topbar">

            <div>

                <h1 class="page-title">
                    Streaks
                </h1>

                <p class="page-subtitle">
                    Consistency over perfection.
                </p>

            </div>

        </div>


        <div class="streak-grid">

            <div class="streak-item">

                <div>🔥</div>

                <div class="streak-number">
                    ${streak}
                </div>

                <strong>
                    Current streak
                </strong>

                <p class="muted">
                    days
                </p>

            </div>


            <div class="streak-item">

                <div>🎯</div>

                <div class="streak-number">
                    ${data.habits.length}
                </div>

                <strong>
                    Active habits
                </strong>

            </div>


            <div class="streak-item">

                <div>⚡</div>

                <div class="streak-number">
                    ${data.activities.length}
                </div>

                <strong>
                    Activities logged
                </strong>

            </div>

        </div>

    `;
}


// ======================================================
// BADGES
// ======================================================

function renderBadgesPage(main) {

    const data = getUserData();

    const streak = calculateStreak(data);

    const totalCompletedHabits =
        data.habits.reduce(
            (total, habit) =>
                total +
                habit.checkpoints.filter(
                    checkpoint => checkpoint.done
                ).length,
            0
        );

    const badges = [

        {
            icon: "🌱",
            name: "First Step",
            description: "Complete your first habit checkpoint.",
            unlocked:
                totalCompletedHabits >= 1
        },

        {
            icon: "🔥",
            name: "3 Day Streak",
            description: "Maintain a 3 day streak.",
            unlocked:
                streak >= 3
        },

        {
            icon: "🔥",
            name: "7 Day Streak",
            description: "Maintain a 7 day streak.",
            unlocked:
                streak >= 7
        },

        {
            icon: "🔥",
            name: "30 Day Streak",
            description: "Maintain a 30 day streak.",
            unlocked:
                streak >= 30
        },

        {
            icon: "🏃",
            name: "First Activity",
            description: "Log your first activity.",
            unlocked:
                data.activities.length >= 1
        },

        {
            icon: "💧",
            name: "Hydrated",
            description: "Log your water intake.",
            unlocked:
                data.activities.some(
                    activity =>
                        activity.type === "Water"
                )
        },

        {
            icon: "📚",
            name: "Focused",
            description: "Log your first study session.",
            unlocked:
                data.activities.some(
                    activity =>
                        activity.type === "Study"
                )
        },

        {
            icon: "🏋️",
            name: "Getting Stronger",
            description: "Log your first workout.",
            unlocked:
                data.activities.some(
                    activity =>
                        activity.type === "Workout"
                )
        },

        {
            icon: "👥",
            name: "Social",
            description: "Make your first friend.",
            unlocked:
                data.friends.length >= 1
        },

        {
            icon: "⚡",
            name: "10 Activities",
            description: "Log 10 activities.",
            unlocked:
                data.activities.length >= 10
        },

        {
            icon: "🎯",
            name: "Consistency",
            description: "Complete 10 habit checkpoints.",
            unlocked:
                totalCompletedHabits >= 10
        }

    ];


    const unlockedCount =
        badges.filter(
            badge => badge.unlocked
        ).length;


    main.innerHTML = `

        <div class="topbar">

            <div>

                <h1 class="page-title">
                    Badges
                </h1>

                <p class="page-subtitle">
                    Earn badges through real progress.
                </p>

            </div>

            <div class="user-pill">
                🏆 ${unlockedCount} / ${badges.length}
            </div>

        </div>


        <div class="badges-grid">

            ${
                badges.map(
                    badge => `

                        <div
                            class="badge ${
                                badge.unlocked
                                    ? ""
                                    : "locked"
                            }"
                        >

                            <div class="badge-icon">

                                ${
                                    badge.unlocked
                                        ? badge.icon
                                        : "🔒"
                                }

                            </div>

                            <strong>
                                ${badge.name}
                            </strong>

                            <p>
                                ${badge.description}
                            </p>

                            <span class="badge-status">

                                ${
                                    badge.unlocked
                                        ? "Unlocked"
                                        : "Locked"
                                }

                            </span>

                        </div>

                    `
                ).join("")
            }

        </div>

    `;
}
function renderFriendsPage(main) {

    const user =
        getCurrentUser();


    const data =
        getUserData();


    const users =
        getUsers().filter(
            other =>
                other.id !== user.id
        );


    main.innerHTML = `

        <div class="topbar">

            <div>

                <h1 class="page-title">
                    Friends
                </h1>

                <p class="page-subtitle">
                    Connect with people building better habits.
                </p>

            </div>

        </div>


        <div class="friends-grid">

            <div class="card">

                <div class="card-heading">

                    <div>

                        <h2>
                            Your friends
                        </h2>

                        <p class="muted">
                            ${data.friends.length} connected
                        </p>

                    </div>

                </div>


                ${
                    data.friends.length

                    ? data.friends.map(
                        friendId => {

                            const friend =
                                getUsers().find(
                                    u =>
                                        u.id === friendId
                                );

                            if (!friend) return "";

                            return `

                                <div class="friend-row">

                                    <div class="avatar">
                                        ${getInitials(friend.name)}
                                    </div>

                                    <div class="friend-info">

                                        <strong>
                                            ${escapeHTML(friend.name)}
                                        </strong>

                                        <span>
                                            Friend
                                        </span>

                                    </div>

                                </div>

                            `;

                        }
                    ).join("")

                    : emptyState(
                        "👥",
                        "No friends yet",
                        "Create another account to test the friend system."
                    )

                }

            </div>


            <div class="card">

                <div class="card-heading">

                    <div>

                        <h2>
                            Find people
                        </h2>

                        <p class="muted">
                            Accounts on this device
                        </p>

                    </div>

                </div>


                ${
                    users.length

                    ? users.map(
                        other => `

                            <div class="friend-row">

                                <div class="avatar">
                                    ${getInitials(other.name)}
                                </div>

                                <div class="friend-info">

                                    <strong>
                                        ${escapeHTML(other.name)}
                                    </strong>

                                    <span>
                                        Momentum user
                                    </span>

                                </div>

                                <button
                                    class="secondary-button add-friend"
                                    data-id="${other.id}"
                                >
                                    ${
                                        data.friends.includes(other.id)
                                        ? "Added"
                                        : "Add"
                                    }
                                </button>

                            </div>

                        `
                    ).join("")

                    : emptyState(
                        "🔎",
                        "No other users",
                        "Create another account to test connecting with friends."
                    )

                }

            </div>

        </div>

    `;


    document
        .querySelectorAll(".add-friend")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.id
                        );

                    if (
                        !data.friends.includes(id)
                    ) {

                        data.friends.push(id);

                        saveUserData(data);

                    }

                    renderFriendsPage(main);

                }
            );

        });
}


function renderProfilePage(main) {

    const user = getCurrentUser();
    const data = getUserData();

    const streak = calculateStreak(data);

    main.innerHTML = `

        <div class="topbar">

            <div>

                <h1 class="page-title">
                    Profile
                </h1>

                <p class="page-subtitle">
                    Your personal Momentum space.
                </p>

            </div>

        </div>


        <div class="profile-header">

            <div class="profile-avatar">
                ${getInitials(user.name)}
            </div>

            <div class="profile-info">

                <h2>
                    ${escapeHTML(user.name)}
                </h2>

                <p>
                    ${escapeHTML(user.email)}
                </p>

                <p>
                    Member since
                    ${new Date(
                        user.createdAt
                    ).toLocaleDateString()}
                </p>

            </div>

        </div>


        <div class="stats-grid">

            <div class="stat-card">
                <span>Habits</span>
                <strong>${data.habits.length}</strong>
            </div>

            <div class="stat-card">
                <span>Activities</span>
                <strong>${data.activities.length}</strong>
            </div>

            <div class="stat-card">
                <span>Friends</span>
                <strong>${data.friends.length}</strong>
            </div>

            <div class="stat-card">
                <span>Current streak</span>
                <strong>🔥 ${streak}</strong>
            </div>

        </div>


       <div class="card profile-summary">

    <div class="card-heading">

        <div>
            <h2>Your Momentum</h2>
            <p class="muted">
                Keep building small habits consistently.
            </p>
        </div>

        <div class="profile-status">
            ${
                streak > 0
                    ? "🔥 On a streak"
                    : "🌱 Getting started"
            }
        </div>

    </div>

    <div class="profile-progress">

        <div class="profile-progress-track">

            <div
                class="profile-progress-fill"
                style="width:${
                    data.habits.length
                        ? Math.min(
                              100,
                              Math.round(
                                  (
                                      data.habits.filter(
                                          habit => isHabitComplete(habit)
                                      ).length /
                                      data.habits.length
                                  ) * 100
                              )
                          )
                        : 0
                }%;"
            ></div>

        </div>

    </div>

</div>
    `;
}

function setupTheme() {

    const saved =
        localStorage.getItem(
            "momentum_dark"
        ) === "true";


    if (saved) {

        document.body.classList.add("dark");

    }


    const button =
        document.getElementById(
            "themeToggle"
        );


    button.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );


            localStorage.setItem(
                "momentum_dark",
                document.body.classList.contains(
                    "dark"
                )
            );

        }
    );
}


// ======================================================
// LOGOUT
// ======================================================

function logout() {

    localStorage.removeItem(
        CURRENT_USER_KEY
    );

    showLogin();
}


// ======================================================
// UI HELPERS
// ======================================================

function userPill(user) {

    return `

        <div class="user-pill">

            <div class="avatar">
                ${getInitials(user.name)}
            </div>

            ${escapeHTML(user.name)}

        </div>

    `;
}


function getInitials(name) {

    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();
}


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


function emptyState(
    icon,
    title,
    text
) {

    return `

        <div class="empty-state">

            <div class="empty-state-icon">
                ${icon}
            </div>

            <h3>
                ${title}
            </h3>

            <p>
                ${text}
            </p>

        </div>

    `;
}


// ======================================================
// START
// ======================================================

const currentUser =
    getCurrentUser();


if (currentUser) {

    showApp();

} else {

    showLogin();

}