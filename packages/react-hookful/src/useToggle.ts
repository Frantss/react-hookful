import { useState, useCallback } from 'react';

function useToggle(initialValue) {
  const [toggle, setToggle] = useState(initialValue);

  const toggler = useCallback(() => {
    setToggle(!toggle);
  }, [toggle]);

  return [toggle, toggler];
}

export default useToggle;
