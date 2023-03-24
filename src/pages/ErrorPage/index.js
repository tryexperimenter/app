import React from "react";

function ErrorPage({message_for_user = null}) {
  return (
    <html>
      {/* Background */}
      <div class="bg-black relative overflow-hidden h-screen">

        {/* Content */}
        <div class="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
          <div class="flex flex-col items-start relative z-10">
            <h1 class="font-bold text-6xl sm:text-7xl text-white leading-tight mt-4 pb-10">
              Oops...
            </h1>
            <p class="content-text text-lg sm:text-xl mt-6 text-white">
              It looks like we've run into some technical difficulties. Please try again in a little while.
            </p>
            {message_for_user === null ?
              <p class="content-text text-lg sm:text-xl mt-6 text-white">
              If the problem persists, please contact support@tryexperimenter.com.
              </p>
              :
              <p class="content-text text-lg sm:text-xl mt-6 text-white">
              If the problem persists, please contact support@tryexperimenter.com and include the following message:
              <br></br>
              <br></br>
              {message_for_user}
              </p>
            }
          </div>
        </div>
      </div>
    </html>
  );
};

export { ErrorPage };
