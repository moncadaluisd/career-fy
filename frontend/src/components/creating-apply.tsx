import { useEffect, useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "motion/react";
import { CardAnalyzing } from "./card-analyzing";
import { createApplyByUrl } from "@/services/appliesService";
import { Apply } from "@/interfaces/Apply";
import { CardApply } from "./card-applie";
import { CardSelections } from "./card-selections";

export function CreatingApply({ url, isNew }: { url: string; isNew: boolean }) {
  const [apply, setApply] = useState<Apply | null>(null);
  const requestMadeRef = useRef(false);

  const mutation = useMutation({
    mutationFn: async (url: string) => {
      const data = await createApplyByUrl(url);
      return data.data;
    },
    onSuccess: (data) => {
      setApply(data);
    },
  });

  useEffect(() => {
    if (url && !requestMadeRef.current && isNew) {
      requestMadeRef.current = true;
      mutation.mutate(url);
    }
  }, [url, mutation, isNew]);

  return (
    <div className="flex-1 space-y-3 p-4 md:p-8 pt-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        <CardAnalyzing
          isDot={true}
          text={apply ? "Apply created" : "Getting information from the url..."}
          isLoading={apply === null}
        />
      </motion.div>

      {apply && (
        <>
          <div className="flex flex-col items-center">
            {/* Upper line segment */}

            <div className="w-0.5 h-6 bg-gray-200" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <CardApply apply={apply} />
          </motion.div>

          <div className="flex flex-col items-center">
            {/* Upper line segment */}
            <div className="w-0.5 h-6 bg-gray-200" />
          </div>

          <CardSelections />
        </>
      )}
    </div>
  );
}

