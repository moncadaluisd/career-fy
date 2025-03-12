import "./App.css";
import { Route } from "react-router";
import { BrowserRouter } from "react-router";
import { Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";

import Home from "./app/home";
import ApplyId from "./app/AppliesId";
import NotFound from "./app/NotFound";
import CurriculumId from "./app/CurriculumId";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply/:id" element={<ApplyId />} />
          <Route path="/curriculum/:id" element={<CurriculumId />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

