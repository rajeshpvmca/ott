// Global colors for charts
const chartColors = ['#ff003c', '#7209b7', '#f72585', '#4cc9f0', '#3a0ca3'];
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || JSON.parse(localStorage.getItem("currentUser")); // Fallback for consistency

if(!loggedInUser){
    window.location.href = "signin.html";
}

if (loggedInUser) {
    document.getElementById("userName").innerText = loggedInUser.name;
    // Check if userEmail element exists before setting innerText
    document.getElementById("userEmail") && (document.getElementById("userEmail").innerText = loggedInUser.email);
    // Check if dashboardName element exists before setting innerText
    document.getElementById("dashboardName") && (document.getElementById("dashboardName").innerText = loggedInUser.name);
}

// Initialize Dashboard
window.onload = function() {
    loadMenuByRole();
    showContent('home');
};

// Load Menu based on role
function loadMenuByRole() {
    const desktopMenu = document.getElementById("sidebarMenu");
    const mobileMenu = document.getElementById("mobileMenu");
    const role = loggedInUser.role;
    
    let menuHtml = `
        <li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="home" onclick="showContent('home')"><i class="fa-solid fa-house"></i> Home</a></li>
        <li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="profile" onclick="showContent('profile')"><i class="fa-solid fa-user"></i> Profile</a></li>
    `;

    if (role === "Admin") {
        menuHtml += `
            <li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="analytics" onclick="showContent('analytics')"><i class="fa-solid fa-chart-line"></i> Analytics</a></li>
        `;
    } else if (role === "Creator") {
        menuHtml += `
            <li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="content" onclick="showContent('content')"><i class="fa-solid fa-clapperboard"></i> My Content</a></li>
            <li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="audience" onclick="showContent('audience')"><i class="fa-solid fa-users-viewfinder"></i> Audience</a></li>
        `;
    } else if (role === "User") {
        menuHtml += `
            <li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="watchlist" onclick="showContent('watchlist')"><i class="fa-solid fa-heart"></i> Watchlist</a></li>
        `;
    }

    menuHtml += `<li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="settings" onclick="showContent('settings')"><i class="fa-solid fa-gear"></i> Settings</a></li>`;
    
    if(desktopMenu) desktopMenu.innerHTML = menuHtml;
    if(mobileMenu) mobileMenu.innerHTML = menuHtml;
}


// LOGOUT

function logout(){

    localStorage.removeItem("loggedInUser");

    window.location.href = "index.html";

}


// SIDEBAR CONTENT

