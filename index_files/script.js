var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
var CookiePrefix = "weboasis_";
var cmdPrefix = "!";
var ssi = 0;
var color = "#0C85D3";
var canvasBg = "matrix";
var searchSources = [
  ["g", "https://www.google.com/search?q={Q}", "Google"],
  ["b", "https://www.bing.com/search?q={Q}", "Bing"],
  ["d", "https://duckduckgo.com/?q={Q}", "DuckDuckGo"],
  ["e", "https://www.searchencrypt.com/search?q={Q}", "SearchEncrypt"],
  ["s", "https://new.startpage.com/do/search?q={Q}&prfe=36c84513558a2d34bf0d89ea505333ad20c7263ea98390a30c1c89932309a9bc205aec9b010c88483d613d424aeb80bb", "StartPage"],
  ["c", "https://swisscows.com/web?query={Q}", "SwissCows"],
  ["x", "https://searx.me/?q={Q}", "SearX"],
  ["q", "https://www.qwant.com/?q={Q}&t=web", "Qwant"],
  ["t", "https://solidtorrents.net/search?q={Q}", "Torrents"],
  ["a", "https://versusutil.com/?seed={Q}", " Find Alternative"],
  ["o", "https://darksearch.io/search?query={Q}", "Onion/TOR"]
];
var lockNav = false;
var globalResetBackground;
var svgReddit = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z\"/></svg>";
var svgCode = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M24 10.935v2.131l-8 3.947v-2.23l5.64-2.783-5.64-2.79v-2.223l8 3.948zm-16 3.848l-5.64-2.783 5.64-2.79v-2.223l-8 3.948v2.131l8 3.947v-2.23zm7.047-10.783h-2.078l-4.011 16h2.073l4.016-16z\" /></svg>";
var svgNews = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M21 9.662c-2.287.194-5.197 1.038-7 1.794v-1.064c1.933-.721 4.598-1.54 7-1.745v1.015zm0 2.031c-2.287.194-5.197 1.038-7 1.794v-1.064c1.933-.721 4.598-1.54 7-1.745v1.015zm0 2.031c-2.287.194-5.197 1.038-7 1.794v-1.064c1.933-.721 4.598-1.54 7-1.745v1.015zm0 2.031c-2.287.194-5.197 1.038-7 1.794v-1.064c1.933-.721 4.598-1.54 7-1.745v1.015zm0-9.951c-2.402.204-5.068 1.024-7 1.745v1.933c1.804-.756 4.713-1.6 7-1.794v-1.884zm-18 2.843c2.402.205 5.067 1.024 7 1.745v1.064c-1.803-.756-4.713-1.6-7-1.794v-1.015zm0 2.031c2.402.205 5.067 1.024 7 1.745v1.064c-1.803-.756-4.713-1.6-7-1.794v-1.015zm0 2.031c2.402.205 5.067 1.024 7 1.745v1.064c-1.803-.756-4.713-1.6-7-1.794v-1.015zm0 2.032c2.402.205 5.067 1.024 7 1.745v1.064c-1.803-.756-4.713-1.6-7-1.794v-1.015zm0-7.054c2.287.194 5.196 1.038 7 1.794v-1.933c-1.932-.72-4.598-1.54-7-1.744v1.883zm9-2.724c-3.063-1.671-7.776-2.755-12-2.963v17c4.289.206 8.195 1.249 12 3 3.805-1.751 7.711-2.794 12-3v-17c-4.224.208-8.937 1.292-12 2.963zm-10-.791c4.264.496 6.86 1.467 9 2.545v12.702c-2.968-1.184-5.939-1.95-9-2.271v-12.976zm20 12.975c-3.061.321-6.032 1.088-9 2.271v-12.701c2.187-1.103 4.757-2.051 9-2.544v12.974z\" /></svg>";
var svgMore = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M16 6h-8v-6h8v6zm-10 12h-6v6h6v-6zm18 0h-6v6h6v-6zm-11-7v-3h-2v3h-9v5h2v-3h7v3h2v-3h7v3h2v-5h-9zm2 7h-6v6h6v-6z\" /></svg>";
var svgSocial = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z\" /></svg>";
var svgDownloads = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M23.984 11h-2.006c-.057-.557-.143-1.104-.287-1.631l1.82-.862c.245.799.401 1.632.473 2.493zm-3.035-3.493l1.81-.857c-.353-.7-.758-1.368-1.236-1.981l-1.512 1.318c.36.474.667.986.938 1.52zm.039 8.939c-.26.519-.562 1.01-.904 1.473l1.539 1.29c.465-.616.871-1.276 1.211-1.976l-1.846-.787zm-.836-13.238c-.589-.54-1.214-1.038-1.9-1.454l-1.216 1.599c.577.334 1.104.739 1.602 1.177l1.514-1.322zm-1.414 16.195c-1.779 1.608-4.129 2.597-6.713 2.597-5.525 0-10.021-4.486-10.021-10 0-3.692 2.021-6.915 5.011-8.647l-1.215-1.599c-3.473 2.103-5.8 5.897-5.8 10.246 0 6.627 5.385 12 12.025 12 3.204 0 6.107-1.259 8.264-3.297l-1.551-1.3zm3.258-6.403c-.054.54-.162 1.063-.299 1.574l1.864.795c.224-.762.372-1.553.439-2.369h-2.004zm-9.996 5l7-8h-4v-10h-6v10h-4l7 8z\" /></svg>";
var svgStream = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M19 12c-.341 0-.673-.033-1-.08v1.08h-2v-1.683c-.749-.356-1.427-.837-2-1.422v3.105h-8v-6h6.294c-.19-.634-.294-1.305-.294-2h-12v19h20v-12.08c-.327.047-.659.08-1 .08zm-15 10h-2v-2h2v2zm0-4h-2v-2h2v2zm0-5h-2v-2h2v2zm0-4h-2v-2h2v2zm10 13h-8v-6h8v6zm4 0h-2v-2h2v2zm0-4h-2v-2h2v2zm-3.711-14.667c.688-1.941 2.534-3.333 4.711-3.333 2.762 0 5 2.239 5 5 0 .285-.029.562-.074.833h-.635c-.474 0-.55-.211-.806-1.025-.186-.589-.493-1.479-1.171-1.479-.689 0-.957.923-1.205 1.669-.137.405-.217.65-.339.65-.116 0-.171-.245-.308-.65-.258-.759-.551-1.669-1.235-1.669-.711 0-1.016.995-1.22 1.628-.147.46-.194.691-.324.691-.111 0-.146-.187-.275-.56-.293-.85-.386-1.755-1.691-1.755h-.428zm8.941 3.334c-.957 0-1.185-.459-1.543-1.485-.221-.636-.245-.864-.373-.864-.126 0-.161.262-.408.964-.216.615-.514 1.379-1.136 1.379-.693 0-.987-.927-1.243-1.698-.142-.427-.177-.622-.3-.622-.115 0-.146.175-.291.598-.265.781-.559 1.722-1.253 1.722-.687 0-1-.926-1.171-1.479-.252-.818-.297-1.014-.755-1.014h-.684c-.044.27-.073.547-.073.832 0 2.761 2.238 5 5 5 2.177 0 4.022-1.392 4.709-3.333h-.479z\" /></svg>";
var svgCloud = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M24 21v-6h-18v6h18zm-3-4c.553 0 1 .448 1 1s-.447 1-1 1c-.552 0-1-.448-1-1s.448-1 1-1zm-7.806 0h1.275l-.864 2h-1.274l.863-2zm-2.141 0h1.275l-.863 2h-1.275l.863-2zm-2.19 0h1.275l-.863 2h-1.275l.863-2zm-4.863.941c-2.253-.29-4-2.194-4-4.524 0-2.252 1.626-4.121 3.767-4.506.177-3.294 2.895-5.911 6.233-5.911s6.056 2.617 6.233 5.911c2.005.361 3.541 2.029 3.729 4.089h-1.991c-.279-2.105-2.674-2.333-3.65-2.401.117-1.958-.555-5.599-4.321-5.599-4.438 0-4.359 4.75-4.321 5.599-.945-.037-3.679.341-3.679 2.818 0 1.223.856 2.245 2 2.511v2.013z\" /></svg>";

var linkMenuOrder = [
  "Downloads",
  "Stream",
  "Social",
  "Reddit",
  "Code",
  "News",
  "Cloud",
  "More"
];

