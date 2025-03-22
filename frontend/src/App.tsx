import "./App.css";
import { lazy, Suspense } from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router";
import { Routes } from "react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import NotFound from "./app/NotFound";
import { LoaderContainer } from "./components/loader-container";
import Curriculums from "./app/Curriculums";
const Home = lazy(() => import("./app/home"));
const ApplyId = lazy(() => import("./app/AppliesId"));
const CurriculumId = lazy(() => import("./app/CurriculumId"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/apply/:id"
            element={
              <Suspense fallback={<LoaderContainer className="h-screen" />}>
                <ApplyId />
              </Suspense>
            }
          />
           <Route
            path="/curriculum"
            element={
              <Suspense fallback={<LoaderContainer className="h-screen" />}>
                <Curriculums />
              </Suspense>
            }
          />
          <Route
            path="/curriculum/:id"
            element={
              <Suspense fallback={<LoaderContainer className="h-screen" />}>
                <CurriculumId />
              </Suspense>
            }
          />
         

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

