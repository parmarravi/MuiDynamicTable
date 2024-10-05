import { useEffect, useRef } from 'react';

function useDebouncedEffect(callback, delay, deps) {
    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current && clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            callback();
        }, delay);

        return () => {
            timerRef.current && clearTimeout(timerRef.current);
        };
    }, deps);
}

export default useDebouncedEffect;