var defaultLinkMenu = {
  "Downloads": [
    [svgDownloads,                   "blue",                                        "-HEAD-"],
    ["FiLEOCEAN",         "https://fileocean.to",""],
    ["SolidTorrents",                   "https://solidtorrents.net",""],
    ["Torrentz2",                   "https://torrentz2.eu",""],
    ["1337X",                   "https://1337x.to/home/",""],
    ["RARBG",                   "https://rarbg.to/top100.php",""],
    ["BTDB",                   "https://btdb.eu",""],
    ["EZTV",             "https://eztv.io",""],
    ["ETTV",                   "https://www.ettv.to",""],
    ["GloDLS",         "https://glodls.to/home.php",""],
    ["Zooqle",                   "https://zooqle.com",""],
    ["NYAA",                   "https://nyaa.si",""],
    ["ConCen",             "https://www.concen.org/torrents",""],
    ["TParser",                   "https://tparser.me",""],
    ["Demonoid",                   "https://www.dnoid.to",""],
    ["LimeTorrents",             "https://www.limetorrents.info",""],
    ["ThePirateBay",         "https://thepiratebay.org",""],
    ["SkyTorrents",                   "https://www.skytorrents.lol",""],
    ["TorrentGalaxy",         "https://torrentgalaxy.to",""],
    ["APKMirror",                   "https://www.apkmirror.com",""],
    ["DownTURK",                   "https://www.downturk.net",""],
    ["AvaxHome",                   "https://avxhm.se",""],
    ["EWORA",                   "https://ewora.blogspot.com",""],
    ["Cmacapps",                   "https://cmacapps.com",""],
    ["CrackPatch",                   "https://crackingpatching.com",""],
    ["CRACKSurl",                   "http://cracksurl.com",""],
    ["Sanet",                   "https://sanet.lc/full/",""],
    ["FCPortables",                   "https://www.fcportables.com",""],
    ["GetIntoPC",                   "http://getintopc.com",""],
    ["GameCopy",                    "https://www.gamecopyworld.eu",""],
    ["RGMechanics",                   "https://rg-mechanics.org",""],
    ["FitGirlRepacks",                   "http://fitgirl-repacks.site",""],
    ["AmigosGames",                   "https://www.elamigos-games.com",""],
    ["CroHasIt",                   "https://crohasit.com",""],
    ["OVAGames",                   "http://www.ovagames.com",""],
    ["WorldSrc",                   "https://worldsrc.org",""],
    ["RareLust",                   "https://rarelust.com",""],
    ["HEVCBay",         "https://hevcbay.com",""],
    ["MegaLinks",                   "http://sorrow.thoas.feralhosting.com/ML/index/megalinks_title.html",""],
    ["MegaSearch",                   "http://megasearch.co",""],
    ["FilePursuit",                   "https://filepursuit.com",""],
    ["SoftArchive",                   "https://sanet.st/full/",""],
    ["ReleaseBB",                   "https://rlsbb.ru",""],
    ["SceneSource",                   "https://scnsrc.me",""],
    ["RapidMoviez",                   "http://rmz.cr",""],
    ["TwoDDL",                   "https://2ddl.vg",""],
    ["DDLValley",                   "https://www.ddlvalley.me",""],
    ["PSARips",                   "https://psarips.com",""],
    ["Snahp.it",                   "https://snahp.it",""],
    ["HDEncode",                   "https://hdencode.com",""],
    ["MP3Jams",                   "https://mp3jams.net",""],
    ["KingdomLeaks",                   "https://kingdom-leaks.com",""],
    ["AlbumRelease",             "http://newalbumreleases.net",""],
    ["SoundPark",                   "https://sound-park.world",""],
    ["PlusPremieres",                   "https://www.pluspremieres.nz",""],
    ["NewAlbumClub",             "https://newalbum.club",""],
    ["VidLoadr",                   "https://vidloadr.com",""],
    ["9xBuddy",             "https://9xbuddy.app",""],
    ["MP3YouTube",                   "https://mp3-youtube.download/en",""],
    ["IPLive",                   "https://iplive.club",""]

  ],

  "Stream": [
    [svgStream,                   "purple",                                        "-HEAD-"],
    ["AZMovies",                   "https://azm.to",""],
    ["YouTube",                  "https://www.youtube.com",""],
    ["Invidious",                  "https://invidio.us",""],
    ["BitChute",                   "https://www.bitchute.com",""],
    ["Twitch",                   "https://www.twitch.tv",""],
    ["Mixer",                   "https://mixer.com",""],
    ["Netflix",                   "https://www.netflix.com",""],
    ["Spotify",                  "https://open.spotify.com",""],
    ["SoundCloud",                  "https://soundcloud.com",""],
    ["Slider",                  "https://slider.kz",""],
    ["JetSetRadio",                   "https://jetsetradio.live",""],
    ["RadioGarden",                  "http://radio.garden",""],
    ["StreamSquid",                  "http://streamsquid.com",""],
    ["CMDFM",                  "https://cmd.to/fm",""],
    ["Rulu",                   "https://www.rulu.co",""],
    ["CyTube",                   "https://cytu.be",""],
    ["LMShows",                   "https://lmshows.se",""],
    ["ArconaiTV",                   "https://www.arconaitv.us",""],
    ["Pluto.tv",                   "https://pluto.tv",""],
    ["AllSprk.tv",                   "https://stream.allsprk.tv",""],
    ["UstreaMix",                   "https://ssl.ustreamix.com",""],
    ["IHaveNoTV",                   "https://ihavenotv.com",""],
    ["123TV",                   "http://123tvnow.com/top-videos/",""],
    ["SendIt",                  "https://sendit.gg",""],
    ["4Anime",                   "https://4anime.to",""],
    ["9Anime",                  "https://9anime.to/home",""],
    ["AnimeTwist",                  "https://twist.moe",""],
    ["WatchSeries",                   "https://www1.swatchseries.to",""],
    ["WatchSeries2",                  "http://watch-series.live",""],
    ["OSR-Search",                   "https://anonembed.xyz/osr/",""],
    ["StreamCR",                   "https://scr.cr/home.php",""],
    ["Ololo",                   "https://ololo.to",""],
    ["StReams",                   "https://streams.now.sh",""],
    ["LookMovie",                   "https://lookmovie.ag",""],
    ["OnionPlay",                  "https://onionplay.net",""],
    ["Dutafilm",                   "https://dutafilm.com",""],
    ["123Movies",                  "https://www6.123movies.fun",""],
    ["YesMovies",                   "https://yesmovies.to",""],
    ["5Movies",                   "https://5movies.to/movie/latest-hd/",""],
    ["CafeHulu",                   "http://cafehulu.com",""],
    ["F2Movies",                   "https://www.f2movies.to",""],
    ["UniqueStream",                   "https://uniquestream.net",""],
    ["EuroPixHD",                   "https://europixhd.net",""],
    ["MoviesJoy",                   "https://www.moviesjoy.net",""],
    ["FlixTor",                   "https://flixtor.to",""],
    ["Afdah",                   "https://afdah.info",""],
    ["MLB66",                   "https://mlb66.ir",""],
    ["MamaHD",                   "https://www.mamahd.org",""],
    ["WeakSpell",                   "http://y6stream.club",""],
    ["YourSports",                   "http://yoursports.stream",""],
    ["MLBStream.io",                   "https://mlbstream.io",""],
    ["CastStreams",                   "https://www.caststreams.com/app/",""],
    ["NFLStreams",                   "https://www.reddit.com/r/nflstreams/",""],
    ["MLBStreams",                   "https://www.reddit.com/r/MLBStreams/",""],
    ["NHLStreams",                   "https://www.reddit.com/r/NHLStreams/",""],
    ["MotorSports",                   "https://www.reddit.com/r/motorsportsstreams/",""],
    ["OpenSubtitles",                   "https://www.opensubtitles.org",""],
    ["SubScene",                   "https://subscene.com",""],
    ["Addic7ed",                   "http://www.addic7ed.com",""]
  ],

  "Social": [
    [svgSocial,                  "green",                                       "-HEAD-"],
    ["Twitter",                   "https://twitter.com",""],
    ["Imgur",                  "https://imgur.com",""],
    ["4Chan",                   "https://www.4chan.org",""],
    ["NotaBug",   "https://nab.cx",""],
    ["9GAG",                   "https://9gag.com",""],
    ["Gab",                "https://gab.com",""],
    ["KnockOut",                "https://knockout.chat",""],
    ["Steam",               "https://steamcommunity.com/discussions/",""],
    ["MPGH",               "https://www.mpgh.net/forum/",""],
    ["Dev.to",           "https://dev.to",""],
    ["DeviantArt",               "https://www.deviantart.com",""],
    ["BitcoinTalk",               "https://bitcointalk.org",""],
    ["DSLReports",               "https://www.dslreports.com",""],
    ["HardForum",                "https://hardforum.com",""],
    ["GSM-Forum",               "http://forum.gsmhosting.com/vbb/",""],
    ["StackExchange",           "https://stackexchange.com",""],
    ["HostingTalk",           "https://www.webhostingtalk.com",""],
    ["LowEndTalk",           "https://lowendtalk.com",""],
    ["OffshoreTalk",                   "https://www.offshorecorptalk.com",""],
    ["WJunction",           "http://www.wjunction.com",""],
    ["DigitalPoint",           "https://forums.digitalpoint.com",""],
    ["NamePros",           "https://www.namepros.com",""],
    ["DNForum",           "https://www.dnforum.com",""],
    ["BlackHatWorld",           "https://www.blackhatworld.com",""],
    ["MyDigitalLife",                "https://forums.mydigitallife.net",""],
    ["TorrentInvites",              "https://torrentinvites.org",""],
    ["WildersSecurity",                "https://www.wilderssecurity.com",""],
    ["0x00sec",               "https://0x00sec.org",""],
    ["Void.to",                "https://void.to",""],
    ["Cracked",                   "https://cracked.to",""],
    ["RaidForums",                   "https://raidforums.com",""],
    ["DemonForums",                   "https://demonforums.net",""],
    ["HackForums",               "https://hackforums.net",""],
    ["SentryMBA",                "https://sentry.mba",""],
    ["Sinisterly",               "https://sinister.ly",""],
    ["Nulled",           "https://www.nulled.to",""],
    ["NulledBB",           "https://nulledbb.com",""],
    ["OGUsers",               "https://ogusers.com",""],
    ["Exploit.in",               "https://forum.exploit.in",""],
    ["CorePack",                "https://corepacks.com",""],
    ["DarkUmbra",                "https://darkumbra.net",""],
    ["DarcKRePacKs",                "https://darckrepacks.com",""],
    ["nosTEAM",                "http://www.nosteamgames.ro",""],
    ["CS.RIN.RU",                "https://cs.rin.ru/forum/",""],
    ["Mobilism",                   "https://forum.mobilism.org",""],
    ["AndroidZone",                   "https://android-zone.ws",""],
    ["BlackMod",                   "https://blackmod.net",""],
    ["iOSGods",                   "https://iosgods.com",""],
    ["Warez-BB",                   "https://www.warez-bb.org",""],
    ["BlackPearl",                "https://blackpearl.biz",""],
    ["NSaneForums",                "https://www.nsaneforums.com",""],
    ["DirtyWarez",                "https://forum.dirtywarez.com",""],
    ["HeavenDL",                "https://www.heavendl.com",""],
    ["MVGroup",                "https://forums.mvgroup.org",""],
    ["Board4All",                   "https://www.board4all.biz",""],
    ["TeamOS",                "https://www.teamos-hkrg.com",""],
    ["PuZo",                "http://www.puzo.org",""],
    ["LeakThis",                "https://leakth.is",""],
    ["AdiT-HD",                   "http://adit-hd.com",""]
  ],

  "Reddit": [
    [svgReddit,                  "cyan",                                        "-HEAD-"],
    ["Reddit",        "https://www.reddit.com",""],
    ["SnewNotaBug",   "https://snew.notabug.io/r/all",""],
    ["Revddit",   "https://revddit.com",""],
    ["SnoopSnoo",        "https://snoopsnoo.com",""],
    ["RedditList",        "http://redditlist.com",""],
    ["WorldNews",        "https://www.reddit.com/user/goretsky/m/world_news/",""],
    ["Technology",   "https://www.reddit.com/user/goretsky/m/win_itpro/",""],
    ["BuySellTrade",   "https://www.reddit.com/user/101ByDesign/m/trading/",""],
    ["Streaming",   "https://www.reddit.com/user/nbatman/m/streaming/",""],
    ["Security",        "https://www.reddit.com/user/goretsky/m/security/",""],
    ["Crypto",        "https://www.reddit.com/user/und3rw4t3rp00ps/m/crypt/",""],
    ["Linux",        "https://www.reddit.com/r/linux/",""],
    ["WebDev",   "https://www.reddit.com/r/webdev/",""],
    ["WebDevTuts",        "https://www.reddit.com/r/webdevtutorials",""],
    ["GraphicDesign",   "https://www.reddit.com/r/graphic_design/",""],
    ["WebDesign",   "https://www.reddit.com/r/web_design/",""],
    ["JavaScript",   "https://www.reddit.com/r/javascript/",""],
    ["Programming",   "https://www.reddit.com/r/programming/",""],
    ["StartPages",   "https://www.reddit.com/r/startpages/",""],
    ["TechSupport",   "https://www.reddit.com/r/techsupport/",""],
    ["WebHosting",   "https://www.reddit.com/r/webhosting/",""],
    ["LiveTvLinks",   "https://www.reddit.com/r/LiveTvLinks/",""],
    ["SeedBoxes",   "https://www.reddit.com/r/seedboxes/",""],
    ["Trackers",   "https://www.reddit.com/r/trackers/",""],
    ["OpenSignups",   "https://www.reddit.com/r/OpenSignups/",""],
    ["AnimePiracy",   "https://www.reddit.com/r/animepiracy/",""],
    ["Piracy",   "https://www.reddit.com/r/Piracy/",""],
    ["Privacy",   "https://www.reddit.com/r/privacy/",""],
    ["Malware",   "https://www.reddit.com/r/Malware/",""],
    ["Onions",   "https://www.reddit.com/r/onions/",""],
    ["BTC",   "https://www.reddit.com/r/btc/",""],
    ["Monero",   "https://www.reddit.com/r/Monero/",""],
    ["CryptoCurrency",   "https://www.reddit.com/r/CryptoCurrency/",""],
    ["WallStreetBets",        "https://www.reddit.com/r/wallstreetbets/",""],
    ["SlaveLabour",        "https://www.reddit.com/r/slavelabour/",""],
    ["DataHoarder",        "https://www.reddit.com/r/DataHoarder/",""],
    ["Overclocking",        "https://www.reddit.com/r/overclocking",""],
    ["Networking",   "https://www.reddit.com/r/HomeNetworking/",""],
    ["PCGaming",   "https://www.reddit.com/r/pcgaming/",""],
    ["LinuxGaming",        "https://www.reddit.com/r/linux_gaming/",""],
    ["CyberSecurity",           "https://www.reddit.com/r/cybersecurity/",""],
    ["NetSec",     "https://www.reddit.com/r/netsec/",""],
    ["BlackHat",   "https://www.reddit.com/r/blackhat/",""],
    ["Jailbreak",   "https://www.reddit.com/r/jailbreak/",""],
    ["SysAdmin",   "https://www.reddit.com/r/sysadmin/",""],
    ["HomeLab",   "https://www.reddit.com/r/homelab/",""],
    ["SelfHosted",   "https://www.reddit.com/r/selfhosted/",""],
    ["CrackWatch",   "https://www.reddit.com/r/CrackWatch/",""],
    ["OpenDirectory",   "https://www.reddit.com/r/opendirectories/",""],
    ["Addons4Kodi",           "https://www.reddit.com/r/Addons4Kodi/",""],
    ["Leonflix",   "https://www.reddit.com/r/leonflix/",""],
    ["TVZionApp",           "https://www.reddit.com/r/TVZionApp/",""],
    ["FreeMedia",   "https://www.reddit.com/r/FREEMEDIAHECKYEAH/comments/a2csq0/how_to_stream_movies_tv_anime_sports_online/",""],
    ["MSToolkit",           "https://raddle.me/f/MSToolkit",""],
    ["SjainGuides",           "https://www.reddit.com/r/sjain_guides",""],
    ["MegaLinks2",        "https://snew.notabug.io/r/megalinks2/",""],
    ["NSFWGifs",   "https://www.reddit.com/user/ninjamutske/m/nfswgif/",""],
    ["NSFW411",   "https://www.reddit.com/r/NSFW411/wiki/index",""],
    ["ScammerList",   "https://universalscammerlist.com",""]
  ],

  "Code": [
    [svgCode,                    "red",                                         "-HEAD-"],
    ["HackWage",                   "https://hackwage.com",""],
    ["OpenSource",                     "https://awesomeopensource.com",""],
    ["Statically",                     "https://statically.io",""],
    ["NGINXConfig",                   "https://nginxconfig.io",""],
    ["NGINXGuide",                     "https://github.com/trimstray/nginx-quick-reference",""],
    ["CheatSheets",                   "https://lecoupa.github.io/awesome-cheatsheets/",""],
    ["PublicAPIs",                     "https://public-apis.xyz",""],
    ["Wandbox",           "https://wandbox.org",""],
    ["GitHub",                   "https://github.com/trending/javascript?since=monthly",""],
    ["GitLab",                   "https://gitlab.com",""],
    ["GitLogs",                     "https://www.gitlogs.com",""],
    ["GitExplorer",                     "https://gitexplorer.com",""],
    ["CodePen",                 "https://codepen.io/pens/",""],
    ["DevDocs",                     "https://devdocs.io",""],
    ["RegEx101",                     "https://regex101.com",""],
    ["Favic-o-Matic",                     "http://www.favicomatic.com",""],
    ["NerdFonts",                 "https://nerdfonts.com",""],
    ["GoogleFonts",                 "https://google-webfonts-helper.herokuapp.com",""],
    ["iFonts",                     "https://ifonts.xyz",""],
    ["DaFont",                     "https://www.dafont.com",""],
    ["Paletton",                     "http://www.paletton.com",""],
    ["SVGOMG",                     "https://jakearchibald.github.io/svgomg/",""],
    ["SVGRepo",                     "https://www.svgrepo.com",""],
    ["NounProject",                     "https://thenounproject.com",""],
    ["WebDevTools",                   "https://mothereff.in",""],
    ["JSBeautifier",                     "https://beautifier.io",""],
    ["JSCompress",                     "https://jscompress.com",""],
    ["CSSOptimizer",                     "https://css.github.io/csso/csso.html",""],
    ["CSSGridGen",                     "https://cssgrid-generator.netlify.com",""],
    ["GradientAni",                     "https://www.gradient-animator.com",""],
    ["Bootstrap",                 "https://bootstrap.build",""],
    ["Browserling",                 "https://www.browserling.com",""],
    ["Tomato",                     "https://tomato.to",""],
    ["NoHat",           "https://nohat.cc",""],
    ["AllFree",                     "https://all-free-download.com",""],
    ["GFXMountain",                   "http://gfxmountain.com",""],
    ["GFXDomain",           "https://gfxdomain.co",""],
    ["GraphicEX",           "https://graphicex.com",""],
    ["GFXTRA",           "https://www.gfxtra.com",""],
    ["CodeList",                     "http://www.codelist.cc",""],
    ["Portaliz",                     "https://portaliz.info",""],
    ["Web4Sync",           "https://web4sync.com/forum/",""],
    ["SiteDev",           "https://sitedev.club/forum/",""],
    ["CGPeers",                     "https://www.cgpeers.to",""],
    ["Babiato",           "https://babiato.com",""],
    ["Nulled.ch",                     "https://www.nulled.ch",""],
    ["NulledTeam",                     "https://www.nulledteam.com",""],
    ["ScriptzNull",           "https://scriptznull.nl",""],
    ["EScripts",           "https://www.escripts.club",""],
    ["XenForoRocks",                     "https://www.xenforo.rocks",""],
    ["NulledForum",                   "https://www.nulled.com.es",""],
    ["ThemeLock",           "http://www.themelock.com",""],
    ["WPLocker",           "http://www.wplocker.com",""],
    ["PSDKeys",           "http://psdkeys.com",""],
    ["CGPersia",           "http://cgpersia.com",""],
    ["VFXDownload",                 "https://vfxdownload.com",""],
    ["ShareAE",           "https://www.shareae.com",""],
    ["DesignTools",                     "https://flawlessapp.io/designtools",""],
    ["Selfhosted",           "https://github.com/Kickball/awesome-selfhosted",""]
  ],

  "News": [
    [svgNews,                 "orange",                                     "-HEAD-"],
    ["DrudgeReport",                    "http://drudgereport.com",""],
    ["Reuters",                    "https://www.reuters.com",""],
    ["APNews",                    "https://www.apnews.com",""],
    ["CoolGuides",                   "http://www.coolguid.es",""],
    ["TheDailyDot",                    "https://www.dailydot.com",""],
    ["ArsTechnica",                  "https://arstechnica.com",""],
    ["HackerNews",                "https://news.ycombinator.com",""],
    ["KrebsSecurity",                "https://krebsonsecurity.com",""],
    ["DarkNetLive",                "https://darknetlive.com",""],
    ["TorrentFreak",                "https://torrentfreak.com",""],
    ["WirelesSHack",                "http://www.wirelesshack.org",""],
    ["Techmeme",                "https://techmeme.com",""],
    ["Slashdot",                "https://slashdot.org",""],
    ["Lobsters",                "https://lobste.rs",""],
    ["WccfTech",                "https://wccftech.com",""],
    ["Guru3D",                "https://www.guru3d.com",""],
    ["Fossbytes",                "https://fossbytes.com",""],
    ["TheInquirer",                "https://www.theinquirer.net",""],
    ["Phoronix",                "https://phoronix.com",""],
    ["SecurityAffair",                "https://securityaffairs.co/wordpress/",""],
    ["NakedSecurity",                "https://nakedsecurity.sophos.com",""],
    ["LiveSecurity",                "https://www.welivesecurity.com",""],
    ["GBHackers",                "https://gbhackers.com",""],
    ["NullByte",                    "https://null-byte.wonderhowto.com",""],
    ["KitPloit",                "https://www.kitploit.com",""],
    ["HackerNoon",                "https://hackernoon.com",""],
    ["TWiTNetcasts",                  "https://twit.tv",""],
    ["SmashingSec",                "https://www.smashingsecurity.com",""],
    ["DailyStormCast",                "https://isc.sans.edu/podcast.html",""],
    ["ChangeLog",                "https://changelog.com",""],
    ["CoinTelegraph",                "https://cointelegraph.com",""],
    ["AudioBookBay",                   "http://audiobookbay.nl",""],
    ["Sci-Hub",                   "https://sci-hub.tw",""],
    ["LibGen",                   "http://gen.lib.rus.ec",""],
    ["PDFDrive",                "https://www.pdfdrive.com",""],
    ["eBookBB",                "https://ebookbb.com",""],
    ["iBookPile",            "https://ibookpile.net",""],
    ["EbookBike",            "https://ebook.bike",""],
    ["EBook3000",                   "http://www.ebook3000.com",""],
    ["AllITeBooks",            "http://www.allitebooks.com",""],
    ["FreeBookSpot",                   "http://www.freebookspot.es",""],
    ["MagazineLib",                   "https://magazinelib.com",""],
    ["PDFGiant",                   "http://pdf-giant.com",""],
    ["DownMagaz",                   "https://downmagaz.com",""],
    ["MagazinesDown",                   "https://magazinesdownload.org",""],
    ["ForCoder",            "https://forcoder.su",""],
    ["FreeTutorials",            "https://ftuforum.com",""],
    ["FreeCourses",            "https://www.freecoursesonline.me",""],
    ["LearningCrux",            "https://www.learningcrux.com",""],
    ["TutsGalaxy",                    "https://tutsgalaxy.com",""],
    ["Ttorial",            "https://ttorial.com",""],
    ["HowToFree",                    "https://www.howtofree.org",""],
    ["ServerForHacker",                    "https://serversforhackers.com",""],
    ["HowtoForge",                    "https://www.howtoforge.com",""],
    ["Hackr.io",                     "https://hackr.io",""],
    ["KhanAcademy",                    "https://www.khanacademy.org",""],
    ["HardenLinux",                    "https://github.com/trimstray/the-practical-linux-hardening-guide",""],
    ["PythonGuide",                     "https://gto76.github.io/python-cheatsheet/",""],
    ["Vertex42",           "https://www.vertex42.com",""]
  ],

  "Cloud": [
    [svgCloud,                    "yellow",                                      "-HEAD-"],
    ["ImageGuide",                  "https://images.guide",""],
    ["iLoveIMG",                  "https://www.iloveimg.com",""],
    ["Squoosh",                 "https://squoosh.app",""],
    ["ImageOptim",                  "https://imageoptim.com/online",""],
    ["WebPConvert",                  "https://webp-converter.com",""],
    ["BigJPG",                 "https://bigjpg.com",""],
    ["Imgur",                  "https://imgur.com",""],
    ["PostImages",                  "https://postimages.org",""],
    ["Imgbox",                  "https://imgbox.com",""],
    ["Upld.im",                  "https://upld.im",""],
    ["FunkyIMG",                  "http://funkyimg.com",""],
    ["ImgTC",                  "https://imgtc.ws",""],
    ["IMGS",                  "http://imgs.fyi",""],
    ["Nuuls",                  "https://nuuls.com/i",""],
    ["Clyp.it",                  "https://clyp.it",""],
    ["DocDroid",                  "https://www.docdroid.net",""],
    ["GoogleDrive",                  "https://www.google.com/drive/",""],
    ["YandexDisk",                  "https://disk.yandex.com",""],
    ["Mega.nz",                  "https://mega.nz",""],
    ["FilePizza",                  "https://file.pizza",""],
    ["FileRoom",                  "https://fileroom.io",""],
    ["Speech",                  "https://spee.ch",""],
    ["DMCAGripe",                  "https://dmca.gripe",""],
    ["UpBlight",                  "https://www.upblight.com",""],
    ["CatBox.moe",                  "https://catbox.moe",""],
    ["AnonymousFile",                  "https://anonymousfiles.io",""],
    ["BayFiles",                  "https://bayfiles.com",""],
    ["AnonFile",                  "https://anonfile.com",""],
    ["SolidFiles",                  "https://www.solidfiles.com",""],
    ["Openload",                  "https://openload.co",""],
    ["ZippyShare",                  "http://zippyshare.com",""],
    ["UploadRun",                  "https://upload.run",""],
    ["UploadFiles",                  "https://uploadfiles.io",""],
    ["DDL.to",                  "https://ddl.to",""],
    ["1fichier",                  "https://1fichier.com/?af=2859222",""],
    ["Userscloud",                  "https://userscloud.com",""],
    ["MyStore",                  "http://mystore.to",""],
    ["DropMe",                  "https://drop.me",""],
    ["FileRio",                  "http://filerio.in",""],
    ["UpToBox",                  "https://uptobox.com",""],
    ["Streamango",                  "https://streamango.com",""],
    ["VeryStream",                  "https://verystream.com",""],
    ["Fembed",                  "https://vcdn.io",""],
    ["Torrage",                  "https://torrage.info",""],
    ["MultiUp",                  "https://multiup.eu",""],
    ["Mirrored",                  "https://www.mirrored.to",""],
    ["MultiFileMirror",                  "https://multifilemirror.com",""],
    ["MirrorAce",                  "https://mirrorace.com",""],
    ["Real-Debrid",                  "https://real-debrid.com",""],
    ["Leech360",                  "https://leech360.com",""],
    ["PremLink",                  "https://prem.link",""],
    ["FlyDebrid",                  "https://flydebrid.com",""],
    ["Deepbrid",                  "https://www.deepbrid.com/downloader",""],
    ["LeechAll",                  "https://leechall.com",""],
    ["CocoLeech",                  "https://cocoleech.com",""],
    ["HyperDebrid",                  "https://hyperdebrid.net",""],
    ["RapidGrab",                  "http://rapidgrab.pl",""],
    ["TorrentCreator",                   "https://weboas.is/torrent/",""],
    ["TrackersList",                  "https://github.com/ngosang/trackerslist",""]
  ],

  "More": [
    [svgMore,                    "pink",                                      "-HEAD-"],
    ["Amazon",                    "https://www.amazon.com",""],
    ["PayPal",                    "https://www.paypal.com",""],
    ["Gmail",                    "https://www.google.com/gmail/",""],
    ["ProtonMail",                    "https://protonmail.com",""],
    ["CTemplar",                    "https://ctemplar.com",""],
    ["InstantEmail",                    "https://m.kuku.lu",""],
    ["Translator",               "https://www.deepl.com/translator",""],
    ["ExoticVM",               "https://www.exoticvm.com",""],
    ["Looking",                 "https://looking.house",""],
    ["Squawkr",               "https://squawkr.io",""],
    ["Windy",                    "https://www.windy.com",""],
    ["Epoch",               "https://www.epochconverter.com",""],
    ["CyberChef",               "https://gchq.github.io/CyberChef/",""],
    ["BlackHost",               "http://blackhost.xyz",""],
    ["CronTab",               "https://crontab.guru",""],
    ["LumpySoft",               "https://lumpysoft.com",""],
    ["FileCrypt",                    "https://filecrypt.cc",""],
    ["PDFCandy",                    "https://pdfcandy.com",""],
    ["VirusTotal",               "https://www.virustotal.com",""],
    ["Archive",               "https://archive.st",""],
    ["SpeedTest",               "https://www.speedtest.net",""],
    ["PhotoPea",               "https://www.photopea.com",""],
    ["Draw",               "https://www.draw.io",""],
    ["PCPartPicker",                    "https://pcpartpicker.com",""],
    ["TheEye",                "https://the-eye.eu/public/",""],
    ["FossHub",                    "https://www.fosshub.com",""],
    ["OlderGeeks",               "https://oldergeeks.com",""],
    ["Ninite",               "https://ninite.com",""],
    ["WallHaven",               "https://alpha.wallhaven.cc",""],
    ["Ping",               "https://ping.pe",""],
    ["Censys",               "https://censys.io",""],
    ["BGPView",               "https://bgpview.io",""],
    ["DNSApe",               "https://www.dnsape.com",""],
    ["DNSWatch",                    "https://www.dnswatch.info",""],
    ["DNSDumpster",               "https://dnsdumpster.com",""],
    ["SecurityTrails",               "https://securitytrails.com",""],
    ["CrimeFlare",               "http://www.crimeflare.org:82/cfs.html",""],
    ["PrivacyTools",               "https://www.privacytools.io",""],
    ["DNSLeakTest",               "https://www.dnsleaktest.com",""],
    ["Exploit-DB",                 "https://www.exploit-db.com",""],
    ["BucketSearch",               "https://buckets.grayhatwarfare.com",""],
    ["PasteBinDump",                    "https://www.psbdmp.ws",""],
    ["Snusbase",               "https://snusbase.com",""],
    ["DoxBin",                    "https://doxbin.org",""],
    ["Scans",               "https://scans.io",""],
    ["Windows",               "https://github.com/Awesome-Windows/Awesome/blob/master/README.md",""],
    ["Intelligence",               "https://github.com/jivoi/awesome-osint/blob/master/README.md",""],
    ["ListofLists",                    "https://github.com/sindresorhus/awesome/blob/master/readme.md",""],
    ["SecretBook",               "https://github.com/trimstray/the-book-of-secret-knowledge/blob/master/README.md",""],
    ["PiracyList",                   "https://github.com/Igglybuff/awesome-piracy/blob/master/readme.md",""],
    ["Warez",                    "https://github.com/CHEF-KOCH/Warez/blob/master/README.md",""],
    ["Hacking",            "https://github.com/Hack-with-Github/Awesome-Hacking/blob/master/README.md",""],
    ["Sysadmin",           "https://github.com/n1trux/awesome-sysadmin/blob/master/README.md",""],
    ["PenTesting",                    "https://www.reddit.com/r/Pentesting/comments/9ondj5/a_good_pentesting_tools_list/",""],
    ["SecLists",                    "https://github.com/danielmiessler/SecLists",""],
    ["Tracer",                    "http://pre.c-burns.co.uk/pre.php",""],
    ["Kworb",                    "https://kworb.net",""],
    ["TechBench",                    "https://tb.rg-adguard.net",""],
    ["Dark.fail",                   "https://dark.fail",""]
  ]
};

