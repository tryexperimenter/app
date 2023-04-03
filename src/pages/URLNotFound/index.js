import React from "react";

const URLNotFound = () => {

  return (
      <div class="bg-black relative overflow-hidden h-screen">
        <div class="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
          <div class="flex flex-col items-start relative z-10">
            <h1 class="font-bold text-6xl sm:text-7xl text-white leading-tight mt-4">
              Page Not Found :(
            </h1>
            <p class="content-text text-lg mt-6 text-white">
              Sorry, but we don't recognize the page you're trying to visit. Please reach out to support@tryexperimenter.com for assistance or visit <a href="tryexperimenter.com">tryexperimenter.com</a>.
            </p>
          </div>
        </div>
      </div>
  );
};

export { URLNotFound };
