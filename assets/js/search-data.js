// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-about",
          title: "about",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "A growing collection of your cool projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "This is a description of the page. You can modify it in &#39;_pages/cv.md&#39;. You can also change or remove the top pdf download button.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-drawing-week-of-may-17",
        
          title: "Drawing — week of May 17",
        
        description: "Sketches and studies from the week. Posting these to keep myself accountable.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/drawing-week-of-may-17/";
          
        },
      },{id: "post-touchdesigner-devlog-001-getting-started",
        
          title: "TouchDesigner devlog #001 — getting started",
        
        description: "First entry of an ongoing devlog. Setup, first patch, and what I&#39;m aiming for next.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/touchdesigner-devlog-001/";
          
        },
      },{id: "post-how-to-mirror-an-android-screen-on-a-mac",
        
          title: "How to mirror an Android screen on a Mac",
        
        description: "A 5-minute setup with scrcpy that I keep re-discovering. Wireless and USB both covered.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/screen-mirror-android-on-mac/";
          
        },
      },{id: "post-hello-this-is-the-site",
        
          title: "Hello — this is the site",
        
        description: "A short note on why this exists and what you&#39;ll find here.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/hello-this-is-the-site/";
          
        },
      },{id: "news-site-is-live-first-posts-up-backfilling-content-as-i-go",
          title: 'Site is live. First posts up. Backfilling content as I go.',
          description: "",
          section: "News",},{id: "projects-this-site",
          title: 'this site',
          description: "The site you&#39;re reading. Built on Jekyll + al-folio, hosted on GitHub Pages.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_personal_site/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6F%7A%72%65%6E@%70%72%6F%74%6F%6E%6D%61%69%6C.%63%68", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/cirioz", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