var hiddenLinks = [
	["ZipStreams", "https://njd.zipstreams.net"],
	["SilentGround", "https://www.silentground.org"],
    ["IntoTheInternet", "https://intotheinter.net"],
    ["TrackerStatus", "https://trackerstatus.info"],
    ["32Pages", "https://32pag.es"],
    ["AlphaRatio", "https://alpharatio.cc"],
    ["AnimeBytes", "https://animebytes.tv"],
    ["Awesome-HD", "https://awesome-hd.me"],
    ["Bibliotik", "https://bibliotik.me"],
    ["BitSpyder", "https://bitspyder.net"],
    ["BroadcasTheNet", "https://broadcasthe.net"],
    ["BrokenStones", "https://brokenstones.club"],
    ["Empornium", "https://www.empornium.me"],
    ["FileList", "https://filelist.ro"],
    ["GazelleGames", "https://gazellegames.net"],
    ["HDBits", "https://hdbits.org"],
    ["IPTorrents", "https://iptorrents.com"],
    ["MoreThanTV", "https://www.morethan.tv"],
    ["NotWhatCD", "https://notwhat.cd"],
    ["Orpheus", "https://orpheus.network"],
    ["PassThePopcorn", "https://passthepopcorn.me"],
    ["Redacted", "https://redacted.ch"],
    ["TheGeeks", "https://thegeeks.click"],
    ["TorrentLeech", "https://www.torrentleech.org"]
];

