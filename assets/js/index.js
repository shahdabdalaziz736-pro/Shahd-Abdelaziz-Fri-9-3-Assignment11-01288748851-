/*---------------sidebar navigation------------*/

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".app-section");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const section = link.dataset.section;

    navLinks.forEach(l => l.classList.remove("bg-blue-500/10", "text-blue-400"));
    link.classList.add("bg-blue-500/10", "text-blue-400");

    sections.forEach(s => {
      if (s.dataset.section === section) {
        s.classList.remove("hidden");
      } else {
        s.classList.add("hidden");
      }
    });
  });
});



/*------------------sidebartoggle--------------------------------------*/


const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
});




/*-------------------------------nasa api-----------------------------------------------------------------------------*/


const NASA_API_KEY = "0fddQjTqbo7kCxpgX86LsCP93STKdeA7FXdodmfh";
const apodImage = document.getElementById("apod-image");
const apodTitle = document.getElementById("apod-title");
const apodExplanation = document.getElementById("apod-explanation");
const apodDate = document.getElementById("apod-date");
const apodDateInfo = document.getElementById("apod-date-info");
const apodMediaType = document.getElementById("apod-media-type");
const apodCopyright = document.getElementById("apod-copyright");
const apodDateInput = document.getElementById("apod-date-input");
const loadDateBtn = document.getElementById("load-date-btn");
const todayApodBtn = document.getElementById("today-apod-btn");
const apodLoading = document.getElementById("apod-loading");

