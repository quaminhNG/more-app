import { useEffect, useState } from "react";

const useMatchMedia = (width = 1024) => {
    const [matches, setMatches] = useState(
        window.matchMedia(`(max-width: ${width}px)`).matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${width}px)`);
        const handleChange = (e) => {
            setMatches(e.matches);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [width]);

    return matches;
};

export default useMatchMedia;
