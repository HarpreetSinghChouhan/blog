"use client";

import { useRouter } from "next/navigation";

export  function navigation() {
    const router = useRouter();
    const go = (path: string) => {
        router.push(path);
    }
    return {go};

}   
