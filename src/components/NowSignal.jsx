import React, { useEffect, useState } from "react";

const NowSignal = () => {
  const [film, setFilm] = useState({ title: "", loading: true });
  const [track, setTrack] = useState({ title: "", artist: "", isPlaying: false, loading: true });

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://letterboxd.com/madsykle/rss/");
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          const item = data.items[0];
          setFilm({ title: item.title, loading: false });
        } else {
          setFilm({ title: "unknown", loading: false });
        }
      } catch (e) {
        setFilm({ title: "unknown", loading: false });
      }
    };

    const fetchTrack = async () => {
      try {
        const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
        if (!apiKey) {
          setTrack(prev => ({ ...prev, loading: false }));
          return;
        }
        const res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=nesbeer&api_key=${apiKey}&format=json&limit=1`);
        const data = await res.json();
        if (data?.recenttracks?.track?.length > 0) {
          const trackItem = data.recenttracks.track[0];
          const isPlaying = trackItem["@attr"]?.nowplaying === "true";
          setTrack({
            title: trackItem.name,
            artist: trackItem.artist["#text"],
            isPlaying,
            loading: false
          });
        } else {
          setTrack({ title: "silence", artist: "", isPlaying: false, loading: false });
        }
      } catch (e) {
        setTrack({ title: "silence", artist: "", isPlaying: false, loading: false });
      }
    };

    fetchFilm();
    fetchTrack();

    // Poll for real-time updates every 15 seconds
    const intervalId = setInterval(fetchTrack, 15000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="font-mono text-xs text-muted mt-16 mb-16 pt-4 border-t border-border">
      <div className="tracking-[0.2em] mb-4 text-text/40 uppercase text-[10px]">now</div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:gap-4">
          <span className="w-24 text-text/30">FILM</span>
          {film.loading ? (
            <span className="text-text/20">fetching...</span>
          ) : (
            <span className="text-text/80">{film.title}</span>
          )}
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-4">
          <span className="w-24 text-text/30">
            {track.isPlaying ? "PLAYING" : "LAST PLAYED"}
          </span>
          {track.loading ? (
            <span className="text-text/20">fetching...</span>
          ) : (
            <span className="text-text/80">
              {track.artist ? `${track.artist} — ${track.title}` : track.title}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NowSignal;
