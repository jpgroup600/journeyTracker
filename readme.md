<h1>User Journey Tracker</h1>

<h2>Description</h2>

<p>This is a simple user journey tracker that tracks the user's journey on the website. It is a simple and easy to use tool that is used to track the user's journey on the website. It is a simple and easy to use tool that is used to track the user's journey on the website.</p>

<h2>Installation</h2>

<p>To install the user journey tracker, you need to add the following code to your website:</p>

<h3>for Vanilla JS</h3>
<pre>


<script src="https://cdn.jsdelivr.net/gh/jpgroup600/journeyTracker@1.0.0/userJourneyTracker.min.js"></script>
<script>
    const tracker = UserJourneyTracker.init({
        API_ENDPOINT: '/api/tracking',
        DEBUG: true
    });
</script>

</pre>

<h3>for React</h3>
<pre>
<Script id="user-journey-tracker" strategy="afterInteractive">
      {`
        (function(w,d,t,a,r){
          w.UserJourneyTracker = w.UserJourneyTracker || {};
          a=d.getElementsByTagName('head')[0];
          r=d.createElement('script');
          r.async=1;
          r.src=t;
          r.onload = function() {
            w.UserJourneyTracker.init({
              API_ENDPOINT: '/api/tracking',
              DEBUG: true,
            });
          };
          a.appendChild(r);
        })(window,document,'https://cdn.jsdelivr.net/gh/jpgroup600/journeyTracker@1.0.0/userJourneyTracker.min.js');
      `}
    </Script>


</pre>

<h2>Usage</h2>
<h2>API Endpoints</h2>
<p>Set the Endpoints accordingly to save the data in your database</p>


<h3>These are the options that you can use to configure the user journey tracker:</h3>
<pre>
const CONFIG = {
    COOKIE_NAME: 'userJourney',
    API_ENDPOINT: '/api/userVisit',
    COOKIE_PATH: '/',
    TRACK_ALL: false,
    TRACKING_CLASSES: [{ 'track-portfolio': 'portfolio' }, { 'track-web-portfolio': 'web-portfolio' }],
    DEBUG: false
};
</pre>

<p>TRACK ALL : This is a boolean value that determines if all the elements on the page should be tracked. If it is set to true, then all the elements on the page will be tracked. If it is set to false, then only the elements with the class names specified in the TRACKING_CLASSES array will be tracked.</p>

<p>TRACKING_CLASSES : This is an array of objects that contains the class names of the elements that should be tracked. The key is the class name of the element and the value is the name of the element that should be tracked.</p>

<h3>DEBUG : This is a boolean value that determines if the debug mode should be enabled. this is Not made yet</h3>

<pre>
