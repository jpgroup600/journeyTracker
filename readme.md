<h1>User Journey Tracker</h1>

<h2>Description</h2>

<p>This is a simple user journey tracker that tracks the user's journey on the website. It is a simple and easy to use tool that is used to track the user's journey on the website. It is a simple and easy to use tool that is used to track the user's journey on the website.</p>

<h2>Installation</h2>

<p>To install the user journey tracker, you need to add the following code to your website:</p>

<pre>


<script src="https://cdn.jsdelivr.net/gh/jpgroup600/journeyTracker@1.0.0/userJourneyTracker.min.js"></script>
<script>
    const tracker = UserJourneyTracker.init({
        API_ENDPOINT: '/api/tracking',
        DEBUG: true
    });
</script>


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
              DEBUG: true
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
    DEBUG :false
};
</pre>



<pre>
