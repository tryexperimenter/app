import React, { useEffect, useState } from 'react';

function LoadingPage() {
  const [dots, setDots] = useState(1);
  let ellipses = '.';
  for (let dot = 1; dot < dots; dot++) {
      ellipses += '.';
  }

  useEffect(() => {
      const updateEllipses = setInterval(() => {
          if (dots === 3) {
              setDots(1);
          } else {
              setDots(dots + 1);
          }
      }, 500);
      return () => clearInterval(updateEllipses);
  });

  return (
    <div class="bg-black relative overflow-hidden h-screen">
      <div class="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
        <div class="flex flex-col items-start relative z-10">
          <h1 class="font-bold text-6xl sm:text-7xl text-white leading-tight mt-4 pb-10">
            Loading{ellipses}
          </h1>
          <p class="content-text text-lg sm:text-xl mt-6 text-white">
            If things seem like they're taking too long, please reach out to support@tryexperimenter.com.
          </p>
        </div>
      </div>
    </div>
);
}

export { LoadingPage };