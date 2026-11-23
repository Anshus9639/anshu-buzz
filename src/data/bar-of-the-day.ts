export type BarOfTheDayEntry = {
  id: string;
  artist: string;
  excerpt: string;
  track: string;
  href: string;
};

// Excerpts stay at ten words or fewer; every link points to an official track page.
export const barsOfTheDay: BarOfTheDayEntry[] = [
  {
    id: "kendrick-alright",
    artist: "Kendrick Lamar",
    excerpt: "We gon' be alright",
    track: "Alright",
    href: "https://www.youtube.com/watch?v=Z-48u_uWMHY",
  },
  {
    id: "seedhe-maut-namastute",
    artist: "Seedhe Maut",
    excerpt: "Kalam jale, dard dukhe, marham bane",
    track: "Namastute",
    href: "https://www.youtube.com/watch?v=YuWUJg3Kdks",
  },
  {
    id: "nas-ny-state-of-mind",
    artist: "Nas",
    excerpt: "I never sleep, 'cause sleep is the cousin of death",
    track: "N.Y. State of Mind",
    href: "https://www.youtube.com/watch?v=hI8A14Qcv68",
  },
  {
    id: "divine-mere-gully-mein",
    artist: "DIVINE",
    excerpt: "Mere gully mein",
    track: "Mere Gully Mein",
    href: "https://www.youtube.com/watch?v=1bK5dzwhu-I",
  },
  {
    id: "eminem-lose-yourself",
    artist: "Eminem",
    excerpt: "His palms are sweaty, knees weak, arms are heavy",
    track: "Lose Yourself",
    href: "https://www.youtube.com/watch?v=7YuAzR2XVAM",
  },
  {
    id: "raftaar-swag-mera-desi",
    artist: "Raftaar",
    excerpt: "Swag swag mera desi hai",
    track: "Swag Mera Desi",
    href: "https://www.youtube.com/watch?v=yW63GZHF1wQ",
  },
  {
    id: "future-mask-off",
    artist: "Future",
    excerpt: "Chase a check, never chase a bitch",
    track: "Mask Off",
    href: "https://www.youtube.com/watch?v=xvZqHgFz51I",
  },
  {
    id: "central-cee-doja",
    artist: "Central Cee",
    excerpt: "How can I be homophobic? My bitch is gay",
    track: "Doja",
    href: "https://www.youtube.com/watch?v=_VuJA-VQRcY",
  },
  {
    id: "j-cole-no-role-modelz",
    artist: "J. Cole",
    excerpt: "Don't save her, she don't wanna be saved",
    track: "No Role Modelz",
    href: "https://open.spotify.com/track/68Dni7IE4VyPkTOH9mRWHr",
  },
  {
    id: "jay-z-99-problems",
    artist: "JAY-Z",
    excerpt: "I got 99 problems but a bitch ain't one",
    track: "99 Problems",
    href: "https://www.youtube.com/watch?v=6uikJTnmtgw",
  },
  {
    id: "lil-wayne-6-foot-7-foot",
    artist: "Lil Wayne",
    excerpt: "Real G's move in silence like lasagna",
    track: "6 Foot 7 Foot",
    href: "https://www.youtube.com/watch?v=c7tOAGY59uQ",
  },
  {
    id: "notorious-big-juicy",
    artist: "The Notorious B.I.G.",
    excerpt: "It was all a dream",
    track: "Juicy",
    href: "https://www.youtube.com/watch?v=_JZom_gVfuw",
  },
  {
    id: "kanye-stronger",
    artist: "Kanye West",
    excerpt: "That that don't kill me, can only make me stronger",
    track: "Stronger",
    href: "https://www.youtube.com/watch?v=PsO6ZnUZI0g",
  },
  {
    id: "drake-started-from-the-bottom",
    artist: "Drake",
    excerpt: "Started from the bottom, now we're here",
    track: "Started From the Bottom",
    href: "https://www.youtube.com/watch?v=RubBzkZzpUA",
  },
  {
    id: "2pac-changes",
    artist: "2Pac",
    excerpt: "I see no changes",
    track: "Changes",
    href: "https://www.youtube.com/watch?v=eXvBjCO19QY",
  },
];