async function fetchAPOD(date = "") {
  try {
    apodLoading.classList.remove("hidden");
    const url = date
      ? `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`
      : `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    apodImage.src = data.url || "./assets/images/fallback.jpg";
    apodTitle.textContent = data.title || "N/A";
    apodExplanation.textContent = data.explanation || "N/A";
    apodDate.textContent = `Astronomy Picture of the Day - ${data.date || "N/A"}`;
    apodDateInfo.textContent = data.date || "N/A";
    apodMediaType.textContent = data.media_type || "N/A";
    apodCopyright.textContent = data.copyright ? `© ${data.copyright}` : "";
  } catch (err) {
    console.error("APOD API Error:", err);
    apodImage.src = "./assets/images/fallback.jpg";
    apodTitle.textContent = "Failed to load APOD";
    apodExplanation.textContent = "";
  } finally {
    apodLoading.classList.add("hidden");
  }
}

fetchAPOD();
loadDateBtn.addEventListener("click", () => {
  const date = apodDateInput.value;
  if (date) fetchAPOD(date);
});
todayApodBtn.addEventListener("click", () => fetchAPOD());

/*------------------------launch api with moc------------------------------------------------------------*/


const launchesGrid = document.getElementById("launches-grid");
const launchesCount = document.getElementById("launches-count");
const launchesCountMobile = document.getElementById("launches-count-mobile");

const mockLaunches = [
  { name: "Test Launch 1", status: { name: "Go" }, launch_service_provider: { name: "NASA" }, rocket: { configuration: { name: "Falcon 9" } }, net: new Date(), pad: { name: "Cape Canaveral" } },
  { name: "Test Launch 2", status: { name: "TBC" }, launch_service_provider: { name: "SpaceX" }, rocket: { configuration: { name: "Starship" } }, net: new Date(), pad: { name: "Boca Chica" } },
];

async function fetchLaunches() {
  try {
 
    const launches = mockLaunches; 
    launchesGrid.innerHTML = "";

    launches.forEach(launch => {
      const status = launch.status?.name || "TBC";
      const missionName = launch.name || "N/A";
      const agency = launch.launch_service_provider?.name || "N/A";
      const vehicle = launch.rocket?.configuration?.name || "N/A";
      const dateUTC = launch.net ? new Date(launch.net) : new Date();
      const dateStr = dateUTC.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      const timeStr = dateUTC.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
      const location = launch.pad?.name || "N/A";

      const card = document.createElement("div");
      card.classList.add("bg-slate-800/50", "border", "border-slate-700", "rounded-2xl", "overflow-hidden", "hover:border-blue-500/30", "transition-all", "group", "cursor-pointer");
      card.innerHTML = `
        <div class="relative h-48 bg-slate-900/50 flex items-center justify-center">
          <img src="./assets/images/fallback.jpg" alt="Launch Image" class="w-20 h-20">
          <div class="absolute top-3 right-3">
            <span class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold">${status}</span>
          </div>
        </div>
        <div class="p-5">
          <div class="mb-3">
            <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">${missionName}</h4>
            <p class="text-sm text-slate-400 flex items-center gap-2">
              <i class="fas fa-building text-xs"></i>
              ${agency}
            </p>
          </div>
          <div class="space-y-2 mb-4">
            <div class="flex items-center gap-2 text-sm">
              <i class="fas fa-calendar text-slate-500 w-4"></i>
              <span class="text-slate-300">${dateStr}</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <i class="fas fa-clock text-slate-500 w-4"></i>
              <span class="text-slate-300">${timeStr} UTC</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <i class="fas fa-rocket text-slate-500 w-4"></i>
              <span class="text-slate-300">${vehicle}</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
              <span class="text-slate-300 line-clamp-1">${location}</span>
            </div>
          </div>
          <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
            <button class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">Details</button>
            <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
              <i class="far fa-heart"></i>
            </button>
          </div>
        </div>
      `;
      launchesGrid.appendChild(card);
    });

    launchesCount.textContent = `${launches.length} Launches`;
    launchesCountMobile.textContent = `${launches.length}`;
  } catch (err) {
    console.error("Launches API Error:", err);
    launchesGrid.innerHTML = `<p class="text-red-400 text-center col-span-full mt-4">Failed to load launches</p>`;
    launchesCount.textContent = "0 Launches";
    launchesCountMobile.textContent = "0";
  }
}

fetchLaunches();

const planetsGrid = document.getElementById("planets-grid");
const planetDetailImage = document.getElementById("planet-detail-image");
const planetDetailName = document.getElementById("planet-detail-name");
const planetDetailDescription = document.getElementById("planet-detail-description");
const planetDistance = document.getElementById("planet-distance");
const planetRadius = document.getElementById("planet-radius");
const planetMass = document.getElementById("planet-mass");
const planetDensity = document.getElementById("planet-density");
const planetOrbitalPeriod = document.getElementById("planet-orbital-period");
const planetRotation = document.getElementById("planet-rotation");
const planetMoons = document.getElementById("planet-moons");
const planetGravity = document.getElementById("planet-gravity");

const planetComparisonTbody = document.getElementById("planet-comparison-tbody");
const earthPerihelion = document.getElementById("planet-perihelion");
const earthAphelion = document.getElementById("planet-aphelion");
const earthEccentricity = document.getElementById("planet-eccentricity");
const earthInclination = document.getElementById("planet-inclination");
const earthAxialTilt = document.getElementById("planet-axial-tilt");
const earthTemp = document.getElementById("planet-temp");
const earthEscape = document.getElementById("planet-escape");

const planetData = [
  { name: "Mercury", id: "mercury", distanceAU: 0.39, diameter: 4879, mass: 0.055, period: "88 days", moons: 0, type: "Terrestrial", color: "#eab308" },
  { name: "Venus", id: "venus", distanceAU: 0.72, diameter: 12104, mass: 0.815, period: "225 days", moons: 0, type: "Terrestrial", color: "#f97316" },
  { name: "Earth", id: "earth", distanceAU: 1.00, diameter: 12742, mass: 1.0, period: "365.2 days", moons: 1, type: "Terrestrial", color: "#3b82f6",
    perihelion: "147.1M km", aphelion: "152.1M km", eccentricity: 0.0167, inclination: "0.00°", axialTilt: "23.44°", avgTemp: "15°C", escapeVelocity: "11.2 km/s"
  },
  { name: "Mars", id: "mars", distanceAU: 1.52, diameter: 6779, mass: 0.107, period: "687 days", moons: 2, type: "Terrestrial", color: "#ef4444" },
  { name: "Jupiter", id: "jupiter", distanceAU: 5.20, diameter: 139820, mass: 317.8, period: "11.9 years", moons: 79, type: "Gas Giant", color: "#fb923c" },
  { name: "Saturn", id: "saturn", distanceAU: 9.58, diameter: 116460, mass: 95.2, period: "29.5 years", moons: 82, type: "Gas Giant", color: "#facc15" },
  { name: "Uranus", id: "uranus", distanceAU: 19.22, diameter: 50724, mass: 14.5, period: "84.0 years", moons: 27, type: "Ice Giant", color: "#06b6d4" },
  { name: "Neptune", id: "neptune", distanceAU: 30.05, diameter: 49244, mass: 17.1, period: "164.8 years", moons: 14, type: "Ice Giant", color: "#2563eb" }
];

function createPlanetCards() {
  planetsGrid.innerHTML = "";
  planetData.forEach(planet => {
    const card = document.createElement("div");
    card.classList.add("planet-card", "cursor-pointer", "rounded-lg", "p-3", "bg-slate-800/50", "hover:bg-slate-700/70", "transition-colors");
    card.dataset.planetId = planet.id;
    card.textContent = planet.name;
    planetsGrid.appendChild(card);

    card.addEventListener("click", () => updatePlanetDetail(planet.id));
  });
}

function updatePlanetDetail(planetId) {
  const planet = planetData.find(p => p.id === planetId);
  if (!planet) return;
  planetDetailImage.src = `./assets/images/${planet.id}.png`;
  planetDetailName.textContent = planet.name;
  planetDetailDescription.textContent = planet.name;
  planetDistance.textContent = planet.distanceAU + " AU";
  planetRadius.textContent = planet.diameter + " km";
  planetMass.textContent = planet.mass + " Earth Masses";
  planetDensity.textContent = planet.density || "N/A";
  planetOrbitalPeriod.textContent = planet.period;
  planetRotation.textContent = planet.sideralRotation || "N/A";
  planetMoons.textContent = planet.moons;
  planetGravity.textContent = planet.gravity || "N/A";

  if (planet.name === "Earth") {
    earthPerihelion.textContent = planet.perihelion;
    earthAphelion.textContent = planet.aphelion;
    earthEccentricity.textContent = planet.eccentricity;
    earthInclination.textContent = planet.inclination;
    earthAxialTilt.textContent = planet.axialTilt;
    earthTemp.textContent = planet.avgTemp;
    earthEscape.textContent = planet.escapeVelocity;
  }
}

function populatePlanetTable() {
  planetComparisonTbody.innerHTML = "";
  planetData.forEach(planet => {
    const tr = document.createElement("tr");
    tr.classList.add("hover:bg-slate-800/30", "transition-colors");
    if (planet.name === "Earth") tr.classList.add("bg-blue-500/5");
    tr.innerHTML = `
      <td class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10">
        <div class="flex items-center space-x-2 md:space-x-3">
          <div class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0" style="background-color: ${planet.color}"></div>
          <span class="font-semibold text-sm md:text-base whitespace-nowrap">${planet.name}</span>
        </div>
      </td>
      <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${planet.distanceAU}</td>
      <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${planet.diameter}</td>
      <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${planet.mass}</td>
      <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${planet.period}</td>
      <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">${planet.moons}</td>
      <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
        <span class="px-2 py-1 rounded text-xs ${planet.type === 'Terrestrial' ? 'bg-orange-500/50 text-orange-200' :
        planet.type === 'Gas Giant' ? 'bg-purple-500/50 text-purple-200' : 'bg-cyan-500/50 text-cyan-200'}">${planet.type}</span>
      </td>
    `;
    planetComparisonTbody.appendChild(tr);
  });
}

createPlanetCards();
populatePlanetTable();
updatePlanetDetail("earth");
