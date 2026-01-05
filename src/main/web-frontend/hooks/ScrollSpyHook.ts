import { useState, useEffect } from 'react';
import {TABLE_OF_CONTENTS_TOP} from "apps/Wiki/components/WikiStyles.stylex";

export const useScrollSpy = (ids: string[]) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${TABLE_OF_CONTENTS_TOP}px 0px -80% 0px`,
        threshold: 0
      }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
};