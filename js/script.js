// ==========================================
// PUT YOUR YOUTUBE API KEY HERE
// ==========================================

const API_KEY = "PASTE_NEW_KEY_HERE";


// ==========================================
// SEARCH YOUTUBE
// ==========================================

document
    .getElementById("searchForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const query =
            document.getElementById("searchInput").value.trim();

        if (query === "") {
            return;
        }

        searchYouTube(query);

    });


async function searchYouTube(query) {

    const results =
        document.getElementById("searchResults");

    results.innerHTML = "<p>Searching...</p>";

    const url =
        "https://www.googleapis.com/youtube/v3/search" +
        "?part=snippet" +
        "&q=" + encodeURIComponent(query) +
        "&type=video" +
        "&maxResults=10" +
        "&key=" + API_KEY;

    try {

        const response = await fetch(url);

        const data = await response.json();

        results.innerHTML = "";

        if (!data.items || data.items.length === 0) {

            results.innerHTML =
                "<p>No videos found.</p>";

            return;
        }

        data.items.forEach(video => {

            const videoId =
                video.id.videoId;

            const title =
                video.snippet.title;

            const channel =
                video.snippet.channelTitle;

            const thumbnail =
                video.snippet.thumbnails.medium.url;

            const videoElement =
                document.createElement("div");

            videoElement.className = "video";

            videoElement.innerHTML = `

                <img src="${thumbnail}">

                <div>

                    <h3>${title}</h3>

                    <p>${channel}</p>

                    <button
                        onclick="playVideo('${videoId}')"
                    >
                        ▶ Play
                    </button>

                </div>

            `;

            results.appendChild(videoElement);

        });

    }

    catch (error) {

        console.error(error);

        results.innerHTML =
            "<p>Something went wrong.</p>";

    }
}


// ==========================================
// PLAY VIDEO ON YOUR WEBSITE
// ==========================================

function playVideo(videoId) {

    const player =
        document.getElementById("player");

    player.innerHTML = `

        <iframe
            src="https://www.youtube.com/embed/${videoId}"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen>
        </iframe>
    `;

    // Scroll to the player
    player.scrollIntoView({
        behavior: "smooth"
    });

}


// ==========================================
// GET TRENDING VIDEOS
// ==========================================

async function getTrendingSongs() {

    const url =
        "https://www.googleapis.com/youtube/v3/videos" +
        "?part=snippet" +
        "&chart=mostPopular" +
        "&regionCode=US" +
        "&maxResults=3" +
        "&key=" + API_KEY;

    try {

        const response =
            await fetch(url);

        const data =
            await response.json();

        const container =
            document.getElementById("trendingSongs");

        container.innerHTML = "";

        data.items.forEach(video => {

            const videoId =
                video.id;

            const title =
                video.snippet.title;

            const channel =
                video.snippet.channelTitle;

            const thumbnail =
                video.snippet.thumbnails.medium.url;

            const videoElement =
                document.createElement("div");

            videoElement.className = "video";

            videoElement.innerHTML = `
                <img src="${thumbnail}">
                <div>
                    <h3>${title}</h3>
                    <p>${channel}</p>
                    <button
                        onclick="playVideo('${videoId}')"
                    >
                        ▶ Play
                    </button>
                </div>
            `;
            container.appendChild(videoElement);
        });
    }
    catch (error) {
        console.error(error);

        document.getElementById("trendingSongs").innerHTML =
            "Could not load trending videos.";
    }
}

// Load trending videos when page opens
getTrendingSongs();
