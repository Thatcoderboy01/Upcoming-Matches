import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function MatchList() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModalVideo, setOpenModalVideo] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompetition, setSelectedCompetition] = useState("");
  const observerRef = useRef();

  const fetchMatches = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://upcoming-matches.onrender.com/api/matches?page=${page}`);
      const data = await res.json();

      const newMatches = data?.matches || [];
      setMatches((prev) => [...prev, ...newMatches]);

      if (newMatches.length === 0 || page >= data.totalPages) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching matches:", err);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  const lastMatchRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore]
  );

  const extractIframeSrc = (embedHtml) => {
    const div = document.createElement("div");
    div.innerHTML = embedHtml;
    const iframe = div.querySelector("iframe");
    return iframe ? iframe.src : "";
  };

  const competitions = useMemo(() => {
    const compSet = new Set(matches.map((m) => m.competition).filter(Boolean));
    return Array.from(compSet).sort();
  }, [matches]);

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const matchTitle = match.title?.toLowerCase() || "";
      const matchCompetition = match.competition?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        matchTitle.includes(search) || matchCompetition.includes(search);
      const matchesCompetition =
        selectedCompetition === "" ||
        match.competition === selectedCompetition;

      return matchesSearch && matchesCompetition;
    });
  }, [matches, searchTerm, selectedCompetition]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
        ⚽ Upcoming Soccer Matches
      </h2>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <input
          type="text"
          placeholder="Search by title or competition..."
          className="flex-grow sm:flex-none w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search matches"
        />

        <select
          className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
          value={selectedCompetition}
          onChange={(e) => setSelectedCompetition(e.target.value)}
          aria-label="Filter by competition"
        >
          <option value="">All Competitions</option>
          {competitions.map((comp) => (
            <option key={comp} value={comp}>
              {comp}
            </option>
          ))}
        </select>
      </div>

      {filteredMatches.length === 0 && !loading && (
        <p className="text-center text-gray-500 text-lg">
          No matches found for your search/filter.
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredMatches.map((match, i) => {
          const isLast = i === filteredMatches.length - 1;
          return (
            <div
              key={match.id || i}
              ref={isLast ? lastMatchRef : null}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-transform hover:scale-[1.01] flex flex-col"
            >
              <img
                src={match.thumbnail}
                alt={match.title}
                loading="lazy"
                className="w-full h-44 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                  {match.title}
                </h3>
                <p className="text-sm text-gray-600">{match.competition}</p>
                <p className="text-sm text-gray-700 font-medium mb-3">
                  🕒 {new Date(match.date).toLocaleString()}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <a
                    href={match.matchviewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-700"
                  >
                    Watch Match
                  </a>
                  <a
                    href={match.competitionUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-600 text-white text-xs px-3 py-1 rounded-full hover:bg-green-700"
                  >
                    View Competition
                  </a>
                </div>
                {match.videos?.length > 0 && (
                  <button
                    onClick={() => setOpenModalVideo(match.videos[0])}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-full shadow transition duration-300 ease-in-out"
                  >
                    🎥 Watch Highlights
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {loading &&
          Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="bg-gray-200 animate-pulse h-[300px] rounded-xl"
              ></div>
            ))}
      </div>

      {/* Modal for video */}
      <Modal
        isOpen={!!openModalVideo}
        onRequestClose={() => setOpenModalVideo(null)}
        contentLabel="Video Modal"
        className="w-full max-w-6xl bg-white rounded-lg shadow-xl outline-none relative"
        overlayClassName="fixed inset-0 bg-white z-50 flex items-center justify-center p-4"
      >
        <button
          onClick={() => setOpenModalVideo(null)}
          className="absolute top-4 right-4 z-10 bg-white text-gray-700 hover:text-red-600 border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition duration-300 ease-in-out"
          aria-label="Close Video"
        >
          ✕
        </button>

        <div className="w-full aspect-video flex items-center justify-center rounded-lg overflow-hidden">
          {openModalVideo && (
            <iframe
              src={extractIframeSrc(openModalVideo.embed)}
              frameBorder="0"
              allow="fullscreen"
              loading="lazy"
              className="w-full h-full"
              title="Match Highlights"
              allowFullScreen
            />
          )}
        </div>
      </Modal>
    </div>
  );
}
