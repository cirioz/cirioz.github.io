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
          description: "Full Stack QA Engineer — Python, Pytest, Playwright, Selenium. ISTQB certified.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-test-2",
        
          title: "Test 2",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/test-2/";
          
        },
      },{id: "post-test-drawing",
        
          title: "Test Drawing",
        
        description: "Test Drawing Post",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/test-drawing/";
          
        },
      },{id: "post-how-to-mirror-an-android-screen-on-a-mac",
        
          title: "How to mirror an Android screen on a Mac",
        
        description: "A 5-minute setup with scrcpy that I keep re-discovering. Wireless and USB both covered.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/screen-mirror-android-on-mac/";
          
        },
      },{
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