function showContent(type){
    const contentBox = document.getElementById("contentBox");

    // Set active link style
    document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active')); // Remove active from all
    document.querySelectorAll(`[data-content-type="${type}"]`).forEach(link => link.classList.add('active')); // Add active to current

    // Close mobile offcanvas if it's open
    const offcanvas = document.getElementById('sidebarOffcanvas');
    if (offcanvas) {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas) || new bootstrap.Offcanvas(offcanvas);
        // Ensure bootstrap.Offcanvas exists and is initialized
        bsOffcanvas.hide();
    }

    if(type === "home"){
        let roleContent = "";
        if(loggedInUser.role === "Admin"){
            roleContent = `
                <div class="p-4 rounded-4 mb-4" style="background: linear-gradient(90deg, #ff003c 0%, #a3003c 100%);" data-aos="fade-down">
                    <h2 class="fw-bold text-white"><i class="fa-solid fa-chart-line me-2"></i>Platform Overview</h2>
                    <p class="text-white opacity-75">Monitor key performance indicators and system health.</p>
                </div>
                <div class="row g-4 mt-2">
                    <div class="col-md-4"><div class="card stat-card p-4 d-flex flex-row align-items-center justify-content-between"><div><h3 class="fw-bold text-white">1.2M</h3><p class="text-secondary mb-0">Total Subscribers</p></div><i class="fa-solid fa-users-line fs-2 text-danger"></i></div></div>
                    <div class="col-md-4"><div class="card stat-card p-4 d-flex flex-row align-items-center justify-content-between"><div><h3 class="fw-bold text-white">₹8.5M</h3><p class="text-secondary mb-0">Monthly Revenue</p></div><i class="fa-solid fa-money-bill-trend-up fs-2 text-danger"></i></div></div>
                    <div class="col-md-4"><div class="card stat-card p-4 d-flex flex-row align-items-center justify-content-between"><div><h3 class="fw-bold text-white">99.9%</h3><p class="text-secondary mb-0">Server Uptime</p></div><i class="fa-solid fa-microchip fs-2 text-success"></i></div></div>
                </div>`;
        } else if(loggedInUser.role === "Creator"){
            roleContent = `
                <div class="p-4 rounded-4 mb-4 border border-danger border-opacity-25" style="background: linear-gradient(90deg, rgba(255,0,60,0.1) 0%, rgba(114,9,183,0.1) 100%);" data-aos="fade-down">
                    <h2 class="fw-bold" style="color: #ff003c;"><i class="fa-solid fa-video me-2"></i>Creator Studio</h2>
                    <p class="text-white opacity-75">Your latest content is performing exceptionally well! Keep creating.</p>
                    <button class="btn btn-danger btn-sm rounded-pill px-4 mt-2 shadow-sm"><i class="fa-solid fa-upload me-2"></i>Upload New Content</button>
                </div>
                <div class="row g-4 mt-2">
                    <div class="col-md-4"><div class="card stat-card p-4 text-center"><div><h3 class="fw-bold text-white">4.5M</h3><p class="text-secondary mb-0">Total Views</p></div></div></div>
                    <div class="col-md-4"><div class="card stat-card p-4 text-center"><div><h3 class="fw-bold text-white">120</h3><p class="text-secondary mb-0">Content Pieces</p></div></div></div>
                    <div class="col-md-4"><div class="card stat-card p-4 text-center"><div><h3 class="fw-bold text-white">₹120k</h3><p class="text-secondary mb-0">Est. Earnings</p></div></div></div>
                </div>
            `;
        } else {
            roleContent = `
                <div class="p-4 rounded-4 mb-4" style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url('assets/images/banner.webp') center/cover;" data-aos="zoom-out">
                    <div class="py-3">
                        <h2 class="fw-bold text-white"><i class="fa-solid fa-play me-2"></i>Continue Watching</h2>
                        <p class="text-white-50">Interstellar - 1h 24m left <i class="fa-solid fa-circle-play ms-2"></i></p>
                        <button class="btn btn-danger btn-sm rounded-pill px-4 shadow"><i class="fa-solid fa-play me-2"></i>Resume Now</button>
                    </div>
                </div>
                <div class="row g-4 mt-2">
                    <div class="col-md-4"><div class="card stat-card p-4 text-center"><div><h3 class="fw-bold text-white">24</h3><p class="text-secondary mb-0">Movies Watched</p></div></div></div>
                    <div class="col-md-4"><div class="card stat-card p-4 text-center"><div><h3 class="fw-bold text-white">5</h3><p class="text-secondary mb-0">In Watchlist</p></div></div></div>
                    <div class="col-md-4"><div class="card stat-card p-4 text-center"><div><h3 class="fw-bold text-white">Premium</h3><p class="text-secondary mb-0">Plan Status</p></div></div></div>
                </div>
            `;
        }

        contentBox.innerHTML = `
            <div class="p-0">
                ${roleContent}
                <div class="row g-4 mt-4">
                    <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                        <div class="card stat-card p-3 h-100">
                            <h5 class="fw-bold mb-3">Monthly Active Subscribers</h5>
                            <div id="barChart"></div>
                        </div>
                    </div>
                    <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
                        <div class="card stat-card p-3 h-100">
                            <h5 class="fw-bold mb-3">Daily Peak Concurrent Streams</h5>
                            <div id="lineChart"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        // Render charts after content is set
        renderHomeCharts();
        // Refresh AOS for dynamic content
        typeof AOS !== 'undefined' && AOS.refresh();
    }

    else if(type === "profile"){
        contentBox.innerHTML = `
            <div class="p-0" data-aos="fade-up">
                <div class="row align-items-center mb-4">
                    <div class="col-md-auto text-center mb-3 mb-md-0">
                        <div class="position-relative d-inline-block">
                            <img src="assets/images/logo1.webp" class="rounded-circle border p-1 bg-white shadow-sm" style="width: 120px; height: 120px; object-fit: cover;" alt="Profile">
                            <span class="position-absolute bottom-0 end-0 badge rounded-pill bg-success border border-2 border-white p-2"><span class="visually-hidden">Online</span></span>
                        </div>
                    </div>
                    <div class="col-md ps-md-4">
                        <h2 class="fw-bold mb-1">${loggedInUser.name}</h2>
                        <p class="text-white mb-2"><i class="fa-solid fa-envelope me-2"></i>${loggedInUser.email}</p>
                        <span class="badge bg-danger border px-3 py-2"><i class="fa-solid fa-user-gear me-2"></i>Account Type: ${loggedInUser.role}</span>
                    </div> 
                </div>
                <button class="btn btn-outline-light btn-sm rounded-pill px-3 mt-2 mt-md-0" onclick="redirect404()"><i class="fa-solid fa-edit me-2"></i>Edit Profile</button>
            </div>
        <hr>
        <div class="mt-3 mb-4">
            ${loggedInUser.role === "Admin" ? `
                <p class="text-white-50"><i class="fa-solid fa-shield-halved me-2 text-info"></i>As an Admin, you manage platform users and content. Access detailed analytics from the sidebar.</p>
            ` : loggedInUser.role === "Creator" ? `
                <p class="text-white-50"><i class="fa-solid fa-lightbulb me-2 text-warning"></i>As a Creator, your content is reaching millions! Check your content performance and earnings in the 'My Content' section.</p>
            ` : `
                <p class="text-white-50"><i class="fa-solid fa-film me-2 text-primary"></i>Explore your viewing history and discover new recommendations tailored just for you.</p>
            `}
        </div>
        <div class="row g-4 mt-2">
            <div class="col-md-6" data-aos="fade-up" data-aos-delay="100">
                <div class="card stat-card h-100">
                    <div class="card-body">
                        <h5 class="fw-bold mb-3"><i class="fa-solid fa-user-circle me-2 text-danger"></i> Personal Information</h5>
                        <div class="list-group list-group-flush">
                            <div class="list-group-item d-flex justify-content-between px-0 bg-transparent text-white border-bottom border-secondary border-opacity-25"><span>Full Name</span><span class="fw-semibold text-white-50">${loggedInUser.name}</span></div>
                            <div class="list-group-item d-flex justify-content-between px-0 bg-transparent text-white border-bottom border-secondary border-opacity-25"><span>Email</span><span class="fw-semibold text-white-50">${loggedInUser.email}</span></div>
                            <div class="list-group-item d-flex justify-content-between px-0 bg-transparent text-white"><span>Member Since</span><span class="fw-semibold text-white-50">Jan 15, 2023</span></div>
                        </div>
                    </div>
                </div>
            </div>
            ${loggedInUser.role === "User" ? `
                <div class="col-md-6" data-aos="fade-up" data-aos-delay="200">
                    <div class="card stat-card h-100">
                        <div class="card-body">
                            <h5 class="fw-bold mb-3"><i class="fa-solid fa-credit-card me-2 text-danger"></i> Subscription & Billing</h5>
                            <div class="list-group list-group-flush">
                                <div class="list-group-item d-flex justify-content-between px-0 bg-transparent text-white border-bottom border-secondary border-opacity-25"><span>Plan</span><span class="fw-semibold text-danger">Premium</span></div>
                                <div class="list-group-item d-flex justify-content-between px-0 bg-transparent text-white border-bottom border-secondary border-opacity-25"><span>Next Billing</span><span class="fw-semibold text-white-50">June 19, 2026</span></div>
                                <div class="list-group-item d-flex justify-content-between px-0 bg-transparent text-white"><span>Payment Method</span><span class="fw-semibold text-white-50">Visa **** 1234</span></div>
                            </div>
                            <button class="btn btn-outline-danger btn-sm rounded-pill px-4 mt-3" onclick="redirect404()">Manage Subscription</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6" data-aos="fade-up" data-aos-delay="300">
                    <div class="card stat-card h-100">
                        <div class="card-body">
                            <h5 class="fw-bold mb-3"><i class="fa-solid fa-clock-rotate-left me-2 text-danger"></i> Recent Activity</h5>
                            <div class="small">
                                <p class="mb-2"><i class="fa-solid fa-play me-2 text-danger"></i> Watched 'Dune: Part Two' <span class="text-muted float-end">2m ago</span></p>
                                <p class="mb-2"><i class="fa-solid fa-heart me-2 text-danger"></i> Added 'The Creator' to Watchlist <span class="text-muted float-end">1h ago</span></p>
                                <p class="mb-2"><i class="fa-solid fa-star me-2 text-danger"></i> Rated 'Interstellar' 5 stars <span class="text-muted float-end">1d ago</span></p>
                            </div>
                            <button class="btn btn-outline-light btn-sm rounded-pill px-4 mt-3" onclick="redirect404()">View All History</button>
                        </div>
                    </div>
                </div>
            ` : loggedInUser.role === "Creator" ? `
                <div class="col-md-6" data-aos="fade-up" data-aos-delay="200">
                    <div class="card stat-card h-100">
                        <div class="card-body">
                            <h5 class="fw-bold mb-3"><i class="fa-solid fa-chart-simple me-2 text-danger"></i> Content Performance</h5>
                            <div class="list-group list-group-flush">
                                <div class="list-group-item d-flex justify-content-between px-0 bg-transparent text-white border-bottom border-secondary border-opacity-25"><span>Total Uploads</span><span class="fw-semibold text-white-50">120</span></div>
                                <div class="list-group-item d-flex justify-content-between px-0 bg-transparent text-white border-bottom border-secondary border-opacity-25"><span>Total Views</span><span class="fw-semibold text-white-50">4.5M</span></div>
                                <div class="list-group-item d-flex justify-content-between px-0 bg-transparent text-white"><span>Estimated Earnings</span><span class="fw-semibold text-success">₹120k</span></div>
                            </div>
                            <button class="btn btn-outline-danger btn-sm rounded-pill px-4 mt-3" onclick="showContent('content')">Go to Content Studio</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6" data-aos="fade-up" data-aos-delay="300">
                    <div class="card stat-card h-100">
                        <div class="card-body">
                            <h5 class="fw-bold mb-3"><i class="fa-solid fa-upload me-2 text-danger"></i> Quick Actions</h5>
                            <p class="text-white-50">Easily manage your content and reach your audience.</p>
                            <button class="btn btn-danger rounded-pill px-4 mt-2 me-2" onclick="redirect404()"><i class="fa-solid fa-plus me-2"></i>Upload New Content</button>
                            <button class="btn btn-outline-light rounded-pill px-4 mt-2" onclick="showContent('audience')"><i class="fa-solid fa-chart-line me-2"></i>View Audience Insights</button>
                        </div>
                    </div>
                </div>
            ` : loggedInUser.role === "Admin" ? `
                <div class="col-md-6" data-aos="fade-up" data-aos-delay="200">
                    <div class="card stat-card h-100">
                        <div class="card-body">
                            <h5 class="fw-bold mb-3"><i class="fa-solid fa-users-gear me-2 text-danger"></i> User Management</h5>
                            <p class="text-white-50">Oversee and manage all user accounts on the platform.</p>
                            <button class="btn btn-outline-danger btn-sm rounded-pill px-4 mt-3" onclick="redirect404()">View All Users</button>
                            <button class="btn btn-outline-light btn-sm rounded-pill px-4 mt-3 ms-2" onclick="redirect404()">User Activity Logs</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6" data-aos="fade-up" data-aos-delay="300">
                    <div class="card stat-card h-100">
                        <div class="card-body">
                            <h5 class="fw-bold mb-3"><i class="fa-solid fa-screwdriver-wrench me-2 text-danger"></i> Platform Tools</h5>
                            <p class="text-white-50">Access system-wide configurations and moderation tools.</p>
                            <button class="btn btn-danger rounded-pill px-4 mt-2 me-2" onclick="redirect404()"><i class="fa-solid fa-shield-halved me-2"></i>Content Moderation</button>
                            <button class="btn btn-outline-light rounded-pill px-4 mt-2" onclick="showContent('settings')"><i class="fa-solid fa-gear me-2"></i>System Settings</button>
                        </div>
                    </div>
                </div>
            ` : ''}
        </div>
    </div>
        `;
        typeof AOS !== 'undefined' && AOS.refresh();
    }

    else if (type === "analytics" && loggedInUser.role === "Admin") {
        contentBox.innerHTML = `
            <div class="p-0" data-aos="fade-up" data-aos-delay="100">
                <h2 class="fw-bold" style="color: #ff003c;"><i class="fa-solid fa-chart-pie me-2"></i>Advanced Analytics</h2>
                <p class="text-white">Detailed insights into platform performance and user engagement.</p>
                <hr>
                <div class="row g-4 mt-4">
                    <div class="col-lg-6" data-aos="fade-up">
                        <div class="card stat-card p-3 h-100">
                            <h5 class="fw-bold mb-3">Watch Time by Device</h5>
                            <div id="stackedBarChart"></div>
                        </div>
                    </div>
                    <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
                        <div class="card stat-card p-3 h-100">
                            <h5 class="fw-bold mb-3">Subscription Revenue (Last 6 Months)</h5>
                            <div id="revenueLineChart"></div>
                        </div>
                    </div>
                    <div class="col-lg-6 mx-auto mt-4" data-aos="fade-up" data-aos-delay="400">
                        <div class="card stat-card p-3 h-100">
                            <h5 class="fw-bold mb-3">Content Genre Distribution</h5>
                            <div id="techPieChart"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        renderAdminAnalyticsCharts();
        typeof AOS !== 'undefined' && AOS.refresh();
    }

    else if (type === "content" && loggedInUser.role === "Creator") {
        contentBox.innerHTML = `
            <div class="p-0" data-aos="fade-up" data-aos-delay="100">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 class="fw-bold" style="color: #ff003c;"><i class="fa-solid fa-film me-2"></i>My Content Library</h2>
                        <p class="text-white">Overview of your uploaded movies and series, and their status.</p>
                    </div>
                    <button class="btn btn-danger rounded-pill px-4 shadow-sm"><i class="fa-solid fa-plus me-2"></i>Add New</button>
                </div>
                <hr>
                <div class="row g-4 mt-2">
                    <!-- Project 1 -->
                    <div class="col-md-6" data-aos="fade-up" data-aos-delay="100">
                        <div class="card stat-card h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-between mb-3">
                                    <span class="badge bg-danger px-3 py-2">Movie</span>
                                    <span class="text-muted small">Updated 2h ago</span>
                                </div>
                                <h5 class="fw-bold">The Martian: Redux</h5>
                                <p class="small text-muted">Sci-Fi thriller about a lone survivor on Mars. Remastered for 4K.</p>
                                <div class="mb-3">
                                    <div class="d-flex justify-content-between mb-1 small">
                                        <span>Processing</span>
                                        <span>75%</span>
                                    </div>
                                    <div class="progress" style="height: 6px;">
                                        <div class="progress-bar bg-danger" role="progressbar" style="width: 75%; background-color: #ff003c !important;"></div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="avatar-group">
                                        <span class="badge rounded-pill bg-dark border me-1">4K</span>
                                        <span class="badge rounded-pill bg-dark border">HDR</span>
                                    </div>
                                    <a href="#" class="btn btn-link btn-sm text-danger p-0 text-decoration-none fw-bold"><i class="fa-solid fa-pen me-1"></i>Edit Details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Project 2 -->
                    <div class="col-md-6" data-aos="fade-up" data-aos-delay="200">
                        <div class="card stat-card h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-between mb-3">
                                    <span class="badge bg-danger px-3 py-2">Web Series</span>
                                    <span class="text-muted small">Updated 1d ago</span>
                                </div>
                                <h5 class="fw-bold">Stranger Days: Season 2</h5>
                                <p class="small text-muted">Supernatural drama. Episode 4 "The Rift" is currently being encoded.</p>
                                <div class="mb-3">
                                    <div class="d-flex justify-content-between mb-1 small">
                                        <span>Encoding</span>
                                        <span>40%</span>
                                    </div>
                                    <div class="progress" style="height: 6px;">
                                        <div class="progress-bar bg-danger" role="progressbar" style="width: 40%; background-color: #ff003c !important;"></div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="avatar-group">
                                        <span class="badge rounded-pill bg-dark border me-1">Atmos</span>
                                        <span class="badge rounded-pill bg-dark border">1080p</span>
                                    </div>
                                    <a href="#" class="btn btn-link btn-sm text-danger p-0 text-decoration-none fw-bold"><i class="fa-solid fa-pen me-1"></i>Edit Details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        typeof AOS !== 'undefined' && AOS.refresh();
    }
    else if (type === "watchlist") {
        contentBox.innerHTML = `
            <div class="p-0" data-aos="fade-up" data-aos-delay="100">
                <h2 class="fw-bold" style="color: #ff003c;"><i class="fa-solid fa-heart me-2"></i>My Watchlist</h2>
                <p class="text-white">Your curated list of movies and shows to watch next.</p>
                <hr>
                <div class="row g-4 mt-2">
                    <div class="col-md-4">
                        <div class="movie-card">
                            <img src="assets/images/trending1.webp" alt="movie">
                            <div class="movie-content text-center">
                                <h5>Dark Knight</h5>
                                <button class="btn btn-danger btn-sm rounded-pill w-100 mt-2"><i class="fa-solid fa-play me-2"></i>Watch Now</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="movie-card">
                            <img src="assets/images/trending2.webp" alt="movie">
                            <div class="movie-content text-center">
                                <h5>Red Notice</h5>
                                <button class="btn btn-danger btn-sm rounded-pill w-100 mt-2"><i class="fa-solid fa-play me-2"></i>Watch Now</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="movie-card">
                            <img src="assets/images/movie3.webp" alt="movie">
                            <div class="movie-content text-center">
                                <h5>Moon Light</h5>
                                <button class="btn btn-danger btn-sm rounded-pill w-100 mt-2"><i class="fa-solid fa-play me-2"></i>Watch Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        typeof AOS !== 'undefined' && AOS.refresh();
    }

    else if (type === "audience" && loggedInUser.role === "Creator") {
        contentBox.innerHTML = `
            <div class="p-0" data-aos="fade-up" data-aos-delay="100">
                <h2 class="fw-bold" style="color: #ff003c;"><i class="fa-solid fa-chart-line me-2"></i>Audience Insights</h2>
                <p class="text-white">Analyze your viewership demographics and engagement metrics.</p>
                <hr>

                <!-- Analytics Stat Cards -->
                <div class="row g-4 mt-2">
                    <div class="col-md-4">
                        <div class="card stat-card p-4">
                            <h3 class="fw-bold text-white">124.8k</h3>
                            <p class="text-secondary mb-0">Total Unique Viewers</p>
                            <div class="text-success small mt-2"><i class="fa-solid fa-caret-up me-1"></i>15% vs last month</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card stat-card p-4">
                            <h3 class="fw-bold text-white">48:22</h3>
                            <p class="text-secondary mb-0">Avg. Watch Duration</p>
                            <div class="text-success small mt-2"><i class="fa-solid fa-caret-up me-1"></i>8% vs last month</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card stat-card p-4">
                            <h3 class="fw-bold text-white">72%</h3>
                            <p class="text-secondary mb-0">Retention Rate</p>
                            <div class="text-danger small mt-2"><i class="fa-solid fa-caret-down me-1"></i>3% vs last month</div>
                        </div>
                    </div>
                </div>

                <!-- Charts Row -->
                <div class="row g-4 mt-4">
                    <div class="col-lg-8" data-aos="fade-up">
                        <div class="card stat-card p-3 h-100">
                            <h5 class="fw-bold mb-3"><i class="fa-solid fa-chart-area me-2 text-danger"></i>Audience Growth</h5>
                            <div id="audienceGrowthChart"></div>
                        </div>
                    </div>
                    <div class="col-lg-4" data-aos="fade-up" data-aos-delay="200">
                        <div class="card stat-card p-3 h-100">
                            <h5 class="fw-bold mb-3"><i class="fa-solid fa-pie-chart me-2 text-danger"></i>Age Groups</h5>
                            <div id="audienceAgeChart"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        renderAudienceCharts();
        typeof AOS !== 'undefined' && AOS.refresh();
    }

    else if (type === "settings" && loggedInUser.role === "User") {
        contentBox.innerHTML = `
            <div class="p-0" data-aos="fade-up" data-aos-delay="100">
                <h2 class="fw-bold" style="color: #ff003c;"><i class="fa-solid fa-gear me-2"></i>Account Settings</h2>
                <p class="text-white">Manage your profile, preferences, and security settings.</p>
                </div>
                <hr>
                <div class="row g-4 mt-2">
                    <div class="col-lg-6">
                        <div class="card stat-card h-100">
                            <div class="card-body">
                                <h5 class="fw-bold mb-3"><i class="fa-solid fa-bell me-2 text-danger"></i> Notification Preferences</h5>
                                <div class="form-check form-switch mb-3">
                                    <input class="form-check-input" type="checkbox" id="notif1" checked>
                                    <label class="form-check-label text-white-50" for="notif1">Email alerts for new content releases</label>
                                </div>
                                <div class="form-check form-switch mb-3">
                                    <input class="form-check-input" type="checkbox" id="notif2" checked>
                                    <label class="form-check-label text-white-50" for="notif2">Push notifications for watchlist updates</label>
                                </div>
                                <div class="form-check form-switch mb-3">
                                    <input class="form-check-input" type="checkbox" id="notif3">
                                    <label class="form-check-label text-white-50" for="notif3">Promotional offers and discounts</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="card stat-card h-100">
                            <div class="card-body">
                                <h5 class="fw-bold mb-3"><i class="fa-solid fa-play-circle me-2 text-danger"></i> Playback Preferences</h5>
                                <div class="form-check form-switch mb-3">
                                    <input class="form-check-input" type="checkbox" id="playback1" checked>
                                    <label class="form-check-label text-white-50" for="playback1">Autoplay next episode</label>
                                </div>
                                <div class="form-check form-switch mb-3">
                                    <input class="form-check-input" type="checkbox" id="playback2">
                                    <label class="form-check-label text-white-50" for="playback2">Default HD streaming</label>
                                </div>
                                <div class="form-check form-switch mb-3">
                                    <input class="form-check-input" type="checkbox" id="playback3" checked>
                                    <label class="form-check-label text-white-50" for="playback3">Show subtitles by default</label>
                                </div>
                                <button class="btn btn-outline-danger btn-sm rounded-pill px-4 mt-2" onclick="redirect404()">Parental Controls</button>
                                <button class="btn btn-outline-danger btn-sm rounded-pill px-4 mt-2 ms-2" onclick="redirect404()">Linked Devices</button>
                            </div>
                        </div>

                    </div>
                    <div class="col-lg-6">
                        <div class="card stat-card h-100">
                            <div class="card-body">
                                <h5 class="fw-bold mb-3"><i class="fa-solid fa-lock me-2 text-danger"></i> Security Settings</h5>
                                <div class="form-check form-switch mb-3">
                                    <input class="form-check-input" type="checkbox" id="sec1" checked>
                                    <label class="form-check-label text-white-50" for="sec1">Two-Factor Authentication (2FA)</label>
                                </div>
                                <button class="btn btn-outline-danger btn-sm rounded-pill px-4 mt-2">Change Password</button>
                                <button class="btn btn-outline-danger btn-sm rounded-pill px-4 mt-2 ms-2" onclick="redirect404()">Manage Devices</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-4 pt-3 border-top border-secondary border-opacity-25 d-flex gap-2">
                    <button class="btn btn-danger px-4 py-2 shadow-sm" >Save Changes</button>
                    <button class="btn btn-outline-light border px-4 py-2">Cancel</button>
                </div>
            </div>
        `;
        typeof AOS !== 'undefined' && AOS.refresh();
    }
    else if (type === "settings" && loggedInUser.role === "Creator") {
        contentBox.innerHTML = `
            <div class="p-0" data-aos="fade-up" data-aos-delay="100">
                <h2 class="fw-bold" style="color: #ff003c;"><i class="fa-solid fa-gear me-2"></i>Creator Settings</h2>
                <p class="text-white">Manage your content, monetization, and notification preferences.</p>
                <hr>
                <div class="row g-4 mt-2">
                    <div class="col-lg-6">
                        <div class="card stat-card h-100">
                            <div class="card-body">
                                <h5 class="fw-bold mb-3"><i class="fa-solid fa-bell me-2 text-danger"></i> Notification Preferences</h5>
                                <div class="form-check form-switch mb-3">
                                    <input class="form-check-input" type="checkbox" id="creatorNotif1" checked>
                                    <label class="form-check-label text-white-50" for="creatorNotif1">Alerts for new content comments</label>
                                </div>
                                <div class="form-check form-switch mb-3">
                                    <input class="form-check-input" type="checkbox" id="creatorNotif2" checked>
                                    <label class="form-check-label text-white-50" for="creatorNotif2">Weekly performance reports</label>
                                </div>
                                <div class="form-check form-switch mb-3">
                                    <input class="form-check-input" type="checkbox" id="creatorNotif3">
                                    <label class="form-check-label text-white-50" for="creatorNotif3">Platform updates & announcements</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="card stat-card h-100">
                            <div class="card-body">
                                <h5 class="fw-bold mb-3"><i class="fa-solid fa-dollar-sign me-2 text-danger"></i> Monetization & Content</h5>
                                <div class="form-check form-switch mb-3">
                                    <input class="form-check-input" type="checkbox" id="monetization1" checked>
                                    <label class="form-check-label text-white-50" for="monetization1">Enable ads on my content</label>
                                </div>
                                <button class="btn btn-outline-danger btn-sm rounded-pill px-4 mt-2" onclick="redirect404()">Manage Payment Info</button>
                                <button class="btn btn-outline-danger btn-sm rounded-pill px-4 mt-2 ms-2" onclick="redirect404()">Content Upload Defaults</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-4 pt-3 border-top border-secondary border-opacity-25 d-flex gap-2">
                    <button class="btn btn-danger px-4 py-2 shadow-sm" >Save Changes</button>
                    <button class="btn btn-outline-light border px-4 py-2">Cancel</button>
                </div>
            </div>
        `;
        typeof AOS !== 'undefined' && AOS.refresh();
    }
    else if (type === "settings" && loggedInUser.role === "Admin") { // Admin specific settings
        contentBox.innerHTML = `
            <div class="p-0" data-aos="fade-up" data-aos-delay="100">
                <h2 class="fw-bold" style="color: #ff003c;"><i class="fa-solid fa-gear me-2"></i>System Configuration</h2>
                <div class="row g-4">
                    <div class="col-lg-6">
                        <div class="card stat-card h-100">
                            <div class="card-body">
                                <h5 class="fw-bold mb-3"><i class="fa-solid fa-bell me-2 text-danger"></i> System Notifications</h5>
                                <div class="form-check form-switch mb-3">
                                    <input class="form-check-input" type="checkbox" id="notif1" checked>
                                    <label class="form-check-label text-white-50" for="notif1">Email alerts for new user registrations</label>
                                </div>
                                <div class="form-check form-switch mb-3">
                                    <input class="form-check-input" type="checkbox" id="notif2" checked>
                                    <label class="form-check-label text-white-50" for="notif2">Security & Uptime critical alerts</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="card stat-card h-100">
                            <div class="card-body">
                                <h5 class="fw-bold mb-3"><i class="fa-solid fa-lock me-2 text-danger"></i> Security & Access</h5
                                <div class="form-check form-switch mb-3">
                                    <input class="form-check-input" type="checkbox" id="sec1" checked>
                                    <label class="form-check-label text-white-50" for="sec1">Enable Two-Factor Authentication (2FA)</label>
                                </div>
                                <button class="btn btn-outline-danger btn-sm rounded-pill px-4 mt-2" onclick="redirect404()">Manage User Accounts</button>
                                <button class="btn btn-outline-danger btn-sm rounded-pill px-4 mt-2 ms-2" onclick="redirect404()">Content Moderation</button>
                                <button class="btn btn-outline-danger btn-sm rounded-pill px-4 mt-2 ms-2" onclick="redirect404()">Platform Configuration</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-4 pt-3 border-top border-secondary border-opacity-25 d-flex gap-2">
                    <button class="btn btn-danger px-4 py-2 shadow-sm" >Save Configuration</button>
                    <button class="btn btn-outline-light border px-4 py-2">Reset Defaults</button>
                </div>
            </div>
        `;
        typeof AOS !== 'undefined' && AOS.refresh();
    }
    else {
        contentBox.innerHTML = `
            <div class="p-0" data-aos="fade-in">
                <h2 class="fw-bold" style="color: #ff003c;">${type.charAt(0).toUpperCase() + type.slice(1)}</h2>
                <p class="lead text-muted">This module is currently under development for ${loggedInUser.role}s.</p>
                <div class="text-center py-5"><i class="fa-solid fa-screwdriver-wrench fa-4x text-white-50"></i></div>
            </div>
        `;
        typeof AOS !== 'undefined' && AOS.refresh();
    }
}

function renderHomeCharts() {
    // Monthly Active Users - Bar Chart
    new ApexCharts(document.querySelector("#barChart"), {
        series: [{ name: 'Subscribers', data: [120000, 190000, 300000, 500000, 200000, 300000] }],
        chart: { type: 'bar', height: 350, toolbar: { show: false } },
        colors: ['#ff003c'],
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] }
    }).render();

    // Daily Server Load - Line Chart
    new ApexCharts(document.querySelector("#lineChart"), {
        series: [{ name: 'Concurrent Streams', data: [200, 150, 450, 800, 600, 300] }],
        chart: { type: 'line', height: 350, toolbar: { show: false } },
        colors: ['#ff003c'],
        stroke: { curve: 'smooth' },
        xaxis: { categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'] }
    }).render();

    // Role-specific Home Charts (Creator)
    if (loggedInUser.role === "Creator") {
        new ApexCharts(document.querySelector("#developerLineChart"), {
            series: [{ name: 'Uploads', data: [3, 7, 2, 8, 4] }],
            chart: { type: 'line', height: 250, toolbar: { show: false } },
            stroke: { curve: 'smooth' },
            colors: [chartColors[0]]
        }).render();
        new ApexCharts(document.querySelector("#developerBarChart"), {
            series: [{ name: 'Views (k)', data: [50, 80, 120, 60] }],
            chart: { type: 'bar', height: 250, toolbar: { show: false } },
            colors: [chartColors[3]], // Using a different color from the palette
            xaxis: { categories: ['Action', 'Comedy', 'Drama', 'Horror'] }
        }).render();
    } else if (loggedInUser.role === "User") {
        new ApexCharts(document.querySelector("#managerBarChart"), {
            series: [{ name: 'Time Watched (hr)', data: [85, 70, 95] }],
            chart: { type: 'bar', height: 300, toolbar: { show: false } },
            plotOptions: { bar: { horizontal: true } },
            colors: [chartColors[0]],
            xaxis: { categories: ['This Week', 'Last Week', 'Avg'] }
        }).render();
    }
}

function renderAudienceCharts() {
    // Audience Growth (Line/Area)
    new ApexCharts(document.querySelector("#audienceGrowthChart"), {
        series: [{ name: 'Views', data: [31000, 40000, 28000, 51000, 42000, 109000, 100000] }],
        chart: { type: 'area', height: 350, toolbar: { show: false }, background: 'transparent' },
        colors: ['#ff003c'],
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 3 },
        fill: {
            type: 'gradient',
            gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.1 }
        },
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        grid: { borderColor: 'rgba(255,255,255,0.05)' },
        theme: { mode: 'dark' }
    }).render();

    // Age Demographics (Donut)
    new ApexCharts(document.querySelector("#audienceAgeChart"), {
        series: [44, 55, 13, 33],
        chart: { type: 'donut', height: 350 },
        labels: ['18-24', '25-34', '35-44', '45+'],
        colors: ['#ff003c', '#7209b7', '#f72585', '#3a0ca3'],
        stroke: { show: false },
        legend: { position: 'bottom' },
        plotOptions: {
            pie: { donut: { size: '75%' } }
        },
        theme: { mode: 'dark' }
    }).render();
}

function renderAdminAnalyticsCharts() {
    // Team Performance - Stacked Bar
    new ApexCharts(document.querySelector("#stackedBarChart"), { // Watch Time by Device
        series: [
            { name: 'Mobile', data: [1200, 1900, 3000] },
            { name: 'TV', data: [800, 1000, 1500] },
            { name: 'Desktop', data: [500, 700, 1000] }
        ],
        chart: { type: 'bar', height: 350, stacked: true, toolbar: { show: false } },
        colors: [chartColors[0], chartColors[1], chartColors[2]],
        xaxis: { categories: ['Action', 'Drama', 'Comedy'] }
    }).render();

    // Revenue Trend - Line
    new ApexCharts(document.querySelector("#revenueLineChart"), {
        series: [{ name: 'Revenue (₹)', data: [100000, 150000, 120000, 180000, 220000, 250000] }],
        chart: { type: 'line', height: 350, toolbar: { show: false } },
        stroke: { curve: 'smooth' },
        colors: [chartColors[0]],
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] }
    }).render();

    // Tech Stack - Pie
    new ApexCharts(document.querySelector("#techPieChart"), { // Content Genre Distribution
        series: [45, 25, 20, 10],
        chart: { type: 'pie', height: 350 },
        labels: ['Action', 'Drama', 'Comedy', 'Sci-Fi'],
        colors: [chartColors[0], chartColors[1], chartColors[2], chartColors[3]]
    }).render();
}

// REDIRECT TO 404

function redirect404(){
    window.location.href = "404.html";
}