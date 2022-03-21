import { useEffect, useRef } from 'react'

function useIsMount() {
    const isFirstRender = useRef(true);

    useEffect(() => {
      isFirstRender.current = false;
    }, []);
    return isFirstRender.current;
}

export default useIsMount;