# Notes, thoughts and plans for the project.

When spawning the viewer window, youtube offers multiple links and formats, embed currently favorite.  
Embed link format: https://www.youtube.com/embed/[VIDEO_ID]

The queue should be represented by either, or a combination of, the thumbnail, uploader and title (more?). This could also be made a user option.  
Thumbnail link format: https://i.ytimg.com/vi/[VIDEO_ID]/hqdefault.jpg

The queue should be parsed in FIFO (also a spotify-like "play next", which makes that video the next to play, bypassing the ordinary queue) order, and show a representation which tells the user what video they're about to watch, and/or an amount of videos coming up, in order.

HTML5 implements an event listener which calls any function.
At this point, this is the only way I know which allows for detecting videos ending, and seems ideal.  
The event listener needs the video html-id or class, which on youtube is "html5-main-video".
[Stack overflow discussion](https://stackoverflow.com/questions/2741493/detect-when-an-html5-video-finishes)

Upon starting a video/queue, a new window should pop up, this window should be sized according to screen resolution and the aspect ratio of the video. An embed-link ensures the video fills the window.

Upon a video ending, the user should be automatically taken to the next video, unless the queue is empty, in which case the window should show a prompt asking if the user would like to close that window.
If the window is not closed, the window should have the ability to automatically start any new videos added to the queue upon being added (This must be user configurable, maybe through a toggle-switch labeled "auto-play").

The videos should only need to be drag and dropped into a field which then parses any information the application needs from any given link, and places it in queue.

The queue should have the ability to be reordered using drag and drop moving and/or a "move to x position"-prompt.
