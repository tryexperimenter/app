import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ExperimenterLog }  from "pages/ExperimenterLog";
import { URLNotFound } from "pages/URLNotFound";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/log/:log_id" element={<ExperimenterLog />} />
            <Route path="*" element={<URLNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;