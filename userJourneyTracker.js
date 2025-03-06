
(function() {
// Constants
const DEFAULT_CONFIG = {
    COOKIE_NAME: 'userJourney',
    API_ENDPOINT: '/api/userVisit',
    COOKIE_PATH: '/',
    DEBUG :false
};

class UserJourneyTracker {
    constructor(config = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
        this.startTime = Date.now();
        this.domain = window.location.hostname;
        this.pageURL = window.location.pathname;
        this.isInternalNavigation = false;
        this.lastClickedElement = null;
        this.journeyData = this.loadJourneyData();
        
        this.initializeEventListeners();
    }

    // Cookie Management
    loadJourneyData() {
        const journeyCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith(`${CONFIG.COOKIE_NAME}=`));

        if (journeyCookie) {
            try {
                return JSON.parse(decodeURIComponent(journeyCookie.split('=')[1])) || [];
            } catch (error) {
                console.error("Error parsing userJourney cookie:", error);
                return [];
            }
        }
        return [];
    }

    saveJourneyData(scrollPercentage = 0) {
        if (!Array.isArray(this.journeyData)) {
            this.journeyData = [];
        }

        const duration = this.calculateDuration();
        const existingData = this.findExistingJourneyData();

        if (existingData) {
            this.updateExistingData(existingData, scrollPercentage, duration);
        } else {
            this.addNewJourneyData(scrollPercentage, duration);
        }

        this.saveToCookie();
    }

    // Helper Methods
    calculateDuration() {
        return Math.round((Date.now() - this.startTime) / 1000);
    }

    findExistingJourneyData() {
        return this.journeyData.find(journey => 
            journey.pageURL === this.pageURL && journey.domain === this.domain
        );
    }

    updateExistingData(existingData, scrollPercentage, duration) {
        existingData.scrollPosition = `${Math.round(scrollPercentage)}%`;
        existingData.duration = duration;
    }

    addNewJourneyData(scrollPercentage, duration) {
        this.journeyData.push({
            domain: this.domain,
            pageURL: this.pageURL,
            scrollPosition: `${Math.round(scrollPercentage)}%`,
            duration: duration
        });
    }

    saveToCookie() {
        const jsonString = encodeURIComponent(JSON.stringify(this.journeyData));
        document.cookie = `${CONFIG.COOKIE_NAME}=${jsonString}; path=${CONFIG.COOKIE_PATH};`;
    }

    deleteCookie() {
        document.cookie = `${CONFIG.COOKIE_NAME}=; path=${CONFIG.COOKIE_PATH}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        console.log("userJourney cookie deleted");
    }

    // API Communication
    async sendDataToBackend() {
        try {
            const response = await fetch(CONFIG.API_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ jourtneyDaa: this.journeyData })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.success) {
                console.log("Data saved successfully:", data.message);
                return data;
            }
            throw new Error(data.message || 'Failed to save data');
        } catch (error) {
            console.error("Error saving journey data:", error);
            throw error;
        }
    }

    // event handler

    initializeEventListeners() {
        document.addEventListener("DOMContentLoaded", () => this.saveJourneyData(0));
        window.addEventListener("scroll", this.handleScroll.bind(this));
        document.addEventListener("click", this.handleClick.bind(this), true);
        window.addEventListener("beforeunload", this.handleBeforeUnload.bind(this));
        window.addEventListener("pagehide", this.handlePageHide.bind(this));
    }

    handleScroll() {
        const scrollPosition = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollPosition / totalHeight) * 100;
        
        // Debounce the save operation to avoid too frequent updates
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        
        this.scrollTimeout = setTimeout(() => {
            this.saveJourneyData(scrollPercentage);
        }, 500); 
    }

    handleClick(event) {
        this.lastClickedElement = event.target;
        if(event.target.tagName === "A"){
            this.isInternalNavigation = true;
        }
        const clickData = {
            elementType: event.target.tagName,
            elementId: event.target.id,
            elementClass: event.target.className,
            timestamp: new Date().toISOString()
        };
        
        // Add click data to journey
        if (!this.journeyData[this.journeyData.length - 1].clicks) {
            this.journeyData[this.journeyData.length - 1].clicks = [];
        }
        this.journeyData[this.journeyData.length - 1].clicks.push(clickData);
        this.saveJourneyData();
    }

    handleBeforeUnload(event) {
        // Save final state before page unload
        
        alert("handleBeforeUnload");
        const scrollPosition = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollPosition / totalHeight) * 100;
        
        this.saveJourneyData(scrollPercentage);
        
        // Attempt to send data to backend
        this.sendDataToBackend().catch(error => {
            console.error('Failed to send data before unload:', error);
        });
    }

    handlePageHide(event) {
        // Similar to beforeunload but more reliable for mobile devices
        
        if (!this.isInternalNavigation) {
            const scrollPosition = window.scrollY;
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = (scrollPosition / totalHeight) * 100;
            
            this.saveJourneyData(scrollPercentage);
            
            // Final attempt to send data
            this.sendDataToBackend().catch(error => {
                console.error('Failed to send data on page hide:', error);
            });
        }
        alert("handlePageHide",this.scrollPercentage);
    }

    // ... rest of the event handler implementations remain similar but use class methods
    // (handleScroll, handleClick, handleBeforeUnload, handlePageHide)
}

// Initialize the tracker
function initializeTracker(config = {}) {
    if (window.userJourneyTracker) {
        console.warn('UserJourneyTracker already initialized');
        return window.userJourneyTracker;
    }
    window.userJourneyTracker = new UserJourneyTracker(config);
    return window.userJourneyTracker;
}

// Expose to global scope
window.UserJourneyTracker = {
    init: initializeTracker,
    version: '1.0.0'
};

})(window);
