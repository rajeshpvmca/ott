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
            <li class="nav-item"><a href="movies.html" class="nav-link sidebar-link"><i class="fa-solid fa-film"></i> Browse Movies</a></li>
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
                <div class="p-4 rounded-4 mb-4" style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000') center/cover;" data-aos="zoom-out">
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
                            <img src="https://via.placeholder.com/120/ff003c/ffffff?text=SF" class="rounded-circle border p-1 bg-white shadow-sm" style="width: 120px; height: 120px; object-fit: cover;" alt="Profile">
                            <span class="position-absolute bottom-0 end-0 badge rounded-pill bg-success border border-2 border-white p-2"><span class="visually-hidden">Online</span></span>
                        </div>
                    </div>
                    <div class="col-md ps-md-4">
                        <h2 class="fw-bold mb-1">${loggedInUser.name}</h2>
                        <p class="text-muted mb-2"><i class="fa-solid fa-envelope me-2"></i>${loggedInUser.email}</p>
                        <span class="badge bg-danger border px-3 py-2"><i class="fa-solid fa-user-gear me-2"></i>Account Type: ${loggedInUser.role}</span>
                    </div>
                </div>
                <hr>
                <div class="row g-4 mt-2">
                    <div class="col-md-6">
                        <h5 class="fw-bold mb-3">Account Details</h5>
                        <div class="list-group list-group-flush">
                            <div class="list-group-item d-flex justify-content-between px-0 bg-transparent text-white border-bottom border-secondary border-opacity-25"><span>User ID</span><span class="fw-semibold text-white-50">#SF-${Math.floor(Math.random() * 9000) + 1000}</span></div>
                            <div class="list-group-item d-flex justify-content-between px-0 bg-transparent text-white border-bottom border-secondary border-opacity-25"><span>Member Since</span><span class="fw-semibold text-white-50">Jan 15, 2023</span></div>
                            <div class="list-group-item d-flex justify-content-between px-0 bg-transparent text-white"><span>Subscription</span><span class="fw-semibold text-danger">Premium</span></div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h5 class="fw-bold mb-3">Recent Activity</h5>
                        <div class="small">
                            <p class="mb-2"><i class="fa-solid fa-clock-rotate-left me-2 text-danger"></i> Watched 'Dune: Part Two' <span class="text-muted float-end">2m ago</span></p>
                            <p class="mb-2"><i class="fa-solid fa-heart me-2 text-danger"></i> Added 'The Creator' to Watchlist <span class="text-muted float-end">1h ago</span></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        typeof AOS !== 'undefined' && AOS.refresh();
    }

    else if (type === "analytics" && loggedInUser.role === "Admin") {
        contentBox.innerHTML = `
            <div class="p-0" data-aos="fade-up" data-aos-delay="100">
                <h2 class="fw-bold" style="color: #ff003c;"><i class="fa-solid fa-chart-pie me-2"></i>Advanced Analytics</h2>
                <p class="text-muted">Detailed insights into platform performance and user engagement.</p>
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
                        <p class="text-muted">Overview of your uploaded movies and series, and their status.</p>
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
                <p class="text-muted">Your curated list of movies and shows to watch next.</p>
                <hr>
                <div class="row g-4 mt-2">
                    <div class="col-md-4">
                        <div class="movie-card">
                            <img src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=500" alt="movie">
                            <div class="movie-content text-center">
                                <h5>Dark Knight</h5>
                                <button class="btn btn-danger btn-sm rounded-pill w-100 mt-2"><i class="fa-solid fa-play me-2"></i>Watch Now</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="movie-card">
                            <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=500" alt="movie">
                            <div class="movie-content text-center">
                                <h5>Red Notice</h5>
                                <button class="btn btn-danger btn-sm rounded-pill w-100 mt-2"><i class="fa-solid fa-play me-2"></i>Watch Now</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="movie-card">
                            <img src="https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=500" alt="movie">
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
                <h2 class="fw-bold" style="color: #ff003c;"><i class="fa-solid fa-users-viewfinder me-2"></i>Audience Insights</h2>
                <p class="text-muted">Understand your viewers and their preferences.</p>
                <hr>
                <div class="table-responsive mt-4">
                    <table class="table table-hover align-middle border-top text-white">
                        <thead class="text-muted">
                            <tr>
                                <th>Region</th>
                                <th>Views</th>
                                <th>Avg. Watch Time</th>
                                <th class="text-center">Engagement</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr data-aos="fade-right" data-aos-delay="100">
                                <td>
                                    <div class="fw-bold">India</div>
                                    <div class="small text-muted">Chennai, Mumbai</div>
                                </td>
                                <td><span class="badge bg-danger rounded-pill px-3">1.2M</span></td>
                                <td>45 min</td>
                                <td class="text-center">
                                    <span class="badge bg-success rounded-pill px-3">High</span>
                                </td>
                            </tr>
                            <tr data-aos="fade-right" data-aos-delay="200">
                                <td>
                                    <div class="fw-bold">USA</div>
                                    <div class="small text-muted">California, New York</div>
                                </td>
                                <td><span class="badge bg-danger rounded-pill px-3">800k</span></td>
                                <td>30 min</td>
                                <td class="text-center">
                                    <span class="badge bg-warning text-dark rounded-pill px-3">Medium</span>
                                </td>
                            </tr>
                            <tr data-aos="fade-right" data-aos-delay="300">
                                <td>
                                    <div class="fw-bold">Europe</div>
                                    <div class="small text-muted">UK, Germany</div>
                                </td>
                                <td><span class="badge bg-danger rounded-pill px-3">500k</span></td>
                                <td>25 min</td>
                                <td class="text-center">
                                    <span class="badge bg-info text-white rounded-pill px-3">Low</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        typeof AOS !== 'undefined' && AOS.refresh();
    }

    else if (type === "settings") {
        contentBox.innerHTML = `
            <div class="p-0" data-aos="fade-up" data-aos-delay="100">
                <h2 class="fw-bold" style="color: #ff003c;"><i class="fa-solid fa-gear me-2"></i>Account Settings</h2>
                <p class="text-muted">Manage your profile, preferences, and security settings.</p>
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
                                <h5 class="fw-bold mb-3"><i class="fa-solid fa-lock me-2 text-danger"></i> Security Settings</h5>
                                <div class="form-check form-switch mb-3">
                                    <input class="form-check-input" type="checkbox" id="sec1" checked>
                                    <label class="form-check-label text-white-50" for="sec1">Two-Factor Authentication (2FA)</label>
                                </div>
                                <button class="btn btn-outline-danger btn-sm rounded-pill px-4 mt-2">Change Password</button>
                                <button class="btn btn-outline-danger btn-sm rounded-pill px-4 mt-2 ms-2">Manage Devices</button>
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
    else if (type === "audience" && loggedInUser.role === "Admin") { // Fallback for Admin if they click Creator's audience link
        contentBox.innerHTML = `
            <div class="p-0" data-aos="fade-in">
                <h2 class="fw-bold" style="color: #ff003c;">Audience Insights (Admin View)</h2>
                <p class="lead text-muted">This section provides a high-level overview of audience demographics and engagement across the platform.</p>
                <div class="text-center py-5"><i class="fa-solid fa-chart-pie fa-4x text-light"></i></div>
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
                                <button class="btn btn-outline-danger btn-sm rounded-pill px-4 mt-2">Manage Admin Accounts</button>
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