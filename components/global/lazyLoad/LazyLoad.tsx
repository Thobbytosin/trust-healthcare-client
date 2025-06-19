"use client";
import dynamic from "next/dynamic";
import React, { ComponentType, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  importFunc: () => Promise<{ default: ComponentType<any> }>;
  props?: Record<string, any>;
  placeholder?: React.ReactNode;
}

export default function LazyLoad({
  importFunc,
  placeholder,
  props = {},
}: Props) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [loadComponent, setLoadComponent] = useState(false);

  useEffect(() => {
    if (inView) setLoadComponent(true);
  }, [inView]);

  const DynamicComponent = dynamic(importFunc, {
    loading: () => <>{placeholder}</>,
    ssr: false,
  });

  return (
    <div ref={ref}>
      {loadComponent ? <DynamicComponent {...props} /> : placeholder}
    </div>
  );
}