var linkMenu;
var userSettings;
var searchInput = document.getElementById('searchBar');
var rootSearchHelp = document.getElementById('searchHelpMenu');
var rootMenuUL = document.getElementById('categoryMenu');
var dateDiv = document.getElementById('dateContainer');
var systemInfoDiv = document.getElementById('systemInfoContainer');
var notesTextarea = document.getElementById('notesInput');
var showHideItemIcons = document.getElementById('customization-checkbox');
var openInNewTab = document.getElementById('openNewTab-checkbox');
var oldRedditLinks = document.getElementById('oldReddit-checkbox');
var confirmModal = document.getElementById('confirmModal');
var secretMenu = document.getElementById("secretMenu");
var overlay = document.getElementById('overlay');
var closeOptions = document.getElementsByClassName('modal-cancel');

function init() {
  initSearchBar();
  buildDate();
  buildSystemInfo();
  buildHelp();
  buildMenu();
  document.body.style.opacity = 1;
  document.getElementById('mainContainer').style.opacity = 1;
  document.getElementById('infoContainer').style.opacity = 1;
  document.getElementById('notesWidget').style.opacity = 1;
  var psNav = new PerfectScrollbar('#mySidenav');

  document.getElementById('menu-select').addEventListener("mouseenter", function (e) {
    lockNav = true;
  });
  document.getElementById('menu-select').addEventListener("mouseleave", function (e) {
    if (e.relatedTarget === null) {
      return;
    }
    lockNav = false;
  });
  document.querySelector('#resetToDefault .btn').addEventListener("click", resetAllToDefault);
  document.getElementById('resetColor').addEventListener("click", function () {
    color = "#0C85D3";
    document.getElementById('colorPicker').jscolor.fromString(color);
    SetCookie("matrix-color", color, 365 * 24 * 60 * 60 * 1000);
  });

  showHideItemIcons.onchange = toggleHideIcons;
  if (localStorage.getItem("hide-icons") && localStorage.getItem("hide-icons") === "yes") {
    if (!showHideItemIcons.checked) {
      showHideItemIcons.checked = true;
    }
    toggleHideIcons();
  } else {
    showHideItemIcons.checked = false;
  }

  openInNewTab.onchange = toggleOpenNewTab;
  if (GetCookie("new-tab") === 'true') {
    openInNewTab.checked = true;
  }

  oldRedditLinks.onchange = toggleOldReddit;
  if (GetCookie("old-reddit") === 'true') {
    oldRedditLinks.checked = true;
    toggleOldReddit();
  }

  if (GetCookie("matrix-color") != null) {
    color = GetCookie("matrix-color");
    jscolor.installByClassName("jscolor");
    document.getElementById('colorPicker').jscolor.fromString(color);
  }
  if (GetCookie("animation") != null) {
    clearOldCanvas();
    canvasBg = GetCookie("animation");
    setAnimation(GetCookie("animation"));
  }
  // populate secret menu
  var secretLinks = document.createElement("ul");
  for (var i = 0; i < hiddenLinks.length; i++) {
    secretLinks.innerHTML += "<li class='menu-link-item secret-link'><a href=\"" + hiddenLinks[i][1] + "\" target='_blank'><label id='secret-link-label'>" + hiddenLinks[i][0] + "</label></a></li>";
  }
  document.getElementById("secretMenu").appendChild(secretLinks);

  // ensure reset button is visible when using custom backgrounds
  if (localStorage.getItem("background_id")) {
    document.getElementById("resetBackgroundBtn").style.display = "inline-block";
  }
}
// wire up closing options for modals
Array.from(closeOptions).forEach(function (option) {
  option.addEventListener("click", function () {
    confirmModal.style.display = "none";
    secretMenu.style.display = "none";
    overlay.style.display = "none";
  });
});
function initSearchBar() {
  if (searchSources[ssi] !== undefined) {
    var searchsave = GetCookie("engine") || "";
    if (searchsave !== "") {
      searchInput.placeholder = searchSources[searchsave][2];
      ssi = searchsave;
    }
    else
      searchInput.placeholder = searchSources[ssi][2];
  } else {
    ssi = 0;
    searchInput.placeholder = "Do you know what you're doing?";
    alert("Error: default search engine setting is invalid!");
  }
  document.addEventListener('keydown', switcheroo);
  searchInput.value = "";
}
function buildDate() {
  var today = new Date();
  var hours = today.getHours() > 12 ? today.getHours() - 12 : today.getHours();
  var am_pm = today.getHours() >= 12 ? "PM" : "AM";
  hours = hours < 10 ? "0" + hours : hours;
  if (hours < 1) {
    hours = 12;
  }
  var minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
  var seconds = today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
  var time = hours + ":" + minutes + ":" + seconds + " " + am_pm;
  dateDiv.innerHTML = "<font class=\"font-2em\">" +
    dayNames[today.getDay()] + " " + monthNames[today.getMonth()] +
    " " +
    today.getDate() +
    ", " +
    today.getFullYear() +
    "<br>" +
    time +
    "</font>";
  setTimeout(buildDate, 1000);
}
function buildSystemInfo() {
  var binfo = platform.os + "<br>" + platform.name + " " + platform.version + "<br>" + screen.width + " x " + screen.height;
  var threadnum = window.navigator.hardwareConcurrency;
  var newthreadnum = parseInt(threadnum);
  var logical = newthreadnum + " Threads";
  var detectip = '<span id="ip" onclick="toggleShowIP()">Show IP</span>';
  if (newthreadnum > 0) {
    systemInfoDiv.innerHTML = binfo + "<br>" + logical + "<br>" + detectip;
  } else {
    systemInfoDiv.innerHTML = binfo + "<br>" + detectip;
  }
}
function buildHelp() {
  // console.log(searchSources[0][0]);
  // console.log(searchSources[0][2]);
  for (var i = 0; i < searchSources.length; i++) {
    // console.log(searchSources[i][0]);
    // console.log(searchSources[i][2]);
    var li = document.createElement("li");
    li.innerHTML = '<span>' + "!" + searchSources[i][0] + '</span>' + searchSources[i][2];
    li.className = "searchSources";
    li.id = i;
    rootSearchHelp.append(li);
  }
  var searchSourcesList = document.querySelectorAll('.searchSources');
  Array.from(searchSourcesList).forEach(function (source) {
    source.addEventListener("click", function (e) {
      var index = e.target.id;
      ssi = index;
      searchInput.placeholder = e.target.textContent.substring(2);
      SetCookie("engine", index, 365 * 24 * 60 * 60 * 1000);
    })
  });
}
function buildMenu() {

  if (localStorage.getItem("menu-items")) {
    linkMenu = JSON.parse(localStorage.getItem("menu-items"));
    console.log("Loaded menu items from localStorage");
  } else {
    linkMenu = defaultLinkMenu;
    localStorage.setItem("menu-items", JSON.stringify(defaultLinkMenu));
    console.log("Menu items not set in localStorage. Loaded default and set.");
  }

  var newMenu = "";

  for (var n = 0, nmax = linkMenuOrder.length; n < nmax; n++) {

    var menuID = linkMenuOrder[n];
    var menuItems = linkMenu[menuID];

    for (var i = 0, imax = menuItems.length; i < imax; i++) {
      if (menuItems[i][2] === "-HEAD-") {
        newMenu += "<li class=\"button-container expanding-down\"><div class=\"button accent-" + (menuItems[i][1] !== "" ? menuItems[i][1].toLowerCase() : "white") + "\"><label class=\"button-content\">" + menuItems[i][0] + "</label><div class=\"button-expanded-content\" style=\"box-sizing: border-box;\">";
        newMenu += "<ul id=\"" + menuID + "MenuContainer\" class=\"menu-link container\">";
      }
      else {
        newMenu += "<li class='menu-link-item' data-index=\"" + i + "\"><div class=\"remove-menu-item\">x</div><div class=\"drag-handle\"> :: </div><a href=\"" + menuItems[i][1] + "\" target=\"_blank\"><label>" + menuItems[i][0] + "</label></a></li>";
      }
      if (i === imax - 1) {
        newMenu += "</ul></div></div></li>";
      }
    }
  }

  rootMenuUL.innerHTML = newMenu;

  var removeMenuItemsList = document.querySelectorAll('.remove-menu-item');
  Array.from(removeMenuItemsList).forEach(function (menuItem) {
    menuItem.addEventListener("click", confirmRemove);
  });

  var linkMenuContainersList = document.querySelectorAll('ul.menu-link.container');
  Array.from(linkMenuContainersList).forEach(function (menuContainer) {
    Sortable.create(menuContainer, {
      handle: ".drag-handle",
      onEnd: function () {
        var menuID = menuContainer.id.replace("MenuContainer", "");
        var newMenuItems = [];
        newMenuItems[0] = linkMenu[menuID][0];
        var linkItemsList = menuContainer.querySelectorAll('li.menu-link-item');
        Array.from(linkItemsList).forEach(function (linkItem, index) {
          linkItem.setAttribute("data-index", index + 1);
          var URL = linkItem.querySelector('a').getAttribute("href");
          var name = linkItem.querySelector('a label').textContent;
          newMenuItems.push([name, URL, ""]);
        });
        linkMenu[menuID] = newMenuItems;
        localStorage.setItem("menu-items", JSON.stringify(linkMenu));
      }
    });
  })
  var menuLinks = document.querySelectorAll('.menu-link');
  Array.from(menuLinks).forEach(function (link) {
    new PerfectScrollbar(link);
  });
}
function addLinkToMenu(URL, name, menuID) {
  var newIndex = linkMenu[menuID].push([name, URL, ""]) - 1;
  localStorage.setItem("menu-items", JSON.stringify(linkMenu));
  var newLi = document.createElement('li')
  newLi.setAttribute("class", "menu-link-item");
  newLi.setAttribute("data-index", newIndex)
  newLi.innerHTML = "<div class=\"remove-menu-item\">x</div><div class=\"drag-handle\"> :: </div><a href=\"" + URL + "\" target=\"_blank\"><label>" + name + "</label></a>"
  document.getElementById(menuID + "MenuContainer").appendChild(newLi).addEventListener("click", confirmRemove);
  buildMenu();
}
function confirmRemove() {
  var linkElement = this.parentNode;
  var label = this.parentNode.querySelector('label').innerHTML;
  confirmModal.style.display = "block";
  overlay.style.display = "block";

  document.getElementById('modal-label').innerHTML = label;
  document.getElementById('deleteLink').addEventListener("click", function () {
    removeLinkFromMenu(linkElement)
    confirmModal.style.display = "none";
    overlay.style.display = "none";
  }, { once: true });
}
function removeLinkFromMenu(linkElement) {
  var index = linkElement.getAttribute("data-index");
  var parentMenuContainer = linkElement.parentNode;
  var findID = parentMenuContainer.getAttribute("id");
  var menuID = findID.replace("MenuContainer", "");
  var menuItems = linkMenu[menuID];
  menuItems.splice(index, 1);
  localStorage.setItem("menu-items", JSON.stringify(linkMenu));
  linkElement.remove();
  var linkItemsList = parentMenuContainer.querySelectorAll('.menu-link-item');
  Array.from(linkItemsList).forEach(function (link) {
    link.setAttribute("data-index", index + 1)
  });
}
function openSecretMenu() {
  secretMenu.style.display = "block";
  overlay.style.display = "block";
};
function handleQuery(event, query) {
  var key = event.keyCode || event.which;
  if (query !== "") {
    var url;
    var qList;
    if (key === 32) {
      qList = query.split(" ");
      if (qList[0].charAt(0) === cmdPrefix) {
        var keyword = "";
        for (var i = 0; i < searchSources.length; i++) {
          keyword = cmdPrefix + searchSources[i][0];
          if (keyword === qList[0]) {
            ssi = i;
            searchInput.placeholder = searchSources[ssi][2];
            searchInput.value = query.replace(keyword, "").trim();
            searchsave = ssi;
            SetCookie("engine", searchsave, 365 * 24 * 60 * 60 * 1000);
            event.preventDefault();
            break;
          }
        }
      }
    } else if (key === 13) {
      qList = query.split(" ");
      if (qList[0].charAt(0) === cmdPrefix) {
        var keyword = "";
        for (var i = 0; i < searchSources.length; i++) {
          keyword = cmdPrefix + searchSources[i][0];
          if (keyword === qList[0]) {
            ssi = i;
            break;
          }
        }
        if (qList.length > 1) {
          url = searchSources[ssi][1].replace("{Q}", encodeURIComponent(query.replace(keyword, ""))).trim();
          if (GetCookie('new-tab') === 'true') {
            window.open(url, '_blank');
          } else {
            window.location = url;
          }
        } else {
          searchInput.placeholder = searchSources[ssi][2];
          searchInput.value = "";
        }
      } else {
        url = searchSources[ssi][1].replace("{Q}", encodeURIComponent(query));
        if (GetCookie('new-tab') === 'true') {
          window.open(url, '_blank');
        } else {
          window.location = url;
        }
      }
    }
  }
  if (key === 27) {
    searchInput.blur();
  }
}
function handleNoteInput(event) {
  var key = event.keyCode || event.which;
  if (key === 27) notesTextarea.blur();
}
var noteText = null;
function handleNotes(event, focus) {
  if (focus) {
    if (!noteText) {
      noteText = GetCookie("notes") || "";
    }
    notesTextarea.value = noteText;
    addClass('notesContainer', "active");
  } else {
    removeClass('notesContainer', "active");
    if (noteText !== notesTextarea.value) {
      noteText = notesTextarea.value;
      SetCookie("notes", noteText, 365 * 24 * 60 * 60 * 1000);
    }
  }
}
var ignoredKeys = [9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 91, 92, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145];
function handleKeydown(event) {
  if (event.key === "~") {
    openSecretMenu();
    return;
  }
  if (notesInput === document.activeElement ||
    searchInput === document.activeElement ||
    ignoredKeys.includes(event.keyCode))
    return;
  //searchInput.focus();
}
function addClass(elementID, className) {
  document.getElementById(elementID).classList.add(className);
}
function removeClass(elementID, className) {
  document.getElementById(elementID).classList.remove(className);
}
function GetCookie(name) {
  try {
    var cookie = document.cookie;
    name = CookiePrefix + name;
    var valueStart = cookie.indexOf(name + "=") + 1;
    if (valueStart === 0) {
      return null;
    }
    valueStart += name.length;
    var valueEnd = cookie.indexOf(";", valueStart);
    if (valueEnd == -1)
      valueEnd = cookie.length;
    return decodeURIComponent(cookie.substring(valueStart, valueEnd));
  } catch (e) {
    console.log(e);
  }
  return null;
}
function SetCookie(name, value, expire) {
  var temp = CookiePrefix + name + "=" + escape(value) + ";" + (expire !== 0 ? "expires=" + ((new Date((new Date()).getTime() + expire)).toUTCString()) + ";" : " path=/;");
  console.log(temp);
  document.cookie = temp;
}
function CanSetCookies() {
  SetCookie('CookieTest', 'true', 0);
  var can = GetCookie('CookieTest') !== null;
  DelCookie('CookieTest');
  return can;
}
function DelCookie(name) {
  document.cookie = CookiePrefix + name + '=0; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
var switcheroo = function (event) {
  handleKeydown(event);
}
function openNav() {
  document.getElementById("mySidenav").style.width = "200px";
  document.getElementById("leftsidemenu").style.marginLeft = "200px";
  document.getElementById("leftsidemenu").style.opacity = "0";
  document.getElementById("leftsidemenu").style.transition = "0.5s";
  document.removeEventListener('keydown', switcheroo);
}
function closeNav() {
  if (lockNav) {
    return;
  }
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("leftsidemenu").style.marginLeft = "0";
  document.getElementById("leftsidemenu").style.opacity = "1";
  document.addEventListener('keydown', switcheroo);
}
function toggleShowIP() {
  if (document.getElementById("ip").innerHTML == "Show IP") {
    getIPData();
  } else {
    document.getElementById("ip").innerHTML = "Show IP";
  }
}
function getIPData() {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://ipinfo.io/ip', true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var data = request.responseText;
      document.getElementById("ip").innerHTML = data;
    } else {
    }
  };
  request.onerror = function () {
  };
  request.send();
}
function toggleHideIcons() {
  var menuRoot = rootMenuUL;
  if (showHideItemIcons.checked) {
    menuRoot.classList.add("hide-icons");
    localStorage.setItem("hide-icons", "yes")
  } else {
    menuRoot.classList.remove("hide-icons");
    localStorage.setItem("hide-icons", "no")
  }
}
function toggleOpenNewTab() {
  if (openInNewTab.checked) {
    SetCookie("new-tab", true, 365 * 24 * 60 * 60 * 1000);
  } else {
    SetCookie("new-tab", false, 365 * 24 * 60 * 60 * 1000);
  }
}
function toggleOldReddit() {
  var regex;
  var RedditListItems = document.querySelectorAll("#RedditMenuContainer li");
  if (oldRedditLinks.checked) {
    regex = /(?:www)/;
    Array.from(RedditListItems).forEach(function (item) {
      item.lastChild.href = item.lastChild.href.replace(regex, "old");
    });
    SetCookie("old-reddit", true, 365 * 24 * 60 * 60 * 1000);
  } else {
    regex = /(?:old)/;
    Array.from(RedditListItems).forEach(function (item) {
      item.lastChild.href = item.lastChild.href.replace(regex, "www");
    });
    DelCookie("old-reddit");
  }
}
function updateMatrixColor(jscolor) {
  color = '#' + jscolor;
  SetCookie("matrix-color", color, 365 * 24 * 60 * 60 * 1000);
  // update color on the color picker
  document.getElementById("colorPicker").jscolor.fromString(color);
}
function togglePicker() {
  var picker = document.getElementById("colorPicker");
  picker.classList.toggle("active");
  document.getElementById("pickerContainer").classList.toggle("active");
  document.getElementById("resetColor").classList.toggle("active");
  if (picker.classList.contains("active")) {
    picker.jscolor.show();
  } else {
    picker.jscolor.hide();
  }
}
function toggleSettings() {
  document.getElementById("toggleSettings").classList.toggle("active");
  document.getElementById("settingsContainer").classList.toggle("active");
}
var settingsFile = null;
function exportUserSettings(settings) {
  var data = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
  // manually revoke the object URL to avoid memory leaks when replacing previously generated file
  if (settingsFile !== null) {
    window.URL.revokeObjectURL(settingsFile);
  }
  settingsFile = window.URL.createObjectURL(data);
  return settingsFile;
}
document.getElementById("exportSettings").addEventListener('click', function () {
  userSettings = {
    hideIcons: localStorage.getItem("hide-icons") ? localStorage.getItem("hide-icons") : 'no',
    newTab: GetCookie("new-tab") ? GetCookie("new-tab") : false,
    oldReddit: GetCookie("old-reddit") ? GetCookie("old-reddit") : false,
    matrixColor: color,
    animation: GetCookie("animation") ? GetCookie("animation") : canvasBg,
    searchEngine: GetCookie("engine"),
    backgroundImg: url_str.match(/[0-9]/),
    notes: GetCookie("notes"),
    links: localStorage.getItem("menu-items"),
  };
  var link = document.createElement('a');
  link.setAttribute('download', 'weboasis-settings.json');
  link.href = exportUserSettings(userSettings);
  document.body.appendChild(link);
  // wait for the link to be added
  window.requestAnimationFrame(function () {
    // simulate a mouse click on the link to immediately initiate the download
    var event = new MouseEvent('click');
    link.dispatchEvent(event);
    document.body.removeChild(link);
  });
}, false);
function updateSettings(userSettings) {
  localStorage.setItem("hide-icons", userSettings.hideIcons);
  localStorage.setItem("menu-items", userSettings.links);
  userSettings.newTab === 'true' ?
    (SetCookie("new-tab", true, 365 * 24 * 60 * 60 * 1000),
      openInNewTab.checked = true) :
    SetCookie("new-tab", false, 365 * 24 * 60 * 60 * 1000);
  if (userSettings.oldReddit) {
    oldRedditLinks.checked = true;
    SetCookie("old-reddit", true, 365 * 24 * 60 * 60 * 1000);
  }
  SetCookie("matrix-color", userSettings.matrixColor, 365 * 24 * 60 * 60 * 1000);
  SetCookie("animation", userSettings.animation, 365 * 24 * 60 * 60 * 1000);
  if (userSettings.searchEngine) {
    SetCookie("engine", userSettings.searchEngine, 365 * 24 * 60 * 60 * 1000);
  }
  if (userSettings.notes) {
    SetCookie("notes", userSettings.notes, 365 * 24 * 60 * 60 * 1000);
  }
  if (userSettings.backgroundImg) {
    localStorage.setItem("background_id", userSettings.backgroundImg[0])
  }
}
function importSettings() {
  var fileInput = document.getElementById("importSettings");
  var filePath = fileInput.value;
  var allowedExtension = /(\.json)$/i;
  if (!allowedExtension.exec(filePath)) {
    alert("Please upload only the exported .json file");
    fileInput.value = '';
    return;
  } else {
    var fReader = new FileReader();
    fReader.onload = function () {
      var fileData = fReader.result;
      try {
        userSettings = JSON.parse(fileData);
        updateSettings(userSettings);
        setTimeout(function () {
          window.location.reload();
        }, 300);
      } catch (error) {
        alert("Invalid file!");
        console.log(error);
      }
    }
  };
  fReader.readAsText(fileInput.files[0]);
};
function toggleAnimations() {
  document.getElementById("customAnimationsBtn").classList.toggle("active");
  document.getElementById("customAnimationsList").classList.toggle("active");
  document.getElementById("matrix").classList.toggle("active");
}
var head = document.getElementsByTagName('head')[0];
var animationsBtnList = document.querySelectorAll(".animationBtn");
Array.from(animationsBtnList).forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (canvasBg === btn.id) {
      return;
    }
    canvasBg = btn.id;
    clearOldCanvas();
    globalResetBackground();
    setAnimation(btn.id);
    SetCookie("animation", btn.id, 365 * 24 * 60 * 60 * 1000);
    // without the reload animations stacks up
    window.location.reload(true);
  })
})
function clearOldCanvas() {
  // clear up previous script
  var scripts = document.getElementsByTagName("script");
  for (var i = 0; i < scripts.length; i++) {
    if (scripts[i].src.search("canvas") != -1) {
      head.removeChild(scripts[i]);
    }
  }
  // clear up all the canvas
  var canvasContainer = document.getElementById("canvasContainer");
  while (canvasContainer.firstChild) {
    contex = canvasContainer.firstChild.getContext('2d');
    contex.save();
    contex.setTransform(1, 0, 0, 1, 0, 0);
    contex.clearRect(0, 0, canvasContainer.firstChild.width, canvasContainer.firstChild.height)
    contex.restore();
    canvasContainer.removeChild(canvasContainer.firstChild)
  }
}
function setAnimation(canvasBg) {
  // add script for the animation
  var js = document.createElement("script");
  js.type = "text/javascript";
  js.src = "js/canvas/" + canvasBg + ".js";
  head.appendChild(js);
}
function resetAllToDefault() {
  localStorage.setItem("menu-items", JSON.stringify(defaultLinkMenu));
  buildMenu();
  globalResetBackground();
  DelCookie("engine");
  DelCookie("notes");
  DelCookie("new-tab");
  DelCookie("animation");
  DelCookie("old-reddit");
  DelCookie("matrix-color");
  notesTextarea.value = "";
  noteText = "";
  color = "#0C85D3";
  localStorage.setItem("hide-icons", "no");
  if (showHideItemIcons.checked) {
    showHideItemIcons.click();
  }
  if (openInNewTab.checked) {
    openInNewTab.click();
  }
  if (oldRedditLinks.checked) {
    oldRedditLinks.click();
  }
  setTimeout(function () {
    window.location.reload();
  }, 100);
}
const style = [
  'background: #0280cf',
  'color: #fff',
  'padding: 10px 20px',
  'line-height: 35px'
].join(';');
console.log('%c WebOas.is', style);